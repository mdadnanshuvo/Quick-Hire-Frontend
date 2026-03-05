import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { jobsApi, applicationsApi } from '../services/api'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/home/Footer'   // ✅ correct path

// ── Defined OUTSIDE parent — prevents remount on every render ──
const TYPE_COLORS = {
  'Full-time':  { color: '#059669', bg: '#ECFDF5' },
  'Part-time':  { color: '#2563EB', bg: '#EFF6FF' },
  'Remote':     { color: '#7C3AED', bg: '#F5F3FF' },
  'Contract':   { color: '#D97706', bg: '#FFFBEB' },
  'Internship': { color: '#DB2777', bg: '#FDF2F8' },
}

const inputStyle = (hasError) => ({
  width: '100%',
  padding: '12px 16px',
  fontSize: '14px',
  border: `1px solid ${hasError ? '#FCA5A5' : '#e5e7eb'}`,
  borderRadius: '8px',
  outline: 'none',
  background: hasError ? '#FEF2F2' : '#f8f8f8',
  color: '#1E2130',
  boxSizing: 'border-box',
  fontFamily: 'Epilogue, sans-serif',
  transition: 'border-color 0.15s',
})

// ── ApplyForm is a standalone component — NOT nested inside JobDetailPage ──
const ApplyForm = ({ job, onSuccess }) => {
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [apiError, setApiError] = useState('')
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    name: '', email: '', resume_link: '', cover_note: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    // Clear field error on change
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim())
      e.name = 'Name is required'
    if (!form.email.trim())
      e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email))
      e.email = 'Enter a valid email address'
    if (!form.resume_link.trim())
      e.resume_link = 'Resume link is required'
    else if (!/^https?:\/\/.+/.test(form.resume_link))
      e.resume_link = 'Must start with http:// or https://'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError('')

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    setSubmitting(true)

    try {
      await applicationsApi.submit({
        job_id:      parseInt(job.id, 10),
        name:       form.name.trim(),
        email:      form.email.trim(),
        resume_link: form.resume_link.trim(),
        cover_note:  form.cover_note.trim() || null,
      })
      setSubmitted(true)
      if (onSuccess) onSuccess()
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong. Please try again.'
      setApiError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '24px 0' }}>
        <div style={{ width: '64px', height: '64px', background: '#ECFDF5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '28px' }}>
          ✅
        </div>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1E2130', margin: '0 0 8px' }}>
          Application Submitted!
        </h3>
        <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: '1.6', margin: '0 0 24px' }}>
          Thank you for applying to <strong>{job.title}</strong> at {job.company}.
          We'll be in touch soon.
        </p>
        <button
          onClick={() => navigate('/jobs')}
          style={{ color: '#4F46E5', fontWeight: '600', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'Epilogue, sans-serif' }}
        >
          Browse more jobs →
        </button>
      </div>
    )
  }

  return (
    <>
      <h2 style={{ fontSize: '17px', fontWeight: '700', color: '#1E2130', margin: '0 0 20px' }}>
        Apply Now
      </h2>

      {/* API error banner */}
      {apiError && (
        <div style={{ marginBottom: '16px', padding: '12px 14px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', fontSize: '13px', color: '#DC2626', lineHeight: '1.5' }}>
          ⚠️ {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Full Name */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#1E2130', marginBottom: '6px' }}>
            Full Name <span style={{ color: '#EF4444' }}>*</span>
          </label>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
            autoComplete="name"
            style={inputStyle(!!errors.name)}
          />
          {errors.name && (
            <p style={{ fontSize: '12px', color: '#EF4444', margin: '5px 0 0' }}>{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#1E2130', marginBottom: '6px' }}>
            Email Address <span style={{ color: '#EF4444' }}>*</span>
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="john@example.com"
            autoComplete="email"
            style={inputStyle(!!errors.email)}
          />
          {errors.email && (
            <p style={{ fontSize: '12px', color: '#EF4444', margin: '5px 0 0' }}>{errors.email}</p>
          )}
        </div>

        {/* Resume Link */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#1E2130', marginBottom: '6px' }}>
            Resume Link <span style={{ color: '#EF4444' }}>*</span>
          </label>
          <input
            name="resume_link"
            type="url"
            value={form.resume_link}
            onChange={handleChange}
            placeholder="https://drive.google.com/your-resume"
            autoComplete="off"
            style={inputStyle(!!errors.resume_link)}
          />
          {errors.resume_link && (
            <p style={{ fontSize: '12px', color: '#EF4444', margin: '5px 0 0' }}>{errors.resume_link}</p>
          )}
        </div>

        {/* Cover Note */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#1E2130', marginBottom: '6px' }}>
            Cover Note <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '400' }}>(optional)</span>
          </label>
          <textarea
            name="cover_note"
            value={form.cover_note}
            onChange={handleChange}
            placeholder="Tell us why you're a great fit for this role..."
            rows={4}
            style={{ ...inputStyle(false), resize: 'vertical', minHeight: '100px' }}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          style={{
            width: '100%',
            padding: '14px',
            background: submitting ? '#818cf8' : '#4F46E5',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: '700',
            cursor: submitting ? 'not-allowed' : 'pointer',
            fontFamily: 'Epilogue, sans-serif',
            transition: 'background 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          {submitting ? (
            <>
              <span style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
              Submitting...
            </>
          ) : (
            '📨 Submit Application'
          )}
        </button>

      </form>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────
const JobDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showSheet, setShowSheet] = useState(false)  // mobile bottom sheet
  const [appSubmitted, setAppSubmitted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)
    jobsApi.getById(id)
      .then(res => setJob(res.data.data))
      .catch(err => {
        console.error('Failed to load job:', err)
        setJob(null)
      })
      .finally(() => setLoading(false))
  }, [id])

  // Prevent body scroll when sheet is open
  useEffect(() => {
    document.body.style.overflow = showSheet ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [showSheet])

  const handleAppSuccess = useCallback(() => {
    setAppSubmitted(true)
    setShowSheet(false)
  }, [])

  // ── Loading ──
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ flex: 1, background: '#F8F8FD', padding: '40px 0' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px' }}>
            <div style={{ height: '18px', background: '#e9eaf0', borderRadius: '4px', width: '140px', marginBottom: '32px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 360px', gap: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ background: 'white', borderRadius: '16px', padding: '28px', border: '1px solid #f0f0f0' }}>
                  <div style={{ height: '26px', background: '#e9eaf0', borderRadius: '4px', width: '60%', marginBottom: '10px' }} />
                  <div style={{ height: '16px', background: '#e9eaf0', borderRadius: '4px', width: '35%' }} />
                </div>
                <div style={{ background: 'white', borderRadius: '16px', padding: '28px', border: '1px solid #f0f0f0', height: '220px' }} />
              </div>
              <div style={{ background: '#e9eaf0', borderRadius: '16px', height: '420px' }} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // ── Not found ──
  if (!job) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px', padding: '40px' }}>
          <div style={{ fontSize: '56px' }}>😕</div>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1E2130', margin: 0 }}>Job not found</h2>
          <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>This listing may have been removed or doesn't exist.</p>
          <button
            onClick={() => navigate('/jobs')}
            style={{ marginTop: '8px', color: '#4F46E5', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer', fontSize: '15px', fontFamily: 'Epilogue, sans-serif' }}
          >
            ← Browse all jobs
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  const typeStyle = TYPE_COLORS[job.type] || { color: '#6b7280', bg: '#f3f4f6' }

  return (
    <>
      <style>{`
        /* ── Layout ── */
        .jd-wrap  { min-height: 100vh; display: flex; flex-direction: column; background: #F8F8FD; }
        .jd-body  { flex: 1; }
        .jd-inner { max-width: 1200px; margin: 0 auto; padding: 40px 48px 80px; }

        .jd-back {
          display: inline-flex; align-items: center; gap: 6px;
          color: #6b7280; background: none; border: none;
          cursor: pointer; font-size: 14px; font-weight: 500;
          margin-bottom: 28px; padding: 0;
          font-family: Epilogue, sans-serif;
          transition: color 0.15s;
        }
        .jd-back:hover { color: #4F46E5; }

        /* 2-col desktop grid */
        .jd-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 360px;
          gap: 24px;
          align-items: start;
        }
        .jd-left { display: flex; flex-direction: column; gap: 20px; }

        /* Sticky sidebar */
        .jd-sidebar {
          position: sticky;
          top: 80px;
          background: white;
          border-radius: 16px;
          border: 1px solid #f0f0f0;
          padding: 28px;
        }

        /* Cards */
        .jd-card {
          background: white;
          border-radius: 16px;
          border: 1px solid #f0f0f0;
          padding: 28px;
        }

        /* ── Mobile bottom bar — hidden on desktop ── */
        .jd-mobile-bar { display: none; }

        /* ── Bottom sheet backdrop ── */
        .jd-backdrop {
          display: none;
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.55);
          z-index: 200;
          align-items: flex-end;
        }
        .jd-backdrop.open { display: flex; }
        .jd-sheet {
          background: white;
          border-radius: 20px 20px 0 0;
          width: 100%;
          max-height: 94vh;
          overflow-y: auto;
          padding: 0 20px 40px;
          box-shadow: 0 -8px 32px rgba(0,0,0,0.12);
        }
        .jd-sheet-drag {
          width: 44px; height: 5px;
          background: #d1d5db; border-radius: 3px;
          margin: 14px auto 20px;
        }
        .jd-sheet-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 20px; padding-bottom: 16px;
          border-bottom: 1px solid #f3f4f6;
        }
        .jd-sheet-close {
          width: 32px; height: 32px;
          background: #f3f4f6; border: none; border-radius: 50%;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          font-size: 16px; color: #6b7280; flex-shrink: 0;
          transition: background 0.15s;
        }
        .jd-sheet-close:hover { background: #e5e7eb; }

        /* ── Tablet ── */
        @media (max-width: 1024px) {
          .jd-inner { padding: 32px; }
          .jd-grid  { grid-template-columns: minmax(0, 1fr) 300px; }
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .jd-inner { padding: 20px 16px 120px; }
          .jd-grid  { grid-template-columns: 1fr; }
          .jd-sidebar { display: none; }

          .jd-mobile-bar {
            display: flex;
            position: fixed; bottom: 0; left: 0; right: 0;
            padding: 14px 20px;
            background: white;
            border-top: 1px solid #f0f0f0;
            box-shadow: 0 -4px 20px rgba(0,0,0,0.08);
            z-index: 100;
            gap: 12px;
            align-items: center;
          }
          .jd-mobile-job-title {
            flex: 1; min-width: 0;
            font-size: 12px; font-weight: 600; color: #1E2130;
            overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
          }
          .jd-mobile-apply-btn {
            flex-shrink: 0;
            padding: 12px 24px;
            background: #4F46E5; color: white;
            border: none; border-radius: 10px;
            font-size: 14px; font-weight: 700;
            cursor: pointer; font-family: Epilogue, sans-serif;
            transition: background 0.2s;
          }
          .jd-mobile-apply-btn:hover { background: #4338CA; }
          .jd-mobile-apply-btn:disabled {
            background: #ECFDF5; color: #059669;
            border: 2px solid #059669; cursor: default;
          }
        }

        @media (max-width: 480px) {
          .jd-inner { padding: 16px 14px 120px; }
          .jd-card  { padding: 20px; }
        }

        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="jd-wrap">
        <Navbar />

        <div className="jd-body">
          <div className="jd-inner">

            {/* ── Back button ── */}
            <button className="jd-back" onClick={() => navigate('/jobs')}>
              ← Back to jobs
            </button>

            <div className="jd-grid">

              {/* ── Left column ── */}
              <div className="jd-left">

                {/* Job header */}
                <div className="jd-card">
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    {/* Logo */}
                    <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: '#f8f8f8', border: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>
                      {job.logo_url ? (
                        <img src={job.logo_url} alt={job.company} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                      ) : '🏢'}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '10px' }}>
                        <div>
                          <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#1E2130', margin: '0 0 4px', lineHeight: '1.2' }}>
                            {job.title}
                          </h1>
                          <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>{job.company}</p>
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: '600', color: typeStyle.color, background: typeStyle.bg, padding: '5px 14px', borderRadius: '20px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                          {job.type}
                        </span>
                      </div>

                      {/* Meta tags */}
                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <span style={{ fontSize: '13px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          📍 {job.location}
                        </span>
                        {job.salary && (
                          <span style={{ fontSize: '13px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            💰 {job.salary}
                          </span>
                        )}
                        <span style={{ fontSize: '12px', fontWeight: '500', color: '#4F46E5', background: '#EEF2FF', padding: '3px 12px', borderRadius: '20px', border: '1px solid #E0E7FF' }}>
                          {job.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description + Requirements */}
                <div className="jd-card">
                  <h2 style={{ fontSize: '17px', fontWeight: '700', color: '#1E2130', margin: '0 0 16px' }}>
                    Job Description
                  </h2>
                  <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.85', whiteSpace: 'pre-wrap', margin: 0 }}>
                    {job.description}
                  </p>

                  {job.requirements && job.requirements.length > 0 && (
                    <div style={{ marginTop: '28px' }}>
                      <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1E2130', margin: '0 0 16px' }}>
                        Requirements
                      </h3>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {job.requirements.map((req, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '14px', color: '#6b7280', lineHeight: '1.6' }}>
                            <span style={{ color: '#4F46E5', fontWeight: '800', flexShrink: 0, marginTop: '2px' }}>✓</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

              </div>

              {/* ── Right: sticky sidebar (desktop only) ── */}
              <div className="jd-sidebar">
                <ApplyForm job={job} onSuccess={handleAppSuccess} />
              </div>

            </div>
          </div>
        </div>

        {/* ── Mobile bottom bar ── */}
        <div className="jd-mobile-bar">
          <div className="jd-mobile-job-title">{job.title} @ {job.company}</div>
          {appSubmitted ? (
            <button className="jd-mobile-apply-btn" disabled>
              ✅ Applied!
            </button>
          ) : (
            <button className="jd-mobile-apply-btn" onClick={() => setShowSheet(true)}>
              Apply Now
            </button>
          )}
        </div>

        {/* ── Mobile bottom sheet ── */}
        <div
          className={`jd-backdrop ${showSheet ? 'open' : ''}`}
          onClick={(e) => { if (e.target === e.currentTarget) setShowSheet(false) }}
        >
          <div className="jd-sheet">
            <div className="jd-sheet-drag" />
            <div className="jd-sheet-header">
              <div>
                <p style={{ fontSize: '11px', color: '#9ca3af', margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Applying for</p>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1E2130', margin: 0 }}>{job.title}</h3>
                <p style={{ fontSize: '13px', color: '#9ca3af', margin: '2px 0 0' }}>{job.company}</p>
              </div>
              <button className="jd-sheet-close" onClick={() => setShowSheet(false)}>✕</button>
            </div>
            <ApplyForm job={job} onSuccess={handleAppSuccess} />
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default JobDetailPage