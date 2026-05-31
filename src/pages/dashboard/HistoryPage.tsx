import { CheckCircle2, Droplets, Stethoscope } from 'lucide-react'
import { msCardPad } from '../../lib/msStyles'

const items = [
  {
    time: '14:22',
    title: 'Tenho sede',
    detail: 'Confirmado via piscar de olhos',
    icon: Droplets,
    tone:
      'text-blue-700 bg-blue-50 ring-blue-100 dark:bg-blue-950/50 dark:text-blue-200 dark:ring-blue-800',
  },
  {
    time: '11:05',
    title: 'Solicitação de assistência',
    detail: 'Alerta enviado à enfermagem',
    icon: Stethoscope,
    tone:
      'text-violet-800 bg-violet-50 ring-violet-100 dark:bg-violet-950/50 dark:text-violet-200 dark:ring-violet-800',
  },
  {
    time: '08:30',
    title: 'Calibração diária',
    detail: 'Concluída com sucesso (98% precisão)',
    icon: CheckCircle2,
    tone:
      'text-emerald-900 bg-emerald-50 ring-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-200 dark:ring-emerald-800',
  },
] as const

export function HistoryPage() {
  return (
    <div className="min-w-0 space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-emerald-950 dark:text-emerald-100 sm:text-2xl">
          Histórico
        </h1>
        <p className="mt-1 text-sm text-ms-secondary">Linha do tempo de interações e eventos clínicos (mock).</p>
      </div>

      <section className={msCardPad}>
        <h2 className="text-sm font-semibold text-ms-primary">Interações recentes</h2>
        <ol className="relative mt-6 space-y-6 border-l border-ms-border pl-6 sm:mt-8 sm:space-y-8 sm:pl-8">
          {items.map((it) => {
            const Icon = it.icon
            return (
              <li key={it.time} className="relative min-w-0">
                <span
                  className={`absolute -left-[31px] flex h-9 w-9 items-center justify-center rounded-full ring-2 sm:-left-[39px] sm:h-10 sm:w-10 ${it.tone}`}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
                </span>
                <p className="text-xs font-semibold uppercase tracking-wide text-ms-muted">{it.time}</p>
                <p className="mt-1 text-base font-semibold text-ms-primary">{it.title}</p>
                <p className="mt-1 break-words text-sm text-ms-secondary">{it.detail}</p>
              </li>
            )
          })}
        </ol>
      </section>
    </div>
  )
}
