import { useEffect, useRef, useState, type FormEvent } from 'react'
import { ChevronDown, Send } from 'lucide-react'
import { Button } from '../../../components/shared/Button'
import { getPatientSession } from '../../../lib/patientSession'
import { usePatientSync } from '../../../hooks/usePatientSync'
import { msCardPad, msInputBase, msInputBorder, msLabel } from '../../../lib/msStyles'
import { cn } from '../../../lib/cn'

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
    a: 'No menu lateral, abra “Frases da grade” para editar, reordenar e salvar as oito frases usadas na comunicação.',
  },
] as const

type SupportStep = 'idle' | 'sending' | 'success' | 'error'

export function PatientSupportPage() {
  const { formatLastSync, sensorConnected } = usePatientSync()
  const [supportOpen, setSupportOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [step, setStep] = useState<SupportStep>('idle')
  const [supportError, setSupportError] = useState<string | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    if (supportOpen && !el.open) el.showModal()
    if (!supportOpen && el.open) el.close()
  }, [supportOpen])

  const openSupport = () => {
    setMessage('')
    setStep('idle')
    setSupportError(null)
    setSupportOpen(true)
  }

  const closeSupport = () => {
    setSupportOpen(false)
  }

  const onSubmitSupport = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = message.trim()
    if (!trimmed) {
      setSupportError('Descreva brevemente o que precisa.')
      return
    }
    if (trimmed.length < 10) {
      setSupportError('Use pelo menos 10 caracteres para descrever o problema.')
      return
    }
    setSupportError(null)
    setStep('sending')
    window.setTimeout(() => {
      const fail = Math.random() < 0.05
      if (fail) {
        setStep('error')
        setSupportError('Falha ao enviar. Verifique sua conexão e tente novamente.')
        return
      }
      setStep('success')
    }, 1600)
  }

  const session = getPatientSession()

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col gap-6 sm:gap-8">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-ms-primary sm:text-2xl">Central de Suporte</h1>
        <p className="mt-1 text-sm text-ms-secondary">Recursos e informações para o uso seguro do MindSpeak.</p>
      </div>

      <section className={msCardPad}>
        <h2 className="text-lg font-semibold text-ms-primary">Precisa de ajuda?</h2>
        <p className="mt-2 text-sm leading-relaxed text-ms-secondary">
          Envie uma solicitação à equipe clínica. Resposta em até 24h (demonstração).
        </p>
        <Button type="button" variant="primary" className="mt-6" icon={<Send className="h-4 w-4" aria-hidden />} onClick={openSupport}>
          Enviar solicitação de suporte
        </Button>
      </section>

      <section className={msCardPad}>
        <h2 className="text-lg font-semibold text-ms-primary">FAQ</h2>
        <div className="mt-4 divide-y divide-ms-border-subtle">
          {FAQ.map((item) => (
            <details key={item.q} className="group py-3">
              <summary className="cursor-pointer list-none text-sm font-semibold text-ms-primary marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-2">
                  {item.q}
                  <ChevronDown
                    className="h-4 w-4 shrink-0 text-ms-muted transition-transform duration-200 group-open:rotate-180"
                    aria-hidden
                  />
                </span>
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-ms-secondary">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={msCardPad}>
        <h2 className="text-lg font-semibold text-ms-primary">Informações do dispositivo</h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between gap-4 border-b border-ms-border-subtle pb-3">
            <dt className="text-ms-muted">Paciente</dt>
            <dd className="text-right font-medium text-ms-primary">{session?.patientName ?? '—'}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-ms-border-subtle pb-3">
            <dt className="text-ms-muted">Sensor</dt>
            <dd className="text-right font-medium text-ms-primary">TGAM NeuroSky</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-ms-border-subtle pb-3">
            <dt className="text-ms-muted">Conexão</dt>
            <dd className="text-right font-medium text-ms-primary">
              {sensorConnected ? 'Bluetooth · conectado' : 'Bluetooth · desconectado'}
            </dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-ms-border-subtle pb-3">
            <dt className="text-ms-muted">Versão do firmware</dt>
            <dd className="text-right font-medium text-ms-primary">1.0.0</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ms-muted">Último sync</dt>
            <dd className="text-right font-medium text-ms-primary">{formatLastSync()}</dd>
          </div>
        </dl>
      </section>

      <dialog
        ref={dialogRef}
        className="ms-modal-panel max-h-[min(90dvh,28rem)] w-full overflow-y-auto backdrop:bg-black/50"
        onClose={closeSupport}
        onCancel={closeSupport}
        aria-labelledby="support-dialog-title"
      >
        {step === 'success' ? (
          <div className="text-center">
            <h2 id="support-dialog-title" className="text-lg font-semibold text-ms-primary">
              Solicitação enviada
            </h2>
            <p className="mt-3 text-sm text-ms-secondary">
              Sua mensagem foi registrada. A equipe clínica entrará em contato em breve.
            </p>
            <Button type="button" variant="primary" fullWidth className="mt-6" onClick={closeSupport}>
              Fechar
            </Button>
          </div>
        ) : (
          <>
            <h2 id="support-dialog-title" className="text-lg font-semibold text-ms-primary">
              Solicitação de suporte
            </h2>
            <p className="mt-2 text-sm text-ms-secondary">Descreva o que está acontecendo.</p>
            <form className="mt-5 space-y-4" onSubmit={onSubmitSupport} noValidate>
              <div>
                <label htmlFor="support-message" className={msLabel}>
                  Mensagem
                </label>
                <textarea
                  id="support-message"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value)
                    if (supportError) setSupportError(null)
                  }}
                  rows={4}
                  disabled={step === 'sending'}
                  className={cn(msInputBase, msInputBorder, 'mt-2 resize-y')}
                  placeholder="Ex.: O sensor não conecta após reiniciar o tablet…"
                />
                {supportError ? (
                  <p className="mt-1.5 text-xs text-red-600" role="alert">
                    {supportError}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button type="submit" variant="primary" fullWidth isLoading={step === 'sending'} icon={<Send className="h-4 w-4" aria-hidden />}>
                  {step === 'sending' ? 'Enviando…' : 'Enviar'}
                </Button>
                <Button type="button" variant="secondary" fullWidth disabled={step === 'sending'} onClick={closeSupport}>
                  Cancelar
                </Button>
              </div>
            </form>
          </>
        )}
      </dialog>
    </div>
  )
}
