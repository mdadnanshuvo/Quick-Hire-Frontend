const CTABanner = () => {
  return (
    <section style={{ background: 'white', padding: '60px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px' }}>

        <div style={{
          background: '#4F46E5',
          borderRadius: '20px',
          padding: '56px 64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '40px',
          position: 'relative',
          overflow: 'hidden',
        }}>

          {/* Background decoration circles */}
          <div style={{ position: 'absolute', top: '-40px', left: '-40px', width: '160px', height: '160px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: '-60px', right: '300px', width: '220px', height: '220px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />

          {/* ── Left Text ── */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: '40px', fontWeight: '800', color: 'white', margin: '0 0 8px', lineHeight: '1.2' }}>
              Start posting<br />jobs today
            </h2>
            <p style={{ color: '#a5b4fc', fontSize: '15px', margin: '0 0 32px' }}>
              Start posting jobs for only $10.
            </p>
            <button style={{
              padding: '14px 32px',
              background: 'white',
              color: '#4F46E5',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '700',
              cursor: 'pointer',
            }}>
              Sign Up For Free
            </button>
          </div>

          {/* ── Right Dashboard Mockup ── */}
          <div style={{ position: 'relative', zIndex: 1, flexShrink: 0 }}>
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '20px',
              width: '340px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            }}>
              {/* Mockup header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '20px', height: '20px', background: '#4F46E5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%' }} />
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#1E2130' }}>QuickHire</span>
                </div>
                <button style={{ padding: '6px 14px', background: '#4F46E5', color: 'white', border: 'none', borderRadius: '6px', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>
                  + Post a Job
                </button>
              </div>

              {/* Greeting */}
              <p style={{ fontSize: '13px', fontWeight: '700', color: '#1E2130', margin: '0 0 12px' }}>
                Good morning, Maria
              </p>

              {/* Stat cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
                {[
                  { label: 'New candidates to review', value: '76', bg: '#4F46E5' },
                  { label: 'Schedule for today',       value: '3',  bg: '#10B981' },
                  { label: 'Messages received',        value: '24', bg: '#4F46E5' },
                ].map(stat => (
                  <div key={stat.label} style={{ background: stat.bg, borderRadius: '8px', padding: '10px 8px' }}>
                    <div style={{ fontSize: '18px', fontWeight: '800', color: 'white' }}>{stat.value}</div>
                    <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.3', marginTop: '2px' }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Bottom row */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {/* Bar chart */}
                <div style={{ flex: 1, background: '#f8f8f8', borderRadius: '8px', padding: '10px' }}>
                  <div style={{ fontSize: '10px', color: '#9ca3af', marginBottom: '4px' }}>Job Views</div>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: '#1E2130', marginBottom: '8px' }}>2,342</div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '32px' }}>
                    {[5, 8, 6, 10, 7, 9, 5, 8, 9, 6].map((h, i) => (
                      <div key={i} style={{ flex: 1, background: i % 2 === 0 ? '#4F46E5' : '#FCD34D', borderRadius: '2px', height: `${h * 3}px` }} />
                    ))}
                  </div>
                </div>

                {/* Jobs open */}
                <div style={{ background: '#f8f8f8', borderRadius: '8px', padding: '10px', width: '80px', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: '#9ca3af', marginBottom: '4px' }}>Jobs Open</div>
                  <div style={{ fontSize: '22px', fontWeight: '800', color: '#4F46E5' }}>12</div>
                  <div style={{ fontSize: '10px', color: '#9ca3af' }}>Jobs Opened</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default CTABanner