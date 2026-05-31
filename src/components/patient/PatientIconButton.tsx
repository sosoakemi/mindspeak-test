import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Button } from '../shared/Button'

/** Botão de ícone padronizado do header da área do paciente (Perfil, Configurações). */
export function PatientIconButton({
  className,
  children,
  pressed,
  ...rest
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  children: ReactNode
  pressed?: boolean
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={cn(
        'min-h-[44px] min-w-[44px] shrink-0 rounded-full px-2',
        pressed && 'bg-ms-subtle ring-1 ring-ms-border',
        className,
      )}
      {...rest}
    >
      {children}
    </Button>
  )
}
