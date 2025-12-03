import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log("[v0] API Request:", config.method?.toUpperCase(), config.url)
    return config
  },
  (error) => {
    console.error("[v0] Request error:", error)
    return Promise.reject(error)
  },
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log("[v0] API Response:", response.status, response.config.url)
    return response
  },
  (error) => {
    console.error("[v0] Response error:", error.response?.status, error.config?.url)
    return Promise.reject(error)
  },
)
