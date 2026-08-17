import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../../lib/cn'
import { FormError } from './FormError'

export type AuthCheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: ReactNode
  error?: string
}

export const AuthCheckbox = forwardRef<HTMLInputElement, AuthCheckboxProps>(function AuthCheckbox(
  { label, error, id, className, ...props },
  ref,
) {
  const inputId = id ?? props.name
  const errorId = error && inputId ? `${inputId}-error` : undefined

  return (
    <div className={cn('min-w-0', className)}>
      <label htmlFor={inputId} className="flex cursor-pointer items-start gap-3">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-[var(--fa-border)] accent-[var(--fa-link)]"
          {...props}
        />
        <span className="text-sm leading-relaxed text-[var(--fa-text-secondary)]">{label}</span>
      </label>
      {error ? <FormError id={errorId}>{error}</FormError> : null}
    </div>
  )
})
