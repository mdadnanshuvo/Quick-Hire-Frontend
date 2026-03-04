import { useState } from 'react'
import hero_image from '../../assets/hero-man.png'

const Hero = () => {
  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    alert(`Searching for: ${keyword} in ${location}`)
  }

  return (
    <section
      style={{
        background: '#F8F8FD',
        padding: '80px 0 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 48px',
          display: 'flex',
          alignItems: 'center',
          gap: '40px',
        }}
      >
        {/* ── Left Content ── */}
        <div style={{ flex: '0 0 520px', zIndex: 2 }}>
          <h1
            style={{
              fontSize: '60px',
              fontWeight: '800',
              color: '#1E2130',
              lineHeight: '1.1',
              margin: 0,
            }}
          >
            Discover
            <br />
            more than
          </h1>

          <h1
            style={{
              fontSize: '60px',
              fontWeight: '800',
              color: '#3B82F6',
              lineHeight: '1.1',
              margin: '6px 0 0',
            }}
          >
            5000+ Jobs
          </h1>

          {/* Wavy underline */}
          <svg
            width="260"
            height="20"
            viewBox="0 0 260 20"
            fill="none"
            style={{ marginTop: '4px' }}
          >
            <path
              d="M2 12 C40 6, 80 16, 120 9 C160 3, 200 15, 250 8"
              stroke="#3B82F6"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>

          <p
            style={{
              color: '#6b7280',
              fontSize: '16px',
              lineHeight: '1.7',
              marginTop: '30px',
              maxWidth: '420px',
            }}
          >
            Great platform for the job seeker that searching for
            new career heights and passionate about startups.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'white',
              borderRadius: '10px',
              padding: '8px 8px 8px 18px',
              marginTop: '35px',
              maxWidth: '540px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            }}
          >
            <input
              type="text"
              placeholder="Job title or keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                fontSize: '14px',
                flex: 1,
              }}
            />

            <div
              style={{
                width: '1px',
                height: '28px',
                background: '#e5e7eb',
                margin: '0 16px',
              }}
            />

            <input
              type="text"
              placeholder="Florence, Italy"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                fontSize: '14px',
                flex: 1,
              }}
            />

            <button
              type="submit"
              style={{
                marginLeft: '16px',
                padding: '14px 28px',
                background: '#4F46E5',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Search my job
            </button>
          </form>
        </div>

        {/* ── Right Side ── */}
        <div
          style={{
            flex: 1,
            position: 'relative',
            height: '520px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          {/* Geometric Lines */}
          <svg
            viewBox="0 0 600 500"
            style={{
              position: 'absolute',
              right: '-80px',
              top: '0',
              width: '600px',
              height: '100%',
              zIndex: 0,
            }}
            fill="none"
          >
            <rect
              x="150"
              y="60"
              width="300"
              height="200"
              stroke="#C7D2FE"
              strokeWidth="2"
              transform="rotate(-8 300 160)"
            />
            <rect
              x="200"
              y="110"
              width="300"
              height="200"
              stroke="#C7D2FE"
              strokeWidth="2"
              transform="rotate(-8 350 210)"
            />
            <rect
              x="250"
              y="160"
              width="300"
              height="200"
              stroke="#C7D2FE"
              strokeWidth="2"
              transform="rotate(-8 400 260)"
            />
          </svg>

          {/* Hero Image */}
          <img
            src={hero_image}  /* Replace with your image */
            alt="Hero"
            style={{
              position: 'relative',
              zIndex: 1,
              height: '520px',
              objectFit: 'contain',
            }}
          />
        </div>
      </div>

      {/* Bottom curved white shape */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '50%',
          height: '160px',
          background: 'white',
          borderTopLeftRadius: '120px',
        }}
      />
    </section>
  )
}

export default Hero