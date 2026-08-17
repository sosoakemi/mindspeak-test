import type { LabelHTMLAttributes } from 'react'
import { cn } from '../../../lib/cn'

export function FormLabel({ className, children, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        'mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--fa-label)]',
        className,
      )}
      {...props}
    >
      {children}
    </label>
  )
}
