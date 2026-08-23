import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Activity, Headset, MessageCircle, Radio, Wifi } from 'lucide-react'
import { mockPatient } from '../../data/mockDashboard'
import { useChartTheme } from '../../hooks/useChartTheme'
import { useLiveSession } from '../../hooks/useLiveSession'
import { SessionConnect } from '../../components/shared/SessionConnect'

const liveStatusLabel: Record<'idle' | 'connecting' | 'open' | 'closed', string> = {
  idle: 'Sem sessão',
  connecting: 'Conectando…',
  open: 'Ao vivo',
  closed: 'Reconectando…',
}

function formatTime(iso: string) {
  try {
    return new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  } catch {
    return '—'
  }
}

export function MonitorPage() {
  const chart = useChartTheme()
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session')
  const live = useLiveSession(sessionId, undefined)
  const waves = useMemo(() => {
    return Array.from({ length: 120 }).map((_, i) => {
      const x = i / 8
      return {
        i,
        alpha: Math.sin(x) * 0.8 + Math.sin(x * 3) * 0.08,
        beta: Math.sin(x * 1.7) * 0.6 + Math.sin(x * 11) * 0.12,
      }
    })
  }, [])

  return (
    <div className="min-w-0 space-y-6 sm:space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-emerald-950 dark:text-emerald-100">Monitoramento</h1>
          <p className="mt-1 text-sm text-ms-secondary">
            Paciente {mockPatient.name} · {mockPatient.bed}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-900 ring-1 ring-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-100 dark:ring-emerald-800/60">
            <Wifi className="h-4 w-4" aria-hidden />
            Sincronizado
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-ms-subtle-strong px-3 py-1 font-medium text-ms-secondary">
            <Headset className="h-4 w-4 text-ms-muted" aria-hidden />
            Headset EEG
          </span>
        </div>
      </div>

      {!sessionId ? (
        <SessionConnect
          redirectTo={(id) => `/dashboard/monitor?session=${encodeURIComponent(id)}`}
          title="Acompanhar uma sessão ao vivo"
          description="Informe o identificador da sessão do paciente (ex.: sess-demo-001) para ver o sinal, a palavra em destaque e o que já foi falado em tempo real."
        />
      ) : null}

      {sessionId ? (
        <section className="rounded-2xl border border-ms-border bg-ms-surface p-6 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-ms-primary">Sessão ao vivo</h2>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900 ring-1 ring-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-100 dark:ring-emerald-800/60">
              <Radio className="h-3.5 w-3.5" aria-hidden />
              {liveStatusLabel[live.status]}
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-ms-border-subtle bg-ms-subtle p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ms-muted">
                Qualidade do sinal
              </p>
              <p className="mt-2 text-2xl font-semibold text-ms-primary">{live.signalQuality}%</p>
              {live.paused ? (
                <p className="mt-1 text-xs font-medium text-amber-600">Sinal ruim — pausado</p>
              ) : null}
            </div>
            <div className="rounded-xl border border-ms-border-subtle bg-ms-subtle p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ms-muted">
                Palavra em destaque
              </p>
              <p className="mt-2 text-2xl font-semibold text-ms-primary">
                {live.candidateWord ?? '—'}
              </p>
              <p className="mt-1 text-xs text-ms-muted">Foco: {Math.round(live.focusLevel)}%</p>
            </div>
            <div className="rounded-xl border border-ms-border-subtle bg-ms-subtle p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ms-muted">
                Última seleção
              </p>
              <p className="mt-2 text-2xl font-semibold text-ms-primary">
                {live.lastSelected?.utterance ?? '—'}
              </p>
              {live.lastSelected ? (
                <p className="mt-1 text-xs text-ms-muted">
                  {Math.round(live.lastSelected.confidence * 100)}% de confiança
                </p>
              ) : null}
            </div>
          </div>

          <div className="mt-5 border-t border-ms-border-subtle pt-4">
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ms-muted">
              <MessageCircle className="h-3.5 w-3.5" aria-hidden />O que já foi falado
            </p>
            {live.spokenHistory.length === 0 ? (
              <p className="text-sm text-ms-secondary">Nada falado ainda nesta sessão.</p>
            ) : (
              <ul className="space-y-2">
                {live.spokenHistory.slice(0, 8).map((entry, index) => (
                  <li
                    key={`${entry.at}-${index}`}
                    className="flex items-center justify-between gap-3 rounded-lg bg-ms-subtle-strong px-3 py-2 text-sm"
                  >
                    <span className="font-medium text-ms-primary">{entry.text}</span>
                    <span className="shrink-0 text-xs tabular-nums text-ms-muted">
                      {formatTime(entry.at)} · {Math.round(entry.confidence * 100)}%
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      ) : null}

      <section className="rounded-2xl border border-ms-border bg-ms-surface p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-ms-primary">Interface neural</h2>
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
            <Activity className="h-4 w-4" aria-hidden />
            98,4% neural sync
          </span>
        </div>
        <p className="mb-4 text-xs text-ms-muted">Ondas simuladas · Alpha (azul) e Beta (roxo)</p>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={waves} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
              <XAxis dataKey="i" hide />
              <YAxis domain={[-1.2, 1.2]} width={28} tick={{ fontSize: 10, fill: chart.axis }} />
              <Tooltip
                formatter={(v, name) => {
                  const n = Number(v ?? 0)
                  const label = name === 'alpha' ? 'Alpha' : 'Beta'
                  return [n.toFixed(2), label]
                }}
                labelFormatter={() => 'Amostra'}
                contentStyle={{
                  borderRadius: 12,
                  border: `1px solid ${chart.tooltipBorder}`,
                  background: chart.tooltipBg,
                  color: chart.tooltipText,
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="alpha"
                name="Alpha (8–12 Hz)"
                stroke={chart.lineAlpha}
                strokeOpacity={0.85}
                dot={false}
                strokeWidth={2}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="beta"
                name="Beta (13–30 Hz)"
                stroke={chart.lineBeta}
                strokeOpacity={0.75}
                dot={false}
                strokeWidth={2}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {[
          { k: 'Córtex motor', v: '1,24 µV', s: 'Estabilidade excelente', tone: 'teal' },
          { k: 'Sinal alfa', v: '85% match', s: 'Foco cognitivo médio', tone: 'blue' },
          { k: 'Latência neural', v: '14 ms', s: 'Tempo de resposta nominal', tone: 'violet' },
        ].map((c) => (
          <article key={c.k} className="rounded-2xl border border-ms-border bg-ms-surface p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-ms-muted">{c.k}</p>
            <p className="mt-3 text-2xl font-semibold text-ms-primary">{c.v}</p>
            <p className="mt-2 text-sm text-ms-secondary">{c.s}</p>
            <div className="mt-4 flex h-10 items-end gap-1">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className={
                    c.tone === 'teal'
                      ? 'flex-1 rounded-sm bg-teal-400/80'
                      : c.tone === 'blue'
                        ? 'flex-1 rounded-sm bg-blue-400/80'
                        : 'flex-1 rounded-sm bg-violet-400/80'
                  }
                  style={{ height: `${30 + ((i * 11) % 55)}%` }}
                />
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
