import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  headers: { 'Content-Type': 'application/json' },
})

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('qh_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const jobsApi = {
  getAll:     (params) => api.get('/jobs', { params }),
  getById:    (id)     => api.get(`/jobs/${id}`),
  create:     (data)   => api.post('/jobs', data),
  update:     (id, data) => api.put(`/jobs/${id}`, data),
  remove:     (id)     => api.delete(`/jobs/${id}`),
  getFilters: ()       => api.get('/jobs/meta/filters'),
}

export const applicationsApi = {
  submit:       (data)         => api.post('/applications', data),
  getAll:       (params)       => api.get('/applications', { params }),
  getById:      (id)           => api.get(`/applications/${id}`),
  updateStatus: (id, status)   => api.patch(`/applications/${id}/status`, { status }),
}

export const authApi = {
  login: (data) => api.post('/auth/login', data),
  me:    ()     => api.get('/auth/me'),
}

export default api