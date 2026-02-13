import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 80)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const linkClass = ({ isActive }) =>
    `navbar__link${isActive ? ' navbar__link--active' : ''}`

  return (
    <header>
      <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} aria-label="Main navigation">
        <Link to="/" onClick={closeMenu}>
          <img
            src="/images/logo.png"
            alt="UMass Product home"
            className="navbar__logo"
          />
        </Link>

        <ul className="navbar__links">
          <li><NavLink to="/about" className={linkClass}>Who We Are</NavLink></li>
          <li><NavLink to="/showcase" className={linkClass}>Product Showcase</NavLink></li>
          <li><NavLink to="/students" className={linkClass}>Students</NavLink></li>
          <li><NavLink to="/founders" className={linkClass}>Founders</NavLink></li>
        </ul>

        <button
          className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="navbar__hamburger-line" />
          <span className="navbar__hamburger-line" />
          <span className="navbar__hamburger-line" />
        </button>

        <div
          id="mobile-menu"
          className={`navbar__overlay${menuOpen ? ' navbar__overlay--open' : ''}`}
          role="dialog"
          aria-label="Mobile navigation"
        >
          <NavLink to="/about" className="navbar__overlay-link" onClick={closeMenu}>
            Who We Are
          </NavLink>
          <NavLink to="/showcase" className="navbar__overlay-link" onClick={closeMenu}>
            Product Showcase
          </NavLink>
          <NavLink to="/students" className="navbar__overlay-link" onClick={closeMenu}>
            Students
          </NavLink>
          <NavLink to="/founders" className="navbar__overlay-link" onClick={closeMenu}>
            Founders
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
