import { useEffect, useRef, useState } from 'react'
import RedBubble from '../../components/RedBubble/RedBubble'
import Slideshow from '../../components/Slideshow/Slideshow'
import NewsletterInput from '../../components/NewsletterInput/NewsletterInput'
import SocialLinks from '../../components/SocialLinks/SocialLinks'
import ScrollFadeIn from '../../components/ScrollFadeIn/ScrollFadeIn'
import slideshowImages from '../../data/slideshow'
import './Home.css'

function TypewriterHeading({ text }) {
  const [charCount, setCharCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCharCount(text.length)
      setStarted(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.unobserve(el)
  }, [text])

  useEffect(() => {
    if (!started) return
    if (charCount >= text.length) return

    const timeout = setTimeout(() => {
      setCharCount(prev => prev + 1)
    }, 60)

    return () => clearTimeout(timeout)
  }, [started, charCount, text.length])

  const displayed = text.slice(0, charCount)
  const showCursor = started && charCount < text.length

  return (
    <h1 className="home__heading" ref={ref} aria-label={text}>
      <span className="home__heading-text">{displayed}</span>
      <span
        className={`home__heading-cursor${showCursor ? ' home__heading-cursor--blink' : ''}`}
        aria-hidden="true"
      />
    </h1>
  )
}

export default function Home() {
  return (
    <div className="home">
      <TypewriterHeading text="Your role in tech starts here." />

      <section className="home__hero" aria-label="Hero">
        <ScrollFadeIn>
          <RedBubble className="home__bubble">
            <Slideshow images={slideshowImages} />
            <NewsletterInput />
          </RedBubble>
        </ScrollFadeIn>
      </section>

      <ScrollFadeIn className="home__social">
        <SocialLinks />
      </ScrollFadeIn>
    </div>
  )
}
