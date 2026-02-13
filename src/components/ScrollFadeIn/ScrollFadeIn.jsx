import { useRef, useEffect, useState } from 'react'
import './ScrollFadeIn.css'

export default function ScrollFadeIn({ children, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.unobserve(el)
  }, [])

  return (
    <div
      ref={ref}
      className={`scroll-fade-in${visible ? ' scroll-fade-in--visible' : ''} ${className}`.trim()}
    >
      {children}
    </div>
  )
}
