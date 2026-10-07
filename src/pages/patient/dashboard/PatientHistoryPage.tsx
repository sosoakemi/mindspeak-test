import { useEffect, useMemo, useState } from 'react'
import { getPatientTimeline, type TimelineEntry } from '../../../lib/backendApi'
import { usePortalPatient } from '../portal-patient-context'
import { Button } from '../../../components/shared/Button'
import { formatDateTime, severityMeta } from '../../../lib/severity'
import { cn } from '../../../lib/cn'
import { msTableWrap } from '../../../lib/msStyles'

type FilterKey = 'hoje' | '7d' | '30d'

const FILTERS: { key: FilterKey; label: string; days: number }[] = [
  { key: 'hoje', label: 'Hoje', days: 0 },
  { key: '7d', label: '7 dias', days: 7 },
  { key: '30d', label: '30 dias', days: 30 },
]

function cutoffFor(filter: FilterKey): Date {
  const now = new Date()
  const found = FILTERS.find((f) => f.key === filter)
  if (!found || found.days === 0) {
    const start = new Date(now)
    start.setHours(0, 0, 0, 0)
    return start
  }
  const start = new Date(now)
  start.setDate(start.getDate() - found.days)
  return start
}

export function PatientHistoryPage() {
  const { patient, loading: patientLoading, error: patientError } = usePortalPatient()
  const [filter, setFilter] = useState<FilterKey>('hoje')
  const [entries, setEntries] = useState<TimelineEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const patientId = patient?.id ?? null

  useEffect(() => {
    if (patientId === null) return
    let cancelled = false
    setLoading(true)
    setError(null)
    getPatientTimeline(patientId, { limit: 200 })
      .then((page) => {
        if (!cancelled) setEntries(page.items)
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Falha ao carregar o histórico.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [patientId])

  // O filtro corta localmente porque as 200 entradas mais recentes já
  // cobrem os períodos oferecidos; ir ao servidor a cada clique só
  // adicionaria espera.
  const rows = useMemo(() => {
    const cutoff = cutoffFor(filter).getTime()
    return entries.filter((e) => new Date(e.selected_at).getTime() >= cutoff)
  }, [entries, filter])

  const message = patientError ?? error
  const busy = patientLoading || loading

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-4 sm:gap-6">
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold tracking-tight text-ms-primary sm:text-2xl">
            Histórico de Comunicação
          </h1>
          <p className="mt-1 text-sm text-ms-secondary">
            {patient
              ? `Frases que ${patient.display_name} falou, da mais recente para a mais antiga.`
              : busy
                ? 'Carregando…'
                : 'Nenhum paciente vinculado a esta conta.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por período">
          {FILTERS.map(({ key, label }) => (
            <Button
              key={key}
              type="button"
              variant={filter === key ? 'primary' : 'secondary'}
              size="sm"
              className="rounded-full"
              onClick={() => setFilter(key)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      {message ? (
        <p
          className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800 dark:bg-red-950/40 dark:text-red-200"
          role="alert"
        >
          {message}
        </p>
      ) : null}

      {busy ? (
        <p className="rounded-2xl border border-ms-border bg-ms-surface p-8 text-center text-sm text-ms-secondary">
          Carregando histórico…
        </p>
      ) : rows.length === 0 ? (
        <div className="rounded-2xl border border-ms-border bg-ms-surface p-10 text-center">
          <p className="text-sm font-medium text-ms-primary">Nada neste período.</p>
          <p className="mt-1 text-sm text-ms-secondary">
            O histórico registra cada frase confirmada durante uma sessão com o sensor.
          </p>
        </div>
      ) : (
        <div className={msTableWrap}>
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="bg-ms-subtle text-xs uppercase tracking-wide text-ms-muted">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Quando
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Frase
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Confiança
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Severidade
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ms-border-subtle">
              {rows.map((row) => {
                const meta = severityMeta[row.severity]
                return (
                  <tr key={row.id}>
                    <td className="whitespace-nowrap px-4 py-3 tabular-nums text-ms-secondary">
                      {formatDateTime(row.selected_at)}
                    </td>
                    <td className="px-4 py-3 font-medium text-ms-primary">{row.utterance}</td>
                    <td className="whitespace-nowrap px-4 py-3 tabular-nums text-ms-secondary">
                      {Math.round(row.confidence * 100)}%
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          'inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1',
                          meta.badgeClass,
                        )}
                      >
                        {meta.label}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
