import { ArrowRight, Brain, Cpu, Radio, Volume2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Reveal } from './Reveal'

// Passo a passo real da arquitetura (ver CLAUDE.md seção 2) — nada de
// "leitura de mente": o sensor capta atenção/piscada, o backend decide com
// um modelo calibrado por paciente, e quem fala é o iPad (Web Speech API).
const steps = [
  {
    icon: Radio,
    number: '01',
    title: 'Sensor capta o sinal',
    description:
      'O TGAM (1 canal de EEG) fica na testa e envia atenção, meditação e piscadas pro computador via serial.',
  },
  {
    icon: Cpu,
    number: '02',
    title: 'Backend processa',
    description:
      'Filtros de DSP limpam o ruído do sinal e extraem as características usadas pela decisão.',
  },
  {
    icon: Brain,
    number: '03',
    title: 'IA reconhece a escolha',
    description:
      'Um modelo calibrado para aquele paciente identifica foco sustentado na palavra e a piscada de confirmação.',
  },
  {
    icon: Volume2,
    number: '04',
    title: 'iPad fala em voz alta',
    description:
      'A palavra escolhida é sintetizada em tempo real na tela do paciente, em português.',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-navy-900 px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col items-center text-center">
          <span className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">
            Como Funciona
          </span>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            Do sinal cerebral à palavra falada
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-400">
            Quatro etapas, do sensor na testa até a voz sintetizada — tudo em tempo real.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, number, title, description }, i) => (
            <Reveal key={number} delay={i * 90} className="h-full">
              <div className="relative flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/15 text-teal-400">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span className="font-display text-2xl font-bold text-white/10">
                    {number}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{description}</p>

                {i < steps.length - 1 && (
                  <ArrowRight
                    className="pointer-events-none absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-white/15 lg:block"
                    aria-hidden="true"
                  />
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-12 flex justify-center">
          <Link
            to="/instrucoes"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
          >
            Ver o manual completo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
