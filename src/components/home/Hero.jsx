import { useState } from 'react'

const Hero = () => {
  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    alert(`Searching for: ${keyword} in ${location}`)
  }

  return (
    <section style={{ background: 'white', padding: '60px 0 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px', display: 'flex', alignItems: 'center', gap: '40px' }}>

        {/* ── Left Content ── */}
        <div style={{ flex: '0 0 480px' }}>

          {/* Heading */}
          <h1 style={{ fontSize: '56px', fontWeight: '800', color: '#1E2130', lineHeight: '1.15', margin: 0 }}>
            Discover
            <br />more than
          </h1>
          <h1 style={{ fontSize: '56px', fontWeight: '800', color: '#3B82F6', lineHeight: '1.15', margin: '4px 0 0' }}>
            5000+ Jobs
          </h1>

          {/* Hand-drawn wavy underline using SVG */}
          <svg width="240" height="16" viewBox="0 0 240 16" fill="none" style={{ marginTop: '2px', display: 'block' }}>
            <path
              d="M2 10 C30 4, 60 14, 90 8 C120 2, 150 13, 180 7 C200 3, 220 11, 238 6"
              stroke="#3B82F6"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          {/* Subtitle */}
          <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: '1.7', marginTop: '28px', maxWidth: '380px' }}>
            Great platform for the job seeker that searching for
            <br />new career heights and passionate about startups.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'white',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              padding: '6px 6px 6px 16px',
              marginTop: '32px',
              maxWidth: '500px',
              gap: '0',
            }}
          >
            {/* Keyword input */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Job title or keyword"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                style={{ border: 'none', outline: 'none', fontSize: '14px', color: '#1E2130', background: 'transparent', width: '100%', padding: '8px 0' }}
              />
            </div>

            {/* Divider */}
            <div style={{ width: '1px', height: '28px', background: '#e5e7eb', margin: '0 12px' }} />

            {/* Location input */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <input
                type="text"
                placeholder="Florence, Italy"
                value={location}
                onChange={e => setLocation(e.target.value)}
                style={{ border: 'none', outline: 'none', fontSize: '14px', color: '#1E2130', background: 'transparent', width: '100%', padding: '8px 0' }}
              />
              {/* Dropdown arrow */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </div>

            {/* Search button */}
            <button
              type="submit"
              style={{ marginLeft: '8px', padding: '12px 24px', background: '#4F46E5', color: 'white', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              Search my job
            </button>
          </form>

          {/* Popular */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '14px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13px', color: '#6b7280' }}>Popular :</span>
            {['UI Designer', 'UX Researcher', 'Android', 'Admin'].map((tag, i, arr) => (
              <span
                key={tag}
                style={{ fontSize: '13px', color: '#1E2130', fontWeight: '500', cursor: 'pointer', textDecoration: 'underline', textDecorationColor: '#e5e7eb' }}
              >
                {tag}{i < arr.length - 1 ? ',' : ''}
              </span>
            ))}
          </div>
        </div>

        {/* ── Right — Geometric decoration + person ── */}
        <div style={{ flex: 1, position: 'relative', height: '420px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          {/* Decorative geometric rectangles */}
          <svg
            viewBox="0 0 400 380"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
            fill="none"
          >
            <rect x="160" y="20"  width="180" height="130" rx="6" stroke="#C7D2FE" strokeWidth="1.5" transform="rotate(-8 250 85)" />
            <rect x="190" y="55"  width="180" height="130" rx="6" stroke="#C7D2FE" strokeWidth="1.5" transform="rotate(-8 280 120)" />
            <rect x="220" y="90"  width="180" height="130" rx="6" stroke="#C7D2FE" strokeWidth="1.5" transform="rotate(-8 310 155)" />
          </svg>

          {/* Person placeholder — in real project replace with actual image */}
          <div style={{
            position: 'relative', zIndex: 1,
            width: '300px', height: '380px',
            background: 'linear-gradient(180deg, #EEF2FF 0%, #DBEAFE 100%)',
            borderRadius: '16px 16px 0 0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '100px', lineHeight: 1 }}>🧑‍💼</div>
              <p style={{ color: '#4F46E5', fontWeight: '600', fontSize: '14px', marginTop: '12px' }}>
                Replace with hero image
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* ── Companies Row ── */}
      <div style={{ maxWidth: '1200px', margin: '48px auto 0', padding: '0 48px 48px' }}>
        <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '20px' }}>Companies we helped grow</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '56px', flexWrap: 'wrap' }}>
          {[
            { name: 'vodafone', display: '⊙ vodafone' },
            { name: 'intel',    display: 'intel.' },
            { name: 'TESLA',    display: 'TESLᴬ' },
            { name: 'AMD',      display: 'AMD▶' },
            { name: 'Talkit',   display: 'Talkit' },
          ].map(c => (
            <span key={c.name} style={{ fontSize: '17px', fontWeight: '700', color: '#9ca3af', letterSpacing: '0.5px' }}>
              {c.display}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero