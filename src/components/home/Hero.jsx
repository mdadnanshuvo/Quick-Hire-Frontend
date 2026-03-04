import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import hero_image from '../../assets/hero-man.png'

const Hero = () => {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (keyword.trim())  params.set('search', keyword.trim())
    if (location.trim()) params.set('location', location.trim())
    navigate(`/jobs?${params.toString()}`)
  }

  const handlePopular = (tag) => {
    const params = new URLSearchParams()
    const types = ['Full-time', 'Part-time', 'Remote', 'Contract', 'Internship']
    if (types.includes(tag)) params.set('type', tag)
    else params.set('search', tag)
    navigate(`/jobs?${params.toString()}`)
  }

  return (
    <>
      <style>{`
        /* ── Base (Desktop) ── */
        .hero-wrap {
          background: #F8F8FD;
          padding: 80px 0 0;
          position: relative;
          overflow: hidden;
        }
        .hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
          display: flex;
          align-items: center;
          gap: 40px;
        }
        .hero-left { flex: 0 0 520px; z-index: 2; }
        .hero-h1-dark {
          font-size: 60px; font-weight: 800;
          color: #1E2130; line-height: 1.1; margin: 0;
        }
        .hero-h1-blue {
          font-size: 60px; font-weight: 800;
          color: #3B82F6; line-height: 1.1; margin: 6px 0 0;
        }
        .hero-desc {
          color: #6b7280; font-size: 16px;
          line-height: 1.7; margin-top: 30px; max-width: 420px;
        }

        /* Desktop search — single row */
        .hero-form-desktop {
          display: flex;
          align-items: center;
          background: white;
          border-radius: 10px;
          padding: 8px 8px 8px 18px;
          margin-top: 35px;
          max-width: 540px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }
        .hero-form-mobile { display: none; }

        .hero-input {
          border: none; outline: none;
          font-size: 14px; flex: 1; min-width: 0;
          font-family: Epilogue, sans-serif;
          color: #1E2130; background: transparent;
        }
        .hero-sep {
          width: 1px; height: 28px;
          background: #e5e7eb; margin: 0 16px; flex-shrink: 0;
        }
        .hero-btn {
          margin-left: 16px;
          padding: 14px 28px;
          background: #4F46E5; color: white;
          border: none; border-radius: 8px;
          font-size: 14px; font-weight: 600;
          cursor: pointer; white-space: nowrap;
          font-family: Epilogue, sans-serif;
          transition: background 0.2s;
          flex-shrink: 0;
        }
        .hero-btn:hover { background: #4338CA; }

        .hero-popular {
          margin-top: 20px;
          display: flex; align-items: center;
          gap: 10px; flex-wrap: wrap;
        }
        .hero-tag {
          font-size: 12px; font-weight: 500;
          color: #4F46E5; background: #EEF2FF;
          border: 1px solid #E0E7FF; border-radius: 20px;
          padding: 4px 14px; cursor: pointer;
          font-family: Epilogue, sans-serif;
          transition: all 0.2s;
        }
        .hero-tag:hover { background: #4F46E5; color: white; border-color: #4F46E5; }

        .hero-right {
          flex: 1; position: relative;
          height: 520px; display: flex;
          align-items: flex-end; justify-content: center;
        }
        .hero-bottom-curve {
          position: absolute; bottom: 0; right: 0;
          width: 50%; height: 160px;
          background: white; border-top-left-radius: 120px;
        }

        /* ── Tablet (769px – 1024px) ── */
        @media (max-width: 1024px) {
          .hero-inner { padding: 0 32px; gap: 24px; }
          .hero-left { flex: 0 0 380px; }
          .hero-h1-dark, .hero-h1-blue { font-size: 46px; }
          .hero-right { height: 400px; }
          .hero-right img { height: 400px !important; }
          .hero-desc { font-size: 15px; }
          .hero-btn { padding: 12px 18px; font-size: 13px; }
        }

        /* ── Mobile (≤ 768px) ── */
        @media (max-width: 768px) {
          .hero-wrap { padding: 40px 0 40px; }
          .hero-inner {
            flex-direction: column;
            padding: 0 20px;
            gap: 0;
            align-items: flex-start;
          }
          .hero-left { flex: none; width: 100%; }
          .hero-h1-dark, .hero-h1-blue { font-size: 38px; }
          .hero-desc { font-size: 14px; margin-top: 16px; max-width: 100%; }

          /* Hide desktop form, show mobile form */
          .hero-form-desktop { display: none; }
          .hero-form-mobile {
            display: flex;
            flex-direction: column;
            background: white;
            border-radius: 12px;
            padding: 16px;
            margin-top: 24px;
            gap: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.06);
            width: 100%;
            box-sizing: border-box;
          }
          .hero-form-mobile-row {
            display: flex;
            align-items: center;
            gap: 10px;
            background: #f8f8f8;
            border-radius: 8px;
            padding: 12px 14px;
          }
          .hero-form-mobile-row .hero-input {
            font-size: 14px;
            background: transparent;
          }
          .hero-btn-mobile {
            background: #4F46E5; color: white;
            border: none; border-radius: 8px;
            font-size: 15px; font-weight: 600;
            cursor: pointer; padding: 14px;
            font-family: Epilogue, sans-serif;
            width: 100%;
            transition: background 0.2s;
          }
          .hero-btn-mobile:hover { background: #4338CA; }

          .hero-popular { margin-top: 16px; }
          .hero-right { display: none; }
          .hero-bottom-curve { display: none; }
        }

        /* ── Small mobile (≤ 480px) ── */
        @media (max-width: 480px) {
          .hero-h1-dark, .hero-h1-blue { font-size: 32px; }
          .hero-inner { padding: 0 16px; }
        }
      `}</style>

      <section className="hero-wrap">
        <div className="hero-inner">

          {/* ── Left ── */}
          <div className="hero-left">
            <h1 className="hero-h1-dark">Discover<br />more than</h1>
            <h1 className="hero-h1-blue">5000+ Jobs</h1>

            <svg width="260" height="20" viewBox="0 0 260 20" fill="none" style={{ marginTop: '4px' }}>
              <path d="M2 12 C40 6, 80 16, 120 9 C160 3, 200 15, 250 8" stroke="#3B82F6" strokeWidth="5" strokeLinecap="round" />
            </svg>

            <p className="hero-desc">
              Great platform for the job seeker that searching for
              new career heights and passionate about startups.
            </p>

            {/* ── Desktop Search Form (single row) ── */}
            <form className="hero-form-desktop" onSubmit={handleSearch}>
              <span style={{ fontSize: '16px', marginRight: '8px', color: '#9ca3af', flexShrink: 0 }}>🔍</span>
              <input
                type="text"
                placeholder="Job title or keyword"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                className="hero-input"
              />
              <div className="hero-sep" />
              <span style={{ fontSize: '16px', marginRight: '8px', color: '#9ca3af', flexShrink: 0 }}>📍</span>
              <input
                type="text"
                placeholder="City or remote"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="hero-input"
              />
              <button type="submit" className="hero-btn">Search my job</button>
            </form>

            {/* ── Mobile Search Form (stacked) ── */}
            <form className="hero-form-mobile" onSubmit={handleSearch}>
              <div className="hero-form-mobile-row">
                <span style={{ fontSize: '16px', color: '#9ca3af', flexShrink: 0 }}>🔍</span>
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  value={keyword}
                  onChange={e => setKeyword(e.target.value)}
                  className="hero-input"
                />
              </div>
              <div className="hero-form-mobile-row">
                <span style={{ fontSize: '16px', color: '#9ca3af', flexShrink: 0 }}>📍</span>
                <input
                  type="text"
                  placeholder="Florence, Italy"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  className="hero-input"
                />
              </div>
              <button type="submit" className="hero-btn-mobile">Search my job</button>
            </form>

            {/* ── Popular Tags ── */}
            <div className="hero-popular">
              <span style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500' }}>Popular:</span>
              {['UX Designer', 'UX Researcher', 'Android', 'Admin'].map(tag => (
                <button key={tag} className="hero-tag" onClick={() => handlePopular(tag)}>
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* ── Right (desktop/tablet only) ── */}
          <div className="hero-right">
            <svg viewBox="0 0 600 500" style={{ position: 'absolute', right: '-80px', top: 0, width: '600px', height: '100%', zIndex: 0 }} fill="none">
              <rect x="150" y="60"  width="300" height="200" stroke="#C7D2FE" strokeWidth="2" transform="rotate(-8 300 160)" />
              <rect x="200" y="110" width="300" height="200" stroke="#C7D2FE" strokeWidth="2" transform="rotate(-8 350 210)" />
              <rect x="250" y="160" width="300" height="200" stroke="#C7D2FE" strokeWidth="2" transform="rotate(-8 400 260)" />
            </svg>
            <img
              src={hero_image} alt="Hero"
              style={{ position: 'relative', zIndex: 1, height: '520px', objectFit: 'contain' }}
            />
          </div>
        </div>

        <div className="hero-bottom-curve" />
      </section>
    </>
  )
}

export default Hero