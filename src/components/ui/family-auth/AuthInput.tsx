import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../../lib/cn'
import { FormError } from './FormError'
import { FormLabel } from './FormLabel'

export type AuthInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> & {
  label: string
  error?: string
  icon?: ReactNode
  wrapperClassName?: string
  labelAction?: ReactNode
  hideLabel?: boolean
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(function AuthInput(
  { label, error, icon, id, wrapperClassName, labelAction, hideLabel, ...props },
  ref,
) {
  const inputId = id ?? props.name
  const errorId = error && inputId ? `${inputId}-error` : undefined

  return (
    <div className={cn('min-w-0', wrapperClassName)}>
      {labelAction ? (
        <div className="mb-2 flex items-center justify-between gap-3">
          <FormLabel htmlFor={inputId} className={cn('mb-0', hideLabel && 'sr-only')}>
            {label}
          </FormLabel>
          {labelAction}
        </div>
      ) : (
        <FormLabel htmlFor={inputId} className={hideLabel ? 'sr-only' : undefined}>
          {label}
        </FormLabel>
      )}
      <div className="relative">
        {icon ? (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--fa-text-muted)]">
            {icon}
          </span>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={cn(
            'w-full min-w-0 rounded-[var(--fa-radius-sm)] border-0 bg-[var(--fa-input-bg)] py-3.5 text-sm text-[var(--fa-text)] outline-none transition placeholder:text-[var(--fa-text-muted)] focus:bg-[var(--fa-input-bg-focus)] focus:ring-2 focus:ring-[var(--fa-link)]/25',
            icon ? 'pl-11 pr-4' : 'px-4',
            error && 'ring-2 ring-[var(--fa-error)]/30',
          )}
          {...props}
        />
      </div>
      {error ? <FormError id={errorId}>{error}</FormError> : null}
    </div>
  )
})
