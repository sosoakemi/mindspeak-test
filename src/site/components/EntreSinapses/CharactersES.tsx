// Characters section: "Conheça os Personagens"
import { Bot } from 'lucide-react'

// Arquivos vivem em public/images (fora do grafo de módulos do Vite) — por
// isso são referenciados por caminho de URL, não import.
const ikennyImg = '/images/ikenny.png'
const sukyeImg = '/images/Sukye%20-%20img.png'

type Character = {
  name: string
  role: string
  description: string
  bg: string
  // Ikenny/Sukye usam retrato pixel art; Zeta usa um ícone (é uma IA, não
  // tem um retrato pixel art próprio ainda) — só um dos dois é passado.
  image?: string
  icon?: React.ElementType
}

const characters: Character[] = [
  {
    name: 'Ikenny',
    role: 'Mentor Cientista',
    description:
      'Ikenny é o mentor do Instituto Sinapses, guiando os jovens cientistas em suas pesquisas. Sua experiência e sabedoria são vitais para a equipe.',
    image: ikennyImg,
    bg: '#f0fdf4',
  },
  {
    name: 'Sukye',
    role: 'Paciente Virtual',
    description:
      'Sukye é uma paciente virtual criada para testar novas terapias. Sua complexidade emocional desafia os pesquisadores a encontrar soluções inovadoras.',
    image: sukyeImg,
    bg: '#fef9f0',
  },
  {
    name: 'Zeta',
    role: 'IA Assistente',
    description:
      'Um robozinho fofo que traduz seus sinais cerebrais em palavras na tela.',
    icon: Bot,
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
           Cada um tem uma história e precisa da sua ajuda
          </p>
        </div>

        {/* Character cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {characters.map((char) => (
            <article
              key={char.name}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              {/* Retrato do personagem — pixel art (Ikenny/Sukye) ou ícone (Zeta) */}
              <div
                className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl"
                style={{ background: char.bg }}
              >
                {char.image ? (
                  <img
                    src={char.image}
                    alt={char.name}
                    className="h-16 w-16 object-contain"
                    style={{ imageRendering: 'pixelated' }}
                    loading="lazy"
                  />
                ) : char.icon ? (
                  <char.icon className="h-9 w-9 text-purple-500" strokeWidth={1.75} />
                ) : null}
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
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
