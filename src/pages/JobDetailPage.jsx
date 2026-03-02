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
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    setSubmitting(true)
    try {
      await applicationsApi.submit({ ...form, job_id: job.id })
      setSubmitted(true)
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
  })

  // ── Loading ──
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', padding: '48px', width: '100%' }}>
          <div style={{ height: '24px', background: '#f3f4f6', borderRadius: '4px', width: '200px', marginBottom: '32px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px' }}>
            <div>
              <div style={{ height: '32px', background: '#f3f4f6', borderRadius: '4px', width: '60%', marginBottom: '16px' }} />
              <div style={{ height: '16px', background: '#f3f4f6', borderRadius: '4px', width: '40%', marginBottom: '32px' }} />
              <div style={{ height: '200px', background: '#f3f4f6', borderRadius: '8px' }} />
            </div>
            <div style={{ height: '400px', background: '#f3f4f6', borderRadius: '12px' }} />
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

  const TYPE_COLORS = {
    'Full-time':  { color: '#059669', bg: '#ECFDF5' },
    'Part-time':  { color: '#2563EB', bg: '#EFF6FF' },
    'Remote':     { color: '#7C3AED', bg: '#F5F3FF' },
    'Contract':   { color: '#D97706', bg: '#FFFBEB' },
    'Internship': { color: '#DB2777', bg: '#FDF2F8' },
  }
  const typeStyle = TYPE_COLORS[job.type] || { color: '#6b7280', bg: '#f3f4f6' }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div style={{ flex: 1, background: '#F8F8FD' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 48px' }}>

          {/* Back button */}
          <button
            onClick={() => navigate('/jobs')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', marginBottom: '32px', padding: 0 }}
          >
            ← Back to jobs
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px', alignItems: 'start' }}>

            {/* ── Left — Job Info ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {/* Header card */}
              <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #f0f0f0', padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                  {/* Logo */}
                  <div style={{ width: '64px', height: '64px', borderRadius: '12px', background: '#f8f8f8', border: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0 }}>
                    🏢
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                      <div>
                        <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1E2130', margin: '0 0 4px' }}>
                          {job.title}
                        </h1>
                        <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>{job.company}</p>
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: typeStyle.color, background: typeStyle.bg, padding: '6px 16px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                        {job.type}
                      </span>
                    </div>

                    {/* Meta */}
                    <div style={{ display: 'flex', gap: '20px', marginTop: '16px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '13px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        📍 {job.location}
                      </span>
                      <span style={{ fontSize: '13px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        🕐 {job.type}
                      </span>
                      {job.salary && (
                        <span style={{ fontSize: '13px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          💰 {job.salary}
                        </span>
                      )}
                      <span style={{ fontSize: '12px', fontWeight: '500', color: '#4F46E5', background: '#EEF2FF', padding: '3px 12px', borderRadius: '20px' }}>
                        {job.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description card */}
              <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #f0f0f0', padding: '32px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1E2130', margin: '0 0 16px' }}>
                  Job Description
                </h2>
                <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.8', whiteSpace: 'pre-wrap', margin: 0 }}>
                  {job.description}
                </p>

                {/* Requirements */}
                {job.requirements && job.requirements.length > 0 && (
                  <div style={{ marginTop: '28px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1E2130', margin: '0 0 16px' }}>
                      Requirements
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {job.requirements.map((req, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#6b7280' }}>
                          <span style={{ color: '#4F46E5', fontWeight: '700', marginTop: '1px' }}>✓</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* ── Right — Apply Form ── */}
            <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #f0f0f0', padding: '32px', position: 'sticky', top: '88px' }}>

              {submitted ? (
                /* Success state */
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ width: '64px', height: '64px', background: '#ECFDF5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '28px' }}>
                    ✅
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1E2130', margin: '0 0 8px' }}>
                    Application Submitted!
                  </h3>
                  <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: '1.6', margin: '0 0 24px' }}>
                    Thank you for applying to <strong>{job.title}</strong> at {job.company}. Good luck!
                  </p>
                  <button
                    onClick={() => navigate('/jobs')}
                    style={{ color: '#4F46E5', fontWeight: '600', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Browse more jobs →
                  </button>
                </div>
              ) : (
                /* Apply form */
                <>
                  <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1E2130', margin: '0 0 24px' }}>
                    Apply Now
                  </h2>

                  {/* API error */}
                  {apiError && (
                    <div style={{ marginBottom: '16px', padding: '12px 16px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', fontSize: '13px', color: '#EF4444' }}>
                      {apiError}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                    {/* Name */}
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#1E2130', marginBottom: '6px' }}>
                        Full Name *
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        style={inputStyle(!!errors.name)}
                      />
                      {errors.name && <p style={{ fontSize: '12px', color: '#EF4444', margin: '4px 0 0' }}>{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#1E2130', marginBottom: '6px' }}>
                        Email Address *
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        style={inputStyle(!!errors.email)}
                      />
                      {errors.email && <p style={{ fontSize: '12px', color: '#EF4444', margin: '4px 0 0' }}>{errors.email}</p>}
                    </div>

                    {/* Resume Link */}
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#1E2130', marginBottom: '6px' }}>
                        Resume Link *
                      </label>
                      <input
                        name="resume_link"
                        value={form.resume_link}
                        onChange={handleChange}
                        placeholder="https://drive.google.com/your-resume"
                        style={inputStyle(!!errors.resume_link)}
                      />
                      {errors.resume_link && <p style={{ fontSize: '12px', color: '#EF4444', margin: '4px 0 0' }}>{errors.resume_link}</p>}
                    </div>

                    {/* Cover Note */}
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#1E2130', marginBottom: '6px' }}>
                        Cover Note
                      </label>
                      <textarea
                        name="cover_note"
                        value={form.cover_note}
                        onChange={handleChange}
                        placeholder="Tell us why you're a great fit..."
                        rows={4}
                        style={{ ...inputStyle(false), resize: 'none', fontFamily: 'Epilogue, sans-serif' }}
                      />
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      style={{
                        width: '100%',
                        padding: '14px',
                        background: submitting ? '#a5b4fc' : '#4F46E5',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '15px',
                        fontWeight: '700',
                        cursor: submitting ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        fontFamily: 'Epilogue, sans-serif',
                      }}
                    >
                      {submitting ? 'Submitting...' : '📨 Submit Application'}
                    </button>

                  </form>
                </>
              )}
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default JobDetailPage