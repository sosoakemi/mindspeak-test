import { Cpu, Eye, SlidersVertical } from 'lucide-react'

/* ─── Watermark SVGs (rendered as background decoration) ──────────────────── */

function BrainWatermark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 160"
      className="absolute bottom-0 right-0 h-40 w-40 translate-x-6 translate-y-4 opacity-[0.07]"
      fill="none"
      stroke="#0d9488"
      strokeWidth="1.2"
    >
      {/* Simplified top-view brain outline */}
      <ellipse cx="100" cy="80" rx="70" ry="55" />
      <path d="M100 25 C100 25 95 45 85 55 C75 65 60 68 55 80 C50 92 60 105 70 110 C80 115 100 118 100 118" />
      <path d="M100 25 C100 25 105 45 115 55 C125 65 140 68 145 80 C150 92 140 105 130 110 C120 115 100 118 100 118" />
      <path d="M75 42 C68 55 70 70 78 78" />
      <path d="M125 42 C132 55 130 70 122 78" />
      <path d="M60 80 C65 72 75 70 85 75 C95 80 100 80 115 75 C125 70 135 72 140 80" />
      <path d="M65 95 C72 88 85 87 95 91" />
      <path d="M135 95 C128 88 115 87 105 91" />
    </svg>
  )
}

function WaveWatermark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 120"
      className="absolute bottom-4 left-0 right-0 h-28 w-full opacity-[0.07]"
      fill="none"
      stroke="#0d9488"
      strokeWidth="1.5"
    >
      <path d="M0 60 C20 20 40 100 60 60 C80 20 100 100 120 60 C140 20 160 100 180 60 C200 20 220 100 240 60 C260 20 280 100 300 60" />
      <path d="M0 80 C20 50 40 110 60 80 C80 50 100 110 120 80 C140 50 160 110 180 80 C200 50 220 110 240 80 C260 50 280 110 300 80" strokeOpacity="0.5" />
    </svg>
  )
}

function AudioWatermark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 80"
      className="absolute bottom-0 left-0 right-0 h-20 w-full opacity-[0.07]"
      fill="none"
      stroke="#0d9488"
      strokeWidth="1.5"
    >
      {/* Digital audio waveform bars */}
      {[10, 25, 40, 55, 70, 85, 100, 115, 130, 145, 160, 175, 190, 205, 220, 235, 250, 265, 280].map(
        (x, i) => {
          const heights = [20, 40, 55, 35, 65, 70, 45, 60, 75, 50, 68, 42, 58, 30, 62, 44, 38, 52, 22]
          const h = heights[i]
          const y = (80 - h) / 2
          return <line key={x} x1={x} y1={y} x2={x} y2={y + h} strokeLinecap="round" />
        }
      )}
    </svg>
  )
}

/* ─── Card data ───────────────────────────────────────────────────────────── */

const cards = [
  {
    icon: Eye,
    title: 'R$ 800',
    description: 'R$ 800,00 — mais barato que alternativas comerciais de BCI',
    watermark: <BrainWatermark />,
  },
  {
    icon: Cpu,
    title: 'Sem movimento',
    description: 'Comunicação pura por sinais cerebrais — ideal para paralisia total',
    watermark: <WaveWatermark />,
  },
  {
    icon: SlidersVertical,
    title: 'Tempo real',
    description: 'Frases selecionadas pela atenção são reproduzidas instantaneamente em voz',
    watermark: <AudioWatermark />,
  },
]

/* ─── Component ───────────────────────────────────────────────────────────── */

export default function Features() {
  return (
    <section className="bg-slate-50 px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-3xl">

        {/* Centered header */}
        <div className="flex flex-col items-center text-center">
          <span className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-teal-500">
            Diferenciais
          </span>
          <h2 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            <span className="text-navy-900">Por que é </span>
            <span className="text-teal-500">diferente?</span>
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-500">
            Uma solução projetada por estudantes para resolver um problema real com
            tecnologia acessível.
          </p>
        </div>

        {/* Single row of 3 cards */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {cards.map(({ icon: Icon, title, description, watermark }) => (
            <article
              key={title}
              className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              {/* Watermark illustration */}
              {watermark}

              {/* Icon badge */}
              <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>

              {/* Title */}
              <h3 className="relative z-10 mt-5 font-display text-2xl font-bold text-navy-900">
                {title}
              </h3>

              {/* Description */}
              <p className="relative z-10 mt-2 text-sm leading-relaxed text-slate-600">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
