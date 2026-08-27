// Story section: "A História do Entre Sinapses"
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

const chapters = [
  { id: 'livro1', label: 'Livro 1' },
  { id: 'livro2', label: 'Livro 2' },
  { id: 'parte1', label: 'Livro 3' },
  { id: 'capitulo1', label: 'Livro 4' },
]

type Chapter = {
  id: string
  title: string
  episode: string
  description: string
  image: string
}

const chapterContent: Record<string, Chapter> = {
  livro1: {
    id: 'livro1',
    title: 'O Despertar',
    episode: 'Capítulo 1',
    description:
      'A história se passa em uma cidade comum, nos dias de hoje. Não tem magia, não tem fantasia. É uma história sobre duas pessoas que se amam mas não conseguem se entender.',
    image: '/images/historia1.games.png',
  },
  livro2: {
    id: 'livro2',
    title: 'A Conexão',
    episode: 'Capítulo 2',
    description:
      'Com novos aliados ao lado, Ikenny adentra as profundezas do servidor neural. O laboratório guarda segredos que podem mudar para sempre como os humanos se comunicam com as máquinas. Mas quem está do outro lado da interface?',
    image: '/images/livro2.jpeg',
  },
  parte1: {
    id: 'parte1',
    title: 'O Laboratório',
    episode: 'Livro 3',
    description:
      'Os corredores do Instituto Sinapses escondem experimentos proibidos. Aria precisa decifrar os padrões cerebrais de sujeitos desaparecidos antes que o projeto seja encerrado permanentemente.',
    image: '/images/livro3.jpeg',
  },
  capitulo1: {
    id: 'capitulo1',
    title: 'Primeiros Sinais',
    episode: 'Introdução',
    description:
      'Tudo começa com um simples encefalograma. Um pico anômalo nos sinais cerebrais de Aria revela que a mente humana esconde muito mais do que a ciência imagina.',
    image: '/images/livro4.jpeg',
  },
}

function StoryIllustration({ image, alt }: { image: string; alt: string }) {
  return (
    <div className="relative w-full h-full min-h-[200px] lg:min-h-0 overflow-hidden rounded-xl">
      <img src={image} alt={alt} className="h-full w-full object-cover" />
    </div>
  )
}

export default function StoryES() {
  const [activeChapter, setActiveChapter] = useState<string>('livro1')
  const current = chapterContent[activeChapter]

  return (
    <section
      id="historia"
      className="site-es-story relative overflow-hidden px-6 py-20 lg:px-8 lg:py-28"
      style={{
        // só a arte pixel-art (modo claro) — sem degradê por cima, que
        // conflitava com a imagem
        background: "url('/images/background.cameClaro.png') center / cover no-repeat",
      }}
    >
      <div className="relative mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-900/70 mb-2">
            História
          </p>
          <h2 className="font-display text-3xl font-black tracking-tight text-navy-900 sm:text-4xl">
            A <span className="text-teal-700">História</span> do Entre Sinapses
          </h2>
          <div className="mt-4 flex justify-center">
            <div className="h-px w-24 bg-teal-700/30" />
          </div>
        </div>

        {/* Chapter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {chapters.map((ch) => (
            <button
              key={ch.id}
              type="button"
              onClick={() => setActiveChapter(ch.id)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                activeChapter === ch.id
                  ? 'bg-navy-900 text-white shadow-md'
                  : 'site-es-story-tab-inactive bg-white/60 text-navy-900 hover:bg-white/80'
              }`}
            >
              {ch.label}
            </button>
          ))}
        </div>

        {/* Story card */}
        <div className="site-es-story-card mx-auto max-w-3xl overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="grid lg:grid-cols-2">
            {/* Left: Illustration */}
            <div className="h-56 lg:h-auto">
              <StoryIllustration image={current.image} alt={current.title} />
            </div>

            {/* Right: Content */}
            <div className="p-7 lg:p-8 flex flex-col justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
                    {/* book icon */}
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {current.episode}
                  </span>
                </div>
                <h3 className="font-display text-xl font-black text-navy-900 sm:text-2xl">
                  {current.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {current.description}
                </p>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 transition-colors hover:text-teal-500"
                >
                  Ler mais
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
