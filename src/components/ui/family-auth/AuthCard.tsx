import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { cn } from '../../../lib/cn'

type AuthCardOwnProps<T extends ElementType = 'div'> = {
  children: ReactNode
  as?: T
}

type AuthCardProps<T extends ElementType = 'div'> = AuthCardOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof AuthCardOwnProps<T>>

export function AuthCard<T extends ElementType = 'div'>({
  children,
  className,
  as,
  ...props
}: AuthCardProps<T>) {
  const Tag = as ?? ('div' as ElementType)

  return (
    <Tag
      className={cn(
        'rounded-[var(--fa-radius)] border border-[var(--fa-border)]/60 bg-[var(--fa-surface)] shadow-[var(--fa-shadow)]',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
