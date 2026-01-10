import axios, { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/stores/auth-store'

// Extend the Axios request config type to include _retry property
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

// Create axios instance with base configuration
const createApiClient = (): AxiosInstance => {
  const apiClient: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8090',
    timeout: 10000,
  })

  // Request interceptor to add auth token
  apiClient.interceptors.request.use(
    (config) => {
      const authStore = useAuthStore()
      if (authStore.accessToken) {
        console.log('Token sent')
        config.headers.Authorization = `Bearer ${authStore.accessToken}`
      } else {
        console.log('Token not sent')
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  // Response interceptor to handle token refresh
  apiClient.interceptors.response.use(
    (response) => {
      return response
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as CustomAxiosRequestConfig

      // If error is 401 and we haven't tried to refresh token yet
      if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
        originalRequest._retry = true

        const authStore = useAuthStore()
        try {
          // Try to refresh tokens
          const refreshSuccess = await authStore.refreshTokens()
          if (refreshSuccess) {
            // Retry the original request with new token
            return apiClient(originalRequest)
          }
        } catch (refreshError) {
          // If refresh fails, logout user
          authStore.logout()
          // Log the error for debugging
          console.error('Token refresh failed:', refreshError)
        }
      }

      return Promise.reject(error)
    },
  )

  return apiClient
}

export const apiClient = createApiClient()
