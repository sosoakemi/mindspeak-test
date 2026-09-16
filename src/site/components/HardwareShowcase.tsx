import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { componentsList } from '../data/hardware'
import { Reveal } from './Reveal'

export default function HardwareShowcase() {
  return (
    <section className="bg-white px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col items-center text-center">
          <span className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-teal-500">
            Hardware Real
          </span>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            <span className="text-navy-900">Peça por peça, do jeito que </span>
            <span className="text-teal-500">montamos</span>
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-500">
            Sem specs fabricadas: são os componentes que compõem o protótipo físico, com o preço
            que pagamos por cada um.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5">
          {componentsList.map((item, i) => (
            <Reveal key={item.id} delay={i * 70}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/60 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-400 hover:bg-teal-50/30 hover:shadow-xl hover:shadow-teal-500/30">
                <div className="flex aspect-square items-center justify-center bg-white p-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-1 px-3 pb-4 pt-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400">
                    {item.category}
                  </p>
                  <p className="text-xs font-semibold leading-snug text-navy-900">{item.name}</p>
                  <p className="mt-auto text-sm font-bold text-teal-600">
                    R$ {item.price.toFixed(2).replace('.', ',')}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={220} className="mt-10 flex justify-center">
          <Link
            to="/produto"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:border-teal-400 hover:text-teal-600 hover:shadow-md dark:border-slate-600 dark:bg-[#111827] dark:text-slate-200 dark:hover:border-teal-500 dark:hover:text-teal-400"
          >
            Ver todos os componentes
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
