import { useLocation } from 'react-router-dom'
import SocialLinks from '../SocialLinks/SocialLinks'
import './Footer.css'

export default function Footer() {
  const location = useLocation()
  const showSocials = location.pathname !== '/'

  return (
    <footer className="footer">
      <div className="footer__inner">
        {showSocials && (
          <div style={{ marginBottom: 'var(--space-lg)' }}>
            <SocialLinks />
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
          <p className="footer__copy">Established 2019. 8 years of excellence.</p>
          <p className="footer__copy">Manning College of Information and Computer Sciences at the University of Massachusetts Amherst.</p>
        </div>
      </div>
    </footer>
  )
}
