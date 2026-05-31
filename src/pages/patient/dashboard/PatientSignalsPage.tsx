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
import { cn } from '../../../lib/cn'

const EEG_BANDS = [
  'Delta',
  'Theta',
  'Low Alpha',
  'High Alpha',
  'Low Beta',
  'High Beta',
  'Low Gamma',
  'Mid Gamma',
] as const

function seededValue(seed: number, i: number) {
  const x = Math.sin(seed * 12.9898 + i * 78.233) * 43758.5453
  return Math.round((x - Math.floor(x)) * 100)
}

export function PatientSignalsPage() {
  const chartData = useMemo(() => {
    const seed = 42
    return Array.from({ length: 30 }).map((_, i) => ({
      t: `${String(i).padStart(2, '0')}s`,
      atencao: 35 + seededValue(seed, i) * 0.45 + Math.sin(i / 3) * 12,
      meditacao: 28 + seededValue(seed + 1, i) * 0.35 + Math.cos(i / 4) * 10,
    }))
  }, [])

  const eegValues = useMemo(
    () => EEG_BANDS.map((_, i) => 12 + seededValue(7, i + 3) * 0.65 + (i % 4) * 6),
    [],
  )

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ms-primary">Monitoramento de Sinais</h1>
        <p className="mt-1 text-sm text-ms-secondary">Visualização simulada de atenção e bandas de frequência.</p>
      </div>

      <div className="rounded-2xl border border-ms-border bg-ms-surface p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-ms-primary">Atenção ao longo do tempo</h2>
        <p className="mt-1 text-xs text-ms-muted">Últimos 30 pontos (mock)</p>
        <div className="mt-4 h-72 w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
              <XAxis dataKey="t" tick={{ fontSize: 10 }} stroke="#94a3b8" interval={4} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} stroke="#94a3b8" width={36} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }}
                formatter={(value, name) => [`${typeof value === 'number' ? value.toFixed(0) : '—'}%`, String(name)]}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="atencao" name="Atenção" stroke="#16a34a" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="meditacao" name="Meditação" stroke="#2563eb" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border border-ms-border bg-ms-surface p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-ms-primary">Bandas EEG (mock)</h2>
        <p className="mt-1 text-xs text-ms-muted">Amplitude relativa por banda de frequência</p>
        <ul className="mt-6 space-y-4">
          {EEG_BANDS.map((band, i) => {
            const v = eegValues[i] ?? 0
            return (
              <li key={band} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                <span className="w-28 shrink-0 text-xs font-medium text-ms-secondary">{band}</span>
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div className="h-3 flex-1 overflow-hidden rounded-full bg-ms-subtle-strong">
                    <div
                      className={cn('h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500')}
                      style={{ width: `${Math.min(100, v)}%` }}
                    />
                  </div>
                  <span className="w-10 shrink-0 text-right text-xs font-semibold tabular-nums text-ms-primary">
                    {v}%
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
