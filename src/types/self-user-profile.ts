export interface SelfUserProfile {
  id: number
  username: string
  email: string
  displayName: string
  bio: string | null
  avatarUrl: string | null
  roles: string[]
}
