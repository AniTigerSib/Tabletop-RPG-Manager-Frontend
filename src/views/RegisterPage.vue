<template>
  <div class="container">
    <section class="form-card">
      <div class="form-header">
        <h1>Регистрация хрониста</h1>
        <p class="subtle-text">
          Создайте учетную запись, чтобы управлять кампаниями, следить за героями и вдохновлять
          других мастеров.
        </p>
      </div>
      <form @submit.prevent="onRegister">
        <div>
          <label for="username">Имя пользователя</label>
          <input
            id="username"
            v-model="registerForm.username"
            type="text"
            name="username"
            autocomplete="username"
            required
          />
        </div>
        <div>
          <label for="email">Электронная почта</label>
          <input
            id="email"
            v-model="registerForm.email"
            type="email"
            name="email"
            autocomplete="email"
            required
          />
        </div>
        <div>
          <label for="displayName">Отображаемое имя</label>
          <input
            id="displayName"
            v-model="registerForm.displayName"
            type="text"
            name="displayName"
            autocomplete="name"
          />
        </div>
        <div>
          <label for="password">Пароль</label>
          <input
            id="password"
            v-model="registerForm.password"
            type="password"
            name="password"
            autocomplete="new-password"
            required
          />
        </div>
        <div>
          <label for="confirmPassword">Подтверждение пароля</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            name="confirmPassword"
            autocomplete="new-password"
            required
          />
        </div>
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        <button type="submit" class="primary-button glow-on-hover" :disabled="isRegistering">
          {{ isRegistering ? 'Создание аккаунта...' : 'Создать аккаунт' }}
        </button>
      </form>
      <p class="notice">
        Уже есть профиль?
        <RouterLink to="/auth/login">Войдите, чтобы продолжить приключения</RouterLink>.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useAuth } from '@/composables/use-auth'

const router = useRouter()
const { registerForm, confirmPassword, errorMessage, isRegistering, handleRegister } = useAuth()

// Handle registration form submission
const onRegister = async () => {
  const success = await handleRegister()
  if (success) {
    // Redirect to login page with success message
    router.push({
      path: '/auth/login',
      query: { registered: 'true' },
    })
  }
}
</script>

<style scoped>
.form-header {
  display: grid;
  gap: 8px;
  text-align: center;
  margin-bottom: 24px;
}

.error-message {
  color: var(--error-color, #e74c3c);
  padding: 8px;
  border-radius: 4px;
  background-color: rgba(231, 76, 60, 0.1);
  margin-bottom: 16px;
}
</style>
