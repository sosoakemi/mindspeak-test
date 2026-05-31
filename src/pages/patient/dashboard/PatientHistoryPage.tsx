import { useMemo, useState } from 'react'
import { cn } from '../../../lib/cn'

type FilterKey = 'hoje' | '7d' | '30d'
type RowStatus = 'Confirmado' | 'Falso positivo' | 'Cancelado'

type Row = {
  time: string
  phrase: string
  attention: string
  status: RowStatus
}

const MOCK: Row[] = [
  { time: '14:32', phrase: 'ÁGUA', attention: '82%', status: 'Confirmado' },
  { time: '14:18', phrase: 'SIM', attention: '76%', status: 'Confirmado' },
  { time: '13:55', phrase: 'PRECISO DE AJUDA', attention: '71%', status: 'Falso positivo' },
  { time: '13:40', phrase: 'ESTOU BEM', attention: '79%', status: 'Confirmado' },
  { time: '12:22', phrase: 'NÃO', attention: '68%', status: 'Cancelado' },
  { time: '11:08', phrase: 'CHAMAR ALGUÉM', attention: '81%', status: 'Confirmado' },
  { time: '10:45', phrase: 'OBRIGADO', attention: '74%', status: 'Confirmado' },
  { time: '09:30', phrase: 'ESTOU COM DOR', attention: '77%', status: 'Falso positivo' },
]

function badgeClass(s: RowStatus) {
  if (s === 'Confirmado') return 'bg-emerald-100 text-emerald-800 ring-emerald-200/80'
  if (s === 'Falso positivo') return 'bg-red-100 text-red-800 ring-red-200/80'
  return 'bg-slate-100 text-slate-700 ring-slate-200/80'
}

export function PatientHistoryPage() {
  const [filter, setFilter] = useState<FilterKey>('hoje')

  const rows = useMemo(() => {
    // Mock: mesmo conjunto para qualquer filtro; em produção filtraria por data
    return MOCK
  }, [filter])

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Histórico de Comunicação</h1>
          <p className="mt-1 text-sm text-slate-600">Registro simulado de frases e níveis de atenção.</p>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por período">
          {(
            [
              { key: 'hoje' as const, label: 'Hoje' },
              { key: '7d' as const, label: 'Últimos 7 dias' },
              { key: '30d' as const, label: 'Últimos 30 dias' },
            ] as const
          ).map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600',
                filter === key
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50',
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80">
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Hora</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Frase</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Nível de Atenção
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={`${r.time}-${i}`} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/80">
                  <td className="px-4 py-3 font-medium tabular-nums text-slate-800">{r.time}</td>
                  <td className="px-4 py-3 font-semibold text-slate-900">{r.phrase}</td>
                  <td className="px-4 py-3 tabular-nums text-slate-700">{r.attention}</td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        'inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset',
                        badgeClass(r.status),
                      )}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
