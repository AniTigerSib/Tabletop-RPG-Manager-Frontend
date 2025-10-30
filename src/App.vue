<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

import { useThemeStore } from './stores/theme'

const themeStore = useThemeStore()
const route = useRoute()

const themeLabel = computed(() =>
  themeStore.theme === 'dark' ? 'Письмена под свечой' : 'Пергаментное утро',
)

const navLinks = [
  { name: 'home', label: 'Главная', to: '/' },
  { name: 'register', label: 'Регистрация', to: '/register' },
  { name: 'login', label: 'Войти', to: '/login' },
  { name: 'profile', label: 'Профиль', to: '/me' },
]
</script>

<template>
  <div class="app-shell">
    <header class="app-header">
      <div class="app-header__inner">
        <RouterLink to="/" class="brand">
          <span class="brand__emblem">⚔️</span>
          <span class="brand__text">
            <span class="brand__title">Tabletop RPG Manager</span>
            <span class="brand__subtitle">Твой свод правил и легенд</span>
          </span>
        </RouterLink>

        <nav class="nav">
          <RouterLink
            v-for="link in navLinks"
            :key="link.name"
            :to="link.to"
            class="nav__link"
            :class="{ 'nav__link--active': route.name === link.name }"
          >
            {{ link.label }}
          </RouterLink>
        </nav>

        <div class="actions">
          <span class="theme-label" aria-hidden="true">{{ themeLabel }}</span>
          <button class="btn-secondary" type="button" @click="themeStore.toggleTheme()">
            <span aria-hidden="true">🌓</span>
            <span class="sr-only">Переключить тему</span>
          </button>
        </div>
      </div>
    </header>

    <main class="app-main">
      <RouterView />
    </main>

    <footer class="app-footer">
      <div class="app-footer__inner">
        <div>
          <strong>Tabletop RPG Manager</strong>
          <p class="text-secondary">
            Инструменты для мастеров и игроков, чтобы каждая кампания становилась легендой.
          </p>
        </div>
        <div class="footer-links">
          <RouterLink to="/register">Присоединиться</RouterLink>
          <RouterLink to="/login">Войти</RouterLink>
          <a href="#features">Возможности</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  background: radial-gradient(circle at top left, rgba(107, 78, 155, 0.25), transparent 40%),
    radial-gradient(circle at bottom right, rgba(196, 155, 62, 0.18), transparent 45%),
    var(--color-background);
  transition: var(--transition-base);
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(16px);
  background: linear-gradient(
      to right,
      rgba(28, 28, 34, 0.65),
      rgba(28, 28, 34, 0.45)
    )
    var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

:global(:root[data-theme='light']) .app-header {
  background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.82),
      rgba(244, 239, 229, 0.82)
    )
    var(--color-surface);
}

.app-header__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.85rem;
  color: inherit;
}

.brand__emblem {
  font-size: 1.75rem;
}

.brand__title {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  letter-spacing: 0.05em;
}

.brand__subtitle {
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
}

.nav {
  display: none;
  gap: 1rem;
  margin-left: auto;
}

.nav__link {
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
}

.nav__link:hover,
.nav__link:focus-visible {
  color: var(--color-primary);
}

.nav__link--active {
  color: var(--color-primary);
  background-color: rgba(196, 155, 62, 0.12);
}

:global(:root[data-theme='light']) .nav__link--active {
  background-color: rgba(112, 88, 46, 0.12);
}

.actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: auto;
}

.theme-label {
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.app-main {
  padding: 2rem 1.5rem 3rem;
}

.app-footer {
  border-top: 1px solid var(--color-border);
  background: rgba(0, 0, 0, 0.12);
  padding: 2.5rem 1.5rem;
}

:global(:root[data-theme='light']) .app-footer {
  background: rgba(255, 255, 255, 0.9);
}

.app-footer__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 1.5rem;
}

.footer-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

@media (min-width: 768px) {
  .nav {
    display: flex;
  }

  .actions {
    margin-left: 0;
  }

  .app-footer__inner {
    grid-template-columns: 2fr 1fr;
    align-items: center;
  }
}

@media (max-width: 767px) {
  .actions {
    margin-left: 0;
  }

  .brand__subtitle {
    display: none;
  }
}
</style>
