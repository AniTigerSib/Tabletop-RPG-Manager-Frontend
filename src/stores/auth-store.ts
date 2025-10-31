import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiClient from '@/services/api-service'
import type { LoginRequest } from '@/dto/request/login-request-dto'
import type { RegisterRequest } from '@/dto/request/register-request-dto'
import type { RefreshRequest } from '@/dto/request/refresh-request-dto'
import type { AuthResponse } from '@/dto/response/auth-response-dto'
import type { UserFullProfileResponse } from '@/dto/response/user-full-profile-response-dto'

const AUTH_STORAGE_KEY = 'trpg-auth'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: UserFullProfileResponse | null
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const accessToken = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const user = ref<UserFullProfileResponse | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!user.value)
  const currentUser = computed(() => user.value)
  const hasRole = computed(() => (role: string) => {
    return user.value?.roles.includes(role) || false
  })

  // Actions
  const setAuthData = (authResponse: AuthResponse) => {
    accessToken.value = authResponse.accessToken
    refreshToken.value = authResponse.refreshToken
    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({
          accessToken: authResponse.accessToken,
          refreshToken: authResponse.refreshToken,
          user: null, // We'll fetch user separately
        }),
      )
    }
  }

  const setUser = (userData: UserFullProfileResponse) => {
    user.value = userData
    // Update localStorage with user data
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem(AUTH_STORAGE_KEY)
      if (storedData) {
        const authState: AuthState = JSON.parse(storedData)
        authState.user = userData
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState))
      }
    }
  }

  const clearAuthData = () => {
    accessToken.value = null
    refreshToken.value = null
    user.value = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    }
  }

  const initializeAuth = () => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem(AUTH_STORAGE_KEY)
      if (storedData) {
        try {
          const authState: AuthState = JSON.parse(storedData)
          accessToken.value = authState.accessToken
          refreshToken.value = authState.refreshToken
          user.value = authState.user
        } catch (e) {
          console.error('Failed to parse auth data from localStorage', e)
          clearAuthData()
        }
      }
    }
  }

  const login = async (loginRequest: LoginRequest): Promise<boolean> => {
    try {
      // Create a separate axios instance for login (without auth interceptor)
      const loginClient = apiClient.create({
        baseURL: 'http://localhost:8080',
        timeout: 10000,
      })

      const response = await loginClient.post<AuthResponse>('/api/auth/login', loginRequest)
      setAuthData(response.data)

      // Fetch user profile after successful login
      await fetchCurrentUser()

      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  const register = async (registerRequest: RegisterRequest): Promise<boolean> => {
    try {
      // Create a separate axios instance for registration (without auth interceptor)
      const registerClient = apiClient.create({
        baseURL: 'http://localhost:8080',
        timeout: 10000,
      })

      await registerClient.post('/api/auth/register', registerRequest)
      return true
    } catch (error) {
      console.error('Registration failed:', error)
      return false
    }
  }

  const logout = async (): Promise<boolean> => {
    try {
      // Only call logout API if we have a refresh token
      if (refreshToken.value) {
        await apiClient.post('/api/auth/logout')
      }
    } catch (error) {
      console.error('Logout API call failed:', error)
      // We still want to clear local auth data even if API call fails
    } finally {
      clearAuthData()
      return true
    }
  }

  const fetchCurrentUser = async (): Promise<boolean> => {
    if (!accessToken.value) {
      return false
    }

    try {
      const response = await apiClient.get<UserFullProfileResponse>('/api/users/me')
      setUser(response.data)
      return true
    } catch (error) {
      console.error('Failed to fetch current user:', error)
      // If unauthorized, clear auth data
      return false
    }
  }

  const refreshTokens = async (): Promise<boolean> => {
    if (!refreshToken.value) {
      return false
    }

    try {
      // Create a separate axios instance for token refresh (without auth interceptor)
      const refreshClient = apiClient.create({
        baseURL: 'http://localhost:8080',
        timeout: 10000,
      })

      const refreshRequest: RefreshRequest = {
        refreshToken: refreshToken.value,
      }

      const response = await refreshClient.post<AuthResponse>('/api/auth/refresh', refreshRequest)
      setAuthData(response.data)
      return true
    } catch (error) {
      console.error('Token refresh failed:', error)
      clearAuthData()
      return false
    }
  }

  return {
    // State
    accessToken,
    refreshToken,
    user,

    // Getters
    isAuthenticated,
    currentUser,
    hasRole,

    // Actions
    setAuthData,
    setUser,
    clearAuthData,
    initializeAuth,
    login,
    register,
    logout,
    fetchCurrentUser,
    refreshTokens,
  }
})
