import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { MindSpeakLogo } from '../brand/MindSpeakLogo'
import { ThemeToggle } from '../shared/ThemeToggle'
import { cn } from '../../lib/cn'

type FamilyAuthShellProps = {
  children: ReactNode
  hero?: ReactNode
  maxWidth?: 'md' | 'lg' | 'xl'
  layout?: 'centered' | 'split'
}

const widthMap = {
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
}

export function FamilyAuthShell({
  children,
  hero,
  maxWidth = 'lg',
  layout = 'centered',
}: FamilyAuthShellProps) {
  const isSplit = layout === 'split' && hero

  return (
    <div
      data-family-auth
      className="relative flex min-h-dvh min-w-0 flex-col overflow-x-hidden bg-[var(--fa-bg)] text-[var(--fa-text)]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-20"
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, var(--fa-mint) 0%, transparent 45%), radial-gradient(circle at 80% 0%, var(--fa-badge-bg) 0%, transparent 40%)',
        }}
      />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-6 sm:px-6 sm:py-8">
        <MindSpeakLogo
          layout="horizontal"
          size="md"
          className="justify-start"
          wordmarkClassName="text-[var(--fa-text)]"
        />
        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle size="compact" />
          <Link
            to="/"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-[var(--fa-radius-sm)] border border-[var(--fa-border)] bg-[var(--fa-surface)] px-4 text-sm font-medium text-[var(--fa-text-secondary)] shadow-sm transition hover:bg-[var(--fa-input-bg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fa-link)]"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Sair</span>
          </Link>
        </div>
      </header>

      <main
        className={cn(
          'relative z-10 mx-auto w-full min-w-0 flex-1 px-4 pb-10 sm:px-6 sm:pb-12',
          isSplit ? 'max-w-6xl' : widthMap[maxWidth],
          !isSplit && 'mx-auto',
        )}
      >
        {isSplit ? (
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-12">
            {hero}
            <div className="min-w-0">{children}</div>
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  )
}
