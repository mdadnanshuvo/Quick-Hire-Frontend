import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => setMenuOpen(prev => !prev)
  const closeMenu  = () => setMenuOpen(false)

  const isActive = (path) => location.pathname === path

  return (
    <>
      <style>{`
        .navbar {
          background: white;
          border-bottom: 1px solid #f0f0f0;
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .navbar-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .navbar-logo-dot {
          width: 32px; height: 32px;
          background: #4F46E5; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }
        .navbar-logo-name {
          font-size: 20px;
          font-weight: 700;
          color: #1E2130;
        }

        /* Desktop nav links */
        .navbar-links {
          display: flex;
          gap: 32px;
        }
        .navbar-link {
          color: #6b7280;
          font-weight: 500;
          text-decoration: none;
          font-size: 15px;
          transition: color 0.15s;
          position: relative;
          padding-bottom: 2px;
        }
        .navbar-link:hover { color: #1E2130; }
        .navbar-link.active { color: #4F46E5; font-weight: 600; }
        .navbar-link.active::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0;
          width: 100%; height: 2px;
          background: #4F46E5;
          border-radius: 2px;
        }

        /* Desktop action buttons */
        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .navbar-login {
          padding: 8px 20px;
          background: transparent;
          border: none;
          color: #4F46E5;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          text-decoration: none;
          font-family: Epilogue, sans-serif;
        }
        .navbar-login:hover { text-decoration: underline; }
        .navbar-signup {
          padding: 8px 20px;
          background: #4F46E5;
          color: white;
          font-weight: 600;
          font-size: 14px;
          border-radius: 8px;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s;
        }
        .navbar-signup:hover { background: #4338CA; }

        /* Hamburger button — hidden on desktop */
        .navbar-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          z-index: 60;
        }
        .navbar-hamburger span {
          display: block;
          width: 24px; height: 2px;
          background: #1E2130;
          border-radius: 2px;
          transition: all 0.3s;
          transform-origin: center;
        }
        /* Animate to X when open */
        .navbar-hamburger.open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .navbar-hamburger.open span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .navbar-hamburger.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* Mobile dropdown menu */
        .navbar-mobile-menu {
          display: none;
          flex-direction: column;
          background: white;
          border-top: 1px solid #f0f0f0;
          padding: 16px 20px 24px;
          gap: 4px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }
        .navbar-mobile-menu.open { display: flex; }

        .navbar-mobile-link {
          color: #6b7280;
          font-weight: 500;
          text-decoration: none;
          font-size: 15px;
          padding: 12px 0;
          border-bottom: 1px solid #f9f9f9;
          transition: color 0.15s;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .navbar-mobile-link:hover { color: #1E2130; }
        .navbar-mobile-link.active { color: #4F46E5; font-weight: 600; }
        .navbar-mobile-link:last-of-type { border-bottom: none; }

        .navbar-mobile-actions {
          display: flex;
          gap: 10px;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid #f0f0f0;
        }
        .navbar-mobile-login {
          flex: 1;
          padding: 11px;
          text-align: center;
          color: #4F46E5;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          border: 1px solid #4F46E5;
          border-radius: 8px;
          transition: all 0.2s;
          font-family: Epilogue, sans-serif;
        }
        .navbar-mobile-login:hover { background: #EEF2FF; }
        .navbar-mobile-signup {
          flex: 1;
          padding: 11px;
          text-align: center;
          background: #4F46E5;
          color: white;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          border-radius: 8px;
          transition: background 0.2s;
          font-family: Epilogue, sans-serif;
        }
        .navbar-mobile-signup:hover { background: #4338CA; }

        /* ── Tablet (769–1024px) ── */
        @media (max-width: 1024px) {
          .navbar-inner { padding: 0 32px; }
          .navbar-links { gap: 20px; }
        }

        /* ── Mobile (≤768px) ── */
        @media (max-width: 768px) {
          .navbar-inner { padding: 0 20px; }
          .navbar-links  { display: none; }
          .navbar-actions { display: none; }
          .navbar-hamburger { display: flex; }
        }

        @media (max-width: 480px) {
          .navbar-inner { padding: 0 16px; }
          .navbar-logo-name { font-size: 18px; }
        }
      `}</style>

      <nav className="navbar">
        <div className="navbar-inner">

          {/* Logo */}
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <div className="navbar-logo-dot">
              <div style={{ width: '12px', height: '12px', background: 'white', borderRadius: '50%' }} />
            </div>
            <span className="navbar-logo-name">QuickHire</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="navbar-links">
            <Link to="/jobs" className={`navbar-link ${isActive('/jobs') ? 'active' : ''}`}>
              Find Jobs
            </Link>
            <Link to="/jobs" className="navbar-link">
              Browse Companies
            </Link>
          </div>

          {/* Desktop Action Buttons */}
          <div className="navbar-actions">
            <Link to="/admin/login" className="navbar-login">Login</Link>
            <Link to="/admin/login" className="navbar-signup">Sign Up</Link>
          </div>

          {/* Hamburger (mobile only) */}
          <button
            className={`navbar-hamburger ${menuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>

        </div>

        {/* Mobile Dropdown Menu */}
        <div className={`navbar-mobile-menu ${menuOpen ? 'open' : ''}`}>
          <Link
            to="/jobs"
            className={`navbar-mobile-link ${isActive('/jobs') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Find Jobs <span>→</span>
          </Link>
          <Link
            to="/jobs"
            className="navbar-mobile-link"
            onClick={closeMenu}
          >
            Browse Companies <span>→</span>
          </Link>
          <Link
            to="/admin"
            className={`navbar-mobile-link ${isActive('/admin') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Admin Dashboard <span>→</span>
          </Link>

          {/* Mobile Login / Sign Up */}
          <div className="navbar-mobile-actions">
            <Link to="/admin/login" className="navbar-mobile-login" onClick={closeMenu}>
              Login
            </Link>
            <Link to="/admin/login" className="navbar-mobile-signup" onClick={closeMenu}>
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar