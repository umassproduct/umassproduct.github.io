import { useEffect, useRef, useState } from 'react'
import RedBubble from '../../components/RedBubble/RedBubble'
import Slideshow from '../../components/Slideshow/Slideshow'
import NewsletterInput from '../../components/NewsletterInput/NewsletterInput'
import SocialLinks from '../../components/SocialLinks/SocialLinks'
import Calendar from '../../components/Calendar/Calendar'
import ScrollFadeIn from '../../components/ScrollFadeIn/ScrollFadeIn'
import slideshowImages from '../../data/slideshow'
import calendarData from '../../data/calendar'
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
      <div className="home__alert">
        <span className="home__alert-text">
          🚨 MEETINGS HAVE MOVED TO ILC S311 UNTIL FURTHER NOTICE
        </span>
      </div>

      <div className="home__header">
        <TypewriterHeading text="Your role in tech starts here." />
        <p className="home__tagline">
          An award-winning student organization building the next generation of tech unicorns at UMass Amherst.
        </p>
      </div>

      <section className="home__hero" aria-label="Hero">
        <ScrollFadeIn>
          <RedBubble className="home__bubble">
            <Slideshow images={slideshowImages} />
            <NewsletterInput />
          </RedBubble>
        </ScrollFadeIn>
      </section>

      {/* Alumni marquee */}
      <section className="home__alumni" aria-label="Alumni companies">
        <ScrollFadeIn>
          <p className="home__alumni-label">Our alumni are at</p>
          <div className="home__alumni-track-wrap">
            <div className="home__alumni-track">
              {[0, 1].map(set => (
                <div key={set} className="home__alumni-set" aria-hidden={set > 0 ? true : undefined}>
                  <img src="/images/alumni_logos/amazon_logo.png" alt="Amazon" className="home__alumni-logo" />
                  <img src="/images/alumni_logos/microsoft_logo.png" alt="Microsoft" className="home__alumni-logo home__alumni-logo--large" />
                  <img src="/images/alumni_logos/andruil_logo.png" alt="Anduril" className="home__alumni-logo" />
                  <img src="/images/alumni_logos/uber_logo.webp" alt="Uber" className="home__alumni-logo home__alumni-logo--large" />
                  <img src="/images/alumni_logos/Oracle-Logo.png" alt="Oracle" className="home__alumni-logo home__alumni-logo--large" />
                  <img src="/images/alumni_logos/Atlassian-Logo.png" alt="Atlassian" className="home__alumni-logo home__alumni-logo--large" />
                  <img src="/images/alumni_logos/Liberty_Mutual-Logo.wine.png" alt="Liberty Mutual" className="home__alumni-logo home__alumni-logo--large" />
                  <img src="/images/alumni_logos/anchr_logo.svg" alt="Anchr" className="home__alumni-logo" />
                  <img src="/images/alumni_logos/fidelity-logo-PNG.png.webp" alt="Fidelity" className="home__alumni-logo" />
                  <img src="/images/alumni_logos/optum_logo.png" alt="Optum" className="home__alumni-logo" />
                </div>
              ))}
            </div>
          </div>
        </ScrollFadeIn>
      </section>

      <section className="home__calendar" aria-label="Event Calendar">
        <ScrollFadeIn>
          <Calendar
            semester={calendarData.semester}
            year={calendarData.year}
            events={calendarData.events}
            meetingInfo={calendarData.meetingInfo}
          />
        </ScrollFadeIn>
      </section>

      <ScrollFadeIn className="home__social">
        <SocialLinks />
      </ScrollFadeIn>
    </div>
  )
}
