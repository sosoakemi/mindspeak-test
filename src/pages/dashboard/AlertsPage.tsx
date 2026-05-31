import { useMemo, useState } from 'react'
import { AlertTriangle, Check, CheckCheck, Info, ShieldAlert, SlidersHorizontal } from 'lucide-react'
import { cn } from '../../lib/cn'
import {
  severityFromPhrase,
  severityMeta,
  type AlertSeverity,
} from '../../data/mockDashboard'
import { useDashboardAlerts } from './alerts-context'
import { Button, LinkButton } from '../../components/shared/Button'

const filters: { id: 'todos' | AlertSeverity; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'critico', label: 'Críticos' },
  { id: 'moderado', label: 'Moderados' },
  { id: 'informativo', label: 'Informativos' },
]

function iconFor(sev: AlertSeverity) {
  if (sev === 'critico') return ShieldAlert
  if (sev === 'moderado') return AlertTriangle
  return Info
}

export function AlertsPage() {
  const { alerts, markRead, markAllRead } = useDashboardAlerts()
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('todos')

  const sorted = useMemo(
    () => [...alerts].sort((a, b) => b.time.localeCompare(a.time)),
    [alerts],
  )

  const visible = useMemo(() => {
    if (filter === 'todos') return sorted
    return sorted.filter((a) => severityFromPhrase(a.phrase) === filter)
  }, [filter, sorted])

  const hasUnread = sorted.some((a) => !a.read)

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-emerald-950">Central de alertas</h1>
          <p className="mt-1 text-sm text-slate-600">Priorização por severidade · dados mockados.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            icon={<CheckCheck className="h-4 w-4" aria-hidden />}
            disabled={!hasUnread}
            onClick={markAllRead}
          >
            Marcar todos como visto
          </Button>
          <LinkButton
            to="/dashboard/phrases"
            variant="secondary"
            size="md"
            icon={<SlidersHorizontal className="h-4 w-4" aria-hidden />}
          >
            Frases críticas
          </LinkButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <Button
            key={f.id}
            type="button"
            variant={filter === f.id ? 'primary' : 'secondary'}
            size="sm"
            className="rounded-full"
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </Button>
        ))}
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <ul className="divide-y divide-slate-100" aria-label="Lista de alertas">
          {visible.map((a) => {
            const sev = severityFromPhrase(a.phrase)
            const meta = severityMeta[sev]
            const Icon = iconFor(sev)
            return (
              <li
                key={a.id}
                className={cn(
                  'flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between',
                  !a.read && 'bg-emerald-50/40',
                )}
              >
                <div className="flex min-w-0 flex-1 items-start gap-4">
                  <span
                    className={cn(
                      'mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-1',
                      meta.badgeClass,
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{a.time}</p>
                    <p className="mt-1 truncate text-sm font-semibold text-slate-900">{a.phrase}</p>
                    <p className="mt-1 text-xs text-slate-600">{meta.label}</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3 sm:justify-end">
                  {!a.read ? (
                    <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-900 ring-1 ring-amber-200">
                      Não lido
                    </span>
                  ) : (
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600 ring-1 ring-slate-200">
                      Visto
                    </span>
                  )}
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    icon={<Check className="h-3.5 w-3.5" aria-hidden />}
                    disabled={a.read}
                    onClick={() => markRead(a.id)}
                  >
                    Marcar como visto
                  </Button>
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
