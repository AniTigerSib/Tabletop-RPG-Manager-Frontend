<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  email: '',
  password: '',
  remember: false,
})

const handleSubmit = () => {
  alert('Авторизация пока не подключена к серверу, но интерфейс готов к интеграции!')
}
</script>

<template>
  <div class="page auth">
    <section class="auth__intro surface">
      <h1 class="section-title">С возвращением, мастер</h1>
      <p class="section-subtitle">
        Продолжайте кампании, управляйте заметками и следите за инициативой с любого устройства. Ваши хроники уже
        ждут.
      </p>
      <ul class="auth__perks">
        <li>Быстрый доступ к последним сессиям</li>
        <li>Восстановление пароля в пару кликов</li>
        <li>Поддержка двухфакторной защиты (скоро)</li>
      </ul>
    </section>

    <section class="auth__form card">
      <form @submit.prevent="handleSubmit" class="form">
        <div class="form__header">
          <h2>Вход в аккаунт</h2>
          <p class="text-secondary">Введите данные, чтобы открыть свою хронику.</p>
        </div>
        <div class="input-group">
          <label for="email">E-mail</label>
          <input id="email" v-model="form.email" name="email" type="email" placeholder="gm@legendarium.world" />
        </div>
        <div class="input-group">
          <label for="password">Пароль</label>
          <input id="password" v-model="form.password" name="password" type="password" placeholder="••••••••" />
        </div>
        <label class="checkbox">
          <input v-model="form.remember" type="checkbox" />
          <span>Запомнить меня на этом устройстве</span>
        </label>
        <button type="submit" class="btn-primary">Войти</button>
        <p class="text-secondary">
          Ещё нет аккаунта?
          <RouterLink to="/register">Зарегистрируйтесь и начните новое приключение.</RouterLink>
        </p>
      </form>
    </section>
  </div>
</template>

<style scoped>
.page {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
}

.auth__intro {
  display: grid;
  gap: 1rem;
}

.auth__perks {
  margin: 0;
  padding-left: 1.1rem;
  color: var(--color-text-secondary);
}

.auth__form {
  display: grid;
  gap: 1.5rem;
}

.form {
  display: grid;
  gap: 1.25rem;
}

.form__header h2 {
  margin: 0;
  font-family: var(--font-heading);
}

.form__header p {
  margin: 0;
}

.checkbox {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: var(--color-text-secondary);
}

.checkbox input {
  margin-top: 0.25rem;
  width: 1rem;
  height: 1rem;
}

@media (min-width: 900px) {
  .page {
    grid-template-columns: 1fr 1fr;
    align-items: stretch;
  }
}
</style>
