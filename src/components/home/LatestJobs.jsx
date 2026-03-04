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
      <div style={{ height: '13px', background: '#f3f4f6', borderRadius: '4px', width: '35%', marginBottom: '8px' }} />
      <div style={{ height: '22px', background: '#f3f4f6', borderRadius: '20px', width: '80px' }} />
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
    <>
      <style>{`
        .latest-section {
          background: white;
          padding: 80px 0;
        }
        .latest-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
        }
        .latest-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 40px;
        }
        .latest-title {
          font-size: 28px;
          font-weight: 800;
          color: #1E2130;
          margin: 0;
        }
        .latest-title span { color: #3B82F6; }
        .latest-show-all {
          font-size: 14px;
          font-weight: 600;
          color: #4F46E5;
          background: none;
          border: none;
          cursor: pointer;
          font-family: Epilogue, sans-serif;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .latest-show-all:hover { text-decoration: underline; }

        /* Desktop: 2-col grid */
        .latest-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .latest-card {
          background: white;
          border-radius: 12px;
          border: 1px solid #f0f0f0;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .latest-card:hover {
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          border-color: #e0e0ff;
        }
        .latest-logo {
          width: 48px; height: 48px;
          border-radius: 10px;
          background: #f8f8f8;
          border: 1px solid #f0f0f0;
          display: flex; align-items: center;
          justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
        }
        .latest-info { flex: 1; min-width: 0; }
        .latest-job-title {
          font-size: 15px;
          font-weight: 700;
          color: #1E2130;
          margin: 0 0 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .latest-meta {
          font-size: 13px;
          color: #9ca3af;
          margin: 0 0 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .latest-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .latest-tag {
          font-size: 11px;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 20px;
        }
        .latest-arrow {
          color: #9ca3af;
          font-size: 18px;
          flex-shrink: 0;
        }
        .latest-empty {
          text-align: center;
          padding: 60px 0;
        }

        /* ── Tablet (769–1024px): keep 2 cols, shrink padding ── */
        @media (max-width: 1024px) {
          .latest-inner { padding: 0 32px; }
          .latest-title { font-size: 24px; }
        }

        /* ── Mobile (≤768px): single column ── */
        @media (max-width: 768px) {
          .latest-section { padding: 48px 0; }
          .latest-inner { padding: 0 20px; }
          .latest-title { font-size: 22px; }
          .latest-header { margin-bottom: 24px; }

          /* Switch to single column */
          .latest-grid { grid-template-columns: 1fr; }

          /* Card tweaks for mobile */
          .latest-card { padding: 16px; gap: 14px; }
          .latest-logo { width: 44px; height: 44px; font-size: 20px; }
          .latest-job-title { font-size: 14px; white-space: normal; }
          .latest-meta { font-size: 12px; }
          .latest-arrow { display: none; }
        }

        @media (max-width: 480px) {
          .latest-inner { padding: 0 16px; }
          .latest-title { font-size: 20px; }
        }
      `}</style>

      <section className="latest-section">
        <div className="latest-inner">

          {/* Header */}
          <div className="latest-header">
            <h2 className="latest-title">
              Latest <span>jobs open</span>
            </h2>
            <button className="latest-show-all" onClick={() => navigate('/jobs')}>
              Show all jobs →
            </button>
          </div>

          {/* ── Loading ── */}
          {loading ? (
            <div className="latest-grid">
              {[...Array(6)].map((_, i) => <SkeletonItem key={i} />)}
            </div>
          ) : jobs.length === 0 ? (
            <div className="latest-empty">
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>💼</div>
              <p style={{ color: '#9ca3af', fontSize: '16px' }}>No jobs posted yet</p>
            </div>
          ) : (
            <div className="latest-grid">
              {jobs.map(job => {
                const typeStyle = TYPE_COLORS[job.type] || { color: '#6b7280', bg: '#f3f4f6' }
                return (
                  <div
                    key={job.id}
                    className="latest-card"
                    onClick={() => navigate(`/jobs/${job.id}`)}
                  >
                    {/* Logo */}
                    <div className="latest-logo">🏢</div>

                    {/* Info */}
                    <div className="latest-info">
                      <h3 className="latest-job-title">{job.title}</h3>
                      <p className="latest-meta">{job.company} · {job.location}</p>
                      <div className="latest-tags">
                        <span
                          className="latest-tag"
                          style={{ color: typeStyle.color, background: typeStyle.bg }}
                        >
                          {job.type}
                        </span>
                        <span
                          className="latest-tag"
                          style={{ color: '#4F46E5', background: '#EEF2FF', border: '1px solid #E0E7FF' }}
                        >
                          {job.category}
                        </span>
                      </div>
                    </div>

                    {/* Arrow — hidden on mobile */}
                    <div className="latest-arrow">→</div>
                  </div>
                )
              })}
            </div>
          )}

        </div>
      </section>
    </>
  )
}

export default LatestJobs