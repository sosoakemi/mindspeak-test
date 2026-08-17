// Video section: "Veja em ação"
import { Play } from 'lucide-react'
import { useState } from 'react'

export default function VideoES() {
  const [playing, setPlaying] = useState(false)

  return (
    <section id="videos" className="bg-slate-50 px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-500 mb-2">
            Gameplay
          </p>
          <h2 className="font-display text-3xl font-black tracking-tight text-navy-900 sm:text-4xl">
            Veja em ação
          </h2>
        </div>

        {/* Video player */}
        <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-video bg-navy-900 group">
          {/* Thumbnail / placeholder */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, #0a192f 0%, #163a5f 50%, #0d9488 100%)',
            }}
          >
            {/* Decorative synapse illustration */}
            <svg
              className="absolute inset-0 w-full h-full opacity-20"
              viewBox="0 0 800 450"
              aria-hidden="true"
            >
              {[
                [100, 100], [700, 80], [400, 200], [200, 300], [600, 320],
                [350, 400], [500, 150], [150, 250],
              ].map(([cx, cy], i) => (
                <g key={i}>
                  <circle cx={cx} cy={cy} r="4" fill="#2dd4bf" opacity="0.8" />
                  {i > 0 && (
                    <line
                      x1={cx}
                      y1={cy}
                      x2={i % 2 === 0 ? 400 : cx - 80}
                      y2={i % 2 === 0 ? 200 : cy + 60}
                      stroke="#2dd4bf"
                      strokeWidth="1"
                      opacity="0.3"
                      strokeDasharray="6 4"
                    />
                  )}
                </g>
              ))}
            </svg>

            {/* Scene labels */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-6 px-6">
              {['Fase 1', 'Fase 2', 'O Despertar'].map((label) => (
                <span
                  key={label}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/70"
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Top right badge */}
            <div className="absolute top-4 right-4 rounded-full bg-teal-500 px-3 py-1 text-xs font-bold text-white">
              Preview
            </div>
          </div>

          {/* Play button */}
          {!playing && (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Reproduzir vídeo"
              className="absolute inset-0 flex items-center justify-center group/btn"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 transition-all duration-300 group-hover/btn:scale-110 group-hover/btn:bg-white/30">
                <Play className="h-7 w-7 text-white fill-white ml-1" />
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
