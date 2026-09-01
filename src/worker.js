/**
 * Cloudflare Worker entry point for umassproduct.github.io.
 *
 * The site itself is static (built by Vite into dist/ and served via the
 * "assets" binding configured in wrangler.jsonc) — this Worker only runs
 * for the GitHub OAuth handshake that the CMS admin (public/admin) needs
 * to let editors sign in and commit content changes.
 *
 * The OAuth handler below is vendored (near-verbatim, provider list
 * trimmed to GitHub only) from sveltia-cms-auth, MIT licensed:
 *   https://github.com/sveltia/sveltia-cms-auth
 * If you swap the CMS for something else that needs different OAuth
 * semantics, this is the file to replace.
 */

const GITHUB_HOSTNAME_DEFAULT = 'github.com';

/**
 * Escape a string for safe use inside a RegExp.
 * @param {string} str
 * @returns {string}
 */
const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Turn the ALLOWED_DOMAINS env var (comma-separated, `*` wildcard allowed)
 * into anchored regex sources, e.g. "umassproduct.pages.dev,*.example.com".
 * @param {string} [allowedDomains]
 * @returns {string[]}
 */
const getDomainPatterns = (allowedDomains) =>
  (allowedDomains ?? '')
    .split(/,/)
    .map((str) => str.trim())
    .filter(Boolean)
    .map((str) => `^${escapeRegExp(str).replaceAll('\\*', '.+')}$`);

/**
 * Serialize a value for safe embedding in an inline <script> block.
 * @param {string | boolean | string[]} value
 * @returns {string}
 */
const serialize = (value) => JSON.stringify(value ?? null).replaceAll('<', '\\u003c');

/**
 * Build the popup HTML that posts the OAuth result back to the CMS window
 * that opened it.
 * @param {object} args
 * @param {string} [args.token]
 * @param {string} [args.error]
 * @param {string} [args.errorCode]
 * @param {{ [key: string]: string }} [args.env]
 * @returns {Response}
 */
const outputHTML = ({ token, error, errorCode, env = {} }) => {
  const state = error ? 'error' : 'success';
  const content = error ? { provider: 'github', error, errorCode } : { provider: 'github', token };

  return new Response(
    `
      <!doctype html><html><body><script>
        (() => {
          const trustedPatterns = ${serialize(getDomainPatterns(env.ALLOWED_DOMAINS))};
          const hasToken = ${serialize(!!token)};

          const isTrusted = (origin) => {
            try {
              const { hostname } = new URL(origin);
              return trustedPatterns.some((pattern) => new RegExp(pattern).test(hostname));
            } catch {
              return false;
            }
          };

          window.addEventListener('message', ({ data, origin }) => {
            if (data !== 'authorizing:github') return;
            if (hasToken && trustedPatterns.length && !isTrusted(origin)) return;
            window.opener?.postMessage(
              'authorization:github:${state}:${JSON.stringify(content)}',
              origin
            );
          });
          window.opener?.postMessage('authorizing:github', '*');
        })();
      </script></body></html>
    `,
    {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Set-Cookie': `csrf-token=deleted; HttpOnly; Max-Age=0; Path=/; SameSite=Lax; Secure`,
      },
    },
  );
};

/**
 * First leg of the OAuth flow: redirect the editor to GitHub's consent
 * screen with a CSRF token stashed in a short-lived cookie.
 * @param {Request} request
 * @param {{ [key: string]: string }} env
 * @returns {Promise<Response>}
 */
const handleAuth = async (request, env) => {
  const { searchParams } = new URL(request.url);
  const { site_id: domain } = Object.fromEntries(searchParams);

  const {
    ALLOWED_DOMAINS,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    GITHUB_HOSTNAME = GITHUB_HOSTNAME_DEFAULT,
  } = env;

  const domainPatterns = getDomainPatterns(ALLOWED_DOMAINS);

  if (domainPatterns.length && !domainPatterns.some((p) => new RegExp(p).test(domain ?? ''))) {
    return outputHTML({ env, error: 'Your domain is not allowed to use the authenticator.', errorCode: 'UNSUPPORTED_DOMAIN' });
  }

  if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    return outputHTML({ env, error: 'OAuth app client ID or secret is not configured.', errorCode: 'MISCONFIGURED_CLIENT' });
  }

  const csrfToken = globalThis.crypto.randomUUID().replaceAll('-', '');

  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    scope: 'repo,user',
    state: csrfToken,
  });

  return new Response('', {
    status: 302,
    headers: {
      Location: `https://${GITHUB_HOSTNAME}/login/oauth/authorize?${params.toString()}`,
      'Set-Cookie': `csrf-token=github_${csrfToken}; HttpOnly; Path=/; Max-Age=600; SameSite=Lax; Secure`,
    },
  });
};

/**
 * Second leg of the OAuth flow: exchange the authorization code GitHub
 * sent back for an access token, and hand it to the CMS popup.
 * @param {Request} request
 * @param {{ [key: string]: string }} env
 * @returns {Promise<Response>}
 */
const handleCallback = async (request, env) => {
  const { searchParams } = new URL(request.url);
  const { code, state } = Object.fromEntries(searchParams);

  const [, csrfToken] = request.headers.get('Cookie')?.match(/\bcsrf-token=github_([0-9a-f]{32})\b/) ?? [];

  if (!code || !state) {
    return outputHTML({ env, error: 'Failed to receive an authorization code. Please try again later.', errorCode: 'AUTH_CODE_REQUEST_FAILED' });
  }

  if (!csrfToken || state !== csrfToken) {
    return outputHTML({ env, error: 'Potential CSRF attack detected. Authentication flow aborted.', errorCode: 'CSRF_DETECTED' });
  }

  const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_HOSTNAME = GITHUB_HOSTNAME_DEFAULT } = env;

  if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    return outputHTML({ env, error: 'OAuth app client ID or secret is not configured.', errorCode: 'MISCONFIGURED_CLIENT' });
  }

  let response;
  let token = '';
  let error = '';

  try {
    response = await fetch(`https://${GITHUB_HOSTNAME}/login/oauth/access_token`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, client_id: GITHUB_CLIENT_ID, client_secret: GITHUB_CLIENT_SECRET }),
    });
  } catch {
    // handled below
  }

  if (!response) {
    return outputHTML({ env, error: 'Failed to request an access token. Please try again later.', errorCode: 'TOKEN_REQUEST_FAILED' });
  }

  try {
    ({ access_token: token, error } = await response.json());
  } catch {
    return outputHTML({ env, error: 'Server responded with malformed data. Please try again later.', errorCode: 'MALFORMED_RESPONSE' });
  }

  return outputHTML({ env, token, error });
};

export default {
  /**
   * @param {Request} request
   * @param {{ ASSETS: Fetcher, [key: string]: any }} env
   * @returns {Promise<Response>}
   */
  async fetch(request, env) {
    const { method, url } = request;
    const { pathname } = new URL(url);

    if (method === 'GET' && ['/auth', '/oauth/authorize'].includes(pathname)) {
      return handleAuth(request, env);
    }

    if (method === 'GET' && ['/callback', '/oauth/redirect'].includes(pathname)) {
      return handleCallback(request, env);
    }

    // Anything else that reaches the Worker (shouldn't normally happen given
    // run_worker_first in wrangler.jsonc) falls back to the static build.
    return env.ASSETS.fetch(request);
  },
};
