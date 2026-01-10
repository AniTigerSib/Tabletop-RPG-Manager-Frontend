<template>
  <div class="container section">
    <h1 class="section-title">{{ pageTitle }}</h1>
    <p class="subtle-text">Здесь появятся кампании, персонажи и последние свитки хроник.</p>

    <div v-if="profile && !isLoading" class="profile-grid">
      <section class="profile-card">
        <div class="profile-header">
          <div class="avatar">
            {{ getInitials(profile.displayName || profile.username) }}
          </div>
          <div>
            <h2>{{ profile.displayName }}</h2>
            <p class="subtle-text">@{{ profile.username }}</p>
            <p class="subtle-text">{{ profile.email }}</p>
          </div>
        </div>
        <div>
          <h3>Специализации</h3>
          <div class="badge-list">
            <p>Здесь в дальнейшем будут специализации (игрок, гейм мастер и т.д.)</p>
          </div>
        </div>
        <div>
          <h3>Учетная запись</h3>
          <p class="subtle-text">Создана: {{ formatDate(profile.createdAt) }}</p>
        </div>
      </section>

      <section class="profile-card">
        <h2>Биография</h2>
        <p v-if="profile.bio" class="subtle-text">
          {{ profile.bio }}
        </p>
        <p v-else class="subtle-text">Биография не указана.</p>
      </section>

      <section v-if="isOwnProfile" class="profile-card">
        <h2>Действия</h2>
        <button @click="onLogout" class="secondary-button">Выйти из аккаунта</button>
      </section>
    </div>

    <div v-else class="profile-grid">
      <section class="profile-card">
        <p class="subtle-text">
          {{ isLoading ? 'Загрузка профиля...' : 'Профиль не найден или недоступен.' }}
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth-store'
import { useProfilesStore } from '@/stores/profiles-store'
import { useAuth } from '@/composables/use-auth'
import { useFormat } from '@/composables/use-format'

const authStore = useAuthStore()
const profilesStore = useProfilesStore()
const route = useRoute()
const router = useRouter()
const { handleLogout } = useAuth()
const { getInitials, formatDate } = useFormat()

const isLoading = ref(false)

// Future-friendly: when появится маршрут /user/:id — используем его, иначе считаем профиль своим
const viewedUserId = computed(() => {
  const param = route.params.userId
  if (typeof param === 'string') {
    const parsed = Number.parseInt(param, 10)
    return Number.isNaN(parsed) ? undefined : parsed
  }
  return undefined
})

const isOwnProfile = computed(() => viewedUserId.value === undefined)

const profile = computed(() => {
  if (isOwnProfile.value) {
    return authStore.currentUser
  }
  return profilesStore.profileById(viewedUserId.value)
})

const pageTitle = computed(() => (isOwnProfile.value ? 'Личный профиль' : 'Профиль пользователя'))

const onLogout = async () => {
  await handleLogout()
  router.push('/auth/login')
}

const loadProfile = async () => {
  isLoading.value = true
  try {
    if (isOwnProfile.value) {
      if (!authStore.currentUser) {
        await authStore.fetchCurrentUser()
      }
    } else if (viewedUserId.value !== undefined) {
      await profilesStore.fetchProfileById(viewedUserId.value)
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(loadProfile)
</script>

<style scoped>
.profile-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 24px;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.badge-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.tag {
  padding: 4px 12px;
  border-radius: 16px;
  background: var(--surface-color);
  border: 1px solid var(--divider-color);
  font-size: 0.85rem;
}
</style>
