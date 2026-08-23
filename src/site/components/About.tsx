import { Heart, Network, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'

const valueCards = [
  {
    icon: Heart,
    label: 'Inclusão',
    description: 'Tecnologia acessível para todos os perfis socioeconômicos.',
  },
  {
    icon: UserRound,
    label: 'Autonomia',
    description: 'Comunicação independente sem depender de terceiros.',
  },
  {
    icon: Network,
    label: 'Conexão',
    description: 'Reunir familiares, amigos e cuidadores através da comunicação.',
  },
]

export default function About() {
  return (
    <section id="missao" className="bg-white px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 overflow-visible lg:grid-cols-2 lg:gap-20">

          {/* ── Left column: text + cards ── */}
          <div className="flex flex-col items-start">
            {/* Overline */}
            <span className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-teal-500">
              Nosso Objetivo
            </span>

            {/* Title */}
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-navy-900 sm:text-4xl">
              Dar voz a quem o mundo esqueceu de ouvir
            </h2>

            {/* Paragraph 1 */}
            <p className="mt-6 text-base leading-relaxed text-slate-600">
              MindSpeak nasceu de uma constatação simples e dolorosa: milhões de
              pessoas ao redor do mundo vivem em silêncio não por escolha, mas
              por limitações motoras que as impedem de falar, digitar ou
              gesticular.
            </p>

            {/* Paragraph 2 */}
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Nossa missão é eliminar essa barreira usando inteligência artificial
              e interfaces cérebro-computador de baixo custo. Queremos devolver
              autonomia, dignidade e a possibilidade de expressar pensamentos,
              sentimentos e necessidades a qualquer pessoa, independentemente de
              sua condição física.
            </p>

            {/* Value cards */}
            <div className="mt-8 grid w-full grid-cols-3 gap-3 sm:gap-4">
              {valueCards.map(({ icon: Icon, label, description }) => (
                <div
                  key={label}
                  className="flex flex-col gap-2 rounded-xl bg-navy-900 px-3 py-5 sm:px-4"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/15 text-teal-400">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span className="text-xs font-semibold text-white sm:text-sm">
                    {label}
                  </span>
                  <span className="text-[11px] leading-snug text-slate-400">
                    {description}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column: image + floating badge ── */}
          <div className="relative">
            <img
              src="/images/family.png"
              alt="Avô e neta compartilhando um momento de conexão e afeto"
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg"
              loading="lazy"
            />
            {/* Floating stat — bleeds left out of the image */}
            <div className="absolute bottom-6 -left-6 max-w-[200px] rounded-xl bg-navy-900/95 px-5 py-4 shadow-xl backdrop-blur-sm">
              <p className="font-display text-2xl font-bold text-teal-400">
                +2 milhões
              </p>
              <p className="mt-1 text-xs leading-snug text-slate-300">
                de brasileiros vivem com alguma condição que limita a fala ou movimento.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image column — left, full room visible */}
          <div className="order-2 lg:order-1 w-full max-w-[468px] shrink-0 lg:h-[580px]">
            <img
              src="/images/patient.png"
              alt="Paciente utilizando o capacete MindSpeak em ambiente hospitalar"
              className="h-full w-full rounded-2xl object-cover shadow-lg"
              loading="lazy"
            />
          </div>

          {/* Text column — right */}
          <div className="order-1 lg:order-2 flex flex-col items-start">
            {/* Overline tag */}
            <span className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Público-Alvo
            </span>

            {/* Two-tone title */}
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              <span className="text-navy-900">Tecnologia que </span>
              <span className="text-teal-500">devolve a voz</span>
            </h2>

            {/* Paragraph 1 */}
            <p className="mt-6 text-base leading-relaxed text-slate-600">
              O MindSpeak foi desenvolvido para auxiliar pessoas que enfrentam
              dificuldades de comunicação devido a condições como Esclerose
              Lateral Amiotrófica (ELA), Acidente Vascular Cerebral (AVC),
              paralisia e pacientes intubados em Unidades de Terapia Intensiva.
            </p>

            {/* Paragraph 2 */}
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Usando um sensor EEG acessível na testa, o dispositivo captura
              sinais cerebrais e converte níveis de atenção em frases
              pré-programadas que são faladas em voz alta — permitindo
              comunicação sem necessidade de movimentos corporais.
            </p>

            {/* Pill-style CTA button */}
            <Link
              to="/produto"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:border-teal-400 hover:text-teal-600 hover:shadow-md dark:border-slate-600 dark:bg-[#111827] dark:text-slate-200 dark:hover:border-teal-500 dark:hover:text-teal-400"
            >
              Saiba como funciona →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
