import { defineStore } from 'pinia'
import { onMounted, ref, watch } from 'vue'

type Theme = 'dark' | 'light'

const THEME_STORAGE_KEY = 'trpg-theme'

const getSystemPreference = (): Theme => {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const useThemeStore = defineStore('theme', () => {
  const currentTheme = ref<Theme>('dark')

  const applyTheme = (theme: Theme) => {
    if (typeof document !== 'undefined') {
      document.body.setAttribute('data-theme', theme)
    }
  }

  onMounted(() => {
    const saved = (localStorage.getItem(THEME_STORAGE_KEY) as Theme | null) || getSystemPreference()
    currentTheme.value = saved
  })

  watch(currentTheme, (theme) => {
    applyTheme(theme)
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    }
  }, { immediate: true })

  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === 'dark' ? 'light' : 'dark'
  }

  const setTheme = (theme: Theme) => {
    currentTheme.value = theme
  }

  return {
    currentTheme,
    toggleTheme,
    setTheme,
  }
})
