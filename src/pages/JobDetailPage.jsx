import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { jobsApi, applicationsApi } from '../services/api'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/home/Footer'

const JobDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [apiError, setApiError] = useState('')
  const [errors, setErrors] = useState({})
  const [showForm, setShowForm] = useState(false)

  const [form, setForm] = useState({
    name: '', email: '', resume_link: '', cover_note: ''
  })

  useEffect(() => {
    jobsApi.getById(id)
      .then(res => setJob(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  const validate = () => {
    const e = {}
    if (!form.name.trim())        e.name        = 'Name is required'
    if (!form.email.trim())       e.email       = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.resume_link.trim()) e.resume_link = 'Resume link is required'
    else if (!/^https?:\/\/.+/.test(form.resume_link)) e.resume_link = 'Must start with http:// or https://'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError('')
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return }
    setErrors({})
    setSubmitting(true)
    try {
      await applicationsApi.submit({ ...form, job_id: job.id })
      setSubmitted(true)
      setShowForm(false)
    } catch (err) {
      setApiError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const TYPE_COLORS = {
    'Full-time':  { color: '#059669', bg: '#ECFDF5' },
    'Part-time':  { color: '#2563EB', bg: '#EFF6FF' },
    'Remote':     { color: '#7C3AED', bg: '#F5F3FF' },
    'Contract':   { color: '#D97706', bg: '#FFFBEB' },
    'Internship': { color: '#DB2777', bg: '#FDF2F8' },
  }

  const inputStyle = (hasError) => ({
    width: '100%', padding: '12px 16px', fontSize: '14px',
    border: `1px solid ${hasError ? '#FCA5A5' : '#e5e7eb'}`,
    borderRadius: '8px', outline: 'none',
    background: hasError ? '#FEF2F2' : '#f8f8f8',
    color: '#1E2130', boxSizing: 'border-box',
    fontFamily: 'Epilogue, sans-serif',
  })

  // ── Loading skeleton ──
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ flex: 1, background: '#F8F8FD', padding: '40px 0' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ height: '20px', background: '#f3f4f6', borderRadius: '4px', width: '160px', marginBottom: '28px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 360px', gap: '24px' }}>
              <div>
                <div style={{ height: '28px', background: '#f3f4f6', borderRadius: '4px', width: '55%', marginBottom: '12px' }} />
                <div style={{ height: '16px', background: '#f3f4f6', borderRadius: '4px', width: '40%', marginBottom: '28px' }} />
                <div style={{ height: '180px', background: '#f3f4f6', borderRadius: '8px' }} />
              </div>
              <div style={{ height: '380px', background: '#f3f4f6', borderRadius: '12px' }} />
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
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '56px' }}>😕</div>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1E2130' }}>Job not found</h2>
          <button onClick={() => navigate('/jobs')} style={{ color: '#4F46E5', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer', fontSize: '15px' }}>
            ← Browse all jobs
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  const typeStyle = TYPE_COLORS[job.type] || { color: '#6b7280', bg: '#f3f4f6' }

  const ApplyForm = () => (
    <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #f0f0f0', padding: '28px' }}>
      {submitted ? (
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <div style={{ width: '60px', height: '60px', background: '#ECFDF5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontSize: '26px' }}>✅</div>
          <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#1E2130', margin: '0 0 8px' }}>Application Submitted!</h3>
          <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: '1.6', margin: '0 0 20px' }}>
            Thank you for applying to <strong>{job.title}</strong> at {job.company}.
          </p>
          <button onClick={() => navigate('/jobs')} style={{ color: '#4F46E5', fontWeight: '600', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
            Browse more jobs →
          </button>
        </div>
      ) : (
        <>
          <h2 style={{ fontSize: '17px', fontWeight: '700', color: '#1E2130', margin: '0 0 20px' }}>Apply Now</h2>
          {apiError && (
            <div style={{ marginBottom: '14px', padding: '12px 14px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', fontSize: '13px', color: '#EF4444' }}>
              {apiError}
            </div>
          )}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#1E2130', marginBottom: '5px' }}>Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" style={inputStyle(!!errors.name)} />
              {errors.name && <p style={{ fontSize: '12px', color: '#EF4444', margin: '4px 0 0' }}>{errors.name}</p>}
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#1E2130', marginBottom: '5px' }}>Email Address *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" style={inputStyle(!!errors.email)} />
              {errors.email && <p style={{ fontSize: '12px', color: '#EF4444', margin: '4px 0 0' }}>{errors.email}</p>}
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#1E2130', marginBottom: '5px' }}>Resume Link *</label>
              <input name="resume_link" value={form.resume_link} onChange={handleChange} placeholder="https://drive.google.com/your-resume" style={inputStyle(!!errors.resume_link)} />
              {errors.resume_link && <p style={{ fontSize: '12px', color: '#EF4444', margin: '4px 0 0' }}>{errors.resume_link}</p>}
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#1E2130', marginBottom: '5px' }}>Cover Note</label>
              <textarea name="cover_note" value={form.cover_note} onChange={handleChange} placeholder="Tell us why you're a great fit..." rows={3} style={{ ...inputStyle(false), resize: 'none', fontFamily: 'Epilogue, sans-serif' }} />
            </div>
            <button type="submit" disabled={submitting} style={{
              width: '100%', padding: '13px',
              background: submitting ? '#a5b4fc' : '#4F46E5',
              color: 'white', border: 'none', borderRadius: '8px',
              fontSize: '14px', fontWeight: '700', cursor: submitting ? 'not-allowed' : 'pointer',
              fontFamily: 'Epilogue, sans-serif',
            }}>
              {submitting ? 'Submitting...' : '📨 Submit Application'}
            </button>
          </form>
        </>
      )}
    </div>
  )

  return (
    <>
      <style>{`
        .jd-wrap { min-height: 100vh; display: flex; flex-direction: column; }
        .jd-body { flex: 1; background: #F8F8FD; }
        .jd-inner { max-width: 1200px; margin: 0 auto; padding: 40px 48px; }
        .jd-back {
          display: flex; align-items: center; gap: 8px;
          color: #6b7280; background: none; border: none;
          cursor: pointer; font-size: '14px'; margin-bottom: 28px;
          padding: 0; font-family: Epilogue, sans-serif;
          font-size: 14px;
        }
        .jd-back:hover { color: #4F46E5; }

        /* Desktop: 2-col grid */
        .jd-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 360px;
          gap: 24px;
          align-items: start;
        }
        .jd-left { display: flex; flex-direction: column; gap: 20px; }

        /* Sticky sidebar (desktop only) */
        .jd-sidebar { position: sticky; top: 88px; }

        /* Mobile apply button — hidden on desktop */
        .jd-mobile-apply-btn { display: none; }

        /* Mobile apply modal backdrop */
        .jd-apply-backdrop {
          display: none;
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 100;
          align-items: flex-end;
          justify-content: center;
        }
        .jd-apply-backdrop.open { display: flex; }
        .jd-apply-sheet {
          background: white;
          border-radius: 20px 20px 0 0;
          width: 100%;
          max-height: 92vh;
          overflow-y: auto;
          padding: 8px 0 0;
        }
        .jd-sheet-handle {
          width: 40px; height: 4px;
          background: #e5e7eb; border-radius: 2px;
          margin: 0 auto 16px;
        }

        /* ── Tablet (769–1024px) ── */
        @media (max-width: 1024px) {
          .jd-inner { padding: 32px; }
          .jd-grid { grid-template-columns: minmax(0,1fr) 320px; }
        }

        /* ── Mobile (≤768px): single col + bottom sheet ── */
        @media (max-width: 768px) {
          .jd-inner { padding: 20px 16px 100px; }
          .jd-grid { grid-template-columns: 1fr; }

          /* Hide desktop sidebar */
          .jd-sidebar { display: none; }

          /* Show sticky apply button at bottom */
          .jd-mobile-apply-btn {
            display: flex;
            position: fixed;
            bottom: 0; left: 0; right: 0;
            padding: 16px 20px;
            background: white;
            border-top: 1px solid #f0f0f0;
            box-shadow: 0 -4px 16px rgba(0,0,0,0.08);
            z-index: 90;
          }
          .jd-mobile-apply-btn button {
            width: 100%; padding: 14px;
            background: #4F46E5; color: white;
            border: none; border-radius: 10px;
            font-size: 15px; font-weight: 700;
            cursor: pointer; font-family: Epilogue, sans-serif;
          }

          /* Show backdrop on mobile */
          .jd-apply-backdrop.open { display: flex; }
        }

        /* Job header card responsive */
        .jd-header-card {
          background: white; border-radius: 16px;
          border: 1px solid #f0f0f0; padding: 28px;
        }
        .jd-header-row {
          display: flex; align-items: flex-start; gap: 18px;
        }
        .jd-header-info { flex: 1; }
        .jd-title-row {
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 12px;
          flex-wrap: wrap; margin-bottom: 12px;
        }
        .jd-meta-row {
          display: flex; gap: 16px;
          flex-wrap: wrap; margin-top: 12px;
        }
        .jd-meta-item {
          font-size: 13px; color: #6b7280;
          display: flex; align-items: center; gap: 4px;
        }

        @media (max-width: 480px) {
          .jd-header-card { padding: 20px; }
          .jd-header-row { gap: 14px; }
        }
      `}</style>

      <div className="jd-wrap">
        <Navbar />
        <div className="jd-body">
          <div className="jd-inner">

            {/* Back */}
            <button className="jd-back" onClick={() => navigate('/jobs')}>
              ← Back to jobs
            </button>

            <div className="jd-grid">

              {/* ── Left: Job Info ── */}
              <div className="jd-left">

                {/* Header card */}
                <div className="jd-header-card">
                  <div className="jd-header-row">
                    <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: '#f8f8f8', border: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>
                      🏢
                    </div>
                    <div className="jd-header-info">
                      <div className="jd-title-row">
                        <div>
                          <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#1E2130', margin: '0 0 4px' }}>{job.title}</h1>
                          <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>{job.company}</p>
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: '600', color: typeStyle.color, background: typeStyle.bg, padding: '5px 14px', borderRadius: '20px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                          {job.type}
                        </span>
                      </div>
                      <div className="jd-meta-row">
                        <span className="jd-meta-item">📍 {job.location}</span>
                        <span className="jd-meta-item">🕐 {job.type}</span>
                        {job.salary && <span className="jd-meta-item">💰 {job.salary}</span>}
                        <span style={{ fontSize: '12px', fontWeight: '500', color: '#4F46E5', background: '#EEF2FF', padding: '3px 12px', borderRadius: '20px' }}>
                          {job.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description card */}
                <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #f0f0f0', padding: '28px' }}>
                  <h2 style={{ fontSize: '17px', fontWeight: '700', color: '#1E2130', margin: '0 0 14px' }}>Job Description</h2>
                  <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.8', whiteSpace: 'pre-wrap', margin: 0 }}>
                    {job.description}
                  </p>
                  {job.requirements && job.requirements.length > 0 && (
                    <div style={{ marginTop: '24px' }}>
                      <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1E2130', margin: '0 0 14px' }}>Requirements</h3>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {job.requirements.map((req, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#6b7280' }}>
                            <span style={{ color: '#4F46E5', fontWeight: '700', marginTop: '1px', flexShrink: 0 }}>✓</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

              </div>

              {/* ── Right: Apply Form (desktop sidebar) ── */}
              <div className="jd-sidebar">
                <ApplyForm />
              </div>

            </div>
          </div>
        </div>

        {/* ── Mobile: sticky Apply button ── */}
        <div className="jd-mobile-apply-btn">
          {submitted ? (
            <button style={{ background: '#ECFDF5', color: '#059669', border: '2px solid #059669', borderRadius: '10px', padding: '14px', width: '100%', fontWeight: '700', fontSize: '15px', fontFamily: 'Epilogue, sans-serif', cursor: 'default' }}>
              ✅ Application Submitted!
            </button>
          ) : (
            <button onClick={() => setShowForm(true)}>📨 Apply for this Job</button>
          )}
        </div>

        {/* ── Mobile: bottom sheet apply form ── */}
        <div className={`jd-apply-backdrop ${showForm ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false) }}>
          <div className="jd-apply-sheet">
            <div className="jd-sheet-handle" />
            <div style={{ padding: '0 20px 32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '17px', fontWeight: '700', color: '#1E2130', margin: 0 }}>Apply for {job.title}</h2>
                <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#9ca3af', padding: '4px' }}>✕</button>
              </div>
              <ApplyForm />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default JobDetailPage