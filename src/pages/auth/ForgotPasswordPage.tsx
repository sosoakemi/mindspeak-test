import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Mail } from 'lucide-react'
import { cn } from '../../lib/cn'
import { Button, LinkButton } from '../../components/shared/Button'
import { MindSpeakLogo } from '../../components/brand/MindSpeakLogo'
import { AuthPageShell } from '../../components/layout/AuthPageShell'
import { msCard, msInputBase, msInputBorder, msInputError, msLabel } from '../../lib/msStyles'

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
    <AuthPageShell>
      <div className="mb-10 flex flex-col items-center text-center">
        <MindSpeakLogo layout="horizontal" size="lg" />
      </div>

      <div className={cn(msCard, 'p-6 sm:p-8')}>
        {step !== 'success' ? (
          <>
            <h1 className="text-2xl font-semibold tracking-tight text-ms-primary">Recuperar senha</h1>
            <p className="mt-2 text-sm leading-relaxed text-ms-secondary">
              Insira seu e-mail cadastrado e enviaremos um link para redefinir sua senha.
            </p>

            <form className="mt-8 space-y-5" onSubmit={onSubmit} noValidate>
              <div>
                <label htmlFor="fp-email" className={msLabel}>
                  E-mail
                </label>
                <div className="relative">
                  <Mail
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ms-muted"
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
                      msInputBase,
                      'pl-10 pr-3 disabled:opacity-60',
                      error ? msInputError : msInputBorder,
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
            <h1 className="mt-6 text-2xl font-semibold tracking-tight text-ms-primary">E-mail enviado!</h1>
            <p className="mt-3 text-sm leading-relaxed text-ms-secondary">
              Verifique sua caixa de entrada em <span className="font-semibold text-ms-primary">{sentTo}</span>. Se
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
    </AuthPageShell>
  )
}
