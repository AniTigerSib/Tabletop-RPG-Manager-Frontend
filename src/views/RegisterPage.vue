<template>
  <div class="container">
    <section class="form-card">
      <div class="form-header">
        <h1>Регистрация хрониста</h1>
        <p class="subtle-text">
          Создайте учетную запись, чтобы управлять кампаниями, следить за героями и вдохновлять других мастеров.
        </p>
      </div>
      <form @submit.prevent>
        <div>
          <label for="name">Имя</label>
          <input id="name" type="text" name="name" autocomplete="name" required />
        </div>
        <div>
          <label for="email">Электронная почта</label>
          <input id="email" type="email" name="email" autocomplete="email" required />
        </div>
        <div>
          <label for="password">Пароль</label>
          <input id="password" type="password" name="password" autocomplete="new-password" required />
        </div>
        <div>
          <label for="confirm">Подтверждение пароля</label>
          <input id="confirm" type="password" name="confirm" autocomplete="new-password" required />
        </div>
        <button type="submit" class="primary-button glow-on-hover">Создать аккаунт</button>
      </form>
      <p class="notice">
        Уже есть профиль? <RouterLink to="/auth/login">Войдите, чтобы продолжить приключения</RouterLink>.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.form-header {
  display: grid;
  gap: 8px;
  text-align: center;
  margin-bottom: 24px;
}
</style>
