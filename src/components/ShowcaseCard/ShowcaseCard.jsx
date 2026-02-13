import RedBubble from '../RedBubble/RedBubble'
import './ShowcaseCard.css'

export default function ShowcaseCard({ image, title, description }) {
  return (
    <RedBubble subtle className="showcase-card">
      <div className="showcase-card__image-wrap">
        {image ? (
          <img src={image} alt={title} className="showcase-card__image" loading="lazy" />
        ) : (
          <div className="showcase-card__placeholder">Image coming soon</div>
        )}
      </div>
      <div className="showcase-card__body">
        <h3 className="showcase-card__title">{title}</h3>
        <p className="showcase-card__desc">{description}</p>
      </div>
    </RedBubble>
  )
}
