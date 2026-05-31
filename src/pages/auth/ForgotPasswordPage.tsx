import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Mail } from 'lucide-react'
import { cn } from '../../lib/cn'
import { Button, LinkButton } from '../../components/shared/Button'
import { MindSpeakLogo } from '../../components/brand/MindSpeakLogo'

type Step = 'form' | 'sending' | 'success'

export function ForgotPasswordPage() {
  const nav = useNavigate()
  const [step, setStep] = useState<Step>('form')
  const [email, setEmail] = useState('')
  const [sentTo, setSentTo] = useState('')
  const [error, setError] = useState<string | null>(null)

  const validateEmail = (value: string) => {
    const t = value.trim()
    if (!t) {
      setError('Informe o e-mail.')
      return false
    }
    if (!t.includes('@')) {
      setError('E-mail deve conter @.')
      return false
    }
    setError(null)
    return true
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validateEmail(email)) return
    setStep('sending')
    window.setTimeout(() => {
      setSentTo(email.trim())
      setStep('success')
    }, 2000)
  }

  const resetFlow = () => {
    setStep('form')
    setError(null)
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#f4f6f8] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-10 flex flex-col items-center text-center">
          <MindSpeakLogo layout="horizontal" size="lg" />
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm">
          {step !== 'success' ? (
            <>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Recuperar senha</h1>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Insira seu e-mail cadastrado e enviaremos um link para redefinir sua senha.
              </p>

              <form className="mt-8 space-y-5" onSubmit={onSubmit} noValidate>
                <div>
                  <label htmlFor="fp-email" className="mb-1.5 block text-sm font-medium text-slate-700">
                    E-mail
                  </label>
                  <div className="relative">
                    <Mail
                      className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                      aria-hidden
                    />
                    <input
                      id="fp-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (error) setError(null)
                      }}
                      disabled={step === 'sending'}
                      className={cn(
                        'w-full rounded-xl border bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-900 outline-none ring-green-600/30 placeholder:text-slate-400 focus:bg-white focus:ring-2 disabled:opacity-60',
                        error ? 'border-red-300' : 'border-slate-200',
                      )}
                      placeholder="nome@hospital.org"
                    />
                  </div>
                  {error ? <p className="mt-1.5 text-xs text-red-600">{error}</p> : null}
                </div>

                <Button type="submit" variant="primary" fullWidth isLoading={step === 'sending'}>
                  {step === 'sending' ? 'Enviando…' : 'Enviar link de recuperação'}
                </Button>
              </form>

              <div className="mt-6 flex justify-center">
                <LinkButton
                  to="/login"
                  variant="ghost"
                  size="sm"
                  icon={<ArrowLeft className="h-4 w-4" aria-hidden />}
                >
                  Voltar para o login
                </LinkButton>
              </div>
            </>
          ) : (
            <div className="text-center">
              <CheckCircle2 className="mx-auto h-16 w-16 text-green-600" aria-hidden />
              <h1 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900">E-mail enviado!</h1>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Verifique sua caixa de entrada em <span className="font-semibold text-slate-800">{sentTo}</span>. Se
                não encontrar, verifique a pasta de spam.
              </p>
              <Button type="button" variant="primary" fullWidth className="mt-8" onClick={() => nav('/login')}>
                Voltar para o login
              </Button>
              <div className="mt-4 flex justify-center">
                <Button type="button" variant="ghost" size="sm" onClick={resetFlow}>
                  Não recebeu? Enviar novamente
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
