<template>
  <div class="container">
    <section class="form-card">
      <div class="form-header">
        <h1>Вход в хроники</h1>
        <p class="subtle-text">
          Добро пожаловать обратно! Введите данные учетной записи, чтобы продолжить кампанию.
        </p>
      </div>
      <form @submit.prevent>
        <div>
          <label for="email">Электронная почта</label>
          <input id="email" type="email" name="email" autocomplete="email" required />
        </div>
        <div>
          <label for="password">Пароль</label>
          <input id="password" type="password" name="password" autocomplete="current-password" required />
          <p class="helper-text">Забыли пароль? Свяжитесь с хронистами поддержки.</p>
        </div>
        <button type="submit" class="primary-button glow-on-hover">Войти</button>
      </form>
      <p class="notice">
        Нет аккаунта?
        <RouterLink to="/auth/register">Зарегистрируйтесь и присоединяйтесь к гильдии</RouterLink>.
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
