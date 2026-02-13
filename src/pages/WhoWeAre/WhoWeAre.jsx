import SectionHeadline from '../../components/SectionHeadline/SectionHeadline'
import RedBubble from '../../components/RedBubble/RedBubble'
import ScrollFadeIn from '../../components/ScrollFadeIn/ScrollFadeIn'
import SocialLinks from '../../components/SocialLinks/SocialLinks'
import './WhoWeAre.css'

const sections = [
  {
    title: 'Our Mission',
    body: 'UMass Product exists to build the next generation of product thinkers. We bring together students passionate about product management, design, and engineering to build real things, think critically, and prepare for careers in tech.',
  },
  {
    title: 'What We Do',
    body: 'Through workshops, speaker events, design sprints, and demo days, we create an environment where product thinking meets execution. Our members work on live products, solve real problems, and present to industry professionals.',
  },
  {
    title: 'Our Culture',
    body: 'This isn\'t a typical student org. We operate with intention — every event, every project, every interaction is designed to push our members forward. We value craft, ambition, and the discipline to ship.',
  },
  {
    title: 'Join Us',
    body: 'Whether you\'re a first-year exploring tech or a senior sharpening your edge, there\'s a place for you here. Follow us on Instagram, join our Discord, and subscribe to our newsletter to stay in the loop.',
  },
]

export default function WhoWeAre() {
  return (
    <div className="who-we-are page">
      <ScrollFadeIn>
        <SectionHeadline text="Who We Are" as="h1" glow center />
      </ScrollFadeIn>

      <div className="who-we-are__layout">
        <ScrollFadeIn>
          <RedBubble className="who-we-are__video-bubble">
            <video
              className="who-we-are__video"
              src="/images/pictures_of_us/welcome_vid_portrait.MOV"
              autoPlay
              loop
              playsInline
              controls
              aria-label="Welcome to UMass Product"
            />
          </RedBubble>
        </ScrollFadeIn>

        <div className="who-we-are__sections">
          {sections.map((section, i) => (
            <ScrollFadeIn key={i}>
              <div className="who-we-are__section">
                <h3 className="who-we-are__section-title">{section.title}</h3>
                <p className="who-we-are__section-body">{section.body}</p>
              </div>
            </ScrollFadeIn>
          ))}
        </div>
      </div>

      <ScrollFadeIn>
        <div style={{ marginTop: 'var(--space-xl)' }}><SocialLinks /></div>
      </ScrollFadeIn>
    </div>
  )
}
