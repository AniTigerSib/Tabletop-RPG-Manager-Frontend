<template>
  <div class="container section news-page">
    <div class="news-header">
      <div>
        <h1 class="section-title">Новости проекта</h1>
        <p class="subtle-text">
          Официальные обновления, патчноуты и заметки команды, которые формируют хроники мира.
        </p>
      </div>
      <span v-if="isAdmin" class="tag">Администратор</span>
    </div>

    <div v-if="errorMessage" class="card news-alert">
      <strong>Ошибка:</strong> {{ errorMessage }}
    </div>

    <div v-if="isAdmin" class="card news-form">
      <h2>Публикация новости</h2>
      <div class="form-grid">
        <label class="field">
          Заголовок
          <input v-model="createForm.title" type="text" placeholder="Название новости" />
        </label>
        <label class="field">
          Короткое описание
          <textarea v-model="createForm.summary" rows="3" placeholder="Краткий анонс" />
        </label>
        <label class="field">
          Текст новости
          <textarea v-model="createForm.content" rows="6" placeholder="Полный текст" />
        </label>
      </div>
      <div class="form-actions">
        <button class="primary-button" type="button" @click="createArticle" :disabled="isSubmitting">
          Опубликовать
        </button>
      </div>
    </div>

    <div class="news-layout">
      <section class="news-feed">
        <div v-if="isLoadingList && !articles.length" class="card">
          <p class="subtle-text">Загружаем новости...</p>
        </div>
        <div v-else-if="!articles.length" class="card">
          <p class="subtle-text">Новостей пока нет. Загляните позже.</p>
        </div>

        <article
          v-for="article in articles"
          :key="article.id"
          class="card news-card"
          :class="{ selected: selectedArticle?.id === article.id }"
        >
          <div class="news-card__header">
            <div>
              <h2>{{ article.title }}</h2>
              <p class="subtle-text">
                {{ displayAuthor(article.author) }} · {{ formatDate(article.createdAt) }}
              </p>
            </div>
            <span v-if="article.updatedAt !== article.createdAt" class="tag">Обновлено</span>
          </div>
          <p class="news-card__summary">
            {{ article.summary || 'Без краткого описания.' }}
          </p>
          <div class="news-card__footer">
            <button class="secondary-button" type="button" @click="selectArticle(article.id)">
              Подробнее
            </button>
            <div class="news-card__meta">
              <button
                class="like-button"
                type="button"
                :class="{ active: article.likedByCurrentUser }"
                @click="toggleLike(article)"
                :disabled="!isAuthenticated"
              >
                ❤ {{ article.likeCount }}
              </button>
              <span class="subtle-text">💬 {{ article.commentCount }}</span>
            </div>
          </div>
        </article>

        <button
          v-if="!isLastPage"
          class="secondary-button news-more"
          type="button"
          @click="loadMore"
          :disabled="isLoadingList"
        >
          Загрузить еще
        </button>
      </section>

      <aside class="card news-detail">
        <template v-if="isLoadingDetail">
          <p class="subtle-text">Загружаем выбранную новость...</p>
        </template>
        <template v-else-if="selectedArticle">
          <div class="news-detail__header">
            <div>
              <h2>{{ selectedArticle.title }}</h2>
              <p class="subtle-text">
                {{ displayAuthor(selectedArticle.author) }} ·
                {{ formatDate(selectedArticle.createdAt) }}
              </p>
            </div>
            <div v-if="isAdmin" class="detail-actions">
              <button class="secondary-button" type="button" @click="startEdit">Редактировать</button>
              <button class="danger-button" type="button" @click="removeArticle">Удалить</button>
            </div>
          </div>

          <div v-if="isEditing" class="edit-form">
            <label class="field">
              Заголовок
              <input v-model="editForm.title" type="text" />
            </label>
            <label class="field">
              Короткое описание
              <textarea v-model="editForm.summary" rows="3" />
            </label>
            <label class="field">
              Текст новости
              <textarea v-model="editForm.content" rows="6" />
            </label>
            <div class="form-actions">
              <button class="primary-button" type="button" @click="saveEdit">Сохранить</button>
              <button class="secondary-button" type="button" @click="cancelEdit">Отмена</button>
            </div>
          </div>
          <div v-else class="news-content">
            <p v-if="selectedArticle.summary" class="news-summary">
              {{ selectedArticle.summary }}
            </p>
            <div class="news-body" v-html="renderMarkdown(selectedArticle.content)" />
          </div>

          <div class="news-detail__meta">
            <button
              class="like-button"
              type="button"
              :class="{ active: selectedArticle.likedByCurrentUser }"
              @click="toggleLike(selectedArticle)"
              :disabled="!isAuthenticated"
            >
              ❤ {{ selectedArticle.likeCount }}
            </button>
            <span class="subtle-text">💬 {{ selectedArticle.commentCount }}</span>
          </div>

          <section class="comments">
            <div class="comments__header">
              <h3>Комментарии</h3>
              <span class="subtle-text">{{ selectedArticle.commentCount }}</span>
            </div>

            <div v-if="isAuthenticated" class="comment-form">
              <textarea
                v-model="newComment"
                rows="3"
                placeholder="Оставьте комментарий"
              />
              <button class="primary-button" type="button" @click="submitComment">
                Отправить
              </button>
            </div>
            <p v-else class="subtle-text">Войдите, чтобы оставлять комментарии.</p>

            <div v-if="isLoadingComments && !comments.length" class="subtle-text">
              Загружаем комментарии...
            </div>
            <div v-else-if="!comments.length" class="subtle-text">
              Пока нет комментариев.
            </div>

            <div v-for="comment in comments" :key="comment.id" class="comment-card">
              <div class="comment-card__header">
                <div>
                  <strong>{{ displayAuthor(comment.author) }}</strong>
                  <span class="subtle-text">· {{ formatDate(comment.createdAt) }}</span>
                </div>
                <div v-if="canEditComment(comment)" class="comment-actions">
                  <button class="link-button" type="button" @click="startEditComment(comment)">
                    Изменить
                  </button>
                  <button class="link-button danger" type="button" @click="removeComment(comment)">
                    Удалить
                  </button>
                </div>
              </div>

              <div v-if="editingCommentId === comment.id" class="comment-edit">
                <textarea v-model="editingCommentText" rows="3" />
                <div class="comment-actions">
                  <button class="secondary-button" type="button" @click="saveComment(comment)">
                    Сохранить
                  </button>
                  <button class="secondary-button" type="button" @click="cancelEditComment">
                    Отмена
                  </button>
                </div>
              </div>
              <p v-else class="comment-card__body">{{ comment.content }}</p>
            </div>

            <button
              v-if="!commentsLast"
              class="secondary-button comment-more"
              type="button"
              @click="loadMoreComments"
              :disabled="isLoadingComments"
            >
              Еще комментарии
            </button>
          </section>
        </template>
        <template v-else>
          <h2>Выберите новость</h2>
          <p class="subtle-text">
            Выберите материал слева, чтобы прочитать детали и присоединиться к обсуждению.
          </p>
        </template>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { newsApi } from '@/api'
