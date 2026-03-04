const Footer = () => {
  return (
    <>
      <style>{`
        .footer-wrap { background: #1E2130; color: #9ca3af; }

        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 64px 48px;
        }

        /* ── Top: 4 cols on desktop ── */
        .footer-top {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.8fr;
          gap: 48px;
          margin-bottom: 48px;
        }

        .footer-brand-logo {
          display: flex; align-items: center;
          gap: 8px; margin-bottom: 16px;
        }
        .footer-brand-dot {
          width: 32px; height: 32px;
          background: #4F46E5; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .footer-brand-name { font-size: 20px; font-weight: 700; color: white; }
        .footer-brand-desc { font-size: 14px; line-height: 1.7; margin: 0; max-width: 220px; }

        .footer-col-title { font-size: 15px; font-weight: 700; color: white; margin: 0 0 20px; }
        .footer-nav-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
        .footer-nav-link { font-size: 14px; color: #9ca3af; text-decoration: none; transition: color 0.15s; }
        .footer-nav-link:hover { color: white; }

        .footer-newsletter-desc { font-size: 14px; margin: 0 0 16px; line-height: 1.6; }
        .footer-newsletter-row { display: flex; gap: 8px; }
        .footer-email-input {
          flex: 1; min-width: 0;
          padding: 10px 16px; font-size: 13px;
          background: #2d3148; border: 1px solid #3d4160;
          border-radius: 8px; color: white; outline: none;
          font-family: Epilogue, sans-serif;
        }
        .footer-email-input::placeholder { color: #6b7280; }
        .footer-subscribe-btn {
          padding: 10px 20px; background: #4F46E5;
          color: white; border: none; border-radius: 8px;
          font-size: 13px; font-weight: 600; cursor: pointer;
          white-space: nowrap; font-family: Epilogue, sans-serif;
          flex-shrink: 0; transition: background 0.2s;
        }
        .footer-subscribe-btn:hover { background: #4338CA; }

        .footer-divider { height: 1px; background: #2d3148; margin-bottom: 24px; }

        .footer-bottom {
          display: flex; align-items: center;
          justify-content: space-between; gap: 16px;
        }
        .footer-copy { font-size: 13px; color: #6b7280; margin: 0; }
        .footer-socials { display: flex; gap: 12px; }
        .footer-social-icon {
          width: 32px; height: 32px; border-radius: 50%;
          border: 1px solid #3d4160;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; color: #9ca3af; text-decoration: none;
          transition: all 0.2s; flex-shrink: 0;
        }
        .footer-social-icon:hover { border-color: #4F46E5; color: white; }

        /* ── Tablet (769–1024px): 2×2 grid ── */
        @media (max-width: 1024px) {
          .footer-inner { padding: 48px 32px; }
          .footer-top { grid-template-columns: 1fr 1fr; gap: 36px; }
          .footer-brand-desc { max-width: 100%; }
        }

        /* ── Mobile (≤768px): single column stack ── */
        @media (max-width: 768px) {
          .footer-inner { padding: 40px 20px; }
          .footer-top {
            grid-template-columns: 1fr;
            gap: 0;
            margin-bottom: 32px;
          }

          /* Brand full width */
          .footer-brand { margin-bottom: 32px; }
          .footer-brand-desc { max-width: 100%; }

          /* About + Resources: 2 cols side by side */
          .footer-links-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            margin-bottom: 32px;
          }

          /* Newsletter full width */
          .footer-newsletter { margin-bottom: 0; }
          .footer-newsletter-row {
            flex-direction: column;
          }
          .footer-subscribe-btn {
            width: 100%;
            padding: 13px;
            font-size: 14px;
            text-align: center;
          }

          /* Bottom: stack centered */
          .footer-bottom {
            flex-direction: column-reverse;
            align-items: center;
            gap: 16px;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .footer-inner { padding: 36px 16px; }
          .footer-brand-name { font-size: 18px; }
        }
      `}</style>

      <footer className="footer-wrap">
        <div className="footer-inner">

          {/* ── Desktop/Tablet: grid layout ── */}
          <div className="footer-top footer-desktop-grid">

            {/* Brand */}
            <div className="footer-brand">
              <div className="footer-brand-logo">
                <div className="footer-brand-dot">
                  <div style={{ width: '12px', height: '12px', background: 'white', borderRadius: '50%' }} />
                </div>
                <span className="footer-brand-name">QuickHire</span>
              </div>
              <p className="footer-brand-desc">
                Great platform for the job seeker that passionate about startups. Find your dream job easier.
              </p>
            </div>

            {/* About */}
            <div className="footer-about">
              <h4 className="footer-col-title">About</h4>
              <ul className="footer-nav-list">
                {['Companies', 'Pricing', 'Terms', 'Advice', 'Privacy Policy'].map(item => (
                  <li key={item}><a href="#" className="footer-nav-link">{item}</a></li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="footer-resources">
              <h4 className="footer-col-title">Resources</h4>
              <ul className="footer-nav-list">
                {['Help Docs', 'Guide', 'Updates', 'Contact Us'].map(item => (
                  <li key={item}><a href="#" className="footer-nav-link">{item}</a></li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="footer-newsletter">
              <h4 className="footer-col-title">Get job notifications</h4>
              <p className="footer-newsletter-desc">
                The latest job news, articles, sent to your inbox weekly.
              </p>
              <div className="footer-newsletter-row">
                <input type="email" placeholder="Email Address" className="footer-email-input" />
                <button className="footer-subscribe-btn">Subscribe</button>
              </div>
            </div>

          </div>

          {/* ── Mobile only: About + Resources side by side ── */}
          <style>{`
            @media (max-width: 768px) {
              .footer-desktop-grid { display: block !important; }
              .footer-about, .footer-resources { display: none; }
              .footer-mobile-links { display: grid !important; }
            }
            @media (min-width: 769px) {
              .footer-mobile-links { display: none !important; }
            }
          `}</style>

          <div className="footer-links-row footer-mobile-links" style={{ display: 'none' }}>
            <div>
              <h4 className="footer-col-title">About</h4>
              <ul className="footer-nav-list">
                {['Companies', 'Pricing', 'Terms', 'Advice', 'Privacy Policy'].map(item => (
                  <li key={item}><a href="#" className="footer-nav-link">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="footer-col-title">Resources</h4>
              <ul className="footer-nav-list">
                {['Help Docs', 'Guide', 'Updates', 'Contact Us'].map(item => (
                  <li key={item}><a href="#" className="footer-nav-link">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="footer-divider" />

          {/* ── Bottom ── */}
          <div className="footer-bottom">
            <p className="footer-copy">2021 @ QuickHire. All rights reserved.</p>
            <div className="footer-socials">
              {[
                { label: 'f',  title: 'Facebook'  },
                { label: 'ig', title: 'Instagram' },
                { label: '⊕',  title: 'Dribbble'  },
                { label: 'in', title: 'LinkedIn'  },
                { label: 't',  title: 'Twitter'   },
              ].map(s => (
                <a key={s.title} href="#" title={s.title} className="footer-social-icon">
                  {s.label}
                </a>
              ))}
            </div>
          </div>

        </div>
      </footer>
    </>
  )
}

export default Footer