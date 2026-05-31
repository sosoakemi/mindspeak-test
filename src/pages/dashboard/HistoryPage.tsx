import { CheckCircle2, Droplets, Stethoscope } from 'lucide-react'

const items = [
  {
    time: '14:22',
    title: 'Tenho sede',
    detail: 'Confirmado via piscar de olhos',
    icon: Droplets,
    tone: 'text-blue-700 bg-blue-50 ring-blue-100',
  },
  {
    time: '11:05',
    title: 'Solicitação de assistência',
    detail: 'Alerta enviado à enfermagem',
    icon: Stethoscope,
    tone: 'text-violet-800 bg-violet-50 ring-violet-100',
  },
  {
    time: '08:30',
    title: 'Calibração diária',
    detail: 'Concluída com sucesso (98% precisão)',
    icon: CheckCircle2,
    tone: 'text-emerald-900 bg-emerald-50 ring-emerald-100',
  },
] as const

export function HistoryPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-emerald-950">Histórico</h1>
        <p className="mt-1 text-sm text-slate-600">Linha do tempo de interações e eventos clínicos (mock).</p>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Interações recentes</h2>
        <ol className="relative mt-8 space-y-8 border-l border-slate-200 pl-8">
          {items.map((it) => {
            const Icon = it.icon
            return (
              <li key={it.time} className="relative">
                <span
                  className={`absolute -left-[39px] flex h-10 w-10 items-center justify-center rounded-full ring-2 ${it.tone}`}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{it.time}</p>
                <p className="mt-1 text-base font-semibold text-slate-900">{it.title}</p>
                <p className="mt-1 text-sm text-slate-600">{it.detail}</p>
              </li>
            )
          })}
        </ol>
      </section>
    </div>
  )
}
