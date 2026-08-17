// CTA section: "Pronto para a aventura?"
import { Gamepad2 } from 'lucide-react'

export default function CTAES() {
  return (
    <section
      id="aventura"
      className="bg-white px-6 py-20 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-2xl text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50">
          <Gamepad2 className="h-8 w-8 text-teal-500" strokeWidth={1.75} />
        </div>

        <h2 className="font-display text-3xl font-black tracking-tight text-navy-900 sm:text-4xl">
          Pronto para a aventura?
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-500">
          Embarque nessa jornada fascinante pelas sinapses do cérebro humano.
          Aprenda, explore e conquiste novos horizontes da mente.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#historia"
            className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-teal-500 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-600 hover:shadow-teal-200 hover:shadow-md active:scale-[0.98]"
          >
            Jogar Gratuitamente
          </a>
          <a
            href="#personagens"
            className="inline-flex min-w-[180px] items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:border-teal-400 hover:text-teal-600 active:scale-[0.98] dark:border-slate-600 dark:bg-[#111827] dark:text-slate-200 dark:hover:border-teal-500 dark:hover:text-teal-400"
          >
            Saiba mais
          </a>
        </div>
      </div>
    </section>
  )
}