import { useAuthStore } from '@/stores/auth-store'
import { useFormat } from '@/composables/use-format'
import type { CreateNewsRequest } from '@/dto/request/create-news-request-dto'
import type { UpdateNewsRequest } from '@/dto/request/update-news-request-dto'
import type { NewsCommentResponse, NewsDetailResponse } from '@/dto/response/news-response-dto'

const authStore = useAuthStore()
const { formatDate } = useFormat()

const isAdmin = computed(() => authStore.hasRole('ADMIN'))
const isAuthenticated = computed(() => authStore.isAuthenticated)

const articles = ref<NewsDetailResponse[]>([])
const selectedArticle = ref<NewsDetailResponse | null>(null)
const errorMessage = ref('')

const page = ref(0)
const pageSize = 6
const isLastPage = ref(false)
const isLoadingList = ref(false)
const isLoadingDetail = ref(false)

const isSubmitting = ref(false)
const createForm = reactive<CreateNewsRequest>({
  title: '',
  summary: '',
  content: '',
})

const isEditing = ref(false)
const editForm = reactive<UpdateNewsRequest>({
  title: '',
  summary: '',
  content: '',
})

const comments = ref<NewsCommentResponse[]>([])
const commentPage = ref(0)
const commentSize = 10
const commentsLast = ref(false)
const isLoadingComments = ref(false)
const newComment = ref('')
const editingCommentId = ref<number | null>(null)
const editingCommentText = ref('')

