const CTABanner = () => {
  return (
    <>
      <style>{`
        .cta-section {
          background: white;
          padding: 60px 0;
        }
        .cta-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
        }
        .cta-box {
          background: #4F46E5;
          border-radius: 20px;
          padding: 56px 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          position: relative;
          overflow: hidden;
        }
        .cta-circle-1 {
          position: absolute; top: -40px; left: -40px;
          width: 160px; height: 160px;
          background: rgba(255,255,255,0.05);
          border-radius: 50%;
        }
        .cta-circle-2 {
          position: absolute; bottom: -60px; right: 300px;
          width: 220px; height: 220px;
          background: rgba(255,255,255,0.05);
          border-radius: 50%;
        }
        .cta-left {
          position: relative;
          z-index: 1;
          flex: 1;
        }
        .cta-heading {
          font-size: 40px;
          font-weight: 800;
          color: white;
          margin: 0 0 8px;
          line-height: 1.2;
        }
        .cta-sub {
          color: #a5b4fc;
          font-size: 15px;
          margin: 0 0 32px;
        }
        .cta-btn {
          padding: 14px 32px;
          background: white;
          color: #4F46E5;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          font-family: Epilogue, sans-serif;
          transition: all 0.2s;
        }
        .cta-btn:hover {
          background: #f0f0ff;
        }
        .cta-right {
          position: relative;
          z-index: 1;
          flex-shrink: 0;
        }
        .cta-mockup {
          background: white;
          border-radius: 16px;
          padding: 20px;
          width: 340px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        }
        .cta-mockup-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .cta-mockup-logo {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .cta-mockup-dot {
          width: 20px; height: 20px;
          background: #4F46E5;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }
        .cta-mockup-btn {
          padding: 6px 14px;
          background: #4F46E5;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
        }
        .cta-stat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-bottom: 16px;
        }
        .cta-bottom-row {
          display: flex;
          gap: 8px;
        }
        .cta-bar-chart {
          flex: 1;
          background: #f8f8f8;
          border-radius: 8px;
          padding: 10px;
        }
        .cta-bars {
          display: flex;
          align-items: flex-end;
          gap: 3px;
          height: 32px;
        }
        .cta-jobs-open {
          background: #f8f8f8;
          border-radius: 8px;
          padding: 10px;
          width: 80px;
          text-align: center;
        }

        /* ── Tablet (769–1024px) ── */
        @media (max-width: 1024px) {
          .cta-inner { padding: 0 32px; }
          .cta-box { padding: 40px 40px; gap: 28px; }
          .cta-heading { font-size: 32px; }
          .cta-mockup { width: 280px; }
        }

        /* ── Mobile (≤768px) ── */
        @media (max-width: 768px) {
          .cta-section { padding: 40px 0; }
          .cta-inner { padding: 0 20px; }
          .cta-box {
            flex-direction: column;
            padding: 36px 28px;
            align-items: flex-start;
            gap: 32px;
            border-radius: 16px;
          }
          .cta-circle-2 { right: -60px; bottom: -40px; }
          .cta-heading { font-size: 30px; }
          .cta-sub { font-size: 14px; margin-bottom: 24px; }
          .cta-btn { width: 100%; text-align: center; padding: 14px; }
          .cta-right { width: 100%; }
          .cta-mockup {
            width: 100%;
            box-sizing: border-box;
          }
        }

        @media (max-width: 480px) {
          .cta-inner { padding: 0 16px; }
          .cta-box { padding: 28px 20px; }
          .cta-heading { font-size: 26px; }
        }
      `}</style>

      <section className="cta-section">
        <div className="cta-inner">
          <div className="cta-box">

            {/* Decoration */}
            <div className="cta-circle-1" />
            <div className="cta-circle-2" />

            {/* ── Left Text ── */}
            <div className="cta-left">
              <h2 className="cta-heading">
                Start posting<br />jobs today
              </h2>
              <p className="cta-sub">Start posting jobs for only $10.</p>
              <button className="cta-btn">Sign Up For Free</button>
            </div>

            {/* ── Right Mockup ── */}
            <div className="cta-right">
              <div className="cta-mockup">

                {/* Mockup header */}
                <div className="cta-mockup-header">
                  <div className="cta-mockup-logo">
                    <div className="cta-mockup-dot">
                      <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%' }} />
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#1E2130' }}>QuickHire</span>
                  </div>
                  <button className="cta-mockup-btn">+ Post a Job</button>
                </div>

                {/* Greeting */}
                <p style={{ fontSize: '13px', fontWeight: '700', color: '#1E2130', margin: '0 0 12px' }}>
                  Good morning, Maria
                </p>

                {/* Stat cards */}
                <div className="cta-stat-grid">
                  {[
                    { label: 'New candidates to review', value: '76',  bg: '#4F46E5' },
                    { label: 'Schedule for today',       value: '3',   bg: '#10B981' },
                    { label: 'Messages received',        value: '24',  bg: '#4F46E5' },
                  ].map(stat => (
                    <div key={stat.label} style={{ background: stat.bg, borderRadius: '8px', padding: '10px 8px' }}>
                      <div style={{ fontSize: '18px', fontWeight: '800', color: 'white' }}>{stat.value}</div>
                      <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.3', marginTop: '2px' }}>{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Bottom row */}
                <div className="cta-bottom-row">
                  <div className="cta-bar-chart">
                    <div style={{ fontSize: '10px', color: '#9ca3af', marginBottom: '4px' }}>Job Views</div>
                    <div style={{ fontSize: '14px', fontWeight: '800', color: '#1E2130', marginBottom: '8px' }}>2,342</div>
                    <div className="cta-bars">
                      {[5, 8, 6, 10, 7, 9, 5, 8, 9, 6].map((h, i) => (
                        <div key={i} style={{
                          flex: 1,
                          background: i % 2 === 0 ? '#4F46E5' : '#FCD34D',
                          borderRadius: '2px',
                          height: `${h * 3}px`,
                        }} />
                      ))}
                    </div>
                  </div>
                  <div className="cta-jobs-open">
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
    </>
  )
}

export default CTABanner