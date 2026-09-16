const fundoSection1 = '/images/fundo.section1.games.png'
const gameHeroImage = '/images/game.img.home.png'

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
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
        {/* ── Left: copy ── */}
        <div className="text-center lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-500 mb-3">
            Entre Sinapses
          </p>
          <h1 className="font-display text-4xl font-black leading-tight tracking-tight text-navy-900 sm:text-5xl lg:text-6xl">
            Entre <span className="text-teal-500">Sinapses</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg lg:mx-0">
            Uma jornada pelos mistérios do cérebro humano. Explore neurônios,
            descubra conexões e entenda como a mente processa cada pensamento.
            Aprenda enquanto se aventura nesse universo fascinante.
          </p>

          {/* O jogo ainda não está publicado — os botões levam pro conteúdo já
              disponível nesta página, sem prometer um "jogar" inexistente */}
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="#historia"
              className="inline-flex min-w-[160px] items-center justify-center rounded-full bg-teal-500 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-600 hover:shadow-teal-200 hover:shadow-md active:scale-[0.98]"
            >
              Conhecer a História
            </a>
            <a
              href="#personagens"
              className="site-es-hero-secondary inline-flex min-w-[160px] items-center justify-center rounded-full border border-slate-300 bg-white/70 px-7 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:border-teal-400 hover:text-teal-600 active:scale-[0.98]"
            >
              Ver Personagens
            </a>
          </div>
        </div>

        {/* ── Right: ilustração ── */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            className="pointer-events-none absolute inset-0 scale-95 rounded-[2rem] bg-teal-400/25 blur-3xl"
            aria-hidden="true"
          />
          <img
            src={gameHeroImage}
            alt="EntreSinapses — personagem caminha rumo a um cérebro iluminado com portas coloridas flutuando ao redor"
            className="relative aspect-[4/3] w-full rounded-[1.75rem] object-cover shadow-2xl"
            loading="eager"
          />
        </div>
      </div>
    </section>
  )
}
