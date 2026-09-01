import { useRef, useEffect, useState } from 'react'
import './ScrollFadeIn.css'

export default function ScrollFadeIn({ children, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const el = ref.current
    if (!el || visible) return

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
  }, [visible])

  return (
    <div
      ref={ref}
      className={`scroll-fade-in${visible ? ' scroll-fade-in--visible' : ''} ${className}`.trim()}
    >
      {children}
    </div>
  )
}
