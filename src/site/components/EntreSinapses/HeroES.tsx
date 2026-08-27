import heroImage from '../../assets/hero.png'

const fundoSection1 = '/images/fundo.section1.games.png'

export default function HeroES() {
  return (
    <section
      id="inicio"
      className="site-es-hero relative overflow-hidden"
      style={{
        backgroundImage: `url(${fundoSection1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative mx-auto max-w-4xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col items-center gap-10 text-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-500 mb-3">
              Entre Sinapses
            </p>
            <h1
              className="font-display text-4xl font-black leading-tight tracking-tight text-navy-900 sm:text-5xl lg:text-6xl"
            >
              Entre{' '}
              <span className="text-teal-500">Sinapses</span>
            </h1>

            <p className="mt-5 max-w-xl mx-auto text-base leading-relaxed text-slate-500 sm:text-lg">
              Uma jornada pelos mistérios do cérebro humano. Explore neurônios,
              descubra conexões e venha futuros da mente. Aprenda enquanto
              se aventura nesse universo fascinante.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="#aventura"
                className="inline-flex min-w-[160px] items-center justify-center rounded-full bg-teal-500 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-600 hover:shadow-teal-200 hover:shadow-md active:scale-[0.98]"
              >
                Jogar Agora
              </a>
              <a
                href="#historia"
                className="site-es-hero-secondary inline-flex min-w-[160px] items-center justify-center rounded-full border border-slate-300 bg-white/70 px-7 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:border-teal-400 hover:text-teal-600 active:scale-[0.98]"
              >
                Conhecer a História
              </a>
            </div>
          </div>

          {/* Illustration */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md">
              {/* Glow background */}
              <div
                className="absolute inset-0 rounded-3xl opacity-30"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(45,212,191,0.4) 0%, transparent 70%)',
                }}
              />
              <img
                src={heroImage}
                alt="Entre Sinapses — ilustração do universo cerebral"
                className="relative w-full h-auto rounded-2xl object-cover drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
