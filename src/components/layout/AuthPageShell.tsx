import type { ReactNode } from 'react'
import { ThemeToggle } from '../shared/ThemeToggle'

export function AuthPageShell({ children, maxWidth = 'md' }: { children: ReactNode; maxWidth?: 'md' | 'lg' }) {
  const widthClass = maxWidth === 'lg' ? 'max-w-lg' : 'max-w-md'
  return (
    <div className="relative flex min-h-dvh min-w-0 items-center justify-center overflow-x-hidden bg-ms-page px-3 py-10 sm:px-4 sm:py-12">
      <div className="absolute right-3 top-3 z-10 sm:right-4 sm:top-4">
        <ThemeToggle size="compact" />
      </div>
      <div className={`w-full min-w-0 ${widthClass}`}>{children}</div>
    </div>
  )
}
