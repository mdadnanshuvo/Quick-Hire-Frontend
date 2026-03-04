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

const TAG_COLORS = [
  { color: '#D97706', bg: '#FFFBEB' },
  { color: '#2563EB', bg: '#EFF6FF' },
  { color: '#DB2777', bg: '#FDF2F8' },
  { color: '#059669', bg: '#ECFDF5' },
]

const SkeletonCard = () => (
  <div style={{ background: 'white', border: '1px solid #f0f0f0', borderRadius: '12px', padding: '24px', minWidth: '260px' }}>
    <div style={{ width: '48px', height: '48px', background: '#f3f4f6', borderRadius: '10px', marginBottom: '16px' }} />
    <div style={{ height: '16px', background: '#f3f4f6', borderRadius: '4px', marginBottom: '8px', width: '70%' }} />
    <div style={{ height: '13px', background: '#f3f4f6', borderRadius: '4px', marginBottom: '12px', width: '50%' }} />
    <div style={{ height: '13px', background: '#f3f4f6', borderRadius: '4px', marginBottom: '6px' }} />
    <div style={{ height: '13px', background: '#f3f4f6', borderRadius: '4px', width: '60%' }} />
  </div>
)

const FeaturedJobs = () => {
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
    <>
      <style>{`
        .feat-section {
          background: #F8F8FD;
          padding: 80px 0;
        }
        .feat-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
        }
        .feat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 40px;
        }
        .feat-title {
          font-size: 28px;
          font-weight: 800;
          color: #1E2130;
          margin: 0;
        }
        .feat-title span { color: #3B82F6; }
        .feat-show-all {
          font-size: 14px;
          font-weight: 600;
          color: #4F46E5;
          background: none;
          border: none;
          cursor: pointer;
          font-family: Epilogue, sans-serif;
          white-space: nowrap;
        }
        .feat-show-all:hover { text-decoration: underline; }

        /* Desktop grid — 4 cols */
        .feat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        /* Mobile scroll — hidden on desktop */
        .feat-scroll { display: none; }

        .feat-card {
          background: white;
          border: 1px solid #f0f0f0;
          border-radius: 12px;
          padding: 24px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .feat-card:hover {
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          border-color: #e0e0ff;
        }
        .feat-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .feat-logo {
          width: 48px; height: 48px;
          border-radius: 10px;
          background: #f8f8f8;
          border: 1px solid #f0f0f0;
          display: flex; align-items: center;
          justify-content: center;
          font-size: 22px;
        }
        .feat-type-badge {
          font-size: 12px;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 20px;
        }
        .feat-job-title {
          font-size: 15px;
          font-weight: 700;
          color: #1E2130;
          margin: 0 0 4px;
        }
        .feat-job-meta {
          font-size: 13px;
          color: #9ca3af;
          margin: 0 0 12px;
        }
        .feat-desc {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.6;
          margin: 0 0 14px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .feat-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .feat-tag {
          font-size: 12px;
          font-weight: 500;
          padding: 4px 12px;
          border-radius: 20px;
        }
        .feat-empty {
          text-align: center;
          padding: 60px 0;
        }

        /* ── Tablet (769–1024px): 2 cols ── */
        @media (max-width: 1024px) {
          .feat-inner { padding: 0 32px; }
          .feat-grid { grid-template-columns: repeat(2, 1fr); }
          .feat-title { font-size: 24px; }
        }

        /* ── Mobile (≤768px): horizontal scroll ── */
        @media (max-width: 768px) {
          .feat-section { padding: 48px 0; }
          .feat-inner { padding: 0; }
          .feat-header {
            padding: 0 20px;
            margin-bottom: 24px;
          }
          .feat-title { font-size: 22px; }

          /* Hide grid, show scroll */
          .feat-grid { display: none; }
          .feat-scroll {
            display: flex;
            gap: 16px;
            overflow-x: auto;
            padding: 4px 20px 16px;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .feat-scroll::-webkit-scrollbar { display: none; }

          .feat-scroll .feat-card {
            min-width: 260px;
            max-width: 260px;
            scroll-snap-align: start;
            flex-shrink: 0;
          }
        }

        @media (max-width: 480px) {
          .feat-header { padding: 0 16px; }
          .feat-scroll { padding: 4px 16px 16px; }
          .feat-scroll .feat-card {
            min-width: 240px;
            max-width: 240px;
          }
        }
      `}</style>

      <section className="feat-section">
        <div className="feat-inner">

          {/* Header */}
          <div className="feat-header">
            <h2 className="feat-title">
              Featured <span>jobs</span>
            </h2>
            <button className="feat-show-all" onClick={() => navigate('/jobs')}>
              Show all jobs →
            </button>
          </div>

          {/* ── Loading ── */}
          {loading ? (
            <>
              {/* Desktop skeleton */}
              <div className="feat-grid" style={{ padding: '0 48px' }}>
                {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
              </div>
              {/* Mobile skeleton */}
              <div className="feat-scroll">
                {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
              </div>
            </>
          ) : jobs.length === 0 ? (
            <div className="feat-empty" style={{ padding: '0 48px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>💼</div>
              <p style={{ color: '#9ca3af', fontSize: '16px' }}>No jobs posted yet</p>
            </div>
          ) : (
            <>
              {/* ── Desktop / Tablet: Grid ── */}
              <div className="feat-grid" style={{ padding: '0 48px' }}>
                {jobs.map((job, i) => <JobCard key={job.id} job={job} i={i} navigate={navigate} />)}
              </div>

              {/* ── Mobile: Horizontal Scroll ── */}
              <div className="feat-scroll">
                {jobs.map((job, i) => <JobCard key={job.id} job={job} i={i} navigate={navigate} />)}
              </div>
            </>
          )}

        </div>
      </section>
    </>
  )
}

const JobCard = ({ job, i, navigate }) => {
  const typeStyle = TYPE_COLORS[job.type] || { color: '#6b7280', bg: '#f3f4f6' }
  const tagColor  = TAG_COLORS[i % TAG_COLORS.length]

  return (
    <div
      className="feat-card"
      onClick={() => navigate(`/jobs/${job.id}`)}
    >
      <div className="feat-card-top">
        <div className="feat-logo">🏢</div>
        <span
          className="feat-type-badge"
          style={{ color: typeStyle.color, background: typeStyle.bg }}
        >
          {job.type}
        </span>
      </div>

      <h3 className="feat-job-title">{job.title}</h3>
      <p className="feat-job-meta">{job.company} · {job.location}</p>

      {job.description && (
        <p className="feat-desc">{job.description}</p>
      )}

      <div className="feat-tags">
        <span
          className="feat-tag"
          style={{ color: tagColor.color, background: tagColor.bg }}
        >
          {job.category}
        </span>
        {job.salary && (
          <span
            className="feat-tag"
            style={{ color: '#6b7280', background: '#f3f4f6' }}
          >
            {job.salary}
          </span>
        )}
      </div>
    </div>
  )
}

export default FeaturedJobs