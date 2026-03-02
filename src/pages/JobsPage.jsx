import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { jobsApi } from '../services/api'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/home/Footer'

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

const JOB_TYPES = ['Full-time', 'Part-time', 'Remote', 'Contract', 'Internship']

const JobCard = ({ job, index }) => {
  const navigate = useNavigate()
  const typeStyle = TYPE_COLORS[job.type] || { color: '#6b7280', bg: '#f3f4f6' }
  const tagColor = TAG_COLORS[index % TAG_COLORS.length]

  return (
    <div
      onClick={() => navigate(`/jobs/${job.id}`)}
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
        <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: '#f8f8f8', border: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
          🏢
        </div>
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

      {/* Description */}
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

const JobsPage = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('')
  const [type, setType] = useState('')
  const [categories, setCategories] = useState([])

  useEffect(() => {
    jobsApi.getFilters()
      .then(res => setCategories(res.data.data.categories))
      .catch(console.error)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)
    const params = {}
    if (search)   params.search   = search
    if (location) params.location = location
    if (category) params.category = category
    if (type)     params.type     = type

    jobsApi.getAll(params)
      .then(res => setJobs(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [search, location, category, type])

  const clearFilters = () => {
    setSearch('')
    setLocation('')
    setCategory('')
    setType('')
  }

  const hasFilters = search || location || category || type

  const inputStyle = {
    padding: '10px 16px',
    fontSize: '14px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    outline: 'none',
    background: 'white',
    color: '#1E2130',
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* Page header */}
      <div style={{ background: 'white', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 48px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1E2130', margin: '0 0 24px' }}>
            Find your <span style={{ color: '#3B82F6' }}>dream job</span>
          </h1>

          {/* Search & Filters */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>

            {/* Search */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8f8f8', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '0 16px', flex: '1', minWidth: '200px' }}>
              <span style={{ color: '#9ca3af' }}>🔍</span>
              <input
                type="text"
                placeholder="Job title or keyword"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ ...inputStyle, border: 'none', background: 'transparent', flex: 1, padding: '10px 0' }}
              />
            </div>

            {/* Location */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8f8f8', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '0 16px', minWidth: '160px' }}>
              <span style={{ color: '#9ca3af' }}>📍</span>
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={e => setLocation(e.target.value)}
                style={{ ...inputStyle, border: 'none', background: 'transparent', padding: '10px 0' }}
              />
            </div>

            {/* Category */}
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              style={{ ...inputStyle, minWidth: '160px', cursor: 'pointer' }}
            >
              <option value="">All Categories</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {/* Type */}
            <select
              value={type}
              onChange={e => setType(e.target.value)}
              style={{ ...inputStyle, minWidth: '140px', cursor: 'pointer' }}
            >
              <option value="">All Types</option>
              {JOB_TYPES.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            {/* Clear button */}
            {hasFilters && (
              <button
                onClick={clearFilters}
                style={{ padding: '10px 20px', background: '#FEF2F2', color: '#EF4444', border: '1px solid #FECACA', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
              >
                ✕ Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div style={{ flex: 1, background: '#F8F8FD' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 48px' }}>

          {/* Results count */}
          <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '24px' }}>
            {loading ? 'Loading...' : `${jobs.length} job${jobs.length !== 1 ? 's' : ''} found`}
          </p>

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : jobs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ fontSize: '56px', marginBottom: '16px' }}>🔍</div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1E2130', marginBottom: '8px' }}>No jobs found</h3>
              <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '16px' }}>Try adjusting your search or filters</p>
              <button
                onClick={clearFilters}
                style={{ color: '#4F46E5', fontWeight: '600', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {jobs.map((job, i) => (
                <JobCard key={job.id} job={job} index={i} />
              ))}
            </div>
          )}

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default JobsPage