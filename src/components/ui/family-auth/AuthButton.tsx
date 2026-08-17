import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../../../lib/cn'

export type AuthButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean
  variant?: 'primary' | 'secondary'
  fullWidth?: boolean
}

export const AuthButton = forwardRef<HTMLButtonElement, AuthButtonProps>(function AuthButton(
  { className, children, isLoading, disabled, variant = 'primary', fullWidth = true, type = 'button', ...props },
  ref,
) {
  const isDisabled = disabled || isLoading

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      className={cn(
        'inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[var(--fa-radius-sm)] px-6 text-sm font-bold uppercase tracking-wide transition active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50',
        fullWidth && 'w-full',
        variant === 'primary' &&
          'bg-[var(--fa-cta)] text-white hover:bg-[var(--fa-cta-hover)] active:bg-[var(--fa-cta-active)] focus-visible:outline-[var(--fa-cta)] dark:text-[#111827]',
        variant === 'secondary' &&
          'border border-[var(--fa-border)] bg-[var(--fa-surface)] text-[var(--fa-text)] hover:bg-[var(--fa-input-bg)] focus-visible:outline-[var(--fa-link)]',
        className,
      )}
      {...props}
    >
      {isLoading ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : null}
      {children}
    </button>
  )
})