const displayAuthor = (author?: { displayName: string; username: string }) => {
  if (!author) return 'Неизвестный автор'
  return author.displayName || author.username
}

const renderMarkdown = (input: string) => {
  const escapeHtml = (value: string) =>
    value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/'/g, '&#39;')

  const formatInline = (value: string) => {
    return value
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/_([^_]+)_/g, '<em>$1</em>')
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
      )
  }

  const lines = escapeHtml(input).split(/\r?\n/)
  const output: string[] = []
  let inList = false
  let inCode = false
  const codeBuffer: string[] = []

  const closeList = () => {
    if (inList) {
      output.push('</ul>')
      inList = false
    }
  }

  const flushCode = () => {
    if (inCode) {
      output.push(`<pre><code>${codeBuffer.join('\n')}</code></pre>`)
      codeBuffer.length = 0
      inCode = false
    }
  }

  lines.forEach((line) => {
    if (line.trim().startsWith('```')) {
      if (inCode) {
        flushCode()
      } else {
        closeList()
        inCode = true
      }
      return
    }

    if (inCode) {
      codeBuffer.push(line)
      return
    }

    const listMatch = line.match(/^\s*[-*+]\s+(.*)$/)
    if (listMatch) {
      if (!inList) {
        output.push('<ul>')
        inList = true
      }
      output.push(`<li>${formatInline(listMatch[1] ?? '')}</li>`)
      return
    }

    closeList()

    if (!line.trim()) {
      return
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.*)$/)
    if (headingMatch) {
      const level = (headingMatch[1] ?? '#').length
      output.push(`<h${level}>${formatInline(headingMatch[2] ?? '')}</h${level}>`)
      return
    }

    output.push(`<p>${formatInline(line)}</p>`)
  })

  closeList()
  flushCode()

  return output.join('')
}

const syncArticle = (updated: NewsDetailResponse) => {
  const index = articles.value.findIndex((item) => item.id === updated.id)
  if (index >= 0) {
    articles.value[index] = updated
  }
  if (selectedArticle.value?.id === updated.id) {
    selectedArticle.value = updated
  }
}

const resetCommentsState = () => {
  comments.value = []
  commentPage.value = 0
  commentsLast.value = true
  isLoadingComments.value = false
  newComment.value = ''
  editingCommentId.value = null
  editingCommentText.value = ''
}

const loadNews = async (reset = false) => {
  if (isLoadingList.value) return
  isLoadingList.value = true
  errorMessage.value = ''

  if (reset) {
    page.value = 0
    isLastPage.value = false
    articles.value = []
  }

  try {
    const response = await newsApi.getNews(page.value, pageSize)
    articles.value = reset ? response.content : [...articles.value, ...response.content]
    isLastPage.value = response.last
    page.value = response.page + 1
  } catch (error) {
    console.error('Failed to fetch news:', error)
    errorMessage.value = 'Не удалось загрузить новости.'
  } finally {
    isLoadingList.value = false
  }
}

const selectArticle = async (articleId: number) => {
  if (isLoadingDetail.value) return
  isLoadingDetail.value = true
  errorMessage.value = ''

  try {
    const response = await newsApi.getNewsArticle(articleId)
    selectedArticle.value = response
    isEditing.value = false
    syncArticle(response)
    resetCommentsState()
    await loadComments(true)
  } catch (error) {
    console.error('Failed to load article:', error)
    errorMessage.value = 'Не удалось загрузить новость.'
  } finally {
    isLoadingDetail.value = false
  }
}

const loadMore = async () => {
  await loadNews(false)
}

const toggleLike = async (article: NewsDetailResponse) => {
  if (!isAuthenticated.value) {
    errorMessage.value = 'Для лайков нужно войти в аккаунт.'
    return
  }

  try {
    const response = article.likedByCurrentUser
      ? await newsApi.unlikeNews(article.id)
      : await newsApi.likeNews(article.id)

    const updated = {
      ...article,
      likeCount: response.likeCount,
      likedByCurrentUser: response.liked,
    }

    syncArticle(updated)
  } catch (error) {
    console.error('Failed to update like:', error)
    errorMessage.value = 'Не удалось обновить лайк.'
  }
}

