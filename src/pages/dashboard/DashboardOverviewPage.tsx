import { useEffect, useMemo, useState } from 'react'
import { LinkButton } from '../../components/shared/Button'
import { Sliders, Sparkles, UserPlus } from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  getPatientReadings,
  getPatientStats,
  getPatientTimeline,
  type PatientStats,
  type ReadingPoint,
  type TimelineEntry,
} from '../../lib/backendApi'
import { useDashboard } from './dashboard-context'
import { useChartTheme } from '../../hooks/useChartTheme'
import { formatTimeOfDay, severityMeta } from '../../lib/severity'
import { msCardPad, msStatRow } from '../../lib/msStyles'
import { cn } from '../../lib/cn'

// Bordas do dia de QUEM OLHA a tela. O backend não tenta adivinhar fuso:
// recebe o período pronto e agrega dentro dele.
function todayRange(): { start: Date; end: Date } {
  const end = new Date()
  const start = new Date(end)
  start.setHours(0, 0, 0, 0)
  return { start, end }
}

// Traço quando não há medida. Zero diria "medimos e deu zero", que é outra
// afirmação — ver app/schemas/dashboard.py no backend.
function orDash(value: string | null | undefined): string {
  return value ?? '—'
}

export function DashboardOverviewPage() {
  const { selectedPatient, alerts, patientsLoading } = useDashboard()
  const chart = useChartTheme()

  const [stats, setStats] = useState<PatientStats | null>(null)
  const [readings, setReadings] = useState<ReadingPoint[]>([])
  const [lastSpoken, setLastSpoken] = useState<TimelineEntry | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const patientId = selectedPatient?.id ?? null

  useEffect(() => {
    if (patientId === null) {
      setStats(null)
      setReadings([])
      setLastSpoken(null)
      return
    }
    let cancelled = false
    setLoading(true)
    setError(null)
    const range = todayRange()
    Promise.all([
      getPatientStats(patientId, range),
      getPatientReadings(patientId, 60),
      getPatientTimeline(patientId, { limit: 1 }),
    ])
      .then(([nextStats, nextReadings, timeline]) => {
        if (cancelled) return
        setStats(nextStats)
        setReadings(nextReadings)
        setLastSpoken(timeline.items[0] ?? null)
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Falha ao carregar os dados.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [patientId])

  const chartData = useMemo(
    () => readings.map((r) => ({ t: formatTimeOfDay(r.at), att: r.attention })),
    [readings],
  )

  const recentAlerts = alerts.slice(0, 4)

  if (!patientsLoading && selectedPatient === null) {
    return (
      <div className="min-w-0 space-y-6">
        <h1 className="text-xl font-semibold tracking-tight text-emerald-950 dark:text-emerald-100 sm:text-2xl">
          Visão geral
        </h1>
        <div className={cn(msCardPad, 'text-center')}>
          <p className="text-sm font-medium text-ms-primary">Nenhum paciente cadastrado ainda.</p>
          <p className="mt-1 text-sm text-ms-secondary">
            Cadastre um paciente para começar a acompanhar sessões e alertas.
          </p>
          <LinkButton
            to="/dashboard/patients"
            variant="primary"
            className="mt-6"
            icon={<UserPlus className="h-4 w-4" aria-hidden />}
          >
            Cadastrar paciente
          </LinkButton>
        </div>
      </div>
    )
  }

  return (
    <div className="min-w-0 space-y-6 sm:space-y-8">
      <div className="min-w-0">
        <h1 className="text-xl font-semibold tracking-tight text-emerald-950 dark:text-emerald-100 sm:text-2xl">
          Visão geral
        </h1>
        <p className="mt-1 text-sm text-ms-secondary">
          {selectedPatient ? `Acompanhamento de ${selectedPatient.display_name}, hoje.` : 'Carregando…'}
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

      <section className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <article className={msCardPad}>
          <h2 className="text-lg font-semibold text-ms-primary">
            {selectedPatient?.display_name ?? '—'}
          </h2>
          {selectedPatient?.external_ref ? (
            <p className="mt-1 text-sm text-ms-secondary">
              Referência: {selectedPatient.external_ref}
            </p>
          ) : null}

          <div className="mt-6 grid gap-4 border-t border-ms-border-subtle pt-6 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-ms-muted">Última fala</p>
              <p className="mt-1 text-2xl font-semibold text-ms-primary">
                {orDash(lastSpoken?.utterance)}
              </p>
              <p className="text-xs text-ms-muted">
                {lastSpoken ? `às ${formatTimeOfDay(lastSpoken.selected_at)}` : 'nada registrado ainda'}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-ms-muted">
                Qualidade média do sinal
              </p>
              <p className="mt-1 text-2xl font-semibold tabular-nums text-ms-primary">
                {stats?.avg_signal_quality !== null && stats?.avg_signal_quality !== undefined
                  ? `${stats.avg_signal_quality}%`
                  : '—'}
              </p>
              <p className="text-xs text-ms-muted">
                {stats?.avg_signal_quality === null ? 'sem leituras hoje' : 'das leituras de hoje'}
              </p>
            </div>
          </div>
        </article>

        <article className={msCardPad}>
          <h2 className="text-sm font-semibold text-ms-primary">Estatísticas do dia</h2>
          <dl className="mt-4 space-y-4">
            <div className={msStatRow}>
              <dt className="text-sm text-ms-secondary">Total de falas</dt>
              <dd className="text-lg font-semibold tabular-nums text-ms-primary">
                {loading ? '…' : (stats?.total_selections ?? 0)}
              </dd>
            </div>
            <div className={msStatRow}>
              <dt className="text-sm text-ms-secondary">
                Confiança média
                <span className="mt-0.5 block text-xs text-ms-muted">
                  quanto o modelo confiou na decisão — não é taxa de acerto
                </span>
              </dt>
              <dd className="text-lg font-semibold tabular-nums text-emerald-800 dark:text-emerald-300">
                {stats?.avg_confidence != null ? `${Math.round(stats.avg_confidence * 100)}%` : '—'}
              </dd>
            </div>
            <div className={msStatRow}>
              <dt className="text-sm text-ms-secondary">Tempo médio entre falas</dt>
              <dd className="text-lg font-semibold tabular-nums text-ms-primary">
                {stats?.avg_seconds_between_selections != null
                  ? `${stats.avg_seconds_between_selections.toFixed(1)}s`
                  : '—'}
              </dd>
            </div>
            <div className={msStatRow}>
              <dt className="text-sm text-ms-secondary">Sessões hoje</dt>
              <dd className="text-lg font-semibold tabular-nums text-ms-primary">
                {loading ? '…' : (stats?.sessions ?? 0)}
              </dd>
            </div>
          </dl>
        </article>
      </section>

      <section className={msCardPad}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-ms-primary">Atenção nas leituras recentes</h2>
            <p className="text-xs text-ms-muted">Últimos {readings.length} pontos gravados do sensor</p>
          </div>
        </div>
        <div className="h-52 w-full min-w-0 sm:h-64">
          {chartData.length === 0 ? (
            <div className="flex h-full items-center justify-center rounded-xl bg-ms-subtle/60">
              <p className="text-sm text-ms-secondary">
                {loading ? 'Carregando…' : 'Nenhuma leitura do sensor registrada ainda.'}
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="attFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} vertical={false} />
                <XAxis dataKey="t" tick={{ fontSize: 10, fill: chart.axis }} interval="preserveStartEnd" />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: chart.axis }} width={32} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: `1px solid ${chart.tooltipBorder}`,
                    background: chart.tooltipBg,
                    color: chart.tooltipText,
                  }}
                  formatter={(v) => [`${Number(v ?? 0)}%`, 'Atenção']}
                />
                <Area
                  type="monotone"
                  dataKey="att"
                  stroke="#059669"
                  strokeWidth={2}
                  fill="url(#attFill)"
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className={msCardPad}>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-ms-primary">Alertas recentes</h2>
            <LinkButton to="/dashboard/alerts" variant="ghost" size="sm" className="!px-0 !text-green-700">
              Ver central →
            </LinkButton>
          </div>
          {recentAlerts.length === 0 ? (
            <p className="text-sm text-ms-secondary">
              Nenhum alerta. Eles aparecem quando o paciente seleciona uma frase marcada como
              crítica ou moderada.
            </p>
          ) : (
            <ul className="space-y-3">
              {recentAlerts.map((alert) => {
                const meta = severityMeta[alert.severity]
                const Icon = meta.icon
                return (
                  <li
                    key={alert.id}
                    className={cn(
                      'flex items-start gap-3 rounded-xl bg-ms-subtle/80 p-3 ring-1 ring-ms-border-subtle',
                      meta.rowClass,
                    )}
                  >
                    <span
                      className={cn(
                        'inline-flex h-9 w-9 items-center justify-center rounded-full ring-1',
                        meta.badgeClass,
                      )}
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wide text-ms-muted">
                        {formatTimeOfDay(alert.selected_at)}
                      </p>
                      <p className="truncate text-sm font-semibold text-ms-primary">{alert.utterance}</p>
                      <p className="text-xs text-ms-secondary">{meta.label}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </article>

        <article className="rounded-2xl border border-ms-border bg-ms-surface p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-ms-primary">Ações rápidas</h2>
          <div className="mt-4 flex flex-col gap-3">
            <LinkButton
              to="/dashboard/patients"
              variant="primary"
              fullWidth
              icon={<Sliders className="h-4 w-4" aria-hidden />}
            >
              Sessão e calibração
            </LinkButton>
            <LinkButton
              to="/dashboard/phrases"
              variant="secondary"
              fullWidth
              icon={<Sparkles className="h-4 w-4 text-violet-600" aria-hidden />}
            >
              Frases e severidade
            </LinkButton>
          </div>
        </article>
      </section>
    </div>
  )
}
