import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userApi } from '@/api'
import type { SelfUserProfile } from '@/types/self-user-profile'

export const useProfilesStore = defineStore('profiles', () => {
  // Cache for non-self profiles by id
  const profiles = ref<Record<number, SelfUserProfile>>({})

  const profileById = (userId?: number): SelfUserProfile | null => {
    if (userId === undefined) return null
    return profiles.value[userId] ?? null
  }

  const fetchProfileById = async (userId: number): Promise<SelfUserProfile> => {
    // Placeholder for future: fetch arbitrary user profiles
    const profile = await userApi.getProfileById(userId)
    profiles.value[userId] = profile
    return profile
  }

  const clearProfiles = () => {
    profiles.value = {}
  }

  return {
    profiles,
    profileById,
    fetchProfileById,
    clearProfiles,
  }
})
