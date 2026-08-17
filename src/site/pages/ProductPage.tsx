import hardwareDiagram from '../assets/hardware-diagram.png'
import headsetPlaceholder from '../assets/headset-placeholder.png'
import TeamHeader from '../components/team/TeamHeader'
import Footer from '../components/Footer'
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

interface ComponentItem {
  id: string
  name: string
  price: number
  category: string
  image?: string
}

const componentsList: ComponentItem[] = [
  {
    id: 'tgam',
    name: 'Sensor TGAM (EEG)',
    price: 120.0,
    category: 'Processamento BCI',
    image: '/images/hardware-comp1.png',
  },
  {
    id: 'esp32',
    name: 'ESP32 NodeMCU 38p',
    price: 31.0,
    category: 'Microcontrolador',
    image: '/images/hardware-comp2.png',
  },
  {
    id: 'dfplayer',
    name: 'DFPlayer Mini',
    price: 15.0,
    category: 'Módulo de Áudio',
    image: '/images/hardware-comp3.png',
  },
  {
    id: 'speaker',
    name: 'Alto-falante 3W',
    price: 8.0,
    category: 'Saída de Som',
  },
  {
    id: 'microsd',
    name: 'Cartão MicroSD 8GB',
    price: 30.0,
    category: 'Armazenamento',
  },
  {
    id: 'lipo',
    name: 'Bateria LiPo 3.7V',
    price: 32.0,
    category: 'Alimentação',
  },
  {
    id: 'charge',
    name: 'Módulo TP4056',
    price: 5.0,
    category: 'Carregamento',
  },
  {
    id: 'breadboard',
    name: 'Protoboard 400p',
    price: 12.0,
    category: 'Prototipagem',
  },
  {
    id: 'jumpers',
    name: 'Cabos Jumper M/F',
    price: 11.0,
    category: 'Conexões',
  },
  {
    id: 'band',
    name: 'Faixa Elástica Ajustável',
    price: 19.0,
    category: 'Estrutura',
  },
  {
    id: 'case',
    name: 'Case Impresso 3D',
    price: 22.0,
    category: 'Proteção',
  },
  {
    id: 'electrodes',
    name: 'Eletrodos Secos (Par)',
    price: 10.0,
    category: 'Sensores',
  },
]

