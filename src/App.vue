<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import { useThemeStore } from './stores/theme'

const themeStore = useThemeStore()

const route = useRoute()

const isAuthPage = computed(() => route.meta.layout === 'auth')
</script>

<template>
  <div class="app-shell">
    <header class="top-bar">
      <div class="container top-bar__content">
        <RouterLink to="/" class="brand">
          <span class="brand__mark">✦</span>
          <div>
            <span class="brand__title">Chronicle Atlas</span>
            <span class="brand__subtitle">Tabletop RPG Manager</span>
          </div>
        </RouterLink>
        <nav class="nav-links" aria-label="Главная навигация">
          <RouterLink to="/" class="nav-link">Главная</RouterLink>
          <RouterLink to="/news" class="nav-link">Новости</RouterLink>
          <RouterLink to="/me" class="nav-link">Профиль</RouterLink>
        </nav>
        <div class="top-bar__actions">
          <RouterLink v-if="isAuthPage" to="/" class="secondary-button">Назад на сайт</RouterLink>
          <RouterLink v-else to="/auth/login" class="secondary-button">Войти</RouterLink>
          <button class="primary-button glow-on-hover" type="button" @click="themeStore.toggleTheme">
            <span v-if="themeStore.currentTheme === 'dark'">Пергаментное утро</span>
            <span v-else>Письмена под свечой</span>
          </button>
        </div>
      </div>
    </header>

    <main>
      <RouterView />
    </main>

    <footer>
      <div class="container footer-content">
        <p>© {{ new Date().getFullYear() }} Chronicle Atlas. Все права защищены.</p>
        <div class="footer-links">
          <a href="#">О проекте</a>
          <a href="#">Команда</a>
          <a href="#">Поддержка</a>
          <a href="#">Политика конфиденциальности</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

top-bar {
  background: rgba(0, 0, 0, 0.2);
}

.top-bar {
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(16px);
  background: color-mix(in srgb, var(--surface-color) 80%, transparent);
  border-bottom: 1px solid var(--divider-color);
}

.top-bar__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 18px 0;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand__mark {
  font-size: 1.6rem;
  color: var(--secondary-color);
}

.brand__title {
  font-family: 'Cinzel', serif;
  font-size: 1.2rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.brand__subtitle {
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-secondary-color);
}

.nav-links {
  display: flex;
  gap: 18px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.85rem;
}

.nav-link {
  position: relative;
  padding-bottom: 4px;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: var(--primary-color);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.nav-link.router-link-active::after {
  transform: scaleX(1);
}

.nav-link[disabled] {
  pointer-events: none;
  color: var(--text-secondary-color);
  opacity: 0.6;
}

.top-bar__actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

main {
  flex: 1;
}

.footer-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: center;
}

@media (max-width: 900px) {
  .top-bar__content {
    flex-wrap: wrap;
    justify-content: center;
  }

  .nav-links {
    order: 3;
  }
}
</style>
