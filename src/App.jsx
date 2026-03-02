import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import HomePage from './pages/HomePage'
import JobsPage from './pages/JobsPage'
import JobDetailPage from './pages/JobDetailPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/"            element={<HomePage />} />
        <Route path="/jobs"        element={<JobsPage />} />
        <Route path="/jobs/:id"    element={<JobDetailPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin"       element={<AdminPage />} />
      </Routes>
    </AuthProvider>
  )
}

export default App