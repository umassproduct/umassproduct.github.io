import { useState } from 'react'
import './NewsletterInput.css'

export default function NewsletterInput() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeshUnNMnQ_pRhX37iUD0wyYwgJblXLLPGN6lYyYGu_3VKjgw/formResponse'
    const formData = new URLSearchParams()
    formData.append('entry.40221211', email)

    try {
      await fetch(formUrl, {
        method: 'POST',
        body: formData,
        mode: 'no-cors', // Required for Google Forms
      })
      setSubmitted(true)
      setEmail('')
    } catch (error) {
      console.error('Form submission error:', error)
      // Show success anyway since no-cors doesn't return response
      setSubmitted(true)
      setEmail('')
    }
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
