import { useMemo, useState } from 'react'
import { cn } from '../../../lib/cn'
import { msTableWrap } from '../../../lib/msStyles'

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
  if (s === 'Confirmado')
    return 'bg-emerald-100 text-emerald-800 ring-emerald-200/80 dark:bg-emerald-950/50 dark:text-emerald-200 dark:ring-emerald-800'
  if (s === 'Falso positivo')
    return 'bg-red-100 text-red-800 ring-red-200/80 dark:bg-red-950/50 dark:text-red-200 dark:ring-red-800'
  return 'bg-ms-subtle-strong text-ms-secondary ring-slate-200/80 dark:ring-ms-border'
}

export function PatientHistoryPage() {
  const [filter, setFilter] = useState<FilterKey>('hoje')

  const rows = useMemo(() => {
    return MOCK
  }, [filter])

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-4 sm:gap-6">
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold tracking-tight text-ms-primary sm:text-2xl">Histórico de Comunicação</h1>
          <p className="mt-1 text-sm text-ms-secondary">Registro simulado de frases e níveis de atenção.</p>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por período">
          {(
            [
              { key: 'hoje' as const, label: 'Hoje' },
              { key: '7d' as const, label: '7 dias' },
              { key: '30d' as const, label: '30 dias' },
            ] as const
          ).map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={cn(
                'min-h-[44px] rounded-full px-3 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:focus-visible:outline-ms-accent',
                filter === key
                  ? 'bg-emerald-600 text-white shadow-sm dark:bg-ms-accent dark:hover:bg-ms-accent-hover'
                  : 'bg-ms-surface text-ms-secondary ring-1 ring-ms-border hover:bg-ms-subtle',
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="min-w-0 overflow-hidden rounded-2xl border border-ms-border bg-ms-surface shadow-sm">
        <div className={msTableWrap}>
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-ms-border bg-ms-subtle/80">
                <th className="px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-ms-muted sm:px-4 sm:py-3">
                  Hora
                </th>
                <th className="px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-ms-muted sm:px-4 sm:py-3">
                  Frase
                </th>
                <th className="hidden px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-ms-muted sm:table-cell sm:px-4 sm:py-3">
                  Atenção
                </th>
                <th className="px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-ms-muted sm:px-4 sm:py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={`${r.time}-${i}`}
                  className="border-b border-ms-border-subtle last:border-0 hover:bg-ms-subtle/80"
                >
                  <td className="whitespace-nowrap px-3 py-2.5 font-medium tabular-nums text-ms-primary sm:px-4 sm:py-3">
                    {r.time}
                  </td>
                  <td className="max-w-[9rem] break-words px-3 py-2.5 font-semibold text-ms-primary sm:max-w-none sm:px-4 sm:py-3">
                    {r.phrase}
                    <span className="mt-0.5 block text-xs font-normal text-ms-muted sm:hidden">{r.attention}</span>
                  </td>
                  <td className="hidden whitespace-nowrap px-3 py-2.5 tabular-nums text-ms-secondary sm:table-cell sm:px-4 sm:py-3">
                    {r.attention}
                  </td>
                  <td className="px-3 py-2.5 sm:px-4 sm:py-3">
                    <span
                      className={cn(
                        'inline-flex max-w-full rounded-full px-2 py-1 text-[11px] font-semibold leading-tight ring-1 ring-inset sm:text-xs',
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
