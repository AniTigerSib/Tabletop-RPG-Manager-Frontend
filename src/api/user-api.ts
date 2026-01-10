import { apiClient } from '@/api'
import type { SelfUserProfile } from '@/types/self-user-profile'

export const userApi = {
  getCurrentUser: async (): Promise<SelfUserProfile> => {
    const response = await apiClient.get<SelfUserProfile>('/api/users/me')
    return response.data
  },
}
