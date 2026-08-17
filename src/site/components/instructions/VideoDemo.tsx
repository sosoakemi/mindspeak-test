import { Play } from 'lucide-react'

export default function VideoDemo() {
  return (
    <section id="video-demo" className="bg-white px-6 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-500">
          Demonstração
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
          Vídeo Demonstrativo
        </h2>

        <div className="site-video-demo relative mt-10 overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-teal-500/5">
          <span className="site-video-demo-badge absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500 shadow-sm">
            Em breve
          </span>

          <div className="flex min-h-[280px] flex-col items-center justify-center px-6 py-16 sm:min-h-[320px]">
            <span className="site-video-demo-play flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md">
              <Play className="ml-1 h-7 w-7 text-teal-500" fill="currentColor" />
            </span>
            <p className="mt-6 font-display text-lg font-semibold text-teal-600">
              Vídeo demonstrativo em breve
            </p>
            <p className="mt-2 text-sm text-slate-500">
              O conteúdo será adicionado em breve
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
