import SectionHeadline from '../../components/SectionHeadline/SectionHeadline'
import ScrollFadeIn from '../../components/ScrollFadeIn/ScrollFadeIn'
import SocialLinks from '../../components/SocialLinks/SocialLinks'
import founderSections from '../../data/forFounders'
import './ForFounders.css'

export default function ForFounders() {
  return (
    <div className="for-founders page">
      <ScrollFadeIn>
        <SectionHeadline text="For Founders" as="h1" glow center />
      </ScrollFadeIn>

      <ScrollFadeIn>
        <p className="for-founders__intro">
          We help early-stage founders sharpen their products through structured feedback,
          visibility, and access to product-minded talent.
        </p>
      </ScrollFadeIn>

      <div className="for-founders__sections">
        {founderSections.map((section, i) => (
          <ScrollFadeIn key={i}>
            <div className="for-founders__section">
              <h3 className="for-founders__section-title">{section.title}</h3>
              <p className="for-founders__section-body">{section.body}</p>
            </div>
          </ScrollFadeIn>
        ))}
      </div>

      <ScrollFadeIn>
        <div style={{ marginTop: 'var(--space-xl)' }}><SocialLinks /></div>
      </ScrollFadeIn>
    </div>
  )
}
