import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { formattedTotalCost } from '../data/hardware'
import { Reveal } from './Reveal'

// Respostas honestas sobre o que o protótipo faz e não faz — nada de
// prometer diagnóstico/uso clínico (ver CLAUDE.md: "não é equipamento
// médico") nem "leitura de mente" (é foco sustentado + piscada, calibrados
// por pessoa).
const faqItems = [
  {
    question: 'O MindSpeak é um dispositivo médico?',
    answer:
      'Não. É um protótipo acadêmico, desenvolvido como Trabalho de Conclusão de Curso. Ele não foi validado clinicamente e não deve ser usado para diagnóstico — é uma demonstração de comunicação assistiva de baixo custo.',
  },
  {
    question: 'O sistema lê meus pensamentos?',
    answer:
      'Não. Com 1 canal de EEG não é possível decodificar pensamentos. O que o MindSpeak faz é reconhecer foco sustentado sobre uma palavra em destaque numa grade (scanning) e usar a piscada como confirmação — como um "clique" mental.',
  },
  {
    question: 'Preciso me mover ou falar para usar?',
    answer:
      'Não. A seleção depende apenas do sinal cerebral captado pelo sensor na testa e, opcionalmente, de uma piscada. Foi pensado para pessoas com limitações motoras severas, como na ELA em estágio avançado.',
  },
  {
    question: 'Funciona igual para qualquer pessoa, sem ajuste?',
    answer:
      'Não direto — cada pessoa passa por uma sessão de calibração (foco x repouso) antes de usar, e o sistema treina um modelo individual a partir dela. Os limiares não são fixos nem iguais para todo mundo.',
  },
  {
    question: 'Quanto custa montar o protótipo?',
    answer: `O custo de peças gira em torno de R$ ${formattedTotalCost}, bem abaixo de soluções comerciais de BCI — essa é justamente a proposta: tornar essa tecnologia acessível.`,
  },
  {
    question: 'Onde a palavra é falada?',
    answer:
      'No iPad (ou outro dispositivo com Safari) usado pelo paciente, através da Web Speech API do navegador — o backend só decide qual palavra foi escolhida e envia o texto, não um áudio.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="bg-slate-50 px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal className="flex flex-col items-center text-center">
          <span className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-teal-500">
            Perguntas Frequentes
          </span>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            <span className="text-navy-900">Tirando as </span>
            <span className="text-teal-500">dúvidas</span>
          </h2>
        </Reveal>

        <div className="mt-12 flex flex-col gap-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <Reveal key={item.question} delay={index * 60}>
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                  >
                    <span className="text-sm font-semibold text-navy-900 sm:text-base">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-teal-500' : ''
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-200 ease-out ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-4 text-sm leading-relaxed text-slate-600 sm:px-6">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
