const Footer = () => {
  return (
    <footer style={{ background: '#1E2130', color: '#9ca3af' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 48px' }}>

        {/* Top row — 4 columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.8fr', gap: '48px', marginBottom: '48px' }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: '32px', height: '32px', background: '#4F46E5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '12px', height: '12px', background: 'white', borderRadius: '50%' }} />
              </div>
              <span style={{ fontSize: '20px', fontWeight: '700', color: 'white' }}>QuickHire</span>
            </div>
            <p style={{ fontSize: '14px', lineHeight: '1.7', margin: 0, maxWidth: '220px' }}>
              Great platform for the job seeker that passionate about startups. Find your dream job easier.
            </p>
          </div>

          {/* About */}
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'white', margin: '0 0 20px' }}>About</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Companies', 'Pricing', 'Terms', 'Advice', 'Privacy Policy'].map(item => (
                <li key={item}>
                  <a
                    href="#"
                    style={{ fontSize: '14px', color: '#9ca3af', textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'white'}
                    onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'white', margin: '0 0 20px' }}>Resources</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Help Docs', 'Guide', 'Updates', 'Contact Us'].map(item => (
                <li key={item}>
                  <a
                    href="#"
                    style={{ fontSize: '14px', color: '#9ca3af', textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'white'}
                    onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'white', margin: '0 0 8px' }}>
              Get job notifications
            </h4>
            <p style={{ fontSize: '14px', margin: '0 0 16px', lineHeight: '1.6' }}>
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                placeholder="Email Address"
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  fontSize: '13px',
                  background: '#2d3148',
                  border: '1px solid #3d4160',
                  borderRadius: '8px',
                  color: 'white',
                  outline: 'none',
                }}
              />
              <button
                style={{
                  padding: '10px 20px',
                  background: '#4F46E5',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: '#2d3148', marginBottom: '24px' }} />

        {/* Bottom row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
            2021 @ QuickHire. All rights reserved.
          </p>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {['f', 'in', '⊕', 'li', 't'].map((icon, i) => (
              <a
                key={i}
                href="#"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '1px solid #3d4160',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  color: '#9ca3af',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#4F46E5'
                  e.currentTarget.style.color = 'white'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#3d4160'
                  e.currentTarget.style.color = '#9ca3af'
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer