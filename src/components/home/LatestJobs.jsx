import { useState, useEffect } from 'react'
import { jobsApi } from '../../services/api'

const TYPE_COLORS = {
  'Full-time':  { color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE' },
  'Part-time':  { color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE' },
  'Remote':     { color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE' },
  'Contract':   { color: '#D97706', bg: '#FFFBEB', border: '#FDE68A' },
  'Internship': { color: '#DB2777', bg: '#FDF2F8', border: '#FBCFE8' },
}

const JobListItem = ({ job }) => {
  const typeStyle = TYPE_COLORS[job.type] || { color: '#6b7280', bg: '#f3f4f6', border: '#e5e7eb' }

  return (
    <div
      style={{
        background: 'white',
        border: '1px solid #f0f0f0',
        borderRadius: '12px',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'
        e.currentTarget.style.borderColor = '#e0e0ff'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = '#f0f0f0'
      }}
    >
      {/* Logo */}
      <div style={{
        width: '48px', height: '48px',
        borderRadius: '10px',
        background: '#f8f8f8',
        border: '1px solid #f0f0f0',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '22px',
        flexShrink: 0,
      }}>
        🏢
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1E2130', margin: '0 0 4px' }}>
          {job.title}
        </h3>
        <p style={{ fontSize: '13px', color: '#9ca3af', margin: '0 0 10px' }}>
          {job.company} · {job.location}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {/* Type tag */}
          <span style={{
            fontSize: '12px', fontWeight: '500',
            color: typeStyle.color,
            background: typeStyle.bg,
            border: `1px solid ${typeStyle.border}`,
            padding: '3px 12px',
            borderRadius: '20px',
          }}>
            {job.type}
          </span>

          {/* Category tag */}
          <span style={{
            fontSize: '12px', fontWeight: '500',
            color: '#D97706',
            background: '#FFFBEB',
            border: '1px solid #FDE68A',
            padding: '3px 12px',
            borderRadius: '20px',
          }}>
            {job.category}
          </span>
        </div>
      </div>
    </div>
  )
}

const SkeletonItem = () => (
  <div style={{ background: 'white', border: '1px solid #f0f0f0', borderRadius: '12px', padding: '20px 24px', display: 'flex', gap: '16px' }}>
    <div style={{ width: '48px', height: '48px', background: '#f3f4f6', borderRadius: '10px', flexShrink: 0 }} />
    <div style={{ flex: 1 }}>
      <div style={{ height: '15px', background: '#f3f4f6', borderRadius: '4px', marginBottom: '8px', width: '60%' }} />
      <div style={{ height: '13px', background: '#f3f4f6', borderRadius: '4px', marginBottom: '10px', width: '40%' }} />
      <div style={{ display: 'flex', gap: '8px' }}>
        <div style={{ height: '24px', width: '70px', background: '#f3f4f6', borderRadius: '20px' }} />
        <div style={{ height: '24px', width: '70px', background: '#f3f4f6', borderRadius: '20px' }} />
      </div>
    </div>
  </div>
)

const LatestJobs = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    jobsApi.getAll()
      .then(res => setJobs(res.data.data.slice(0, 8)))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <section style={{ background: '#F8F8FD', padding: '60px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#1E2130', margin: 0 }}>
            Latest <span style={{ color: '#3B82F6' }}>jobs open</span>
          </h2>
          <a href="#" style={{ color: '#4F46E5', fontWeight: '600', fontSize: '14px', textDecoration: 'none' }}>
            Show all jobs →
          </a>
        </div>

        {/* 2 column grid */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[...Array(8)].map((_, i) => <SkeletonItem key={i} />)}
          </div>
        ) : jobs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#9ca3af' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
            <p style={{ fontSize: '16px', fontWeight: '600', color: '#6b7280' }}>No jobs available yet</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {jobs.map(job => (
              <JobListItem key={job.id} job={job} />
            ))}
          </div>
        )}

      </div>
    </section>
  )
}

export default LatestJobs