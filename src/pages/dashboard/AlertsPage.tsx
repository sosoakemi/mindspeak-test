import { useMemo, useState } from 'react'
import { Check, CheckCheck, SlidersHorizontal } from 'lucide-react'
import { cn } from '../../lib/cn'
import { formatDateTime, severityMeta } from '../../lib/severity'
import type { WordSeverity } from '../../lib/backendApi'
import { useDashboard } from './dashboard-context'
import { Button, LinkButton } from '../../components/shared/Button'

// Só críticos e moderados aparecem: o backend não devolve seleções de
// palavras informativas como alerta, então um filtro "informativo" aqui
// seria um botão que nunca mostra nada.
const filters: { id: 'todos' | Exclude<WordSeverity, 'informativo'>; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'critico', label: 'Críticos' },
  { id: 'moderado', label: 'Moderados' },
]

export function AlertsPage() {
  const { alerts, markRead, markAllRead, unreadCount, alertsLoading, alertsError, selectedPatient } =
    useDashboard()
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('todos')
  const [busyId, setBusyId] = useState<number | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)

  const visible = useMemo(() => {
    if (filter === 'todos') return alerts
    return alerts.filter((a) => a.severity === filter)
  }, [filter, alerts])

  const run = async (id: number | 'all', action: () => Promise<void>) => {
    setBusyId(id === 'all' ? -1 : id)
    setActionError(null)
    try {
      await action()
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Não foi possível dar baixa no alerta.')
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="min-w-0 space-y-6 sm:space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-emerald-950 dark:text-emerald-100">
            Central de alertas
          </h1>
          <p className="mt-1 text-sm text-ms-secondary">
            {selectedPatient
              ? `Frases urgentes ditas por ${selectedPatient.display_name}.`
              : 'Selecione um paciente no topo da página.'}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            icon={<CheckCheck className="h-4 w-4" aria-hidden />}
            disabled={unreadCount === 0 || busyId !== null}
            isLoading={busyId === -1}
            onClick={() => void run('all', markAllRead)}
          >
            Marcar todos como visto
          </Button>
          <LinkButton
            to="/dashboard/phrases"
            variant="secondary"
            size="md"
            icon={<SlidersHorizontal className="h-4 w-4" aria-hidden />}
          >
            Definir frases críticas
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

      {actionError ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800 dark:bg-red-950/40 dark:text-red-200" role="alert">
          {actionError}
        </p>
      ) : null}
      {alertsError ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800 dark:bg-red-950/40 dark:text-red-200" role="alert">
          {alertsError}
        </p>
      ) : null}

      <section className="overflow-hidden rounded-2xl border border-ms-border bg-ms-surface shadow-sm">
        {alertsLoading ? (
          <p className="px-5 py-8 text-center text-sm text-ms-secondary">Carregando alertas…</p>
        ) : visible.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <p className="text-sm font-medium text-ms-primary">Nenhum alerta.</p>
            <p className="mt-1 text-sm text-ms-secondary">
              Alertas aparecem quando o paciente seleciona uma frase marcada como crítica ou
              moderada na tela de Frases.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-ms-border-subtle" aria-label="Lista de alertas">
            {visible.map((alert) => {
              const meta = severityMeta[alert.severity]
              const Icon = meta.icon
              const unread = alert.acknowledged_at === null
              return (
                <li
                  key={alert.id}
                  className={cn(
                    'flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between',
                    meta.rowClass,
                    unread && 'bg-emerald-50/40 dark:bg-emerald-950/20',
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
                      <p className="text-xs font-semibold uppercase tracking-wide text-ms-muted">
                        {formatDateTime(alert.selected_at)}
                      </p>
                      <p className="mt-1 truncate text-sm font-semibold text-ms-primary">
                        {alert.utterance}
                      </p>
                      <p className="mt-1 text-xs text-ms-secondary">
                        {meta.label} · {Math.round(alert.confidence * 100)}% de confiança
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-3 sm:justify-end">
                    {unread ? (
                      <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-900 ring-1 ring-amber-200 dark:bg-amber-950/50 dark:text-amber-200 dark:ring-amber-900">
                        Não lido
                      </span>
                    ) : (
                      <span className="rounded-full bg-ms-subtle-strong px-2.5 py-1 text-[11px] font-semibold text-ms-secondary ring-1 ring-ms-border-subtle">
                        Visto {formatDateTime(alert.acknowledged_at ?? '')}
                      </span>
                    )}
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      icon={<Check className="h-3.5 w-3.5" aria-hidden />}
                      disabled={!unread || busyId !== null}
                      isLoading={busyId === alert.id}
                      onClick={() => void run(alert.id, () => markRead(alert.id))}
                    >
                      Marcar como visto
                    </Button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </div>
  )
}
