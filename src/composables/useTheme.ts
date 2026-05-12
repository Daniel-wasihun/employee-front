import { ref, onMounted, watch } from 'vue'

export type Theme = 'light' | 'dark'

export function useTheme() {
  const theme = ref<Theme>(
    (localStorage.getItem('ems-theme') as Theme) || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  )

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  const applyTheme = () => {
    const root = window.document.documentElement
    if (theme.value === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('ems-theme', theme.value)
  }

  watch(theme, applyTheme)

  onMounted(applyTheme)

  return {
    theme,
    toggleTheme,
    isDark: theme.value === 'dark'
  }
}
