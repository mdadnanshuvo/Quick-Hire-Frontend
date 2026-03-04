import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { jobsApi } from '../../services/api'

const TYPE_COLORS = {
  'Full-time':  { color: '#059669', bg: '#ECFDF5' },
  'Part-time':  { color: '#2563EB', bg: '#EFF6FF' },
  'Remote':     { color: '#7C3AED', bg: '#F5F3FF' },
  'Contract':   { color: '#D97706', bg: '#FFFBEB' },
  'Internship': { color: '#DB2777', bg: '#FDF2F8' },
}

const SkeletonItem = () => (
  <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #f0f0f0', padding: '20px', display: 'flex', gap: '16px' }}>
    <div style={{ width: '48px', height: '48px', background: '#f3f4f6', borderRadius: '10px', flexShrink: 0 }} />
    <div style={{ flex: 1 }}>
      <div style={{ height: '16px', background: '#f3f4f6', borderRadius: '4px', width: '50%', marginBottom: '8px' }} />
      <div style={{ height: '13px', background: '#f3f4f6', borderRadius: '4px', width: '35%' }} />
    </div>
  </div>
)

const LatestJobs = () => {
  const navigate = useNavigate()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    jobsApi.getAll()
      .then(res => setJobs(res.data.data.slice(0, 8)))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={{ background: 'white', padding: '80px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1E2130', margin: 0 }}>
            Latest jobs open
          </h2>

          <a
            onClick={() => navigate('/jobs')}
            style={{ fontSize: '14px', fontWeight: '600', color: '#4F46E5', cursor: 'pointer', textDecoration: 'none' }}
          >
            Show all jobs →
          </a>
        </div>

        {/* List */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {[...Array(6)].map((_, i) => <SkeletonItem key={i} />)}
          </div>
        ) : jobs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>💼</div>
            <p style={{ color: '#9ca3af', fontSize: '16px' }}>No jobs posted yet</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {jobs.map(job => {
              const typeStyle = TYPE_COLORS[job.type] || { color: '#6b7280', bg: '#f3f4f6' }
              return (
                <div
                  key={job.id}
                  onClick={() => navigate(`/jobs/${job.id}`)}
                  style={{
                    background: 'white',
                    borderRadius: '12px',
                    border: '1px solid #f0f0f0',
                    padding: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'
                    e.currentTarget.style.borderColor = '#e0e0ff'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.borderColor = '#f0f0f0'
                  }}
                >
                  {/* Logo */}
                  <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: '#f8f8f8', border: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>
                    🏢
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1E2130', margin: '0 0 4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {job.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#9ca3af', margin: '0 0 8px' }}>
                      {job.company} · {job.location}
                    </p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '11px', fontWeight: '600', color: typeStyle.color, background: typeStyle.bg, padding: '3px 10px', borderRadius: '20px' }}>
                        {job.type}
                      </span>
                      <span style={{ fontSize: '11px', fontWeight: '500', color: '#4F46E5', background: '#EEF2FF', padding: '3px 10px', borderRadius: '20px', border: '1px solid #E0E7FF' }}>
                        {job.category}
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div style={{ color: '#9ca3af', fontSize: '18px', flexShrink: 0 }}>→</div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default LatestJobs