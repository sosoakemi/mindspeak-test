// Stats section: "O que te espera?"
import { Trophy, Heart, GraduationCap, Gamepad2 } from 'lucide-react'

const stats = [
  {
    icon: Trophy,
    value: '100%',
    label: 'Conteúdo gratuito',
    description: 'Acesse todo o conteúdo sem custo',
  },
  {
    icon: GraduationCap,
    value: '4',
    label: 'Módulos educativos',
    description: 'Do básico ao avançado da neurociência',
  },
  {
    icon: Heart,
    value: '+30',
    label: 'Missões interativas',
    description: 'Atividades e desafios científicos',
  },
  {
    icon: Gamepad2,
    value: '12',
    label: 'Personagens únicos',
    description: 'Cada um com sua própria história',
  },
]

export default function StatsES() {
  return (
    <section className="bg-white px-6 py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
            O que te espera?
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Tudo que você precisa para começar a sua jornada sináptica.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {stats.map(({ icon: Icon, value, label, description }) => (
            <div key={label} className="group flex flex-col items-center text-center">
              {/* Icon badge */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-500 transition-colors group-hover:bg-teal-100">
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <p className="font-display text-3xl font-black tracking-tight text-navy-900 sm:text-4xl">
                {value}
              </p>
              <p className="mt-1.5 text-sm font-semibold text-slate-700">{label}</p>
              <p className="mt-1 text-xs text-slate-400 leading-snug">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
