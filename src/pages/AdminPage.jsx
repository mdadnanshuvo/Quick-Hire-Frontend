import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { jobsApi, applicationsApi } from '../services/api'

const JOB_TYPES = ['Full-time', 'Part-time', 'Remote', 'Contract', 'Internship']

const EMPTY_FORM = {
  title: '', company: '', location: '', category: '',
  type: 'Full-time', salary: '', description: '', requirements: '', logo_url: '',
}

const AdminPage = () => {
  const { admin, logout, isAdmin, loading: authLoading } = useAuth()
  const navigate = useNavigate()

  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('jobs')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [formErrors, setFormErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    if (!authLoading && !isAdmin) navigate('/admin/login')
  }, [isAdmin, authLoading, navigate])

  useEffect(() => {
    if (isAdmin) fetchData()
  }, [isAdmin])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [jobsRes, appsRes] = await Promise.all([
        jobsApi.getAll(),
        applicationsApi.getAll(),
      ])
      setJobs(jobsRes.data.data)
      setApplications(appsRes.data.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const validateForm = () => {
    const e = {}
    if (!form.title.trim())       e.title       = 'Required'
    if (!form.company.trim())     e.company     = 'Required'
    if (!form.location.trim())    e.location    = 'Required'
    if (!form.category.trim())    e.category    = 'Required'
    if (!form.description.trim()) e.description = 'Required'
    return e
  }

  const handleCreate = async (e) => {
  e.preventDefault()
  const errors = validateForm()
  if (Object.keys(errors).length > 0) { setFormErrors(errors); return }
  setFormErrors({})
  setSubmitting(true)
  try {
    const payload = {
      title:        form.title,
      company:      form.company,
      location:     form.location,
      category:     form.category,
      type:         form.type,
      description:  form.description,
      requirements: form.requirements
        ? form.requirements.split('\n').map(r => r.trim()).filter(Boolean)
        : [],
      // Only include optional fields if they have a value
      ...(form.salary   && { salary:   form.salary }),
      ...(form.logo_url && { logo_url: form.logo_url }),
    }
    await jobsApi.create(payload)
    setForm(EMPTY_FORM)
    setShowForm(false)
    fetchData()
  } catch (err) {
    console.error(err.response?.data) // 👈 shows exact validation errors
  } finally {
    setSubmitting(false)
  }
}

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this job? All applications will also be removed.')) return
    setDeletingId(id)
    try {
      await jobsApi.remove(id)
      setJobs(prev => prev.filter(j => j.id !== id))
    } catch (err) {
      console.error(err)
    } finally {
      setDeletingId(null)
    }
  }

  const handleLogout = () => { logout(); navigate('/') }

  const inputStyle = (hasError) => ({
    width: '100%',
    padding: '10px 14px',
    fontSize: '14px',
    border: `1px solid ${hasError ? '#FCA5A5' : '#e5e7eb'}`,
    borderRadius: '8px',
    outline: 'none',
    background: hasError ? '#FEF2F2' : '#f8f8f8',
    color: '#1E2130',
    boxSizing: 'border-box',
    fontFamily: 'Epilogue, sans-serif',
  })

  if (authLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '16px', color: '#9ca3af' }}>Loading...</div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8F8FD' }}>

      {/* Admin Navbar */}
      <nav style={{ background: 'white', borderBottom: '1px solid #f0f0f0', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              <div style={{ width: '32px', height: '32px', background: '#4F46E5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '12px', height: '12px', background: 'white', borderRadius: '50%' }} />
              </div>
              <span style={{ fontSize: '18px', fontWeight: '700', color: '#1E2130' }}>QuickHire</span>
            </Link>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#4F46E5', background: '#EEF2FF', padding: '3px 10px', borderRadius: '20px' }}>
              Admin
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '14px', color: '#9ca3af' }}>{admin?.email}</span>
            <button
              onClick={handleLogout}
              style={{ padding: '8px 16px', background: '#FEF2F2', color: '#EF4444', border: '1px solid #FECACA', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 48px' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
          {[
            { label: 'Total Jobs',         value: jobs.length,                                             icon: '💼', bg: '#EEF2FF' },
            { label: 'Total Applications', value: applications.length,                                     icon: '👥', bg: '#ECFDF5' },
            { label: 'Pending Review',     value: applications.filter(a => a.status === 'pending').length, icon: '⏳', bg: '#FFFBEB' },
          ].map(stat => (
            <div key={stat.label} style={{ background: 'white', borderRadius: '12px', border: '1px solid #f0f0f0', padding: '24px' }}>
              <div style={{ width: '40px', height: '40px', background: stat.bg, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '12px' }}>
                {stat.icon}
              </div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#1E2130' }}>{stat.value}</div>
              <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs + Post button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '4px', background: 'white', border: '1px solid #f0f0f0', borderRadius: '12px', padding: '4px' }}>
            {['jobs', 'applications'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '8px 20px', borderRadius: '8px', border: 'none',
                  fontSize: '14px', fontWeight: '600', cursor: 'pointer',
                  textTransform: 'capitalize',
                  background: activeTab === tab ? '#4F46E5' : 'transparent',
                  color: activeTab === tab ? 'white' : '#6b7280',
                  fontFamily: 'Epilogue, sans-serif',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          {activeTab === 'jobs' && (
            <button
              onClick={() => setShowForm(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#4F46E5', color: 'white', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: 'Epilogue, sans-serif' }}
            >
              + Post a Job
            </button>
          )}
        </div>

        {/* ── Jobs Tab ── */}
        {activeTab === 'jobs' && (
          loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} style={{ background: 'white', borderRadius: '12px', border: '1px solid #f0f0f0', padding: '20px', display: 'flex', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', background: '#f3f4f6', borderRadius: '10px' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ height: '16px', background: '#f3f4f6', borderRadius: '4px', width: '40%', marginBottom: '8px' }} />
                    <div style={{ height: '13px', background: '#f3f4f6', borderRadius: '4px', width: '25%' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #f0f0f0', padding: '60px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>💼</div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1E2130', marginBottom: '8px' }}>No jobs posted yet</h3>
              <button
                onClick={() => setShowForm(true)}
                style={{ marginTop: '16px', padding: '10px 24px', background: '#4F46E5', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
              >
                Post your first job
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {jobs.map(job => (
                <div key={job.id} style={{ background: 'white', borderRadius: '12px', border: '1px solid #f0f0f0', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: '#f8f8f8', border: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>
                    🏢
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1E2130', margin: '0 0 4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {job.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>
                      {job.company} · {job.location} · {job.type}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                    <Link
                      to={`/jobs/${job.id}`}
                      style={{ padding: '8px 16px', background: '#EEF2FF', color: '#4F46E5', borderRadius: '8px', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(job.id)}
                      disabled={deletingId === job.id}
                      style={{ padding: '8px 16px', background: '#FEF2F2', color: '#EF4444', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'Epilogue, sans-serif' }}
                    >
                      {deletingId === job.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {/* ── Applications Tab ── */}
        {activeTab === 'applications' && (
          loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} style={{ background: 'white', borderRadius: '12px', border: '1px solid #f0f0f0', padding: '20px' }}>
                  <div style={{ height: '16px', background: '#f3f4f6', borderRadius: '4px', width: '30%', marginBottom: '8px' }} />
                  <div style={{ height: '13px', background: '#f3f4f6', borderRadius: '4px', width: '20%' }} />
                </div>
              ))}
            </div>
          ) : applications.length === 0 ? (
            <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #f0f0f0', padding: '60px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>👥</div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1E2130' }}>No applications yet</h3>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {applications.map(app => (
                <div key={app.id} style={{ background: 'white', borderRadius: '12px', border: '1px solid #f0f0f0', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', flexWrap: 'wrap' }}>
                      <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1E2130', margin: 0 }}>{app.name}</h3>
                      <span style={{
                        fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '20px',
                        color:       app.status === 'pending' ? '#D97706' : app.status === 'shortlisted' ? '#059669' : app.status === 'reviewed' ? '#2563EB' : '#EF4444',
                        background:  app.status === 'pending' ? '#FFFBEB' : app.status === 'shortlisted' ? '#ECFDF5' : app.status === 'reviewed' ? '#EFF6FF' : '#FEF2F2',
                      }}>
                        {app.status}
                      </span>
                    </div>
                    <p style={{ fontSize: '13px', color: '#9ca3af', margin: '0 0 4px' }}>{app.email}</p>
                    {app.job && (
                      <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
                        Applied for: <span style={{ color: '#4F46E5', fontWeight: '600' }}>{app.job.title}</span> @ {app.job.company}
                      </p>
                    )}
                  </div>
                  <a  
                    href={app.resume_link}
                    target="_blank"
                    rel="noreferrer"
                    style={{ padding: '8px 16px', background: '#f8f8f8', color: '#1E2130', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', fontWeight: '600', textDecoration: 'none', whiteSpace: 'nowrap' }}
                  >
                    View Resume
                  </a>
                </div>
              ))}
            </div>
          )
        )}

      </div>

      {/* ── Create Job Modal ── */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ background: 'white', borderRadius: '20px', width: '100%', maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 60px rgba(0,0,0,0.2)' }}>

            {/* Modal header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 28px', borderBottom: '1px solid #f0f0f0' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1E2130', margin: 0 }}>Post a New Job</h2>
              <button
                onClick={() => { setShowForm(false); setFormErrors({}) }}
                style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #f0f0f0', background: '#f8f8f8', cursor: 'pointer', fontSize: '16px' }}
              >
                ✕
              </button>
            </div>

            {/* Modal form */}
            <form onSubmit={handleCreate} style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#1E2130', marginBottom: '6px' }}>Job Title *</label>
                  <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Frontend Developer" style={inputStyle(!!formErrors.title)} />
                  {formErrors.title && <p style={{ fontSize: '12px', color: '#EF4444', margin: '4px 0 0' }}>{formErrors.title}</p>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#1E2130', marginBottom: '6px' }}>Company *</label>
                  <input value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} placeholder="e.g. TechCorp Ltd" style={inputStyle(!!formErrors.company)} />
                  {formErrors.company && <p style={{ fontSize: '12px', color: '#EF4444', margin: '4px 0 0' }}>{formErrors.company}</p>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#1E2130', marginBottom: '6px' }}>Location *</label>
                  <input value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} placeholder="e.g. Dhaka, Bangladesh" style={inputStyle(!!formErrors.location)} />
                  {formErrors.location && <p style={{ fontSize: '12px', color: '#EF4444', margin: '4px 0 0' }}>{formErrors.location}</p>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#1E2130', marginBottom: '6px' }}>Category *</label>
                  <input value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} placeholder="e.g. Engineering" style={inputStyle(!!formErrors.category)} />
                  {formErrors.category && <p style={{ fontSize: '12px', color: '#EF4444', margin: '4px 0 0' }}>{formErrors.category}</p>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#1E2130', marginBottom: '6px' }}>Job Type</label>
                  <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} style={{ ...inputStyle(false), cursor: 'pointer' }}>
                    {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#1E2130', marginBottom: '6px' }}>Salary (optional)</label>
                  <input value={form.salary} onChange={e => setForm(p => ({ ...p, salary: e.target.value }))} placeholder="e.g. $50k–$70k" style={inputStyle(false)} />
                </div>

              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#1E2130', marginBottom: '6px' }}>Logo URL (optional)</label>
                <input value={form.logo_url} onChange={e => setForm(p => ({ ...p, logo_url: e.target.value }))} placeholder="https://example.com/logo.png" style={inputStyle(false)} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#1E2130', marginBottom: '6px' }}>Description *</label>
                <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Describe the role and responsibilities..." rows={4} style={{ ...inputStyle(!!formErrors.description), resize: 'none', fontFamily: 'Epilogue, sans-serif' }} />
                {formErrors.description && <p style={{ fontSize: '12px', color: '#EF4444', margin: '4px 0 0' }}>{formErrors.description}</p>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#1E2130', marginBottom: '6px' }}>
                  Requirements <span style={{ color: '#9ca3af', fontWeight: '400' }}>(one per line)</span>
                </label>
                <textarea value={form.requirements} onChange={e => setForm(p => ({ ...p, requirements: e.target.value }))} placeholder={'React\nTypeScript\n3+ years experience'} rows={3} style={{ ...inputStyle(false), resize: 'none', fontFamily: 'Epilogue, sans-serif' }} />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setFormErrors({}) }}
                  style={{ flex: 1, padding: '12px', background: '#f8f8f8', color: '#6b7280', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: 'Epilogue, sans-serif' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{ flex: 1, padding: '12px', background: submitting ? '#a5b4fc' : '#4F46E5', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'Epilogue, sans-serif' }}
                >
                  {submitting ? 'Posting...' : '+ Post Job'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  )
}

export default AdminPage