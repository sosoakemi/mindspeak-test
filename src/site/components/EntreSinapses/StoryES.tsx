// Story section: "A História do Entre Sinapses"
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

const chapters = [
  { id: 'livro1', label: 'Livro 1' },
  { id: 'livro2', label: 'Livro 2' },
  { id: 'parte1', label: 'Parte 1' },
  { id: 'capitulo1', label: 'Capítulo 1' },
]

type Chapter = {
  id: string
  title: string
  episode: string
  description: string
  imageBg: string
}

const chapterContent: Record<string, Chapter> = {
  livro1: {
    id: 'livro1',
    title: 'O Despertar',
    episode: 'Capítulo 1',
    description:
      'A história se passa em uma cidade comum, nos dias de hoje. Não tem magia, não tem fantasia. É uma história sobre duas pessoas que se amam mas não conseguem se entender.',
    imageBg: '#8B5A2B',
  },
  livro2: {
    id: 'livro2',
    title: 'A Conexão',
    episode: 'Capítulo 2',
    description:
      'Com novos aliados ao lado, Ikenny adentra as profundezas do servidor neural. O laboratório guarda segredos que podem mudar para sempre como os humanos se comunicam com as máquinas. Mas quem está do outro lado da interface?',
    imageBg: '#1a5f7a',
  },
  parte1: {
    id: 'parte1',
    title: 'O Laboratório',
    episode: 'Parte 1',
    description:
      'Os corredores do Instituto Sinapses escondem experimentos proibidos. Aria precisa decifrar os padrões cerebrais de sujeitos desaparecidos antes que o projeto seja encerrado permanentemente.',
    imageBg: '#2d6a4f',
  },
  capitulo1: {
    id: 'capitulo1',
    title: 'Primeiros Sinais',
    episode: 'Introdução',
    description:
      'Tudo começa com um simples encefalograma. Um pico anômalo nos sinais cerebrais de Aria revela que a mente humana esconde muito mais do que a ciência imagina.',
    imageBg: '#4a1942',
  },
}

function StoryIllustration({ bgColor }: { bgColor: string }) {
  return (
    <div
      className="relative w-full h-full min-h-[200px] lg:min-h-0 rounded-xl overflow-hidden"
      style={{ background: bgColor }}
    >
      {/* Decorative illustration: silhouette + particles */}
      <svg
        viewBox="0 0 320 240"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Sky gradient overlay */}
        <defs>
          <radialGradient id="skyGlow" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.5" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="groundGrad" cx="50%" cy="100%" r="60%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.4)" stopOpacity="1" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="320" height="240" fill={bgColor} />
        <ellipse cx="160" cy="80" rx="80" ry="60" fill="url(#skyGlow)" />
        {/* Fireflies / particles */}
        {[
          [60, 80], [100, 50], [200, 70], [250, 100], [80, 130],
          [170, 40], [230, 60], [140, 110], [290, 90], [40, 160],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="2" fill="#fde68a" opacity={0.6 + (i % 3) * 0.15} />
        ))}
        {/* Ground */}
        <ellipse cx="160" cy="210" rx="200" ry="40" fill="rgba(0,0,0,0.35)" />
        {/* Trees silhouette */}
        <rect x="20" y="160" width="8" height="60" rx="4" fill="rgba(0,0,0,0.6)" />
        <ellipse cx="24" cy="155" rx="18" ry="22" fill="rgba(0,0,0,0.5)" />
        <rect x="270" y="150" width="10" height="70" rx="5" fill="rgba(0,0,0,0.6)" />
        <ellipse cx="275" cy="145" rx="22" ry="28" fill="rgba(0,0,0,0.5)" />
        {/* Person silhouette */}
        <ellipse cx="160" cy="160" rx="12" ry="14" fill="rgba(0,0,0,0.75)" />
        <circle cx="160" cy="145" r="7" fill="rgba(0,0,0,0.75)" />
        {/* Ground glow */}
        <ellipse cx="160" cy="235" rx="120" ry="20" fill="url(#groundGrad)" />
      </svg>
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
        // degradê teal (translúcido) sobre a arte pixel-art do jogo — mantém
        // a identidade de cor da seção e ainda deixa a cena por trás visível
        background:
          "linear-gradient(160deg, rgba(178,223,219,0.78) 0%, rgba(128,203,196,0.6) 30%, rgba(77,182,172,0.6) 60%, rgba(128,203,196,0.78) 100%), url('/images/background.cameClaro.png') center / cover no-repeat",
      }}
    >
      {/* Noise overlay for texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

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
              <StoryIllustration bgColor={current.imageBg} />
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
