import { useState, useEffect } from 'react'
import { jobsApi } from '../../services/api'

const TYPE_COLORS = {
  'Full-time':  { color: '#059669', bg: '#ECFDF5' },
  'Part-time':  { color: '#2563EB', bg: '#EFF6FF' },
  'Remote':     { color: '#7C3AED', bg: '#F5F3FF' },
  'Contract':   { color: '#D97706', bg: '#FFFBEB' },
  'Internship': { color: '#DB2777', bg: '#FDF2F8' },
}

const TAG_COLORS = [
  { color: '#D97706', bg: '#FFFBEB' },
  { color: '#2563EB', bg: '#EFF6FF' },
  { color: '#DB2777', bg: '#FDF2F8' },
  { color: '#059669', bg: '#ECFDF5' },
]

const JobCard = ({ job, index }) => {
  const typeStyle = TYPE_COLORS[job.type] || { color: '#6b7280', bg: '#f3f4f6' }
  const tagColor = TAG_COLORS[index % TAG_COLORS.length]

  return (
    <div
      style={{
        background: 'white',
        border: '1px solid #f0f0f0',
        borderRadius: '12px',
        padding: '24px',
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
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
        {/* Logo */}
        <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: '#f8f8f8', border: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
          🏢
        </div>
        {/* Type badge */}
        <span style={{ fontSize: '12px', fontWeight: '600', color: typeStyle.color, background: typeStyle.bg, padding: '4px 12px', borderRadius: '20px' }}>
          {job.type}
        </span>
      </div>

      {/* Title */}
      <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1E2130', margin: '0 0 4px' }}>
        {job.title}
      </h3>

      {/* Company · Location */}
      <p style={{ fontSize: '13px', color: '#9ca3af', margin: '0 0 12px' }}>
        {job.company} · {job.location}
      </p>

      {/* Description snippet */}
      <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.6', margin: '0 0 16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {job.description}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '12px', fontWeight: '500', color: tagColor.color, background: tagColor.bg, padding: '4px 12px', borderRadius: '20px' }}>
          {job.category}
        </span>
        {job.salary && (
          <span style={{ fontSize: '12px', fontWeight: '500', color: '#6b7280', background: '#f3f4f6', padding: '4px 12px', borderRadius: '20px' }}>
            {job.salary}
          </span>
        )}
      </div>
    </div>
  )
}

const SkeletonCard = () => (
  <div style={{ background: 'white', border: '1px solid #f0f0f0', borderRadius: '12px', padding: '24px' }}>
    <div style={{ width: '48px', height: '48px', background: '#f3f4f6', borderRadius: '10px', marginBottom: '16px' }} />
    <div style={{ height: '16px', background: '#f3f4f6', borderRadius: '4px', marginBottom: '8px', width: '70%' }} />
    <div style={{ height: '13px', background: '#f3f4f6', borderRadius: '4px', marginBottom: '12px', width: '50%' }} />
    <div style={{ height: '13px', background: '#f3f4f6', borderRadius: '4px', marginBottom: '6px' }} />
    <div style={{ height: '13px', background: '#f3f4f6', borderRadius: '4px', width: '60%' }} />
  </div>
)

const FeaturedJobs = () => {
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
            Featured <span style={{ color: '#3B82F6' }}>jobs</span>
          </h2>
          <a href="#" style={{ color: '#4F46E5', fontWeight: '600', fontSize: '14px', textDecoration: 'none' }}>
            Show all jobs →
          </a>
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : jobs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#9ca3af' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>💼</div>
            <p style={{ fontSize: '16px', fontWeight: '600', color: '#6b7280' }}>No jobs posted yet</p>
            <p style={{ fontSize: '14px', marginTop: '8px' }}>Check back soon!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {jobs.map((job, i) => (
              <JobCard key={job.id} job={job} index={i} />
            ))}
          </div>
        )}

      </div>
    </section>
  )
}

export default FeaturedJobs