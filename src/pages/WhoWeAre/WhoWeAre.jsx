import SectionHeadline from '../../components/SectionHeadline/SectionHeadline'
import RedBubble from '../../components/RedBubble/RedBubble'
import ScrollFadeIn from '../../components/ScrollFadeIn/ScrollFadeIn'
import './WhoWeAre.css'

export default function WhoWeAre() {
  return (
    <div className="who-we-are page">
      <ScrollFadeIn>
        <SectionHeadline text="Who We Are" as="h1" glow center />
      </ScrollFadeIn>

      <div className="who-we-are__layout">
        <div className="who-we-are__content">
          <ScrollFadeIn>
            <p className="who-we-are__meetings">
              <span className="who-we-are__meetings-label">Meetings:</span>{' '}
              <span className="who-we-are__meetings-time">Wednesday's at 7pm in CICS Makerspace</span>{' '}
              <span className="who-we-are__meetings-location">- A104 LGRC</span>
            </p>
          </ScrollFadeIn>

          <ScrollFadeIn>
            <p className="who-we-are__intro">
              Hi there 👋 we are a student organization in the Manning College of Information and Computer Sciences exploring early careers in product management.
            </p>
          </ScrollFadeIn>

          <ScrollFadeIn>
            <blockquote className="who-we-are__quote">
              "Think like a Tech CEO. Think like a MAANG engineer."
            </blockquote>
          </ScrollFadeIn>

          <ScrollFadeIn>
            <p className="who-we-are__tagline">
              Aspiring to these goals? UMass Product is where you belong.
            </p>
          </ScrollFadeIn>

          <ScrollFadeIn>
            <p className="who-we-are__activities">
              We meet weekly on Tuesday evenings to discuss{' '}
              <span className="who-we-are__highlight who-we-are__highlight--red">trends in technology</span>,{' '}
              <span className="who-we-are__highlight who-we-are__highlight--pink">conduct product thinking seminars</span>,{' '}
              <span className="who-we-are__highlight who-we-are__highlight--gray">work on case studies</span>, and occasionally{' '}
              <span className="who-we-are__highlight who-we-are__highlight--maroon">prep together for tech recruitment</span>.
            </p>
          </ScrollFadeIn>

          <ScrollFadeIn>
            <p className="who-we-are__welcome">
              All UMass Amherst undergrad/graduate students and faculty interested in learning more about product management concepts are welcome!
            </p>
          </ScrollFadeIn>
        </div>

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
      </div>
    </div>
  )
}
