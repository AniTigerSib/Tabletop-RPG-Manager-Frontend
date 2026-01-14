export interface AuthResponse {
  accessToken: string
  refreshToken: string
  userId: number
  username: string
  roles: string[]
}
