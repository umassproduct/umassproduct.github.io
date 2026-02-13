import SectionHeadline from '../../components/SectionHeadline/SectionHeadline'
import GlassCard from '../../components/GlassCard/GlassCard'
import ScrollFadeIn from '../../components/ScrollFadeIn/ScrollFadeIn'
import studentSections from '../../data/forStudents'
import './ForStudents.css'

export default function ForStudents() {
  return (
    <div className="for-students page">
      <ScrollFadeIn>
        <SectionHeadline text="For Students" as="h1" glow center />
      </ScrollFadeIn>

      <ScrollFadeIn>
        <p className="for-students__intro">
          UMass Product is where ambitious students learn to think, build, and ship like product professionals.
          Whether you're interested in PM, design, or engineering — this is your launchpad.
        </p>
      </ScrollFadeIn>

      <div className="for-students__grid">
        {studentSections.map((section, i) => (
          <ScrollFadeIn key={i}>
            <GlassCard>
              <h3 className="for-students__card-title">{section.title}</h3>
              <p className="for-students__card-body">{section.body}</p>
            </GlassCard>
          </ScrollFadeIn>
        ))}
      </div>
    </div>
  )
}
