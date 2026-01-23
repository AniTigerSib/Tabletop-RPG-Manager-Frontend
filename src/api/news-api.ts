import { apiClient } from '@/api/api-client'
import type { CreateNewsRequest } from '@/dto/request/create-news-request-dto'
import type { UpdateNewsRequest } from '@/dto/request/update-news-request-dto'
import type { CreateNewsCommentRequest } from '@/dto/request/create-news-comment-request-dto'
import type { UpdateNewsCommentRequest } from '@/dto/request/update-news-comment-request-dto'
import type {
  NewsDetailResponse,
  NewsLikeStatusResponse,
  NewsCommentResponse,
  PageResponse,
} from '@/dto/response/news-response-dto'

export const newsApi = {
  getNews: async (page = 0, size = 10): Promise<PageResponse<NewsDetailResponse>> => {
    const response = await apiClient.get<PageResponse<NewsDetailResponse>>('/news', {
      params: { page, size },
    })
    return response.data
  },

  getNewsArticle: async (articleId: number): Promise<NewsDetailResponse> => {
    const response = await apiClient.get<NewsDetailResponse>(`/news/${articleId}`)
    return response.data
  },

  createNews: async (payload: CreateNewsRequest): Promise<NewsDetailResponse> => {
    const response = await apiClient.post<NewsDetailResponse>('/news', payload)
    return response.data
  },

  updateNews: async (articleId: number, payload: UpdateNewsRequest): Promise<NewsDetailResponse> => {
    const response = await apiClient.put<NewsDetailResponse>(`/news/${articleId}`, payload)
    return response.data
  },

  uploadNewsImage: async (articleId: number, file: File): Promise<NewsDetailResponse> => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await apiClient.post<NewsDetailResponse>(`/news/${articleId}/image`, formData)
    return response.data
  },

  updateNewsImage: async (articleId: number, file: File): Promise<NewsDetailResponse> => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await apiClient.put<NewsDetailResponse>(`/news/${articleId}/image`, formData)
    return response.data
  },

  deleteNewsImage: async (articleId: number): Promise<NewsDetailResponse> => {
    const response = await apiClient.delete<NewsDetailResponse>(`/news/${articleId}/image`)
    return response.data
  },

  deleteNews: async (articleId: number): Promise<void> => {
    await apiClient.delete(`/news/${articleId}`)
  },

  likeNews: async (articleId: number): Promise<NewsLikeStatusResponse> => {
    const response = await apiClient.post<NewsLikeStatusResponse>(`/news/${articleId}/likes`)
    return response.data
  },

  unlikeNews: async (articleId: number): Promise<NewsLikeStatusResponse> => {
    const response = await apiClient.delete<NewsLikeStatusResponse>(`/news/${articleId}/likes`)
    return response.data
  },

  getNewsComments: async (
    articleId: number,
    page = 0,
    size = 20,
  ): Promise<PageResponse<NewsCommentResponse>> => {
    const response = await apiClient.get<PageResponse<NewsCommentResponse>>(
      `/news/${articleId}/comments`,
      {
        params: { page, size },
      },
    )
    return response.data
  },

  createNewsComment: async (
    articleId: number,
    payload: CreateNewsCommentRequest,
  ): Promise<NewsCommentResponse> => {
    const response = await apiClient.post<NewsCommentResponse>(
      `/news/${articleId}/comments`,
      payload,
    )
    return response.data
  },

  updateNewsComment: async (
    articleId: number,
    commentId: number,
    payload: UpdateNewsCommentRequest,
  ): Promise<NewsCommentResponse> => {
    const response = await apiClient.put<NewsCommentResponse>(
      `/news/${articleId}/comments/${commentId}`,
      payload,
    )
    return response.data
  },

  deleteNewsComment: async (articleId: number, commentId: number): Promise<void> => {
    await apiClient.delete(`/news/${articleId}/comments/${commentId}`)
  },
}
