import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi, userApi } from '@/api'
import type { LoginRequest } from '@/dto/request/login-request-dto'
import type { RegisterRequest } from '@/dto/request/register-request-dto'
import type { RefreshRequest } from '@/dto/request/refresh-request-dto'
import type { AuthResponse } from '@/dto/response/auth-response-dto'
// import type { UserFullProfileResponse } from '@/dto/response/user-full-profile-response-dto'
import type { BasicUser } from '@/types/basic-user-info'
import type { SelfUserProfile } from '@/types/self-user-profile'

const AUTH_STORAGE_KEY = 'trpg-auth'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: BasicUser | null
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const accessToken = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const user = ref<BasicUser | null>(null)
  const userProfile = ref<SelfUserProfile | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!user.value)
  const currentUser = computed(() => userProfile.value)
  const hasRole = computed(() => (role: string) => {
    return user.value?.roles.includes(role) || false
  })

  // Actions
  const setAuthData = (authResponse: AuthResponse) => {
    accessToken.value = authResponse.accessToken
    refreshToken.value = authResponse.refreshToken
    user.value = { ...authResponse }
    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({
          accessToken: authResponse.accessToken,
          refreshToken: authResponse.refreshToken,
          user: user.value,
        }),
      )
    }
  }

  const clearAuthData = () => {
    accessToken.value = null
    refreshToken.value = null
    user.value = null
    userProfile.value = null
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
      const response = await authApi.login(loginRequest)
      setAuthData(response)

      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  const fetchCurrentUser = async (): Promise<boolean> => {
    if (!accessToken.value) {
      return false
    }

    try {
      const profile = await userApi.getCurrentUser()
      userProfile.value = profile
      return true
    } catch (error) {
      console.error('Failed to fetch current user:', error)
      return false
    }
  }

  const register = async (registerRequest: RegisterRequest): Promise<boolean> => {
    try {
      await authApi.register(registerRequest)
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
        await authApi.logout()
      }
    } catch (error) {
      console.error('Logout API call failed:', error)
      // We still want to clear local auth data even if API call fails
    } finally {
      clearAuthData()
      return true
    }
  }

  const refreshTokens = async (): Promise<boolean> => {
    if (!refreshToken.value) {
      return false
    }

    try {
      const refreshRequest: RefreshRequest = {
        refreshToken: refreshToken.value,
      }

      const response = await authApi.refresh(refreshRequest)
      setAuthData(response)
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
    userProfile,

    // Getters
    isAuthenticated,
    currentUser,
    hasRole,

    // Actions
    setAuthData,
    clearAuthData,
    initializeAuth,
    login,
    register,
    logout,
    refreshTokens,
    fetchCurrentUser,
  }
})
