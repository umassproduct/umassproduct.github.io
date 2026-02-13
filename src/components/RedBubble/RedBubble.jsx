import './RedBubble.css'

export default function RedBubble({ children, className = '', subtle = false }) {
  return (
    <div className={`red-bubble${subtle ? ' red-bubble--subtle' : ''} ${className}`.trim()}>
      {children}
    </div>
  )
}
