import { apiClient } from '@/api'
import type { SelfUserProfile } from '@/types/self-user-profile'

export const userApi = {
  getCurrentUser: async (): Promise<SelfUserProfile> => {
    const response = await apiClient.get<SelfUserProfile>('/users/me')
    return response.data
  },

  // Placeholder for non-self profiles; adjust response type when public profile DTO appears
  getProfileById: async (userId: number): Promise<SelfUserProfile> => {
    const response = await apiClient.get<SelfUserProfile>(`/users/${userId}/full`)
    return response.data
  },
}
