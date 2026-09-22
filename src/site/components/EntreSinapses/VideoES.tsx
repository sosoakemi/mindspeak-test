// Video section: "Veja em ação"
import { Loader2, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Reveal } from '../Reveal'

const videoSrc = '/video/video-entresinapses.mp4'
// mesma ilustração do Hero — evita a tela preta que o <video> mostra antes
// do primeiro frame carregar.
const videoPoster = '/images/game.img.home.png'

export default function VideoES() {
  const [playing, setPlaying] = useState(false)
  const [buffering, setBuffering] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Começa a baixar o vídeo assim que a seção existe, não só no clique —
  // sem isso o navegador só busca os 5MB depois do play(), e a espera
  // parecia trava/delay em vez de carregamento.
  useEffect(() => {
    videoRef.current?.load()
  }, [])

  const play = () => {
    setPlaying(true)
    // autoplay programático só funciona depois de um gesto do usuário em
    // vários navegadores (Safari/iOS inclusive) — por isso não usa a prop
    // autoPlay direto no <video>, chama play() aqui dentro do clique.
    videoRef.current?.play()
  }

  return (
    <section id="videos" className="bg-slate-50 px-6 py-20 lg:px-8 lg:py-28 dark:bg-[#0a1628]">
      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <Reveal className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-500 mb-2">
            Gameplay
          </p>
          <h2 className="font-display text-3xl font-black tracking-tight text-navy-900 sm:text-4xl dark:text-white">
            Veja em ação
          </h2>
        </Reveal>

        {/* Video player */}
        <Reveal delay={100} className="relative overflow-hidden rounded-2xl shadow-2xl aspect-video bg-navy-900 group">
          <video
            ref={videoRef}
            src={videoSrc}
            poster={videoPoster}
            controls={playing}
            playsInline
            preload="auto"
            onWaiting={() => setBuffering(true)}
            onPlaying={() => setBuffering(false)}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {buffering && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-navy-900/40">
              <Loader2 className="h-10 w-10 animate-spin text-white" aria-label="Carregando vídeo" />
            </div>
          )}

          {!playing && (
            <button
              type="button"
              onClick={play}
              aria-label="Reproduzir vídeo do EntreSinapses"
              className="absolute inset-0 flex items-center justify-center bg-navy-900/30 transition-colors group/btn hover:bg-navy-900/40"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 transition-all duration-300 group-hover/btn:scale-110 group-hover/btn:bg-white/30">
                <Play className="h-7 w-7 text-white fill-white ml-1" />
              </span>
            </button>
          )}
        </Reveal>
      </div>
    </section>
  )
}
