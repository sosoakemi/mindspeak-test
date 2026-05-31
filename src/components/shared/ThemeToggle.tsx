import { Moon, Sun } from 'lucide-react'
import { cn } from '../../lib/cn'
import { useTheme } from '../../theme/useTheme'

type ThemeToggleProps = {
  className?: string
  /** compact: icon-only for dense headers */
  size?: 'default' | 'compact'
}

export function ThemeToggle({ className, size = 'default' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const label = isDark ? 'Ativar modo claro' : 'Ativar modo escuro'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'inline-flex items-center justify-center rounded-lg border border-ms-border bg-ms-surface text-ms-secondary transition hover:bg-ms-subtle hover:text-ms-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600',
        size === 'compact' ? 'min-h-[44px] min-w-[44px] shrink-0 p-2' : 'min-h-[44px] shrink-0 gap-2 px-3 py-2 text-sm font-medium',
        className,
      )}
      aria-label={label}
      title={label}
    >
      {isDark ? (
        <Sun className="h-5 w-5 shrink-0 text-amber-400" aria-hidden />
      ) : (
        <Moon className="h-5 w-5 shrink-0" aria-hidden />
      )}
      {size === 'default' ? <span className="hidden sm:inline">{isDark ? 'Claro' : 'Escuro'}</span> : null}
    </button>
  )
}