const systemSpecs = [
  {
    icon: Cpu,
    title: 'Microcontrolador',
    value: 'ESP32 NodeMCU 38 pinos',
  },
  {
    icon: Zap,
    title: 'Frequência de CPU',
    value: '240MHz Dual-Core',
  },
  {
    icon: Wifi,
    title: 'Conectividade',
    value: 'Bluetooth Classic & Wi-Fi',
  },
  {
    icon: Volume2,
    title: 'Saída de Áudio',
    value: 'DFPlayer Mini + Alto-falante',
  },
  {
    icon: Brain,
    title: 'Sensor Neural',
    value: 'TGAM (NeuroSky OEM)',
  },
  {
    icon: Battery,
    title: 'Alimentação',
    value: 'Bateria LiPo 3.7V 1800mAh',
  },
  {
    icon: Clock,
    title: 'Autonomia',
    value: 'Até 12 horas contínuas',
  },
  {
    icon: Activity,
    title: 'Processamento',
    value: 'Tempo real de ondas neurais',
  },
]

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 dark:text-slate-200">
      {/* Light Header */}
      <TeamHeader />

      <main>
        {/* 1. Hero / Banner */}
        <section className="relative overflow-hidden bg-white px-6 py-20 text-center lg:px-8 lg:py-28">
          <div className="mx-auto max-w-4xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-teal-700">
              <Settings className="h-3 w-3 animate-spin" />
              Exclusivo para o Projeto MindSpeak
            </span>

            <h1 className="mt-8 font-display text-4xl font-extrabold tracking-tight text-navy-900 sm:text-5xl lg:text-6xl">
              Hardware <span className="text-teal-500">Acessível</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Criado com o mínimo de barreiras físicas e com o custo de fabricação
              abaixo de R$ 350 reais, tornando a tecnologia de Interface
              Cérebro-Computador (BCI) viável e ao alcance de todos.
            </p>

            {/* Main stats block */}
            <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-4 divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-white py-6 shadow-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-navy-900 sm:text-3xl">
                  R$ 800
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Preço Final
                </p>
              </div>
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-navy-900 sm:text-3xl">
                  12
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Canais EEG
                </p>
              </div>
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-navy-900 sm:text-3xl">
                  98%
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Taxa de Acerto
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Por dentro do MindSpeak */}
        <section className="border-t border-slate-100 bg-slate-50 px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
              Por dentro do <span className="text-teal-600">MindSpeak</span>
            </h2>
            <p className="mt-4 text-base text-slate-600 max-w-xl mx-auto">
              Saiba quais são as principais placas e componentes eletrônicos
              utilizados na nossa solução de BCI de baixo custo.
            </p>

            <div className="mt-12">
              <div className="w-full rounded-3xl bg-white p-8 shadow-sm">
                <img
                  src={hardwareDiagram}
                  alt="Diagrama explodido do interior do hardware MindSpeak: TGAM Sensor, ESP32, DFPlayer e Bateria LiPo"
                  className="w-full max-w-[900px] h-auto mx-auto object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 3. Grid de Componentes */}
        <section className="bg-white px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 mb-10 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-display text-3xl font-bold tracking-tight text-navy-900">
                  Componentes
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Lista detalhada de materiais utilizados para a montagem do
                  dispositivo
                </p>
              </div>
              <div className="text-right">
                <span className="inline-block rounded-full bg-teal-500/10 px-4.5 py-2 text-sm font-bold text-teal-700">
                  Total R$ 313,00 <span className="font-normal text-xs text-teal-600">aprox.</span>
                </span>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {componentsList.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
                >
                  <div className="flex h-36 w-full items-center justify-center rounded-xl bg-slate-50 overflow-hidden mb-4 p-4">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-400">
                        <Cpu className="h-10 w-10 text-slate-300 stroke-[1.5]" />
                        <span className="mt-2 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                          {item.category}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full mb-2">
                    {item.image ? 'Componente Disponível' : 'Asset pendente'}
                  </span>
                  <h3 className="text-sm font-semibold text-navy-900 text-center truncate w-full">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm font-bold text-teal-600">
                    R$ {item.price.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Comparativo de Custo */}
        <section className="bg-slate-50 px-6 py-20 lg:px-8 border-y border-slate-100">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-navy-900">
              Comparativo de Custo
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Veja a diferença expressiva de custo de fabricação do MindSpeak em
              relação às alternativas do mercado.
            </p>

            <div className="mt-12 rounded-3xl bg-white p-6 md:p-8 shadow-sm border border-slate-100 text-left space-y-6">
              {/* MindSpeak Bar */}
              <div>
                <div className="flex justify-between text-sm font-semibold text-navy-900 mb-2">
                  <span>MindSpeak (Custo de peças)</span>
                  <span className="text-teal-600">R$ 313,00</span>
                </div>
                <div className="w-full bg-slate-100 h-6 rounded-full overflow-hidden">
                  <div
                    className="bg-teal-500 h-full rounded-full transition-all duration-500"
                    style={{ width: '4%' }}
                  />
                </div>
              </div>

              {/* National Similar */}
              <div>
                <div className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
                  <span>Dispositivos BCI similares (nacionais)</span>
                  <span>R$ 8.000,00</span>
                </div>
                <div className="w-full bg-slate-100 h-6 rounded-full overflow-hidden">
                  <div
                    className="bg-slate-400 h-full rounded-full"
                    style={{ width: '40%' }}
                  />
                </div>
              </div>

              {/* International Import */}
              <div>
                <div className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
                  <span>Outros BCI importados (internacionais)</span>
                  <span>R$ 20.000,00+</span>
                </div>
                <div className="w-full bg-slate-100 h-6 rounded-full overflow-hidden">
                  <div
                    className="bg-slate-500 h-full rounded-full"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              {/* Savings callout banner */}
              <div className="mt-8 flex items-center justify-center gap-3 rounded-xl bg-teal-50/75 border border-teal-100 p-4 text-teal-800 text-sm font-medium">
                <CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0" />
                <span>
                  O MindSpeak é cerca de{' '}
                  <strong className="text-teal-700">96% mais barato</strong> que os
                  dispositivos importados e alternativos comerciais.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Especificações do Sistema */}
        <section className="bg-white px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-display text-3xl font-bold tracking-tight text-navy-900">
                Especificações do Sistema
              </h2>
              <p className="mt-4 text-base text-slate-600">
                Detalhes de funcionamento físico e de hardware do nosso protótipo
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {systemSpecs.map((spec, i) => {
                const Icon = spec.icon
                return (
                  <div
                    key={i}
                    className="flex gap-4 rounded-xl border border-slate-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {spec.title}
                      </h4>
                      <p className="mt-1 text-sm font-semibold text-navy-900">
                        {spec.value}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* 6. Conclusão / CTA */}
        <section className="border-t border-slate-100 bg-slate-50 px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <div>
                <h2 className="font-display text-4xl font-extrabold tracking-tight text-navy-900 leading-tight">
                  O resultado de <br className="hidden sm:inline" />
                  <span className="text-teal-500">5 estudantes</span>
                </h2>
                <p className="mt-6 text-base leading-relaxed text-slate-600">
                  Todo o sistema cabe em um case impresso em 3D e pode ser
                  carregado no corpo do paciente ou posicionado ao lado da cama.
                  A bateria LiPo de 2000mAh permite uso contínuo por até 8
                  horas, e o módulo TP4056 possibilita recarga via USB.
                </p>

                <ul className="mt-8 space-y-3.5">
                  {[
                    'Sensor EEG NeuroSky TGAM para captura de atenção',
                    'ESP32 com processamento em tempo real',
                    'DFPlayer Mini para reprodução de áudio',
                    'Case 3D leve e ergonômico',
                    'Recarregável via USB',
                  ].map((bullet, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm font-medium text-slate-700"
                    >
                      <CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <Link
                    to="/instrucoes"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800 active:scale-[0.98]"
                  >
                    Ver Instruções →
                  </Link>
                </div>
              </div>

              {/* Right column: video player container — 662 × 662 px */}
              <div className="flex items-center justify-center">
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
                  <img
                    src={headsetPlaceholder}
                    alt="Placeholder: manequim 3D com capacete BCI MindSpeak — substituir por vídeo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
