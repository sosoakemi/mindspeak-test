import { useMemo } from 'react'
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
import { Activity, Headset, Wifi } from 'lucide-react'
import { mockPatient } from '../../data/mockDashboard'

export function MonitorPage() {
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
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-emerald-950">Monitoramento</h1>
          <p className="mt-1 text-sm text-slate-600">
            Paciente {mockPatient.name} · {mockPatient.bed}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-900 ring-1 ring-emerald-100">
            <Wifi className="h-4 w-4" aria-hidden />
            Sincronizado
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
            <Headset className="h-4 w-4 text-slate-500" aria-hidden />
            Headset EEG
          </span>
        </div>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-slate-900">Interface neural</h2>
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <Activity className="h-4 w-4" aria-hidden />
            98,4% neural sync
          </span>
        </div>
        <p className="mb-4 text-xs text-slate-500">Ondas simuladas · Alpha (azul) e Beta (roxo)</p>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={waves} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="i" hide />
              <YAxis domain={[-1.2, 1.2]} width={28} tick={{ fontSize: 10, fill: '#64748b' }} />
              <Tooltip
                formatter={(v, name) => {
                  const n = Number(v ?? 0)
                  const label = name === 'alpha' ? 'Alpha' : 'Beta'
                  return [n.toFixed(2), label]
                }}
                labelFormatter={() => 'Amostra'}
                contentStyle={{ borderRadius: 12 }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="alpha"
                name="Alpha (8–12 Hz)"
                stroke="#2563eb"
                strokeOpacity={0.85}
                dot={false}
                strokeWidth={2}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="beta"
                name="Beta (13–30 Hz)"
                stroke="#7c3aed"
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
          <article key={c.k} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{c.k}</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">{c.v}</p>
            <p className="mt-2 text-sm text-slate-600">{c.s}</p>
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
