export interface AuthResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
  userId: number
  username: string
  roles: [string]
}
