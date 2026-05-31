import { ChevronDown } from 'lucide-react'
import { Button } from '../../../components/shared/Button'

const FAQ = [
  {
    q: 'Como funciona o sistema?',
    a: 'O MindSpeak lê sinais do seu cérebro com um sensor na testa e destaca palavras na tela. Mantendo o foco na palavra desejada, o sistema confirma e pode falar por você.',
  },
  {
    q: 'O que fazer se o sensor não conectar?',
    a: 'Verifique se o Bluetooth está ligado, aproxime o sensor do receptor e use “Sincronizar” na barra lateral. Se persistir, peça ajuda ao seu profissional.',
  },
  {
    q: 'Como melhorar a precisão?',
    a: 'Reduza ruído visual, mantenha-se confortável e pratique olhar com calma para a palavra certa até ouvir o feedback de confirmação.',
  },
  {
    q: 'Como alterar minhas frases?',
    a: 'A grade de frases é definida pela equipe clínica. Fale com seu profissional para ajustar o vocabulário às suas necessidades.',
  },
] as const

export function PatientSupportPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Central de Suporte</h1>
        <p className="mt-1 text-sm text-slate-600">Recursos e informações para o uso seguro do MindSpeak.</p>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Precisa de ajuda?</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">Entre em contato com seu profissional de saúde</p>
        <Button type="button" variant="primary" className="mt-6 bg-green-600 hover:bg-green-700">
          Enviar solicitação de suporte
        </Button>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">FAQ</h2>
        <div className="mt-4 divide-y divide-slate-100">
          {FAQ.map((item) => (
            <details key={item.q} className="group py-3">
              <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900 marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-2">
                  {item.q}
                  <ChevronDown
                    className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180"
                    aria-hidden
                  />
                </span>
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Informações do dispositivo</h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
            <dt className="text-slate-500">Sensor</dt>
            <dd className="text-right font-medium text-slate-900">TGAM NeuroSky</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
            <dt className="text-slate-500">Conexão</dt>
            <dd className="text-right font-medium text-slate-900">Bluetooth</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
            <dt className="text-slate-500">Versão do firmware</dt>
            <dd className="text-right font-medium text-slate-900">1.0.0</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">Último sync</dt>
            <dd className="text-right font-medium text-slate-900">—</dd>
          </div>
        </dl>
      </section>
    </div>
  )
}
