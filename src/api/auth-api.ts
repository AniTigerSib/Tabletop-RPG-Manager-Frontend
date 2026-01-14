import type { LoginRequest } from '@/dto/request/login-request-dto'
import type { RegisterRequest } from '@/dto/request/register-request-dto'
import type { RefreshRequest } from '@/dto/request/refresh-request-dto'
import type { AuthResponse } from '@/dto/response/auth-response-dto'
import axios, { type AxiosInstance } from 'axios'
import { apiClient } from './api-client'

// Create a separate axios instance for auth operations (without auth interceptor)
const createAuthClient = (): AxiosInstance => {
  return axios.create({
    baseURL: 'https://tabletop-assistent.ru/api',
    timeout: 10000,
  })
}

export const authApi = {
  login: async (loginRequest: LoginRequest): Promise<AuthResponse> => {
    const authClient = createAuthClient()
    const response = await authClient.post<AuthResponse>('/auth/login', loginRequest)
    return response.data
  },

  register: async (registerRequest: RegisterRequest): Promise<void> => {
    const authClient = createAuthClient()
    await authClient.post('/auth/register', registerRequest)
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout')
  },

  refresh: async (refreshRequest: RefreshRequest): Promise<AuthResponse> => {
    const authClient = createAuthClient()
    const response = await authClient.post<AuthResponse>('/auth/refresh', refreshRequest)
    return response.data
  },
}