const createArticle = async () => {
  if (!isAdmin.value || isSubmitting.value) return

  if (!createForm.title.trim() || !createForm.content.trim()) {
    errorMessage.value = 'Заполните заголовок и текст новости.'
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const response = await newsApi.createNews({
      title: createForm.title.trim(),
      summary: createForm.summary?.trim() || '',
      content: createForm.content.trim(),
    })
    articles.value = [response, ...articles.value]
    selectedArticle.value = response
    isEditing.value = false
    resetCommentsState()
    createForm.title = ''
    createForm.summary = ''
    createForm.content = ''
  } catch (error) {
    console.error('Failed to create news:', error)
    errorMessage.value = 'Не удалось опубликовать новость.'
  } finally {
    isSubmitting.value = false
  }
}

const startEdit = () => {
  if (!selectedArticle.value) return
  isEditing.value = true
  editForm.title = selectedArticle.value.title
  editForm.summary = selectedArticle.value.summary
  editForm.content = selectedArticle.value.content
}

const cancelEdit = () => {
  isEditing.value = false
}

const saveEdit = async () => {
  if (!selectedArticle.value || !isAdmin.value) return

  if (!editForm.title.trim() || !editForm.content.trim()) {
    errorMessage.value = 'Заполните заголовок и текст новости.'
    return
  }

  try {
    const response = await newsApi.updateNews(selectedArticle.value.id, {
      title: editForm.title.trim(),
      summary: editForm.summary?.trim() || '',
      content: editForm.content.trim(),
    })
    syncArticle(response)
    isEditing.value = false
  } catch (error) {
    console.error('Failed to update news:', error)
    errorMessage.value = 'Не удалось обновить новость.'
  }
}

const removeArticle = async () => {
  if (!selectedArticle.value || !isAdmin.value) return

  const shouldDelete = window.confirm('Удалить новость без возможности восстановления?')
  if (!shouldDelete) return

  try {
    await newsApi.deleteNews(selectedArticle.value.id)
    articles.value = articles.value.filter((item) => item.id !== selectedArticle.value?.id)
    selectedArticle.value = null
    isEditing.value = false
    resetCommentsState()
  } catch (error) {
    console.error('Failed to delete news:', error)
    errorMessage.value = 'Не удалось удалить новость.'
  }
}

const loadComments = async (reset = false) => {
  if (!selectedArticle.value || isLoadingComments.value) return
  isLoadingComments.value = true

  if (reset) {
    commentPage.value = 0
    commentsLast.value = false
    comments.value = []
  }

  try {
    const response = await newsApi.getNewsComments(
      selectedArticle.value.id,
      commentPage.value,
      commentSize,
    )
    comments.value = reset ? response.content : [...comments.value, ...response.content]
    commentsLast.value = response.last
    commentPage.value = response.page + 1
  } catch (error) {
    console.error('Failed to load comments:', error)
    errorMessage.value = 'Не удалось загрузить комментарии.'
  } finally {
    isLoadingComments.value = false
  }
}

const loadMoreComments = async () => {
  await loadComments(false)
}

const submitComment = async () => {
  if (!selectedArticle.value || !isAuthenticated.value) return

  if (!newComment.value.trim()) {
    errorMessage.value = 'Комментарий не может быть пустым.'
    return
  }

  try {
    const response = await newsApi.createNewsComment(selectedArticle.value.id, {
      content: newComment.value.trim(),
    })
    comments.value = [response, ...comments.value]
    newComment.value = ''
    syncArticle({
      ...selectedArticle.value,
      commentCount: selectedArticle.value.commentCount + 1,
    })
  } catch (error) {
    console.error('Failed to create comment:', error)
    errorMessage.value = 'Не удалось добавить комментарий.'
  }
}

const canEditComment = (comment: NewsCommentResponse) => {
  return (
    comment.ownedByCurrentUser ||
    isAdmin.value ||
    authStore.hasRole('MODERATOR') ||
    authStore.hasRole('DEVELOPER')
  )
}

const startEditComment = (comment: NewsCommentResponse) => {
  if (!canEditComment(comment)) return
  editingCommentId.value = comment.id
  editingCommentText.value = comment.content
}

const cancelEditComment = () => {
  editingCommentId.value = null
  editingCommentText.value = ''
}

