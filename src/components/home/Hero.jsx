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
    <section style={{ background: '#F8F8FD', padding: '80px 0 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px', display: 'flex', alignItems: 'center', gap: '40px' }}>

        {/* ── Left Content ── */}
        <div style={{ flex: '0 0 520px', zIndex: 2 }}>
          <h1 style={{ fontSize: '60px', fontWeight: '800', color: '#1E2130', lineHeight: '1.1', margin: 0 }}>
            Discover<br />more than
          </h1>
          <h1 style={{ fontSize: '60px', fontWeight: '800', color: '#3B82F6', lineHeight: '1.1', margin: '6px 0 0' }}>
            5000+ Jobs
          </h1>

          <svg width="260" height="20" viewBox="0 0 260 20" fill="none" style={{ marginTop: '4px' }}>
            <path d="M2 12 C40 6, 80 16, 120 9 C160 3, 200 15, 250 8" stroke="#3B82F6" strokeWidth="5" strokeLinecap="round" />
          </svg>

          <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: '1.7', marginTop: '30px', maxWidth: '420px' }}>
            Great platform for the job seeker that searching for new career heights and passionate about startups.
          </p>

          {/* ── Search Bar ── */}
          <form
            onSubmit={handleSearch}
            style={{
              display: 'flex', alignItems: 'center',
              background: 'white', borderRadius: '10px',
              padding: '8px 8px 8px 18px', marginTop: '35px',
              maxWidth: '540px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            }}
          >
            <span style={{ fontSize: '16px', marginRight: '8px', color: '#9ca3af' }}>🔍</span>
            <input
              type="text"
              placeholder="Job title or keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={{ border: 'none', outline: 'none', fontSize: '14px', flex: 1, fontFamily: 'Epilogue, sans-serif', color: '#1E2130', background: 'transparent' }}
            />

            <div style={{ width: '1px', height: '28px', background: '#e5e7eb', margin: '0 16px' }} />

            <span style={{ fontSize: '16px', marginRight: '8px', color: '#9ca3af' }}>📍</span>
            <input
              type="text"
              placeholder="City or remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{ border: 'none', outline: 'none', fontSize: '14px', flex: 1, fontFamily: 'Epilogue, sans-serif', color: '#1E2130', background: 'transparent' }}
            />

            <button
              type="submit"
              style={{
                marginLeft: '16px', padding: '14px 28px',
                background: '#4F46E5', color: 'white', border: 'none',
                borderRadius: '8px', fontSize: '14px', fontWeight: '600',
                cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'Epilogue, sans-serif',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#4338CA'}
              onMouseLeave={e => e.currentTarget.style.background = '#4F46E5'}
            >
              Search my job
            </button>
          </form>

          {/* ── Popular Tags ── */}
          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500' }}>Popular:</span>
            {['Remote', 'Full-time', 'Engineering', 'Design', 'Marketing'].map(tag => (
              <button
                key={tag}
                onClick={() => handlePopular(tag)}
                style={{
                  fontSize: '12px', fontWeight: '500', color: '#4F46E5',
                  background: '#EEF2FF', border: '1px solid #E0E7FF',
                  borderRadius: '20px', padding: '4px 14px',
                  cursor: 'pointer', fontFamily: 'Epilogue, sans-serif',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#4F46E5'; e.currentTarget.style.color = 'white' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#EEF2FF'; e.currentTarget.style.color = '#4F46E5' }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* ── Right Side ── */}
        <div style={{ flex: 1, position: 'relative', height: '520px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <svg viewBox="0 0 600 500" style={{ position: 'absolute', right: '-80px', top: '0', width: '600px', height: '100%', zIndex: 0 }} fill="none">
            <rect x="150" y="60"  width="300" height="200" stroke="#C7D2FE" strokeWidth="2" transform="rotate(-8 300 160)" />
            <rect x="200" y="110" width="300" height="200" stroke="#C7D2FE" strokeWidth="2" transform="rotate(-8 350 210)" />
            <rect x="250" y="160" width="300" height="200" stroke="#C7D2FE" strokeWidth="2" transform="rotate(-8 400 260)" />
          </svg>
          <img src={hero_image} alt="Hero" style={{ position: 'relative', zIndex: 1, height: '520px', objectFit: 'contain' }} />
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '50%', height: '160px', background: 'white', borderTopLeftRadius: '120px' }} />
    </section>
  )
}

export default Hero