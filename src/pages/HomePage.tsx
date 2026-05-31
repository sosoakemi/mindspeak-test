import { useId, type ReactNode } from 'react'
import {
  Activity,
  Brain,
  Cpu,
  DollarSign,
  Ear,
  HeartPulse,
  Hospital,
  Mic2,
  ShieldCheck,
  Volume2,
  Waves,
  Zap,
} from 'lucide-react'
import { LinkButton } from '../components/shared/Button'
import { MindSpeakLogo } from '../components/brand/MindSpeakLogo'
import { useCountUp, useReveal } from '../hooks/useReveal'
import { cn } from '../lib/cn'

function ClinicalGridPattern() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.4]"
      aria-hidden
      style={{
        backgroundImage: `linear-gradient(to right, rgb(148 163 184 / 0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgb(148 163 184 / 0.08) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }}
    />
  )
}

function BrainWavePattern({ id }: { id: string }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.12] motion-safe:animate-ms-float"
      aria-hidden
    >
      <defs>
        <pattern id={id} x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
          <path
            d="M0 60 Q30 20 60 60 T120 60"
            fill="none"
            stroke="rgb(165 243 252)"
            strokeWidth="1.2"
          />
          <path
            d="M0 90 Q40 50 80 90 T160 90"
            fill="none"
            stroke="rgb(167 243 208)"
            strokeWidth="0.8"
            opacity="0.7"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

function Reveal({
  children,
  className,
  delayMs = 0,
  visible,
}: {
  children: ReactNode
  className?: string
  delayMs?: number
  visible: boolean
}) {
  return (
    <div
      className={cn(
        'translate-y-6 opacity-0 transition-all duration-700 motion-reduce:translate-y-0 motion-reduce:opacity-100',
        visible && 'translate-y-0 opacity-100',
        className,
      )}
      style={{ transitionDelay: visible ? `${delayMs}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}

export function HomePage() {
  const patternId = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const hero = useReveal<HTMLElement>()
  const how = useReveal<HTMLElement>()
  const who = useReveal<HTMLElement>()
  const diff = useReveal<HTMLElement>()
  const cta = useReveal<HTMLElement>()

  const latency = useCountUp(2, 900, diff.visible)
  const accuracyDemo = useCountUp(99, 1100, diff.visible)

  const steps = [
    {
      icon: Brain,
      color: 'bg-blue-100 text-blue-700 ring-blue-200',
      title: 'Foco mental',
      body: 'O paciente concentra sua atenção na palavra desejada.',
    },
    {
      icon: Activity,
      color: 'bg-green-100 text-green-700 ring-green-200',
      title: 'Captura EEG',
      body: 'Sensor não invasivo na testa capta os sinais cerebrais.',
    },
    {
      icon: Cpu,
      color: 'bg-violet-100 text-violet-700 ring-violet-200',
      title: 'Processamento IA',
      body: 'Inteligência artificial interpreta a intenção.',
    },
    {
      icon: Volume2,
      color: 'bg-orange-100 text-orange-700 ring-orange-200',
      title: 'Comunicação',
      body: 'A palavra é falada em voz alta pelo sistema.',
    },
  ] as const

  const audiences = [
    { icon: Hospital, title: 'Paralisia', desc: 'Pessoas com mobilidade reduzida ou tetraplegia.' },
    { icon: HeartPulse, title: 'ALS / ELA', desc: 'Pacientes com esclerose lateral amiotrófica.' },
    { icon: Activity, title: 'AVC', desc: 'Vítimas de acidente vascular cerebral.' },
    { icon: Mic2, title: 'UTI', desc: 'Pacientes intubados sem possibilidade de fala.' },
    { icon: Ear, title: 'Surdez', desc: 'Pessoas com limitações auditivas e de fala.' },
    { icon: Waves, title: 'Recuperação', desc: 'Pacientes em processo de reabilitação.' },
  ] as const

  return (
    <div id="top" className="min-h-dvh bg-white text-slate-900">
      {/* Hero — visual clínico-laboratorial */}
      <header ref={hero.ref} className="relative overflow-hidden bg-slate-950 text-slate-100">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-950/80 via-slate-950 to-slate-950" />
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-1/3 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />
        <ClinicalGridPattern />
        <BrainWavePattern id={`wave-${patternId}`} />
        <div className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-5 pt-6 md:pt-8">
          <MindSpeakLogo layout="horizontal" size="md" wordmarkClassName="text-white" />
          <div className="flex items-center gap-2">
            <LinkButton
              to="/patient/login"
              variant="ghost"
              size="sm"
              className="!text-slate-200 hover:!bg-white/10 focus-visible:!outline-cyan-400"
            >
              Paciente
            </LinkButton>
            <LinkButton
              to="/login"
              variant="ghost"
              size="sm"
              className="!text-slate-200 hover:!bg-white/10 focus-visible:!outline-cyan-400"
            >
              Clínico
            </LinkButton>
          </div>
        </div>
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-5 pb-12 pt-6 md:flex-row md:items-center md:justify-between md:pb-16 md:pt-8 lg:pb-20 lg:pt-10">
          <div className="max-w-xl space-y-6">
            <Reveal visible={hero.visible}>
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-100">
                <Cpu className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden />
                BCI assistivo · interface clínica
              </span>
            </Reveal>
            <Reveal visible={hero.visible} delayMs={80}>
              <h1 className="bg-gradient-to-br from-white via-emerald-100 to-cyan-200 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-6xl lg:text-7xl">
                MindSpeak
              </h1>
              <p className="text-2xl font-medium text-slate-300">Comunicação guiada por sinais neurais</p>
            </Reveal>
            <Reveal visible={hero.visible} delayMs={160}>
              <p className="text-lg leading-relaxed text-slate-400">
                Plataforma de comunicação aumentativa para cenários hospitalares e de reabilitação: captura não invasiva,
                processamento em tempo real e voz sintetizada — com custo acessível para equipes e famílias.
              </p>
            </Reveal>
            <Reveal visible={hero.visible} delayMs={240} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <LinkButton
                to="/patient/login"
                variant="primary"
                size="lg"
                className="border-0 bg-emerald-500 !text-white shadow-lg shadow-emerald-900/40 hover:!bg-emerald-400 hover:!shadow-emerald-900/30"
              >
                Demonstração do paciente
              </LinkButton>
              <LinkButton
                to="/login"
                variant="secondary"
                size="lg"
                className="border border-cyan-400/40 !bg-slate-900/60 !text-cyan-50 backdrop-blur-sm hover:!border-cyan-300/60 hover:!bg-slate-800/80"
              >
                Portal clínico
              </LinkButton>
            </Reveal>
          </div>

          <Reveal visible={hero.visible} delayMs={200} className="mx-auto w-full max-w-md md:mx-0 lg:max-w-lg">
            <div className="relative rounded-2xl border border-slate-700/80 bg-slate-900/70 p-6 shadow-2xl shadow-black/40 ring-1 ring-white/5 backdrop-blur-md">
              <div className="mb-4 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500">
                <span>Grade AAC · prévia</span>
                <Waves className="h-5 w-5 text-cyan-400/90" aria-hidden />
              </div>
              <div className="grid grid-cols-4 gap-2 rounded-xl border border-slate-700/80 bg-slate-950/80 p-3">
                {['SIM', 'NÃO', 'AJUDA', 'BEM', 'ÁGUA', 'OK', 'CHAMAR', 'DOR'].map((w, i) => (
                  <div
                    key={w}
                    className={cn(
                      'flex aspect-square items-center justify-center rounded-lg border border-slate-700 bg-slate-800/80 text-[10px] font-bold text-slate-200 sm:text-xs',
                      i === 0 && 'border-cyan-500/60 ring-2 ring-cyan-500/30',
                    )}
                  >
                    {w}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-center gap-3 text-cyan-200/90">
                <Brain className="h-8 w-8 motion-safe:animate-pulse" aria-hidden />
                <Activity className="h-8 w-8 text-emerald-400" aria-hidden />
                <Volume2 className="h-8 w-8" aria-hidden />
              </div>
            </div>
          </Reveal>
        </div>
      </header>

      {/* Como funciona */}
      <section ref={how.ref} id="como-funciona" className="scroll-mt-20 border-b border-slate-100 bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal visible={how.visible} className="text-center">
            <h2 className="text-3xl font-bold text-slate-900">Como funciona</h2>
            <p className="mt-2 text-lg text-slate-600">Do pensamento à comunicação em 4 passos</p>
          </Reveal>
          <div className="relative mt-12 grid gap-8 md:grid-cols-4">
            <div
              className="pointer-events-none absolute left-0 right-0 top-10 hidden h-0.5 border-t-2 border-dashed border-slate-200 md:block"
              aria-hidden
            />
            {steps.map((s, i) => {
              const Icon = s.icon
              return (
                <Reveal key={s.title} visible={how.visible} delayMs={100 * i} className="relative">
                  <article className="h-full rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-100 transition duration-300 hover:-translate-y-2 hover:shadow-lg motion-reduce:hover:translate-y-0">
                    <div
                      className={cn(
                        'mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full ring-2',
                        s.color,
                      )}
                    >
                      <Icon className="h-7 w-7" aria-hidden />
                    </div>
                    <h3 className="text-center text-lg font-semibold text-slate-900">{s.title}</h3>
                    <p className="mt-2 text-center text-sm leading-relaxed text-slate-600">{s.body}</p>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Para quem */}
      <section ref={who.ref} id="para-quem" className="scroll-mt-20 bg-gray-50 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal visible={who.visible} className="text-center">
            <h2 className="text-3xl font-bold text-slate-900">Projetado para quem mais precisa</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map((a, i) => {
              const Icon = a.icon
              return (
                <Reveal key={a.title} visible={who.visible} delayMs={80 * i}>
                  <article className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg motion-reduce:hover:translate-y-0">
                    <Icon className="h-8 w-8 text-green-700" aria-hidden />
                    <h3 className="mt-4 text-lg font-semibold text-slate-900">{a.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{a.desc}</p>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section ref={diff.ref} id="diferenciais" className="scroll-mt-20 bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal visible={diff.visible} className="text-center">
            <h2 className="text-3xl font-bold text-slate-900">Tecnologia acessível</h2>
          </Reveal>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            <Reveal visible={diff.visible} delayMs={0}>
              <article className="h-full rounded-2xl border border-slate-200 bg-slate-50/80 p-8 shadow-sm">
                <DollarSign className="h-10 w-10 text-green-700" aria-hidden />
                <h3 className="mt-4 text-xl font-semibold text-slate-900">Baixo custo</h3>
                <p className="mt-3 text-slate-600">
                  Hardware por menos de R$400. Fração do custo de dispositivos AAC comerciais.
                </p>
              </article>
            </Reveal>
            <Reveal visible={diff.visible} delayMs={100}>
              <article className="h-full rounded-2xl border border-slate-200 bg-slate-50/80 p-8 shadow-sm">
                <ShieldCheck className="h-10 w-10 text-green-700" aria-hidden />
                <h3 className="mt-4 text-xl font-semibold text-slate-900">Não invasivo</h3>
                <p className="mt-3 text-slate-600">
                  Sensor externo colocado na testa. Sem cirurgia, sem dor, sem risco.
                </p>
              </article>
            </Reveal>
            <Reveal visible={diff.visible} delayMs={200}>
              <article className="h-full rounded-2xl border border-slate-200 bg-slate-50/80 p-8 shadow-sm">
                <Zap className="h-10 w-10 text-green-700" aria-hidden />
                <h3 className="mt-4 text-xl font-semibold text-slate-900">Tempo real</h3>
                <p className="mt-3 text-slate-600">
                  Resposta em menos de {Math.max(2, latency)} segundos. Comunicação fluida e natural.
                </p>
              </article>
            </Reveal>
          </div>
          <Reveal visible={diff.visible} delayMs={320} className="mt-10 text-center text-sm text-slate-600">
            Precisão média na demonstração:{' '}
            <span className="font-semibold text-green-700 tabular-nums">{accuracyDemo}%</span>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section
        ref={cta.ref}
        id="cta"
        className="scroll-mt-20 border-t border-slate-800 bg-slate-950 py-16 text-center text-slate-100 md:py-20"
      >
        <Reveal visible={cta.visible}>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Pronto para conhecer o MindSpeak?</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            Explore a demonstração do paciente ou entre no portal para acompanhar sessões e alertas.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <LinkButton
              to="/patient/login"
              variant="primary"
              size="lg"
              className="border-0 bg-emerald-500 !text-white shadow-lg shadow-emerald-950/50 hover:!bg-emerald-400"
            >
              Ver demonstração
            </LinkButton>
            <LinkButton
              to="/login"
              variant="secondary"
              size="lg"
              className="border border-cyan-500/40 !bg-transparent !text-cyan-50 hover:!border-cyan-400 hover:!bg-cyan-500/10"
            >
              Acessar portal clínico
            </LinkButton>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 px-5 py-12 text-slate-300">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <MindSpeakLogo layout="horizontal" size="sm" wordmarkClassName="text-slate-100" />
            <p className="mt-4 text-sm text-slate-400">Projeto de Ensino Médio Técnico — 2026</p>
          </div>
          <nav className="flex flex-col gap-2 text-sm font-medium" aria-label="Rodapé">
            <a href="#top" className="text-white hover:text-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400">
              Voltar ao topo
            </a>
            <LinkButton to="/patient/login" variant="ghost" size="sm" className="!justify-start !px-0 !text-slate-300 hover:!bg-white/5 hover:!text-white">
              Interface do paciente
            </LinkButton>
            <LinkButton to="/login" variant="ghost" size="sm" className="!justify-start !px-0 !text-slate-300 hover:!bg-white/5 hover:!text-white">
              Portal clínico
            </LinkButton>
            <a
              href="#como-funciona"
              className="text-left text-slate-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
            >
              Sobre o projeto
            </a>
          </nav>
        </div>
        <hr className="mx-auto mt-10 max-w-6xl border-slate-800" />
        <p className="mx-auto mt-8 flex max-w-6xl items-center justify-center gap-2 text-center text-sm text-slate-500">
          <span>Desenvolvido por Equipe MindSpeak</span>
          <Brain className="h-4 w-4 text-emerald-500/80" aria-hidden />
        </p>
      </footer>
    </div>
  )
}
