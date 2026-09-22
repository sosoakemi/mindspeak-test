import { Clock3, Radio, Users, Wallet } from 'lucide-react'
import { formattedTotalCost } from '../data/hardware'
import { Reveal } from './Reveal'

// Números alinhados com a realidade do protótipo (ver /produto): custo real
// de peças, 1 canal EEG do sensor TGAM, e os 5 estudantes que construíram o
// projeto — sem taxas de acurácia ou specs fabricadas.
const stats = [
  {
    icon: Wallet,
    value: `R$ ${formattedTotalCost}`,
    label: 'Custo de peças',
    description: 'Tecnologia BCI ao alcance de todos',
  },
  {
    icon: Radio,
    value: '1',
    label: 'Canal EEG',
    description: 'Sensor TGAM (NeuroSky), protocolo ThinkGear',
  },
  {
    icon: Users,
    value: '5',
    label: 'Estudantes',
    description: 'Time por trás do projeto de TCC',
  },
  {
    icon: Clock3,
    value: 'Tempo Real',
    label: 'Seleção e fala',
    description: 'Do foco mental à palavra falada, sem atraso perceptível',
  },
]

export default function Stats() {
  return (
    <section className="border-y border-slate-100 bg-white px-6 py-16 lg:px-8 dark:border-slate-800 dark:bg-[#020617]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {stats.map(({ icon: Icon, value, label, description }, i) => (
          <Reveal key={label} delay={i * 80}>
            <div className="flex h-full flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-5 transition-colors hover:border-teal-500/30 hover:bg-teal-50/40 sm:p-6 dark:border-slate-800 dark:bg-[#111827] dark:hover:border-teal-500/40 dark:hover:bg-[#111827]">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:bg-teal-500/10 dark:text-teal-300">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div>
                <p className="font-display text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl dark:text-white">
                  {value}
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">{label}</p>
                <p className="mt-1 text-xs leading-snug text-slate-500 dark:text-slate-400">{description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
