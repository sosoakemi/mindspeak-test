import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'mindspeak-site-theme'

export type SiteTheme = 'light' | 'dark'

function getPreferredTheme(): SiteTheme {
  if (typeof window === 'undefined') return 'light'

  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useThemeState() {
  const [theme, setThemeState] = useState<SiteTheme>(() => getPreferredTheme())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const setTheme = useCallback((next: SiteTheme) => {
    setThemeState(next)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, isDark: theme === 'dark', setTheme, toggleTheme }
}
