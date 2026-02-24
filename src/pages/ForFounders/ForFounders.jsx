import { useState } from 'react'
import SectionHeadline from '../../components/SectionHeadline/SectionHeadline'
import ScrollFadeIn from '../../components/ScrollFadeIn/ScrollFadeIn'
import './ForFounders.css'

const FORMSPREE_ID = 'xkovvwpo'

const sponsors = [
  // {
  //   name: 'Notion',
  //   logo: '/images/sponsors/notion-logo-media-kit.png',
  //   story: 'In 2026, Notion sent our president Naina — who was part of their student ambassador program — very exciting swag! Notion has been one of our favorite products we\'ve been rooting for since day one. We distributed the swag at our Spring \'26 Notion Breakdown meeting, where we learned from Notion\'s startup journey.',
  // },
  { name: 'UMass', logo: '/images/sponsors/UMass_Seal_Medium_PMS_202.png' },
]

export default function ForFounders() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [activeSponsor, setActiveSponsor] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    const form = e.target
    const data = new FormData(form)

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="for-founders page">
      <ScrollFadeIn>
        <SectionHeadline text="Sponsorship" as="h1" glow center />
      </ScrollFadeIn>

      <ScrollFadeIn>
        <p className="for-founders__intro">
          Partner with UMass Product to reach the next generation of product-minded builders at UMass Amherst.
          We offer visibility, talent access, and direct engagement with our community.
        </p>
      </ScrollFadeIn>

      <ScrollFadeIn>
        <div className="for-founders__examples">
          <p className="for-founders__examples-label">What Sponsorship Looks Like</p>
          <div className="for-founders__examples-grid">
            <div className="for-founders__example-card">
              <span className="for-founders__example-icon">🔬</span>
              <h3 className="for-founders__example-title">MVP Teardown</h3>
              <p className="for-founders__example-body">
                Bring us your MVP and we'll rip it apart — giving you honest UX and product feedback as real potential users.
              </p>
            </div>
            <div className="for-founders__example-card">
              <span className="for-founders__example-icon">🎤</span>
              <h3 className="for-founders__example-title">Host a Meeting</h3>
              <p className="for-founders__example-body">
                Tell us about your product and we'll dedicate an entire meeting to it — a room full of product-minded students, all ears.
              </p>
            </div>
            <div className="for-founders__example-card">
              <span className="for-founders__example-icon">👕</span>
              <h3 className="for-founders__example-title">Send Swag</h3>
              <p className="for-founders__example-body">
                T-shirts, stickers, hats — swag is always a big hit and keeps your brand in front of our community all semester.
              </p>
            </div>
          </div>
        </div>
      </ScrollFadeIn>

      <ScrollFadeIn>
        <div className="for-founders__sponsors">
          <p className="for-founders__sponsors-label">Previous Sponsors</p>
          <div className="for-founders__marquee-wrapper">
            <div className="for-founders__marquee">
              {[...sponsors, ...sponsors].map((s, i) => (
                <div
                  className={`for-founders__sponsor-logo${s.story ? ' for-founders__sponsor-logo--clickable' : ''}`}
                  key={i}
                  onClick={() => s.story && setActiveSponsor(s)}
                >
                  <img src={s.logo} alt={s.name} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollFadeIn>

      <ScrollFadeIn>
        <div className="for-founders__form-container">
          <h2 className="for-founders__form-heading">Get in Touch</h2>
          <p className="for-founders__form-subheading">
            Fill out the form below and we'll get back to you shortly.
          </p>

          {status === 'success' ? (
            <div className="for-founders__success">
              <p>Thank you — we'll be in touch soon.</p>
            </div>
          ) : (
            <form className="for-founders__form" onSubmit={handleSubmit} noValidate>
              <div className="for-founders__field">
                <label className="for-founders__label" htmlFor="name">Name</label>
                <input
                  className="for-founders__input"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="for-founders__field">
                <label className="for-founders__label" htmlFor="company">Company / Organization</label>
                <input
                  className="for-founders__input"
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Your company or organization"
                  required
                />
              </div>

              <div className="for-founders__field">
                <label className="for-founders__label" htmlFor="email">Email</label>
                <input
                  className="for-founders__input"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  required
                />
              </div>

              <div className="for-founders__field">
                <label className="for-founders__label" htmlFor="message">Message</label>
                <textarea
                  className="for-founders__textarea"
                  id="message"
                  name="message"
                  placeholder="Tell us about your company and how you'd like to get involved..."
                  rows={5}
                  required
                />
              </div>

              {status === 'error' && (
                <p className="for-founders__error">Something went wrong. Please try again.</p>
              )}

              <button
                className="for-founders__submit"
                type="submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </ScrollFadeIn>
      {activeSponsor && (
        <div className="for-founders__modal-overlay" onClick={() => setActiveSponsor(null)}>
          <div className="for-founders__modal" onClick={e => e.stopPropagation()}>
            <img
              className="for-founders__modal-logo"
              src={activeSponsor.logo}
              alt={activeSponsor.name}
            />
            <p className="for-founders__modal-story">{activeSponsor.story}</p>
            <button className="for-founders__modal-close" onClick={() => setActiveSponsor(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
