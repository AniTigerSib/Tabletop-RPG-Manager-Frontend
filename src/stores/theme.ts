import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

type Theme = 'dark' | 'light'

const THEME_STORAGE_KEY = 'trpg-theme'

const applyTheme = (value: Theme) => {
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = value
  }
}

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<Theme>('dark')

  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as Theme | null
    if (stored === 'dark' || stored === 'light') {
      theme.value = stored
    } else {
      const prefersLight = window.matchMedia?.('(prefers-color-scheme: light)')?.matches
      if (prefersLight) {
        theme.value = 'light'
      }
    }

    watch(
      theme,
      (value) => {
        applyTheme(value)
        window.localStorage.setItem(THEME_STORAGE_KEY, value)
      },
      { immediate: true },
    )
  } else {
    watch(
      theme,
      (value) => {
        applyTheme(value)
      },
      { immediate: true },
    )
  }

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  const setTheme = (value: Theme) => {
    theme.value = value
  }

  return {
    theme,
    toggleTheme,
    setTheme,
  }
})
