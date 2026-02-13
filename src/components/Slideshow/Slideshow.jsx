import { useState, useEffect, useCallback } from 'react'
import './Slideshow.css'

export default function Slideshow({ images }) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const advance = useCallback(() => {
    if (images.length <= 1) return
    setCurrent(prev => (prev + 1) % images.length)
  }, [images.length])

  useEffect(() => {
    if (paused || images.length <= 1) return
    const id = setInterval(advance, 5000)
    return () => clearInterval(id)
  }, [paused, advance, images.length])

  // Preload next image
  useEffect(() => {
    if (images.length <= 1) return
    const next = (current + 1) % images.length
    const img = new Image()
    img.src = images[next].src
  }, [current, images])

  if (!images || images.length === 0) {
    return (
      <div className="slideshow" role="region" aria-label="Event photo slideshow">
        <div className="slideshow__placeholder">Photos coming soon</div>
      </div>
    )
  }

  return (
    <div
      className="slideshow"
      role="region"
      aria-label="Event photo slideshow"
      aria-live="polite"
      style={{ cursor: 'pointer' }}
      onClick={advance}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((img, i) => (
        <div
          key={i}
          className={`slideshow__slide${i === current ? ' slideshow__slide--active' : ''}`}
          aria-hidden={i !== current}
        >
          <img
            src={img.src}
            alt={img.alt}
            className="slideshow__image"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}
    </div>
  )
}
