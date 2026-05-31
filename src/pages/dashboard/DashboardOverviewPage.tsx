import { Button, LinkButton } from '../../components/shared/Button'
import { AlertTriangle, Cpu, Info, ShieldAlert, Sliders, Sparkles, Wrench } from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useMemo } from 'react'
import {
  mockDayStats,
  mockPatient,
  severityFromPhrase,
  severityMeta,
} from '../../data/mockDashboard'
import { useDashboardAlerts } from './alerts-context'
import { useChartTheme } from '../../hooks/useChartTheme'
import { msAccentBox, msCardPad, msPill, msStatRow } from '../../lib/msStyles'
import { cn } from '../../lib/cn'

function severityIcon(sev: ReturnType<typeof severityFromPhrase>) {
  if (sev === 'critico') return ShieldAlert
  if (sev === 'moderado') return AlertTriangle
  return Info
}

export function DashboardOverviewPage() {
  const { alerts } = useDashboardAlerts()
  const chart = useChartTheme()

  const chartData = useMemo(() => {
    const now = Date.now()
    return Array.from({ length: 60 }).map((_, i) => {
      const t = new Date(now - (59 - i) * 1000)
      const label = `${t.getMinutes().toString().padStart(2, '0')}:${t.getSeconds().toString().padStart(2, '0')}`
      const base = 38 + Math.sin(i / 4) * 8
      const spike = i > 45 && i < 52 ? 22 : 0
      return { t: label, att: Math.min(100, Math.round(base + spike + (i % 5) * 2)) }
    })
  }, [])

  const recent = [...alerts].sort((a, b) => b.time.localeCompare(a.time)).slice(0, 4)

  return (
    <div className="min-w-0 space-y-6 sm:space-y-8">
      <div className="min-w-0">
        <h1 className="text-xl font-semibold tracking-tight text-emerald-950 dark:text-emerald-100 sm:text-2xl">
          Visão geral
        </h1>
        <p className="mt-1 text-sm text-ms-secondary">Monitoramento do paciente em tempo quase real (mock).</p>
      </div>

      <section className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <article className={msCardPad}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-ms-primary">{mockPatient.name}</h2>
              <p className="mt-1 text-sm text-ms-secondary">{mockPatient.bed}</p>
              <p className={cn('mt-2', msPill)}>
                {mockPatient.diagnosis}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-wide text-ms-muted">Sensor</p>
              <p
                className={
                  mockPatient.sensorConnected
                    ? 'mt-1 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800'
                    : 'mt-1 text-sm font-semibold text-red-700'
                }
              >
                <span
                  className={
                    mockPatient.sensorConnected
                      ? 'h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.25)]'
                      : 'h-2 w-2 rounded-full bg-red-500'
                  }
                  aria-hidden
                />
                {mockPatient.sensorConnected ? 'Conectado' : 'Desconectado'}
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 border-t border-ms-border-subtle pt-6 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-ms-muted">Última seleção</p>
              <p className="mt-1 text-2xl font-semibold text-ms-primary">{mockPatient.lastSelection}</p>
              <p className="text-xs text-ms-muted">às {mockPatient.lastSelectionAt}</p>
            </div>
            <div className={msAccentBox}>
              <p className="text-xs font-semibold text-emerald-900 dark:text-emerald-200">Resumo rápido</p>
              <p className="mt-2 text-sm leading-relaxed text-emerald-950/90 dark:text-emerald-100/90">
                Sistema estável. Priorize revisão de frases críticas se houver aumento de alertas vermelhos.
              </p>
            </div>
          </div>
        </article>

        <article className={msCardPad}>
          <h2 className="text-sm font-semibold text-ms-primary">Estatísticas do dia</h2>
          <dl className="mt-4 space-y-4">
            <div className={msStatRow}>
              <dt className="text-sm text-ms-secondary">Total de seleções</dt>
              <dd className="text-lg font-semibold tabular-nums text-ms-primary">{mockDayStats.totalSelections}</dd>
            </div>
            <div className={msStatRow}>
              <dt className="text-sm text-ms-secondary">Precisão</dt>
              <dd className="text-lg font-semibold tabular-nums text-emerald-800">
                {mockDayStats.accuracyPct}%
              </dd>
            </div>
            <div className={msStatRow}>
              <dt className="text-sm text-ms-secondary">Tempo médio</dt>
              <dd className="text-lg font-semibold tabular-nums text-ms-primary">
                {mockDayStats.avgTimeSec}s
              </dd>
            </div>
          </dl>
        </article>
      </section>

      <section className={msCardPad}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-ms-primary">Atenção (últimos 60s)</h2>
            <p className="text-xs text-ms-muted">Simulação local · integração WebSocket depois</p>
          </div>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800 ring-1 ring-blue-100 dark:bg-blue-950/50 dark:text-blue-200 dark:ring-blue-800">
            Tempo real (mock)
          </span>
        </div>
        <div className="h-52 w-full min-w-0 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="attFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} vertical={false} />
              <XAxis dataKey="t" tick={{ fontSize: 10, fill: chart.axis }} interval={9} />
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
          <ul className="space-y-3">
            {recent.map((a) => {
              const sev = severityFromPhrase(a.phrase)
              const meta = severityMeta[sev]
              const Icon = severityIcon(sev)
              return (
                <li
                  key={a.id}
                  className={`flex items-start gap-3 rounded-xl bg-ms-subtle/80 p-3 ring-1 ring-ms-border-subtle ${meta.rowClass}`}
                >
                  <span
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ${meta.badgeClass}`}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-ms-muted">{a.time}</p>
                    <p className="truncate text-sm font-semibold text-ms-primary">{a.phrase}</p>
                    <p className="text-xs text-ms-secondary">{meta.label}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </article>

        <article className="rounded-2xl border border-ms-border bg-ms-surface p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-ms-primary">Ações rápidas</h2>
          <div className="mt-4 flex flex-col gap-3">
            <LinkButton
              to="/dashboard/settings"
              variant="primary"
              fullWidth
              icon={<Sliders className="h-4 w-4" aria-hidden />}
            >
              Ajustar threshold
            </LinkButton>
            <LinkButton
              to="/dashboard/phrases"
              variant="secondary"
              fullWidth
              icon={<Sparkles className="h-4 w-4 text-violet-600" aria-hidden />}
            >
              Editar frases
            </LinkButton>
            <Button
              type="button"
              variant="secondary"
              fullWidth
              icon={<Wrench className="h-4 w-4 text-ms-secondary" aria-hidden />}
            >
              Recalibrar
            </Button>
          </div>
          <p className="mt-4 flex items-center gap-2 text-xs text-ms-muted">
            <Cpu className="h-4 w-4 shrink-0 text-ms-muted" aria-hidden />
            Ações executam fluxo real quando o backend estiver disponível.
          </p>
        </article>
      </section>
    </div>
  )
}
