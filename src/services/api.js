import axios from 'axios'

// ---------- Dynamic BASE_URL for dev vs prod ----------
const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://codereviewerbackend-yet6.onrender.com' // Your deployed backend URL
    : 'http://localhost:8000' // Local backend for testing

// ---------- Create Axios instance ----------
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // 30 seconds
})

// ---------- Global response interceptor ----------
api.interceptors.response.use(
  (response) => response.data, // Return only data
  (error) => {
    const message =
      error.response?.data?.detail ||
      error.response?.data?.error ||
      error.message ||
      'An unexpected error occurred'
    return Promise.reject(new Error(message))
  }
)

// ---------- API functions ----------

// 1️⃣ Run Python code
export const runCode = (code) => {
  return api.post('/api/run-code', { code })
}

// 2️⃣ AI Code Review
export const reviewCode = (code, mode = 'hybrid') => {
  return api.post('/api/analyze', { code, mode })
}

// 3️⃣ Health Check
export const healthCheck = () => {
  return api.get('/api/health')
}

export default api