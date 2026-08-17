import { Download, Play } from 'lucide-react'

export default function InstructionsHero() {
  return (
    <section className="bg-white px-6 py-16 text-center lg:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <span className="inline-block rounded-full bg-teal-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-teal-600">
          Manual de utilização
        </span>

        <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
          Como usar o{' '}
          <span className="text-teal-500">MindSpeak</span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Guia completo para operar o dispositivo de comunicação assistiva.
          Simples, intuitivo e eficaz.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#"
            className="inline-flex min-w-[160px] items-center justify-center gap-2 rounded-lg bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800 active:scale-[0.98]"
          >
            <Download className="h-4 w-4" />
            Baixar PDF
          </a>
          <a
            href="#video-demo"
            className="inline-flex min-w-[160px] items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-navy-900 transition-colors hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] dark:border-slate-600 dark:bg-[#111827] dark:text-gray-100 dark:hover:border-slate-500 dark:hover:bg-[#0f172a]"
          >
            <Play className="h-4 w-4" />
            Ver Vídeo
          </a>
        </div>
      </div>
    </section>
  )
}
