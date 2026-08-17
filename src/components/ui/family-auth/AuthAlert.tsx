import { AlertCircle, CheckCircle2, Info } from 'lucide-react'
import { cn } from '../../../lib/cn'

type AuthAlertProps = {
  variant?: 'info' | 'success' | 'error'
  children: string
  className?: string
}

const icons = {
  info: Info,
  success: CheckCircle2,
  error: AlertCircle,
}

export function AuthAlert({ variant = 'info', children, className }: AuthAlertProps) {
  const Icon = icons[variant]
  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={cn(
        'flex items-start gap-3 rounded-[var(--fa-radius-sm)] px-4 py-3 text-sm',
        variant === 'info' && 'bg-[var(--fa-input-bg)] text-[var(--fa-text-secondary)]',
        variant === 'success' && 'bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100',
        variant === 'error' && 'bg-[var(--fa-error-bg)] text-[var(--fa-error)]',
        className,
      )}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <p>{children}</p>
    </div>
  )
}
