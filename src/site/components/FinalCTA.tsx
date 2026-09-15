import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Reveal } from './Reveal'

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-navy-900 px-6 py-20 lg:px-8 lg:py-24">
      {/* Glow decorativo — mesmo teal do resto do site, sem cor nova */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/20 blur-3xl"
        aria-hidden="true"
      />

      <Reveal className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
        <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
          Pronto para conhecer o protótipo de perto?
        </h2>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-400">
          Veja os componentes reais, o custo detalhado e o passo a passo de como o MindSpeak
          transforma sinal cerebral em fala.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            to="/produto"
            className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90 active:scale-[0.97]"
            style={{ backgroundColor: '#2dd4bf', color: '#0a1628' }}
          >
            Ver o Produto
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/instrucoes"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/5 active:scale-[0.97]"
          >
            Como Funciona
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
