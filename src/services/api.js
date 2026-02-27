import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
})

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.detail ||
      error.message ||
      'An unexpected error occurred'
    return Promise.reject(new Error(message))
  },
)

export const reviewCode = (code, mode = 'hybrid') => {
  return api.post('/analyze', {
    code,
    mode,
  })
}

export const healthCheck = () => {
  return api.get('/health')
}

export default api
