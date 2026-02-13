import { useState } from 'react'
import './NewsletterInput.css'

export default function NewsletterInput() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    // TODO: Replace with Google Form submission
    // For now, show success message
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="newsletter">
        <p className="newsletter__success">Thanks for subscribing! We'll be in touch.</p>
      </div>
    )
  }

  return (
    <div className="newsletter">
      <form className="newsletter__form" onSubmit={handleSubmit}>
        <label htmlFor="newsletter-email" className="visually-hidden">
          Email address
        </label>
        <input
          id="newsletter-email"
          className="newsletter__input"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <button type="submit" className="newsletter__button">
          Subscribe
        </button>
      </form>
    </div>
  )
}
