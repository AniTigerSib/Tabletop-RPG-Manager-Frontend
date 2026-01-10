<template>
  <div class="container section">
    <h1 class="section-title">Личный профиль</h1>
    <p class="subtle-text">Здесь появятся ваши кампании, персонажи и последние свитки хроник.</p>

    <div v-if="authStore.currentUser" class="profile-grid">
      <section class="profile-card">
        <div class="profile-header">
          <div class="avatar">
            {{ getInitials(authStore.currentUser.displayName || authStore.currentUser.username) }}
          </div>
          <div>
            <h2>{{ authStore.currentUser.displayName }}</h2>
            <p class="subtle-text">@{{ authStore.currentUser.username }}</p>
            <p class="subtle-text">{{ authStore.currentUser.email }}</p>
          </div>
        </div>
        <div>
          <h3>Роли</h3>
          <div class="badge-list">
            <!-- <span v-for="role in authStore.currentUser.roles" :key="role" class="tag">
              {{ role }}
            </span> -->
            <p>Здесь в дальнейшем будут роли</p>
          </div>
        </div>
        <div>
          <h3>Учетная запись</h3>
          <p class="subtle-text">Создана: {{ formatDate(authStore.currentUser.createdAt) }}</p>
          <p class="subtle-text">
            Последнее обновление: {{ formatDate(authStore.currentUser.updatedAt) }}
          </p>
        </div>
      </section>

      <section class="profile-card">
        <h2>Биография</h2>
        <p v-if="authStore.currentUser.bio" class="subtle-text">
          {{ authStore.currentUser.bio }}
        </p>
        <p v-else class="subtle-text">Биография не указана.</p>
      </section>

      <section class="profile-card">
        <h2>Действия</h2>
        <button @click="onLogout" class="secondary-button">Выйти из аккаунта</button>
      </section>
    </div>

    <div v-else class="profile-grid">
      <section class="profile-card">
        <p class="subtle-text">Загрузка профиля...</p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth-store'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/use-auth'
import { useFormat } from '@/composables/use-format'

const authStore = useAuthStore()
const router = useRouter()
const { handleLogout } = useAuth()
const { getInitials, formatDate } = useFormat()

// Handle logout
const onLogout = async () => {
  await handleLogout()
  router.push('/auth/login')
}

// Fetch user data if not already loaded
onMounted(async () => {
  if (!authStore.currentUser) {
    await authStore.fetchCurrentUser()
  }
})
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
