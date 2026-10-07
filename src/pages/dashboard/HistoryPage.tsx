import { useCallback, useEffect, useState } from 'react'
import { getPatientTimeline, type TimelineEntry } from '../../lib/backendApi'
import { useDashboard } from './dashboard-context'
import { Button } from '../../components/shared/Button'
import { formatDateTime, severityMeta } from '../../lib/severity'
import { msCardPad } from '../../lib/msStyles'
import { cn } from '../../lib/cn'

const PAGE_SIZE = 30

// Agrupa por dia para a linha do tempo não virar uma lista corrida de
// horários sem referência de data.
function dayLabel(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
    })
  } catch {
    return 'Data desconhecida'
  }
}

export function HistoryPage() {
  const { selectedPatient, patientsLoading } = useDashboard()
  const [entries, setEntries] = useState<TimelineEntry[]>([])
  const [cursor, setCursor] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const patientId = selectedPatient?.id ?? null

  useEffect(() => {
    if (patientId === null) {
      setEntries([])
      setCursor(null)
      return
    }
    let cancelled = false
    setLoading(true)
    setError(null)
    getPatientTimeline(patientId, { limit: PAGE_SIZE })
      .then((page) => {
        if (cancelled) return
        setEntries(page.items)
        setCursor(page.next_cursor)
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

  const loadMore = useCallback(async () => {
    if (patientId === null || cursor === null) return
    setLoadingMore(true)
    setError(null)
    try {
      const page = await getPatientTimeline(patientId, { limit: PAGE_SIZE, cursor })
      setEntries((prev) => [...prev, ...page.items])
      setCursor(page.next_cursor)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao carregar mais itens.')
    } finally {
      setLoadingMore(false)
    }
  }, [patientId, cursor])

  const groups: { day: string; items: TimelineEntry[] }[] = []
  for (const entry of entries) {
    const day = dayLabel(entry.selected_at)
    const last = groups[groups.length - 1]
    if (last && last.day === day) last.items.push(entry)
    else groups.push({ day, items: [entry] })
  }

  return (
    <div className="min-w-0 space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-emerald-950 dark:text-emerald-100 sm:text-2xl">
          Histórico
        </h1>
        <p className="mt-1 text-sm text-ms-secondary">
          {selectedPatient
            ? `Tudo que ${selectedPatient.display_name} falou, da fala mais recente para a mais antiga.`
            : patientsLoading
              ? 'Carregando…'
              : 'Nenhum paciente cadastrado.'}
        </p>
      </div>

      {error ? (
        <p
          className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800 dark:bg-red-950/40 dark:text-red-200"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <section className={msCardPad}>
        {loading ? (
          <p className="py-8 text-center text-sm text-ms-secondary">Carregando histórico…</p>
        ) : entries.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-sm font-medium text-ms-primary">Nada registrado ainda.</p>
            <p className="mt-1 text-sm text-ms-secondary">
              O histórico se enche conforme o paciente seleciona palavras numa sessão ao vivo.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {groups.map((group) => (
              <div key={group.day}>
                <h2 className="text-sm font-semibold capitalize text-ms-primary">{group.day}</h2>
                <ol className="relative mt-5 space-y-6 border-l border-ms-border pl-6 sm:pl-8">
                  {group.items.map((entry) => {
                    const meta = severityMeta[entry.severity]
                    const Icon = meta.icon
                    return (
                      <li key={entry.id} className="relative min-w-0">
                        <span
                          className={cn(
                            'absolute -left-[31px] flex h-9 w-9 items-center justify-center rounded-full ring-2 sm:-left-[39px] sm:h-10 sm:w-10',
                            meta.badgeClass,
                          )}
                        >
                          <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
                        </span>
                        <p className="text-xs font-semibold uppercase tracking-wide text-ms-muted">
                          {formatDateTime(entry.selected_at)}
                        </p>
                        <p className="mt-1 break-words text-base font-semibold text-ms-primary">
                          {entry.utterance}
                        </p>
                        <p className="mt-1 text-sm text-ms-secondary">
                          {meta.label} · {Math.round(entry.confidence * 100)}% de confiança · sessão{' '}
                          {entry.session_id}
                        </p>
                      </li>
                    )
                  })}
                </ol>
              </div>
            ))}

            {cursor !== null ? (
              <div className="flex justify-center pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  isLoading={loadingMore}
                  onClick={() => void loadMore()}
                >
                  Carregar mais
                </Button>
              </div>
            ) : null}
          </div>
        )}
      </section>
    </div>
  )
}
