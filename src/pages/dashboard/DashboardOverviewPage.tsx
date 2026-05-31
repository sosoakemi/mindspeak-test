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

function severityIcon(sev: ReturnType<typeof severityFromPhrase>) {
  if (sev === 'critico') return ShieldAlert
  if (sev === 'moderado') return AlertTriangle
  return Info
}

export function DashboardOverviewPage() {
  const { alerts } = useDashboardAlerts()

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
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-emerald-950">Visão geral</h1>
        <p className="mt-1 text-sm text-slate-600">Monitoramento do paciente em tempo quase real (mock).</p>
      </div>

      <section className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">{mockPatient.name}</h2>
              <p className="mt-1 text-sm text-slate-600">{mockPatient.bed}</p>
              <p className="mt-2 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                {mockPatient.diagnosis}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Sensor</p>
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
          <div className="mt-6 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Última seleção</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">{mockPatient.lastSelection}</p>
              <p className="text-xs text-slate-500">às {mockPatient.lastSelectionAt}</p>
            </div>
            <div className="rounded-xl bg-emerald-50/80 p-4 ring-1 ring-emerald-100">
              <p className="text-xs font-semibold text-emerald-900">Resumo rápido</p>
              <p className="mt-2 text-sm leading-relaxed text-emerald-950/90">
                Sistema estável. Priorize revisão de frases críticas se houver aumento de alertas vermelhos.
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">Estatísticas do dia</h2>
          <dl className="mt-4 space-y-4">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <dt className="text-sm text-slate-600">Total de seleções</dt>
              <dd className="text-lg font-semibold tabular-nums text-slate-900">{mockDayStats.totalSelections}</dd>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <dt className="text-sm text-slate-600">Precisão</dt>
              <dd className="text-lg font-semibold tabular-nums text-emerald-800">
                {mockDayStats.accuracyPct}%
              </dd>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <dt className="text-sm text-slate-600">Tempo médio</dt>
              <dd className="text-lg font-semibold tabular-nums text-slate-900">
                {mockDayStats.avgTimeSec}s
              </dd>
            </div>
          </dl>
        </article>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Atenção (últimos 60s)</h2>
            <p className="text-xs text-slate-500">Simulação local · integração WebSocket depois</p>
          </div>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800 ring-1 ring-blue-100">
            Tempo real (mock)
          </span>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="attFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="t" tick={{ fontSize: 10, fill: '#64748b' }} interval={9} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} width={32} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }}
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
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-slate-900">Alertas recentes</h2>
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
                  className={`flex items-start gap-3 rounded-xl bg-slate-50/80 p-3 ring-1 ring-slate-100 ${meta.rowClass}`}
                >
                  <span
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ${meta.badgeClass}`}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{a.time}</p>
                    <p className="truncate text-sm font-semibold text-slate-900">{a.phrase}</p>
                    <p className="text-xs text-slate-600">{meta.label}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">Ações rápidas</h2>
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
              icon={<Wrench className="h-4 w-4 text-slate-600" aria-hidden />}
            >
              Recalibrar
            </Button>
          </div>
          <p className="mt-4 flex items-center gap-2 text-xs text-slate-500">
            <Cpu className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
            Ações executam fluxo real quando o backend estiver disponível.
          </p>
        </article>
      </section>
    </div>
  )
}
