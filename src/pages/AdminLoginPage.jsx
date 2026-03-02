import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const AdminLoginPage = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/admin')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    fontSize: '14px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    outline: 'none',
    background: '#f8f8f8',
    color: '#1E2130',
    boxSizing: 'border-box',
    fontFamily: 'Epilogue, sans-serif',
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8F8FD', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <div style={{ width: '40px', height: '40px', background: '#4F46E5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '16px', height: '16px', background: 'white', borderRadius: '50%' }} />
            </div>
            <span style={{ fontSize: '24px', fontWeight: '700', color: '#1E2130' }}>QuickHire</span>
          </a>
          <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#1E2130', margin: '24px 0 4px' }}>Admin Login</h1>
          <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>Sign in to manage job listings</p>
        </div>

        {/* Card */}
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #f0f0f0', padding: '32px' }}>

          {/* Error message */}
          {error && (
            <div style={{ marginBottom: '20px', padding: '12px 16px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', fontSize: '13px', color: '#EF4444', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#1E2130', marginBottom: '6px' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@quickhire.com"
                required
                style={inputStyle}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#1E2130', marginBottom: '6px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{ ...inputStyle, paddingRight: '44px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#9ca3af' }}
                >
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                background: loading ? '#a5b4fc' : '#4F46E5',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'Epilogue, sans-serif',
                marginTop: '8px',
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

          </form>

          {/* Default credentials hint */}
          <div style={{ marginTop: '20px', padding: '12px 16px', background: '#F8F8FD', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 4px' }}>Default credentials</p>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, fontFamily: 'monospace' }}>
              admin@quickhire.com / Admin@1234
            </p>
          </div>
        </div>

        {/* Back link */}
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          <a href="/" style={{ fontSize: '14px', color: '#9ca3af', textDecoration: 'none' }}>
            ← Back to home
          </a>
        </p>

      </div>
    </div>
  )
}

export default AdminLoginPage