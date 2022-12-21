import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.response.use(
  (config) => config.data,
  (config) => Promise.reject(config.response.data)
)
