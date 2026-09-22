import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Reveal } from './Reveal'
import { GAME_URL } from '../data/gameLink'

const gameImage = '/images/game.img.home.png'

const cards = [
  { label: 'NÍVEIS', value: '4 Capítulos' },
  { label: 'CONTROLE', value: '100% Mental' },
  { label: 'GÊNERO', value: 'Aventura' },
  { label: 'BADGES', value: '12+ Conquistas' },
]

export default function GameSection() {
  return (
    <section id="entresinapses" className="bg-white px-6 py-20 lg:px-8 lg:py-28 dark:bg-[#020617]">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="flex items-center justify-center">
            <img
              src={gameImage}
              alt="EntreSinapses — O Jogo — pixel art de perfil azul com cérebro iluminado e ilhas flutuantes"
              className="aspect-[4/3] w-full max-w-[593px] rounded-3xl object-cover shadow-lg"
            />
          </Reveal>

          <Reveal delay={150}>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-teal-500">
              EXPERIÊNCIA INTERATIVA
            </p>

            <h2 className="text-[clamp(2rem,4vw,2.75rem)] font-extrabold leading-[1.1]">
              <span className="site-game-title-dark text-slate-900 dark:text-white">EntreSinapses</span>
              <br />
              <span className="text-teal-500">O Jogo</span>
            </h2>

            <p className="site-game-desc mt-4 max-w-[480px] text-[15px] leading-[1.7] text-slate-600 dark:text-slate-300">
              Uma aventura onde você controla um mundo inteiro usando apenas o
              poder da sua mente. Aprenda sobre interfaces cérebro-computador de
              forma divertida e imersiva.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3">
              {cards.map((card) => (
                <div
                  key={card.label}
                  className="site-game-card rounded-xl border border-slate-200 bg-white p-[14px_18px] shadow-sm dark:border-slate-800 dark:bg-[#111827]"
                >
                  <p className="site-game-card-label mb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
                    {card.label}
                  </p>
                  <p className="site-game-card-value m-0 text-[15px] font-bold text-slate-900 dark:text-white">
                    {card.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={GAME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-teal-600 active:scale-[0.97]"
              >
                Jogar Agora
                <ArrowRight size={16} />
              </a>
              <Link
                to="/jogo"
                className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800 active:scale-[0.97] dark:bg-white/10 dark:hover:bg-white/20"
              >
                Conheça a História
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
