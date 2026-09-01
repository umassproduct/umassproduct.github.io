# CMS + Cloudflare Workers setup

This branch adds:

- **Content as JSON** — `content/eboard.json`, `content/calendar.json`, `content/semesters.json`, `content/slideshow.json`. These are imported directly by the React components that used to import `src/data/*.js`; editing them (by hand or via the CMS) changes the live site on the next deploy.
- **Sveltia CMS** at `/admin` (`public/admin/index.html` + `config.yml`) — a browser-based editor for those four JSON files, authenticated via GitHub. It's a maintained, actively-developed successor to Decap/Netlify CMS with a nicer editing UI, and it reads the same `config.yml` format, so it's easy to swap for Decap later if you'd rather.
- **Cloudflare Workers deployment** — `wrangler.jsonc` serves the Vite build (`dist/`) as static assets. `src/worker.js` only runs for the CMS's OAuth routes (`/auth`, `/callback`); every other request is served as a static file with no Worker invocation, so the site stays effectively free/fast on Cloudflare's free tier.

Content that wasn't wired into a page (`src/data/forFounders.js`, `forStudents.js`, `showcase.js`) was left alone — those pages currently have their copy hardcoded in JSX rather than pulling from those files, so there was nothing live to hook the CMS up to. Say the word if you'd like those made CMS-editable too.

## One-time setup

### 1. Create a Cloudflare account + get your account ID

If you don't already have one: [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up). Your **Account ID** is on the right sidebar of the Cloudflare dashboard overview page.

### 2. Deploy once from your machine, to claim the *.workers.dev URL

```bash
npm install
npx wrangler login      # opens a browser to authorize wrangler
npm run deploy           # builds with vite, then `wrangler deploy`
```

Wrangler will print your Worker's URL, something like `https://umassproduct-website.<your-subdomain>.workers.dev`. Note it down — you need it in the next two steps.

### 3. Register a GitHub OAuth App

GitHub → Settings → Developer settings → OAuth Apps → **New OAuth App**:

- **Homepage URL**: your Worker URL (or custom domain, once set up)
- **Authorization callback URL**: `<your Worker URL>/callback`

Save it, then generate a **Client secret**. You'll get a Client ID and a Client secret — both go in the next step.

### 4. Set the Worker's secrets

```bash
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
```

Paste the values from step 3 when prompted. (Optional) also set `ALLOWED_DOMAINS` to your Worker's hostname (comma-separated, wildcards like `*.workers.dev` allowed) to restrict which sites this OAuth handler will authenticate for — recommended once you're using a custom domain, since anyone could otherwise point their own `config.yml` at your OAuth endpoint.

### 5. Point `config.yml` at your real URL

Edit `public/admin/config.yml` and set `backend.base_url` to your actual Worker URL (or custom domain) from step 2, then redeploy (`npm run deploy`, or just push to `main` — see step 6).

### 6. Set up automatic deploys from GitHub

The `.github/workflows/deploy.yml` workflow deploys on every push to `main`. Add two repo secrets (Settings → Secrets and variables → Actions):

- `CLOUDFLARE_API_TOKEN` — Cloudflare dashboard → My Profile → API Tokens → Create Token → "Edit Cloudflare Workers" template
- `CLOUDFLARE_ACCOUNT_ID` — from step 1

### 7. (Optional) Custom domain

Cloudflare dashboard → Workers & Pages → your Worker → Settings → Domains & Routes → Add a custom domain. If `umassproduct.github.io` / a custom domain was previously pointed at GitHub Pages, update its DNS to point at Cloudflare instead, and update `base_url` in `config.yml` again to match.

## Using the CMS

Visit `https://<your-domain>/admin/` and sign in with a GitHub account that has **write access** to this repo (the GitHub backend authenticates as that user and commits as them). Edits save as normal commits to `main` (configurable in `config.yml`), which triggers the deploy workflow automatically.

## Local development

`npm run dev` runs the site normally — editing any `content/*.json` file by hand updates the page on save, same as before. The `/admin` CMS itself needs the deployed OAuth flow to sign in, so it's not meant to be used against `localhost`; test content changes locally by editing the JSON, and use the deployed `/admin` for the real editing workflow.
