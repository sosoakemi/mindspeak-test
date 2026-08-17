import type { ReactNode } from 'react'
import { cn } from '../../../lib/cn'

type SecureAccessContainerProps = {
  children: ReactNode
  className?: string
}

export function SecureAccessContainer({ children, className }: SecureAccessContainerProps) {
  return (
    <div
      className={cn(
        'w-full max-w-3xl rounded-[var(--sa-radius-container)] bg-[var(--sa-container)] px-6 py-10 shadow-[var(--sa-container-glow)] sm:px-10 sm:py-12 md:px-12 md:py-14',
        className,
      )}
    >
      <header className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--sa-container-text)] sm:text-3xl md:text-4xl">
          Acesso Seguro
        </h1>
        <div className="mx-auto mt-6 h-px w-16 bg-[var(--sa-divider)]" aria-hidden />
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-[var(--sa-subtitle)] sm:text-base">
          Tecnologia acessível que transforma pensamento em comunicação.
        </p>
      </header>
      {children}
    </div>
  )
}
