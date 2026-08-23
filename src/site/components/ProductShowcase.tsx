import hardwareDiagram from '../assets/hardware-diagram.png'
import headsetPlaceholder from '../assets/headset-placeholder.png'

export default function ProductShowcase() {
  return (
    <section id="produto" className="relative overflow-hidden bg-slate-50 px-6 py-20 lg:px-8 lg:py-24 border-y border-slate-100">
      {/* Subtle background mesh or pattern if needed, but keeping it clean and premium */}
      <div className="mx-auto max-w-7xl flex flex-col items-center">
        <span className="inline-block rounded-full bg-teal-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-teal-600 mb-10">
          O Produto
        </span>

        {/* Assembled helmet product view — image already has its own card-style white background */}
        <div className="flex items-center justify-center max-w-xs w-full transition-all duration-300 hover:scale-[1.03] drop-shadow-md">
          <img
            src={headsetPlaceholder}
            alt="Capacete BCI MindSpeak"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Exploded view of the helmet below it */}
        <div className="mt-10 flex items-center justify-center max-w-xl w-full transition-transform duration-300 hover:scale-[1.01]">
          <img
            src={hardwareDiagram}
            alt="Vista explodida do Capacete BCI MindSpeak"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Caption at the bottom */}
        <p className="mt-8 text-center text-xs md:text-sm font-medium text-slate-500 max-w-lg leading-relaxed">
          Capacete BCI MindSpeak — design ergonômico
          <span className="block mt-1.5 font-normal text-slate-400">
            Vista explodida — sensores, estrutura e módulos internos
          </span>
        </p>
      </div>
    </section>
  )
}
