import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ReferencesCta() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 className="font-display text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
          Quer saber mais?
        </h2>
        
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
          Explore o jogo educativo EntreSinapses e descubra como a tecnologia BCI
          funciona de forma interativa.
        </p>
        
        <div className="mt-8 flex justify-center">
          <Link
            to="/jogo"
            className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-teal-500 hover:shadow-md hover:scale-[1.02]"
          >
            Conhecer o Jogo
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  )
}
