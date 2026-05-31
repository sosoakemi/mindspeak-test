import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { cn } from '../../lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-green-600 text-white hover:bg-green-700 hover:shadow-md active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 dark:bg-ms-accent dark:hover:bg-ms-accent-hover dark:shadow-blue-900/30 dark:focus-visible:outline-ms-accent-muted',
  secondary:
    'border border-ms-border bg-ms-surface text-ms-secondary hover:border-gray-400 hover:bg-ms-subtle active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 dark:border-ms-border dark:hover:border-ms-accent/50 dark:hover:bg-ms-subtle-strong',
  danger:
    'bg-red-600 text-white hover:bg-red-700 hover:shadow-md active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800',
  ghost:
    'bg-transparent text-green-600 hover:bg-green-50 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 min-h-[44px] px-4 py-2 dark:text-ms-accent-muted dark:hover:bg-blue-950/40 dark:focus-visible:outline-ms-accent',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-[44px] gap-1.5 px-3 py-2 text-sm font-medium',
  md: 'min-h-[44px] gap-2 px-6 py-2.5 text-base font-medium',
  lg: 'min-h-[48px] gap-2 px-8 py-3 text-lg font-medium',
}

const ghostTextOnly: Record<ButtonSize, string> = {
  sm: 'gap-1.5 text-sm font-medium',
  md: 'gap-2 text-base font-medium',
  lg: 'gap-2 text-lg font-medium',
}

function sizeForVariant(variant: ButtonVariant, size: ButtonSize) {
  if (variant === 'ghost') return ghostTextOnly[size]
  return sizeClasses[size]
}

const base =
  'inline-flex items-center justify-center rounded-lg transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed'

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  icon?: ReactNode
  children?: ReactNode
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    icon,
    disabled,
    children,
    type = 'button',
    fullWidth,
    ...rest
  },
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
        base,
        variantClasses[variant],
        sizeForVariant(variant, size),
        fullWidth && 'w-full',
        className,
      )}
      {...rest}
    >
      {isLoading ? <Loader2 className="h-[1.1em] w-[1.1em] shrink-0 animate-spin" aria-hidden /> : icon}
      {children}
    </button>
  )
})

export type LinkButtonProps = Omit<LinkProps, 'className' | 'children'> & {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
  children?: ReactNode
  className?: string
  fullWidth?: boolean
  disabled?: boolean
  isLoading?: boolean
}

/** Same visual system as Button, rendered as React Router `<Link>`. */
export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(function LinkButton(
  { className, variant = 'primary', size = 'md', icon, children, fullWidth, disabled, isLoading, onClick, ...rest },
  ref,
) {
  const isDisabled = disabled || isLoading
  return (
    <Link
      ref={ref}
      aria-busy={isLoading || undefined}
      aria-disabled={isDisabled || undefined}
      className={cn(
        base,
        variantClasses[variant],
        sizeForVariant(variant, size),
        fullWidth && 'w-full',
        isDisabled && 'pointer-events-none opacity-50',
        className,
      )}
      onClick={(e) => {
        if (isDisabled) {
          e.preventDefault()
          return
        }
        onClick?.(e)
      }}
      {...rest}
    >
      {isLoading ? <Loader2 className="h-[1.1em] w-[1.1em] shrink-0 animate-spin" aria-hidden /> : icon}
      {children}
    </Link>
  )
})
