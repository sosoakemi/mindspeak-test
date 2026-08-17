import { cn } from '../../../lib/cn'

type FormErrorProps = {
  id?: string
  children: string
  className?: string
}

export function FormError({ id, children, className }: FormErrorProps) {
  return (
    <p id={id} role="alert" className={cn('mt-2 text-xs font-medium text-[var(--fa-error)]', className)}>
      {children}
    </p>
  )
}
