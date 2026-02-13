import './SectionHeadline.css'

export default function SectionHeadline({ text, as: Tag = 'h2', glow = false, center = false }) {
  const classes = [
    'section-headline',
    glow && 'section-headline--glow',
    center && 'section-headline--center',
  ].filter(Boolean).join(' ')

  return <Tag className={classes}>{text}</Tag>
}
