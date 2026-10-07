import { useEffect, useMemo, useState } from 'react'
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
import { getPatientReadings, type ReadingPoint } from '../../../lib/backendApi'
import { usePortalPatient } from '../../../hooks/usePortalPatient'
import { useChartTheme } from '../../../hooks/useChartTheme'
import { formatTimeOfDay } from '../../../lib/severity'
import { cn } from '../../../lib/cn'

// As oito bandas que o TGAM reporta, na ordem de frequência. Os valores
// vêm em unidades arbitrárias do próprio sensor: servem pra comparar as
// bandas entre si, não como medida física absoluta — por isso a barra
// mostra a proporção dentro da leitura, e não um "percentual de banda".
const EEG_BANDS: { key: keyof ReadingPoint; label: string }[] = [
  { key: 'delta', label: 'Delta' },
  { key: 'theta', label: 'Theta' },
  { key: 'low_alpha', label: 'Low Alpha' },
  { key: 'high_alpha', label: 'High Alpha' },
  { key: 'low_beta', label: 'Low Beta' },
  { key: 'high_beta', label: 'High Beta' },
  { key: 'low_gamma', label: 'Low Gamma' },
  { key: 'mid_gamma', label: 'Mid Gamma' },
]

export function PatientSignalsPage() {
  const chart = useChartTheme()
  const { patient, loading: patientLoading, error: patientError } = usePortalPatient()
  const [readings, setReadings] = useState<ReadingPoint[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const patientId = patient?.id ?? null

  useEffect(() => {
    if (patientId === null) return
    let cancelled = false
    setLoading(true)
    setError(null)
    getPatientReadings(patientId, 120)
      .then((points) => {
        if (!cancelled) setReadings(points)
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Falha ao carregar o sinal.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [patientId])

  const chartData = useMemo(
    () =>
      readings.map((r) => ({
        t: formatTimeOfDay(r.at),
        atencao: r.attention,
        meditacao: r.meditation,
      })),
    [readings],
  )

  // Média das últimas leituras, não um ponto só: uma janela isolada do
  // eSense oscila bastante (é o que o motor suaviza antes de decidir).
  const bandAverages = useMemo(() => {
    if (readings.length === 0) return null
    const recent = readings.slice(-20)
    const sums = EEG_BANDS.map(
      ({ key }) => recent.reduce((acc, r) => acc + Number(r[key] ?? 0), 0) / recent.length,
    )
    const max = Math.max(...sums, 1)
    return EEG_BANDS.map((band, i) => ({
      ...band,
      value: sums[i] ?? 0,
      share: ((sums[i] ?? 0) / max) * 100,
    }))
  }, [readings])

  const message = patientError ?? error
  const busy = patientLoading || loading

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ms-primary">
          Monitoramento de Sinais
        </h1>
        <p className="mt-1 text-sm text-ms-secondary">
          {patient
            ? `Leituras gravadas do sensor de ${patient.display_name}.`
            : busy
              ? 'Carregando…'
              : 'Nenhum paciente vinculado a esta conta.'}
        </p>
      </div>

      {message ? (
        <p
          className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800 dark:bg-red-950/40 dark:text-red-200"
          role="alert"
        >
          {message}
        </p>
      ) : null}

      <div className="rounded-2xl border border-ms-border bg-ms-surface p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-ms-primary">Atenção e meditação</h2>
        <p className="mt-1 text-xs text-ms-muted">
          {readings.length > 0
            ? `Últimas ${readings.length} leituras gravadas`
            : 'Nenhuma leitura registrada ainda'}
        </p>
        <div className="mt-4 h-72 w-full min-w-0">
          {chartData.length === 0 ? (
            <div className="flex h-full items-center justify-center rounded-xl bg-ms-subtle/60">
              <p className="text-sm text-ms-secondary">
                {busy ? 'Carregando…' : 'O gráfico aparece depois da primeira sessão com o sensor.'}
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
                <XAxis
                  dataKey="t"
                  tick={{ fontSize: 10, fill: chart.axis }}
                  interval="preserveStartEnd"
                />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: chart.axis }} width={36} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: `1px solid ${chart.tooltipBorder}`,
                    background: chart.tooltipBg,
                    color: chart.tooltipText,
                    fontSize: 12,
                  }}
                  formatter={(value, name) => [
                    `${typeof value === 'number' ? value.toFixed(0) : '—'}%`,
                    String(name),
                  ]}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line
                  type="monotone"
                  dataKey="atencao"
                  name="Atenção"
                  stroke="#16a34a"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
                <Line
                  type="monotone"
                  dataKey="meditacao"
                  name="Meditação"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-ms-border bg-ms-surface p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-ms-primary">Bandas EEG</h2>
        <p className="mt-1 text-xs text-ms-muted">
          Média das últimas leituras, em proporção à banda mais forte. As unidades do sensor são
          arbitrárias — servem para comparar as bandas entre si.
        </p>
        {bandAverages === null ? (
          <p className="mt-6 text-sm text-ms-secondary">
            {busy ? 'Carregando…' : 'Sem leituras para mostrar ainda.'}
          </p>
        ) : (
          <ul className="mt-6 space-y-4">
            {bandAverages.map((band) => (
              <li key={band.label} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                <span className="w-28 shrink-0 text-xs font-medium text-ms-secondary">
                  {band.label}
                </span>
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div className="h-3 flex-1 overflow-hidden rounded-full bg-ms-subtle-strong">
                    <div
                      className={cn('h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500')}
                      style={{ width: `${Math.min(100, band.share)}%` }}
                    />
                  </div>
                  <span className="w-20 shrink-0 text-right text-xs font-semibold tabular-nums text-ms-primary">
                    {band.value.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
