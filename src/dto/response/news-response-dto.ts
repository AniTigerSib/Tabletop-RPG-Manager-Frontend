export interface NewsAuthorResponse {
  id: number
  username: string
  displayName: string
  avatarUrl: string | null
}

export interface NewsDetailResponse {
  id: number
  title: string
  summary: string
  content: string
  createdAt: string
  updatedAt: string
  likeCount: number
  commentCount: number
  likedByCurrentUser: boolean
  author: NewsAuthorResponse
}

export interface NewsCommentResponse {
  id: number
  content: string
  createdAt: string
  updatedAt: string
  ownedByCurrentUser: boolean
  author: NewsAuthorResponse
}

export interface NewsLikeStatusResponse {
  likeCount: number
  liked: boolean
}

export interface PageResponse<T> {
  content: T[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  last: boolean
}
