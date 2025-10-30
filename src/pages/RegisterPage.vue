<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirm: '',
  agree: false,
})

const handleSubmit = () => {
  alert('Регистрация пока не подключена к серверу, но интерфейс готов к интеграции!')
}
</script>

<template>
  <div class="page auth">
    <section class="auth__intro surface">
      <h1 class="section-title">Создай свою летопись</h1>
      <p class="section-subtitle">
        Присоединяйтесь к бета-тесту Tabletop RPG Manager. Зарегистрируйтесь, чтобы управлять кампаниями, делиться
        историями и приглашать команду в общую вселенную.
      </p>
      <ul class="auth__perks">
        <li>Доступ к мастерской кампаний и хроникам</li>
        <li>Ранний доступ к редактору миров</li>
        <li>Сообщество мастеров и игроков</li>
      </ul>
    </section>

    <section class="auth__form card">
      <form @submit.prevent="handleSubmit" class="form">
        <div class="form__header">
          <h2>Регистрация аккаунта</h2>
          <p class="text-secondary">Мы отправим подтверждение на указанный e-mail.</p>
        </div>
        <div class="grid grid-2">
          <div class="input-group">
            <label for="name">Имя мастера</label>
            <input id="name" v-model="form.name" name="name" type="text" placeholder="Иллирион из Валлы" />
          </div>
          <div class="input-group">
            <label for="email">E-mail</label>
            <input id="email" v-model="form.email" name="email" type="email" placeholder="gm@legendarium.world" />
          </div>
        </div>
        <div class="grid grid-2">
          <div class="input-group">
            <label for="password">Пароль</label>
            <input id="password" v-model="form.password" name="password" type="password" placeholder="••••••••" />
          </div>
          <div class="input-group">
            <label for="confirm">Подтверждение пароля</label>
            <input id="confirm" v-model="form.confirm" name="confirm" type="password" placeholder="••••••••" />
          </div>
        </div>
        <label class="checkbox">
          <input v-model="form.agree" type="checkbox" />
          <span>
            Согласен с условиями хроник и политикой сохранения данных. <a href="#">Узнать больше</a>
          </span>
        </label>
        <button type="submit" class="btn-primary">Создать аккаунт</button>
      </form>
    </section>
  </div>
</template>

<style scoped>
.page {
  max-width: 1100px;
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
