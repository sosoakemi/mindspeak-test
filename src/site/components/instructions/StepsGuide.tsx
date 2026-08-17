import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Headphones,
  Power,
  Speaker,
  Target,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useState } from 'react'

type Step = {
  id: number
  label: string
  title: string
  description: string
  icon: LucideIcon
  iconBg: string
  iconColor: string
  shortLabel: string
}

const steps: Step[] = [
  {
    id: 1,
    label: 'PASSO 01',
    title: 'Ligar o dispositivo',
    description:
      'Ligue o MindSpeak pressionando o botão na lateral. O LED indicador acenderá em verde quando estiver pronto.',
    icon: Power,
    iconBg: 'bg-red-500/10',
    iconColor: 'text-red-500',
    shortLabel: 'Ligar',
  },
  {
    id: 2,
    label: 'PASSO 02',
    title: 'Posicionar o sensor',
    description:
      'Coloque o sensor EEG sobre a testa, alinhado com o centro da cabeça. Ajuste a faixa para ficar confortável e firme, sem apertar demais.',
    icon: Headphones,
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-500',
    shortLabel: 'Posicionar',
  },
  {
    id: 3,
    label: 'PASSO 03',
    title: 'Calibrar atenção',
    description:
      'Siga as instruções na tela para calibrar seu nível de atenção. Concentre-se no alvo por alguns segundos até a barra de progresso completar.',
    icon: Target,
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-500',
    shortLabel: 'Calibrar',
  },
  {
    id: 4,
    label: 'PASSO 04',
    title: 'Selecionar frase',
    description:
      'Com a atenção calibrada, navegue pelas opções de frases na interface. Foque no item desejado para selecioná-lo e confirmar sua escolha.',
    icon: Zap,
    iconBg: 'bg-sky-500/10',
    iconColor: 'text-sky-500',
    shortLabel: 'Selecionar',
  },
  {
    id: 5,
    label: 'PASSO 05',
    title: 'Ouvir a frase',
    description:
      'Após a seleção, o MindSpeak sintetiza a frase em voz alta. Você pode repetir ou escolher uma nova mensagem a qualquer momento.',
    icon: Speaker,
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-500',
    shortLabel: 'Ouvir',
  },
]

function StepIllustration() {
  return (
    <svg
      viewBox="0 0 480 220"
      className="mx-auto h-auto w-full max-w-md"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="stepBarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <rect x="60" y="140" width="50" height="60" rx="4" fill="url(#stepBarGrad)" />
      <rect x="130" y="110" width="50" height="90" rx="4" fill="url(#stepBarGrad)" />
      <rect x="200" y="80" width="50" height="120" rx="4" fill="#14b8a6" opacity="0.25" />
      <rect x="270" y="50" width="50" height="150" rx="4" fill="url(#stepBarGrad)" />
      <rect x="340" y="20" width="50" height="180" rx="4" fill="url(#stepBarGrad)" />
      <line
        x1="340"
        y1="20"
        x2="340"
        y2="8"
        stroke="#14b8a6"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <polygon points="340,4 336,12 344,12" fill="#14b8a6" />
      <circle cx="215" cy="55" r="14" fill="#0a192f" />
      <path
        d="M215 42c-6 0-10 4-11 9-2 1-4 3-5 6-1 4 1 7 4 9-1 3 0 6 3 8 2 2 5 2 7 0 2-2 3-5 2-8 3-2 5-5 4-9-1-3-3-5-5-6-1-5-5-9-11-9z"
        fill="#14b8a6"
        opacity="0.9"
      />
      <line x1="215" y1="69" x2="215" y2="80" stroke="#0a192f" strokeWidth="3" />
      <line x1="215" y1="75" x2="200" y2="85" stroke="#0a192f" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="215" y1="75" x2="230" y2="85" stroke="#0a192f" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="198" y="82" width="34" height="6" rx="2" fill="#14b8a6" opacity="0.6" />
    </svg>
  )
}

export default function StepsGuide() {
  const [activeStep, setActiveStep] = useState(0)
  const current = steps[activeStep]
  const Icon = current.icon

  const goTo = (index: number) => {
    setActiveStep(Math.max(0, Math.min(steps.length - 1, index)))
  }

  return (
    <section className="bg-slate-50 px-6 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
            Siga cada etapa com atenção
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Cinco passos simples para começar a usar o MindSpeak.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(280px,340px)_1fr] lg:gap-10">
          <nav aria-label="Passos do manual" className="flex flex-col gap-3">
            {steps.map((step, index) => {
              const StepIcon = step.icon
              const isActive = index === activeStep

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  aria-current={isActive ? 'step' : undefined}
                  className={`flex w-full items-center gap-4 rounded-2xl border bg-white p-4 text-left transition-all ${
                    isActive
                      ? 'border-teal-500/40 shadow-md shadow-teal-500/5'
                      : 'border-slate-100 hover:border-slate-200 hover:shadow-sm'
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${step.iconBg} ${step.iconColor}`}
                  >
                    <StepIcon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                      {step.label}
                    </p>
                    <p className="mt-0.5 font-display text-sm font-semibold text-navy-900 sm:text-base">
                      {step.title}
                    </p>
                  </div>
                  {isActive && (
                    <ChevronRight className="h-5 w-5 shrink-0 text-teal-500" />
                  )}
                </button>
              )
            })}
          </nav>

          <article className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
            <span
              className="pointer-events-none absolute right-6 top-4 font-display text-7xl font-bold text-rose-200/80 sm:text-8xl"
              aria-hidden="true"
            >
              {String(current.id).padStart(2, '0')}
            </span>

            <div className="border-b border-slate-50 bg-gradient-to-b from-teal-500/5 to-transparent px-6 py-8 sm:px-10">
              <StepIllustration />
            </div>

            <div className="px-6 py-8 sm:px-10">
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${current.iconBg} ${current.iconColor}`}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="font-display text-xl font-bold text-navy-900 sm:text-2xl">
                  {current.title}
                </h3>
              </div>

              <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-600">
                {current.description}
              </p>

              <div
                className="mt-8 flex items-center gap-2"
                role="tablist"
                aria-label="Progresso dos passos"
              >
                {steps.map((step, index) => (
                  <button
                    key={step.id}
                    type="button"
                    role="tab"
                    aria-selected={index === activeStep}
                    aria-label={`Passo ${step.id}`}
                    onClick={() => setActiveStep(index)}
                    className={`h-1.5 rounded-full transition-all ${
                      index === activeStep
                        ? 'w-8 bg-teal-500'
                        : 'w-1.5 bg-slate-200 hover:bg-slate-300'
                    }`}
                  />
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
                <button
                  type="button"
                  onClick={() => goTo(activeStep - 1)}
                  disabled={activeStep === 0}
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-navy-900 disabled:pointer-events-none disabled:opacity-40"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={() => goTo(activeStep + 1)}
                  disabled={activeStep === steps.length - 1}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 transition-colors hover:text-teal-700 disabled:pointer-events-none disabled:opacity-40"
                >
                  Próximo
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </article>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-5 sm:gap-4">
          {steps.map((step, index) => {
            const StepIcon = step.icon
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(index)}
                className={`flex flex-col items-center gap-2 rounded-xl border bg-white px-3 py-4 transition-all ${
                  index === activeStep
                    ? 'border-teal-500/30 shadow-sm'
                    : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${step.iconBg} ${step.iconColor}`}
                >
                  <StepIcon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span className="text-xs font-medium text-slate-700">
                  {step.shortLabel}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export { steps }
