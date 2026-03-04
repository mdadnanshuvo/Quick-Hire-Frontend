import { Link } from 'react-router-dom'

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
  return (
    <section style={{ background: 'white', padding: '60px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#1E2130', margin: 0 }}>
            Explore by <span style={{ color: '#3B82F6' }}>category</span>
          </h2>
          
          {/* Replaced <a> with <Link> */}
          <Link
            to="/jobs"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#4F46E5',
              fontWeight: '600',
              fontSize: '14px',
              textDecoration: 'none',
            }}
          >
            Show all jobs →
          </Link>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {CATEGORIES.map((cat, i) => {
            const isHighlighted = i === 2 // Marketing is highlighted per Figma

            return (
              <div
                key={cat.name}
                style={{
                  padding: '28px 24px',
                  borderRadius: '12px',
                  border: isHighlighted ? 'none' : '1px solid #f0f0f0',
                  background: isHighlighted ? '#4F46E5' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  if (!isHighlighted) {
                    e.currentTarget.style.borderColor = '#4F46E5'
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(79,70,229,0.1)'
                  }
                }}
                onMouseLeave={e => {
                  if (!isHighlighted) {
                    e.currentTarget.style.borderColor = '#f0f0f0'
                    e.currentTarget.style.boxShadow = 'none'
                  }
                }}
              >
                {/* Icon */}
                <div style={{ fontSize: '28px', marginBottom: '16px' }}>{cat.icon}</div>

                {/* Name */}
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: isHighlighted ? 'white' : '#1E2130', margin: '0 0 6px' }}>
                  {cat.name}
                </h3>

                {/* Count */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: isHighlighted ? '#c7d2fe' : '#9ca3af' }}>
                  <span>{cat.count} jobs available</span>
                  <span>→</span>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default CategorySection