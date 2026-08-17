import { createContext, useContext, type ReactNode } from 'react'
import { useThemeState, type SiteTheme } from '../hooks/useTheme'

type SiteThemeContextValue = {
  theme: SiteTheme
  isDark: boolean
  setTheme: (theme: SiteTheme) => void
  toggleTheme: () => void
}

const SiteThemeContext = createContext<SiteThemeContextValue | null>(null)

export function SiteThemeProvider({ children }: { children: ReactNode }) {
  const value = useThemeState()

  return (
    <SiteThemeContext.Provider value={value}>{children}</SiteThemeContext.Provider>
  )
}

export function useSiteTheme() {
  const context = useContext(SiteThemeContext)
  if (!context) {
    throw new Error('useSiteTheme must be used within SiteThemeProvider')
  }
  return context
}

export type { SiteTheme }
