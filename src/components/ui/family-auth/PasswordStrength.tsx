import { getPasswordStrength } from '../../../lib/passwordStrength'
import { cn } from '../../../lib/cn'

type PasswordStrengthProps = {
  password: string
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const { score, label, percent } = getPasswordStrength(password)

  const barColor =
    score <= 1 ? 'bg-red-500' : score === 2 ? 'bg-amber-500' : score === 3 ? 'bg-emerald-500' : 'bg-[var(--fa-link)]'

  return (
    <div className="mt-3 space-y-2" aria-live="polite">
      <div className="h-1.5 overflow-hidden rounded-full bg-[var(--fa-progress-inactive)]">
        <div
          className={cn('h-full rounded-full transition-all duration-300', barColor)}
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Força da senha: ${label}`}
        />
      </div>
      <p className="text-xs text-[var(--fa-text-muted)]">
        Força da senha: <span className="font-medium text-[var(--fa-text)]">{label}</span>
      </p>
    </div>
  )
}
