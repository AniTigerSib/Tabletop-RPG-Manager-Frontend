<template>
  <div class="container">
    <section class="form-card">
      <div class="form-header">
        <h1>Вход в хроники</h1>
        <p class="subtle-text">
          Добро пожаловать обратно! Введите данные учетной записи, чтобы продолжить кампанию.
        </p>
      </div>
      <form @submit.prevent="onLogin">
        <div>
          <label for="login">Имя пользователя или Email</label>
          <input
            id="login"
            v-model="loginForm.login"
            type="text"
            name="login"
            autocomplete="username"
            required
          />
        </div>
        <div>
          <label for="password">Пароль</label>
          <input
            id="password"
            v-model="loginForm.password"
            type="password"
            name="password"
            autocomplete="current-password"
            required
          />
          <p class="helper-text">Забыли пароль? Свяжитесь с хронистами поддержки.</p>
        </div>
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        <button type="submit" class="primary-button glow-on-hover" :disabled="isLoggingIn">
          {{ isLoggingIn ? 'Вход...' : 'Войти' }}
        </button>
      </form>
      <p class="notice">
        Нет аккаунта?
        <RouterLink to="/auth/register">Зарегистрируйтесь и присоединяйтесь к гильдии</RouterLink>.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useAuth } from '@/composables/use-auth'

const router = useRouter()
const { loginForm, errorMessage, isLoggingIn, handleLogin } = useAuth()

// Handle login form submission
const onLogin = async () => {
  const success = await handleLogin()
  if (success) {
    // Redirect to home page or previous page
    router.push('/')
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