const saveComment = async (comment: NewsCommentResponse) => {
  if (!selectedArticle.value || editingCommentId.value !== comment.id) return

  if (!editingCommentText.value.trim()) {
    errorMessage.value = 'Комментарий не может быть пустым.'
    return
  }

  try {
    const response = await newsApi.updateNewsComment(selectedArticle.value.id, comment.id, {
      content: editingCommentText.value.trim(),
    })
    const index = comments.value.findIndex((item) => item.id === comment.id)
    if (index >= 0) {
      comments.value[index] = response
    }
    cancelEditComment()
  } catch (error) {
    console.error('Failed to update comment:', error)
    errorMessage.value = 'Не удалось обновить комментарий.'
  }
}

const removeComment = async (comment: NewsCommentResponse) => {
  if (!selectedArticle.value || !canEditComment(comment)) return

  const shouldDelete = window.confirm('Удалить комментарий?')
  if (!shouldDelete) return

  try {
    await newsApi.deleteNewsComment(selectedArticle.value.id, comment.id)
    comments.value = comments.value.filter((item) => item.id !== comment.id)
    syncArticle({
      ...selectedArticle.value,
      commentCount: Math.max(0, selectedArticle.value.commentCount - 1),
    })
  } catch (error) {
    console.error('Failed to delete comment:', error)
    errorMessage.value = 'Не удалось удалить комментарий.'
  }
}

onMounted(() => {
  loadNews(true)
})
</script>

<style scoped>
.news-page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.news-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.news-alert {
  border-left: 4px solid var(--error-color);
}

.news-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-grid {
  display: grid;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.95rem;
}

.field input,
.field textarea {
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--divider-color);
  background: var(--surface-elevated);
  color: var(--text-color);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.news-layout {
  display: grid;
  gap: 24px;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
}

.news-feed {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.news-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.news-card.selected {
  border-color: var(--primary-color);
  box-shadow: var(--hover-glow), var(--card-shadow);
}

.news-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.news-card__summary {
  color: var(--text-secondary-color);
  margin: 0;
}

.news-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.news-card__meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.news-more {
  align-self: center;
}

.news-detail {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.news-detail__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.detail-actions {
  display: flex;
  gap: 10px;
}

.news-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.news-summary {
  font-style: italic;
  margin: 0;
}

.news-body {
  white-space: pre-wrap;
  line-height: 1.6;
}

.news-body h1,
.news-body h2,
.news-body h3 {
  margin: 16px 0 10px;
}

.news-body ul {
  margin: 12px 0;
  padding-left: 20px;
}

.news-body li {
  margin-bottom: 6px;
}

.news-body code {
  font-family: 'Courier New', monospace;
  background: rgba(0, 0, 0, 0.08);
  padding: 2px 6px;
  border-radius: 6px;
}

.news-body pre {
  background: rgba(0, 0, 0, 0.08);
  padding: 12px;
  border-radius: 12px;
  overflow: auto;
}

.news-body a {
  color: var(--secondary-color);
  text-decoration: underline;
}

.news-detail__meta {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-top: 12px;
  border-top: 1px solid var(--divider-color);
}

.like-button {
  border: 1px solid var(--divider-color);
  background: transparent;
  padding: 8px 14px;
  border-radius: 999px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease;
}

.like-button.active {
  background: color-mix(in srgb, var(--primary-color) 20%, transparent);
  border-color: var(--primary-color);
}

.like-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.danger-button {
  border: 1px solid var(--error-color);
  background: transparent;
  color: var(--error-color);
  padding: 10px 18px;
  border-radius: 999px;
  cursor: pointer;
}

.comments {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.comments__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.comment-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.comment-form textarea {
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--divider-color);
  background: var(--surface-elevated);
  color: var(--text-color);
}

.comment-card {
  padding: 16px;
  border-radius: 14px;
  border: 1px solid var(--divider-color);
  background: var(--surface-elevated);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.comment-card__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}

.comment-card__body {
  margin: 0;
  white-space: pre-wrap;
}

.comment-actions {
  display: flex;
  gap: 10px;
}

.link-button {
  border: none;
  background: none;
  color: var(--primary-color);
  cursor: pointer;
  padding: 0;
}

.link-button.danger {
  color: var(--error-color);
}

.comment-more {
  align-self: center;
}

@media (max-width: 960px) {
  .news-layout {
    grid-template-columns: 1fr;
  }

  .news-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
