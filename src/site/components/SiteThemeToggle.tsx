import { Moon, Sun } from 'lucide-react'
import { useSiteTheme } from '../context/SiteThemeContext'

type SiteThemeToggleProps = {
  className?: string
}

export default function SiteThemeToggle({ className = '' }: SiteThemeToggleProps) {
  const { isDark, toggleTheme } = useSiteTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      className={`rounded-lg p-2 transition-colors ${className}`}
    >
      {isDark ? (
        <Sun className="h-5 w-5" strokeWidth={1.75} />
      ) : (
        <Moon className="h-5 w-5" strokeWidth={1.75} />
      )}
    </button>
  )
}
