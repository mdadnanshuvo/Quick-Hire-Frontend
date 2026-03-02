import { createContext, useContext, useState, useEffect } from 'react'
import { authApi } from '../services/api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('qh_token')
    if (token) {
      authApi.me()
        .then(res => {
          setAdmin(res.data.data)
        })
        .catch(() => {
          // Token invalid or expired — clear it
          localStorage.removeItem('qh_token')
          setAdmin(null)
        })
        .finally(() => setLoading(false))
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    const res = await authApi.login({ email, password })
    const { token, admin } = res.data.data
    localStorage.setItem('qh_token', token)
    setAdmin(admin)
    return res.data
  }

  const logout = () => {
    localStorage.removeItem('qh_token')
    setAdmin(null)
  }

  return (
    <AuthContext.Provider value={{
      admin,
      login,
      logout,
      loading,
      isAdmin: !!admin,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)