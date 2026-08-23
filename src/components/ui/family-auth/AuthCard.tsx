import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { MindSpeakLogo } from '../../brand/MindSpeakLogo'
import { cn } from '../../../lib/cn'

type AuthCardOwnProps<T extends ElementType = 'div'> = {
  children: ReactNode
  as?: T
  /** Esconde a logo centralizada — só pra casos que não sejam o card principal do formulário. */
  hideLogo?: boolean
}

type AuthCardProps<T extends ElementType = 'div'> = AuthCardOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof AuthCardOwnProps<T>>

export function AuthCard<T extends ElementType = 'div'>({
  children,
  className,
  as,
  hideLogo = false,
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
      {!hideLogo ? <MindSpeakLogo layout="forms" size="lg" className="mx-auto mb-6" /> : null}
      {children}
    </Tag>
  )
}
