import { createElement } from 'react'
import './SectionHeadline.css'

export default function SectionHeadline({ text, as = 'h2', glow = false, center = false }) {
  const classes = [
    'section-headline',
    glow && 'section-headline--glow',
    center && 'section-headline--center',
  ].filter(Boolean).join(' ')

  return createElement(as, { className: classes }, text)
}
