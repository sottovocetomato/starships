import { computed, ref } from 'vue'
import type { Ref, ComputedRef } from 'vue'
export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}
interface ThemeResult {
  currentTheme?: Ref<string, string>
  isLightTheme?: ComputedRef
  getCurrentTheme: () => void
  toggleCurrentTheme: () => void
}

const currentTheme = ref<string>('light')

const isLightTheme = computed(() => currentTheme.value === Theme.LIGHT)

export const useTheme = (): ThemeResult => {
  function getCurrentTheme() {
    const savedTheme = localStorage.getItem('picoPreferredColorScheme')

    if (!savedTheme) {
      localStorage.setItem('picoPreferredColorScheme', 'light')
    } else {
      currentTheme.value = savedTheme
    }
  }

  function toggleCurrentTheme() {
    currentTheme.value = currentTheme.value === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    localStorage.setItem('picoPreferredColorScheme', currentTheme.value)
  }
  return { currentTheme, isLightTheme, getCurrentTheme, toggleCurrentTheme }
}
