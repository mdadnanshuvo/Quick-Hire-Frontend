import { useNavigate } from 'react-router-dom'

const CATEGORIES = [
  { name: 'Design',         icon: '🎨', count: 235 },
  { name: 'Sales',          icon: '📊', count: 756 },
  { name: 'Marketing',      icon: '📢', count: 140 },
  { name: 'Finance',        icon: '💰', count: 325 },
  { name: 'Technology',     icon: '🖥️', count: 436 },
  { name: 'Engineering',    icon: '⚙️', count: 542 },
  { name: 'Business',       icon: '💼', count: 211 },
  { name: 'Human Resource', icon: '👥', count: 346 },
]

const CategorySection = () => {
  const navigate = useNavigate()

  const handleClick = (cat) => {
    navigate(`/jobs?search=${encodeURIComponent(cat.name)}`)
  }

  return (
    <>
      <style>{`
        .cat-section {
          background: white;
          padding: 60px 0;
        }
        .cat-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
        }
        .cat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 40px;
        }
        .cat-title {
          font-size: 32px;
          font-weight: 800;
          color: #1E2130;
          margin: 0;
        }
        .cat-title span { color: #3B82F6; }
        .cat-show-all {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #4F46E5;
          font-weight: 600;
          font-size: 14px;
          background: none;
          border: none;
          cursor: pointer;
          font-family: Epilogue, sans-serif;
          text-decoration: none;
        }
        .cat-show-all:hover { text-decoration: underline; }

        /* Desktop grid — 4 columns */
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .cat-card {
          padding: 28px 24px;
          border-radius: 12px;
          border: 1px solid #f0f0f0;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
        }
        .cat-card:hover {
          border-color: #4F46E5;
          box-shadow: 0 4px 16px rgba(79,70,229,0.1);
        }
        .cat-card.highlighted {
          background: #4F46E5;
          border: none;
        }
        .cat-card.highlighted:hover {
          box-shadow: 0 4px 20px rgba(79,70,229,0.35);
        }
        .cat-icon { font-size: 28px; margin-bottom: 16px; }
        .cat-name {
          font-size: 16px;
          font-weight: 700;
          color: #1E2130;
          margin: 0 0 6px;
        }
        .cat-card.highlighted .cat-name { color: white; }
        .cat-count {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: #9ca3af;
        }
        .cat-card.highlighted .cat-count { color: #c7d2fe; }

        /* Mobile list — single column */
        .cat-list { display: none; }
        .cat-list-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid #f3f4f6;
          cursor: pointer;
          transition: all 0.15s;
        }
        .cat-list-item:last-child { border-bottom: none; }
        .cat-list-item:hover .cat-list-name { color: #4F46E5; }
        .cat-list-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: #F8F8FD;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }
        .cat-list-info { flex: 1; }
        .cat-list-name {
          font-size: 15px;
          font-weight: 700;
          color: #1E2130;
          margin: 0 0 2px;
          transition: color 0.15s;
        }
        .cat-list-count {
          font-size: 13px;
          color: #9ca3af;
        }
        .cat-list-arrow {
          color: #9ca3af;
          font-size: 16px;
          flex-shrink: 0;
        }

        /* ── Tablet (769–1024px): 2 columns ── */
        @media (max-width: 1024px) {
          .cat-inner { padding: 0 32px; }
          .cat-grid { grid-template-columns: repeat(2, 1fr); }
          .cat-title { font-size: 26px; }
        }

        /* ── Mobile (≤768px): list layout ── */
        @media (max-width: 768px) {
          .cat-section { padding: 48px 0; }
          .cat-inner { padding: 0 20px; }
          .cat-title { font-size: 24px; }
          .cat-header { margin-bottom: 24px; }

          /* Hide grid, show list */
          .cat-grid { display: none; }
          .cat-list { display: block; }
        }

        @media (max-width: 480px) {
          .cat-inner { padding: 0 16px; }
          .cat-title { font-size: 22px; }
        }
      `}</style>

      <section className="cat-section">
        <div className="cat-inner">

          {/* Header */}
          <div className="cat-header">
            <h2 className="cat-title">
              Explore by <span>category</span>
            </h2>
            <button className="cat-show-all" onClick={() => navigate('/jobs')}>
              Show all jobs →
            </button>
          </div>

          {/* ── Desktop / Tablet: Grid ── */}
          <div className="cat-grid">
            {CATEGORIES.map((cat, i) => {
              const isHighlighted = i === 2
              return (
                <div
                  key={cat.name}
                  className={`cat-card${isHighlighted ? ' highlighted' : ''}`}
                  onClick={() => handleClick(cat)}
                >
                  <div className="cat-icon">{cat.icon}</div>
                  <h3 className="cat-name">{cat.name}</h3>
                  <div className="cat-count">
                    <span>{cat.count} jobs available</span>
                    <span>→</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* ── Mobile: List ── */}
          <div className="cat-list">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                className="cat-list-item"
                onClick={() => handleClick(cat)}
              >
                <div className="cat-list-icon">{cat.icon}</div>
                <div className="cat-list-info">
                  <p className="cat-list-name">{cat.name}</p>
                  <p className="cat-list-count">{cat.count} jobs available</p>
                </div>
                <span className="cat-list-arrow">→</span>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}

export default CategorySection