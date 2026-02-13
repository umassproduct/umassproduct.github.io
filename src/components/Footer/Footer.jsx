import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__copy">
          &copy; {new Date().getFullYear()} UMass Product. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
