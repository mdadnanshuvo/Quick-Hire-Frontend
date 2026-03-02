import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav style={{ background: 'white', borderBottom: '1px solid #f0f0f0', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <div style={{ width: '32px', height: '32px', background: '#4F46E5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '12px', height: '12px', background: 'white', borderRadius: '50%' }} />
          </div>
          <span style={{ fontSize: '20px', fontWeight: '700', color: '#1E2130' }}>QuickHire</span>
        </Link>

        {/* Nav Links */}
        <div style={{ display: 'flex', gap: '32px' }}>
          <Link to="/jobs" style={{ color: '#6b7280', fontWeight: '500', textDecoration: 'none', fontSize: '15px' }}>Find Jobs</Link>
          <Link to="/jobs" style={{ color: '#6b7280', fontWeight: '500', textDecoration: 'none', fontSize: '15px' }}>Browse Companies</Link>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link to="/admin/login" style={{ padding: '8px 20px', background: 'transparent', border: 'none', color: '#4F46E5', fontWeight: '600', fontSize: '14px', cursor: 'pointer', textDecoration: 'none' }}>
            Login
          </Link>
          <Link to="/admin/login" style={{ padding: '8px 20px', background: '#4F46E5', color: 'white', fontWeight: '600', fontSize: '14px', borderRadius: '8px', cursor: 'pointer', textDecoration: 'none' }}>
            Sign Up
          </Link>
        </div>

      </div>
    </nav>
  )
}

export default Navbar