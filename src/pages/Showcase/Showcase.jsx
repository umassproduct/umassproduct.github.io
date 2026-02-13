import SectionHeadline from '../../components/SectionHeadline/SectionHeadline'
import ShowcaseCard from '../../components/ShowcaseCard/ShowcaseCard'
import ScrollFadeIn from '../../components/ScrollFadeIn/ScrollFadeIn'
import showcaseItems from '../../data/showcase'
import './Showcase.css'

export default function Showcase() {
  return (
    <div className="showcase page">
      <ScrollFadeIn>
        <SectionHeadline text="Product Showcase" as="h1" glow center />
      </ScrollFadeIn>

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
