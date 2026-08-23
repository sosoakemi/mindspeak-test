import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ComponentsCta() {
  return (
    <section className="bg-slate-50 px-6 py-16 text-center lg:px-8 lg:py-20">
      <div className="mx-auto max-w-2xl">
        <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
          Agora que você sabe como usar, conheça os componentes que tornam isso
          possível.
        </p>
        <Link
          to="/produto"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-teal-500 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-teal-600 active:scale-[0.98]"
        >
          Ver Componentes
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
