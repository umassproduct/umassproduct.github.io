import SectionHeadline from '../../components/SectionHeadline/SectionHeadline'
import ShowcaseCard from '../../components/ShowcaseCard/ShowcaseCard'
import RedBubble from '../../components/RedBubble/RedBubble'
import ScrollFadeIn from '../../components/ScrollFadeIn/ScrollFadeIn'
import showcaseItems from '../../data/showcase'
import './Showcase.css'

export default function Showcase() {
  return (
    <div className="showcase page">
      <ScrollFadeIn>
        <SectionHeadline text="Product Showcase" as="h1" glow center />
      </ScrollFadeIn>

      <section className="showcase__featured">
        <ScrollFadeIn>
          <RedBubble className="showcase__featured-bubble">
            <video
              className="showcase__featured-video"
              src="/images/showcase/arham_main.mp4"
              controls
              playsInline
              aria-label="Featured pitch: Arham presenting Apple Mail app redesign"
            />
            <div className="showcase__featured-content">
              <p className="showcase__featured-description">
                Arham presents a feature redesign for Apple Mail that transforms emails into interactive 3D cards with haptic touch and swipe gestures for a frictionless UX.
              </p>
            </div>
          </RedBubble>
        </ScrollFadeIn>
      </section>

      <div className="showcase__grid">
        {showcaseItems.map((item, i) => (
          <ScrollFadeIn key={i}>
            <ShowcaseCard
              image={item.image}
              title={item.title}
              description={item.description}
            />
          </ScrollFadeIn>
        ))}
      </div>
    </div>
  )
}
