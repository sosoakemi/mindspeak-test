import headsetPlaceholder from '../assets/headset-placeholder.png'
import TeamHeader from '../components/team/TeamHeader'
import Footer from '../components/Footer'
import { TiltImage } from '../components/TiltImage'
import { ArchitectureDiagram } from '../components/ArchitectureDiagram'
import { Reveal } from '../components/Reveal'
import {
  Activity,
  Battery,
  Brain,
  CheckCircle2,
  Clock,
  Cpu,
  Settings,
  Volume2,
  Wifi,
  Zap,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { componentsList, totalComponentsCost, formattedTotalCost } from '../data/hardware'

// Specs alinhadas com a arquitetura atual: o PC lê o TGAM direto pela porta
// serial (pyserial) e processa tudo em Python; a fala sai no iPad via Web
// Speech API. Sem ESP32/DFPlayer/Bluetooth — ver seção 2 do CLAUDE.md.
const systemSpecs = [
  {
    icon: Cpu,
    title: 'Processamento',
    value: 'PC / servidor — FastAPI + DSP + IA',
  },
  {
    icon: Zap,
    title: 'Protocolo do sensor',
    value: 'ThinkGear Serial (57600 / 9600 bps)',
  },
  {
    icon: Wifi,
    title: 'Conectividade',
    value: 'Wi-Fi (WebSocket PC ↔ iPad)',
  },
  {
    icon: Volume2,
    title: 'Saída de voz',
    value: 'Web Speech API no iPad (pt-BR)',
  },
  {
    icon: Brain,
    title: 'Sensor Neural',
    value: 'TGAM (NeuroSky OEM), 1 canal',
  },
  {
    icon: Battery,
    title: 'Alimentação',
    value: 'Bateria LiPo 3.7V 2000mAh',
  },
  {
    icon: Clock,
    title: 'Latência',
    value: 'Seleção e fala em tempo real',
  },
  {
    icon: Activity,
    title: 'IA',
    value: 'Modelo por paciente, via calibração',
  },
]

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 dark:bg-[#020617] dark:text-slate-200">
      {/* Header adapta sozinho ao tema (ver TeamHeader.tsx) */}
      <TeamHeader />

      <main>
        {/* 1. Hero / Banner */}
        <section className="relative overflow-hidden bg-white px-6 py-20 text-center dark:bg-[#020617] lg:px-8 lg:py-28">
          <div className="mx-auto max-w-4xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-teal-700 dark:bg-teal-500/10 dark:text-teal-300">
              <Settings className="h-3 w-3 animate-spin" />
              Exclusivo para o Projeto MindSpeak
            </span>

            <h1 className="mt-8 font-display text-4xl font-extrabold tracking-tight text-navy-900 dark:text-white sm:text-5xl lg:text-6xl">
              Hardware <span className="text-teal-500">Acessível</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
              Criado com o mínimo de barreiras físicas e com custo de peças de
              cerca de R$ {formattedTotalCost}, tornando a tecnologia de Interface
              Cérebro-Computador (BCI) viável e ao alcance de todos.
            </p>

            {/* Main stats block */}
            <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-4 divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-white py-6 shadow-sm dark:divide-slate-800 dark:border-slate-800 dark:bg-[#111827] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-navy-900 dark:text-white sm:text-3xl">
                  R$ {formattedTotalCost}
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-400">
                  Custo de Peças
                </p>
              </div>
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-navy-900 dark:text-white sm:text-3xl">
                  1
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-400">
                  Canal EEG (Sensor TGAM)
                </p>
              </div>
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-navy-900 dark:text-white sm:text-3xl">
                  Tempo Real
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-400">
                  Seleção e Fala
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Por dentro do MindSpeak */}
        <section className="border-t border-slate-100 bg-slate-50 px-6 py-20 dark:border-slate-800 dark:bg-[#0a1628] lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <Reveal>
              <h2 className="font-display text-3xl font-bold tracking-tight text-navy-900 dark:text-white sm:text-4xl">
                Por dentro do <span className="text-teal-600 dark:text-teal-400">MindSpeak</span>
              </h2>
              <p className="mt-4 text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
                Do sensor ao som: veja o caminho que o sinal cerebral percorre
                até virar uma palavra falada.
              </p>
            </Reveal>

            <Reveal delay={120} className="mt-12">
              <ArchitectureDiagram />
            </Reveal>
          </div>
        </section>

        {/* 3. Grid de Componentes */}
        <section className="bg-white px-6 py-20 dark:bg-[#020617] lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal className="flex flex-col gap-4 border-b border-slate-100 pb-6 mb-10 dark:border-slate-800 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-display text-3xl font-bold tracking-tight text-navy-900 dark:text-white">
                  Componentes
                </h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Lista detalhada de materiais utilizados para a montagem do
                  dispositivo
                </p>
              </div>
              <div className="text-right">
                <span className="inline-block rounded-full bg-teal-500/10 px-4.5 py-2 text-sm font-bold text-teal-700 dark:text-teal-300">
                  Total R$ {formattedTotalCost} <span className="font-normal text-xs text-teal-600 dark:text-teal-400">aprox.</span>
                </span>
              </div>
            </Reveal>

            {/* 6 componentes, 3 por linha (2 linhas) a partir do tablet */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {componentsList.map((item, i) => (
                <Reveal key={item.id} delay={i * 60}>
                  <div className="group flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-200 hover:shadow-lg hover:shadow-teal-900/5 dark:border-slate-800 dark:bg-[#111827] dark:hover:border-teal-500/40">
                    <div className="flex h-36 w-full items-center justify-center rounded-xl bg-slate-50 overflow-hidden mb-4 p-4 dark:bg-slate-800/60">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full mb-2 transition-colors duration-300 group-hover:bg-teal-500 group-hover:text-white dark:bg-teal-500/10 dark:text-teal-300">
                      Componente Disponível
                    </span>
                    <h3 className="text-sm font-semibold text-navy-900 dark:text-white text-center truncate w-full">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-sm font-bold text-teal-600 dark:text-teal-400">
                      R$ {item.price.toFixed(2)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Comparativo de Custo */}
        <section className="bg-slate-50 px-6 py-20 lg:px-8 border-y border-slate-100 dark:bg-[#0a1628] dark:border-slate-800">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <h2 className="font-display text-3xl font-bold tracking-tight text-navy-900 dark:text-white">
                Comparativo de Custo
              </h2>
              <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
                Veja a diferença expressiva de custo de fabricação do MindSpeak em
                relação às alternativas do mercado.
              </p>
            </Reveal>

            <Reveal delay={120} className="mt-12 rounded-3xl bg-white p-6 md:p-8 shadow-sm border border-slate-100 text-left space-y-6 dark:bg-[#111827] dark:border-slate-800">
              {/* MindSpeak Bar */}
              <div>
                <div className="flex justify-between text-sm font-semibold text-navy-900 dark:text-white mb-2">
                  <span>MindSpeak (Custo de peças)</span>
                  <span className="text-teal-600 dark:text-teal-400">R$ {formattedTotalCost}</span>
                </div>
                <div className="w-full bg-slate-100 h-6 rounded-full overflow-hidden dark:bg-slate-800">
                  <div
                    className="bg-teal-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(2, (totalComponentsCost / 20000) * 100)}%` }}
                  />
                </div>
              </div>

              {/* National Similar */}
              <div>
                <div className="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  <span>Dispositivos BCI similares (nacionais)</span>
                  <span>R$ 8.000,00</span>
                </div>
                <div className="w-full bg-slate-100 h-6 rounded-full overflow-hidden dark:bg-slate-800">
                  <div
                    className="bg-slate-400 h-full rounded-full"
                    style={{ width: '40%' }}
                  />
                </div>
              </div>

              {/* International Import */}
              <div>
                <div className="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  <span>Outros BCI importados (internacionais)</span>
                  <span>R$ 20.000,00+</span>
                </div>
                <div className="w-full bg-slate-100 h-6 rounded-full overflow-hidden dark:bg-slate-800">
                  <div
                    className="bg-slate-500 h-full rounded-full"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              {/* Savings callout banner */}
              <div className="mt-8 flex items-center justify-center gap-3 rounded-xl bg-teal-50/75 border border-teal-100 p-4 text-teal-800 text-sm font-medium dark:bg-teal-500/10 dark:border-teal-500/20 dark:text-teal-300">
                <CheckCircle2 className="h-5 w-5 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>
                  O MindSpeak é cerca de{' '}
                  <strong className="text-teal-700 dark:text-teal-300">
                    {Math.round((1 - totalComponentsCost / 20000) * 100)}% mais barato
                  </strong>{' '}
                  que os dispositivos importados e alternativos comerciais.
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 5. Especificações do Sistema */}
        <section className="bg-white px-6 py-20 dark:bg-[#020617] lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Reveal className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-display text-3xl font-bold tracking-tight text-navy-900 dark:text-white">
                Especificações do Sistema
              </h2>
              <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
                Detalhes de funcionamento físico e de hardware do nosso protótipo
              </p>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {systemSpecs.map((spec, i) => {
                const Icon = spec.icon
                return (
                  <Reveal key={spec.title} delay={i * 50}>
                    <div className="group flex gap-4 rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-md dark:border-slate-800 dark:bg-[#111827] dark:hover:border-teal-500/40">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600 transition-colors duration-300 group-hover:bg-teal-500 group-hover:text-white dark:text-teal-300">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          {spec.title}
                        </h4>
                        <p className="mt-1 text-sm font-semibold text-navy-900 dark:text-white">
                          {spec.value}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* 6. Conclusão / CTA */}
        <section className="border-t border-slate-100 bg-slate-50 px-6 py-20 dark:border-slate-800 dark:bg-[#0a1628] lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <Reveal>
                <h2 className="font-display text-4xl font-extrabold tracking-tight text-navy-900 dark:text-white leading-tight">
                  O resultado de <br className="hidden sm:inline" />
                  <span className="text-teal-500">5 estudantes</span>
                </h2>
                <p className="mt-6 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                  Só o sensor TGAM fica na cabeça do paciente, leve e sem fios
                  soltos — ligado por USB a um PC próximo, que faz todo o
                  processamento de sinal e a decisão da palavra. A voz sai no
                  iPad, ao alcance de quem acompanha a sessão.
                </p>

                <ul className="mt-8 space-y-3.5">
                  {[
                    'Sensor EEG NeuroSky TGAM (1 canal) para captura de atenção',
                    'PC lê o sensor direto pela serial — sem microcontrolador',
                    'Motor de decisão com IA calibrada por paciente',
                    'Fala em tempo real no iPad, via Web Speech API',
                    'Case 3D leve e ergonômico',
                    'Bateria recarregável via USB',
                  ].map((bullet, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle2 className="h-5 w-5 text-teal-600 dark:text-teal-400 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <Link
                    to="/instrucoes"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800 active:scale-[0.98] dark:bg-teal-600 dark:hover:bg-teal-500"
                  >
                    Ver Instruções →
                  </Link>
                </div>
              </Reveal>

              {/* Right column: video player container — 662 × 662 px */}
              <Reveal delay={150} className="flex items-center justify-center">
                <div className="w-full max-w-[662px] aspect-square rounded-3xl overflow-hidden shadow-lg">
                  {/*
                    ── SUBSTITUIR QUANDO O VÍDEO ESTIVER PRONTO ──────────────
                    Troque a tag <img> abaixo por uma das opções:

                    Opção A — Vídeo local:
                    <video
                      src="/videos/mindspeak-demo.mp4"
                      className="w-full h-full object-cover"
                      autoPlay muted loop playsInline
                    />

                    Opção B — YouTube embed:
                    <iframe
                      src="https://www.youtube.com/embed/SEU_VIDEO_ID"
                      className="w-full h-full"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />

                    Opção C — Vimeo embed:
                    <iframe
                      src="https://player.vimeo.com/video/SEU_VIDEO_ID"
                      className="w-full h-full"
                      allow="autoplay; fullscreen"
                      allowFullScreen
                    />
                    ─────────────────────────────────────────────────────────
                  */}
                  <TiltImage
                    src={headsetPlaceholder}
                    alt="Placeholder: manequim 3D com capacete BCI MindSpeak — substituir por vídeo"
                    className="h-full w-full"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
