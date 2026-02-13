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
        <p className="footer__copy">
          &copy; {new Date().getFullYear()} UMass Product. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
