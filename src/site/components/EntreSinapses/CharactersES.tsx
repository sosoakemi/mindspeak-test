// Characters section: "Conheça os Personagens"
import { Trophy, Heart, GraduationCap } from 'lucide-react'

type Character = {
  name: string
  role: string
  description: string
  stats: Array<{ icon: React.ElementType; label: string; color: string }>
  bg: string
}

const characters: Character[] = [
  {
    name: 'Aria',
    role: 'Neurocientista',
    description:
      'Uma jovem prodigiosa que descobriu o poder de se comunicar através das sinapses cerebrais. Sua curiosidade e determinação a levam a explorar os mistérios da mente.',
    stats: [
      { icon: GraduationCap, label: 'Inteligência 95', color: 'text-teal-500' },
      { icon: Heart, label: 'Empatia 88', color: 'text-rose-500' },
    ],
    bg: '#f0fdf4',
  },
  {
    name: 'Tobias',
    role: 'Hacker Neural',
    description:
      'Autodidata e rebelde, Tobias dominou a arte de hackear interfaces neurais. Suas habilidades técnicas são fundamentais para desvendar a conspiração do Instituto.',
    stats: [
      { icon: Trophy, label: 'Técnica 97', color: 'text-amber-500' },
      { icon: GraduationCap, label: 'Lógica 91', color: 'text-teal-500' },
    ],
    bg: '#fef9f0',
  },
  {
    name: 'Zoya',
    role: 'Pesquisadora',
    description:
      'Veterana do Instituto Sinapses, Zoya conhece segredos que podem mudar tudo. Sua lealdade é questionável, mas seu conhecimento é inestimável.',
    stats: [
      { icon: Heart, label: 'Sabedoria 99', color: 'text-purple-500' },
      { icon: Trophy, label: 'Influência 85', color: 'text-amber-500' },
    ],
    bg: '#f5f0ff',
  },
]

export default function CharactersES() {
  return (
    <section className="bg-white px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-black tracking-tight text-navy-900 sm:text-4xl">
            Conheça os Personagens
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Cada personagem traz habilidades únicas para a jornada sináptica.
          </p>
        </div>

        {/* Character cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {characters.map((char) => (
            <article
              key={char.name}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              {/* Colored top badge */}
              <div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ background: char.bg }}
              >
                {/* Character avatar placeholder using lucide-react icon */}
                <GraduationCap
                  className="h-7 w-7 text-teal-500"
                  strokeWidth={1.75}
                />
              </div>

              <h3 className="font-display text-lg font-black text-navy-900">
                {char.name}
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-500 mt-0.5">
                {char.role}
              </p>

              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                {char.description}
              </p>

              {/* Stats row */}
              <div className="mt-5 flex flex-wrap gap-3">
                {char.stats.map((stat) => {
                  const Icon = stat.icon
                  return (
                    <span
                      key={stat.label}
                      className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600"
                    >
                      <Icon className={`h-3.5 w-3.5 ${stat.color}`} strokeWidth={2} />
                      {stat.label}
                    </span>
                  )
                })}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
