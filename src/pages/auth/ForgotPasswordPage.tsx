import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Mail } from 'lucide-react'
import { FamilyAuthShell } from '../../components/layout/FamilyAuthShell'
import { AuthAlert, AuthButton, AuthCard, AuthInput } from '../../components/ui/family-auth'

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

  if (step === 'success') {
    return (
      <FamilyAuthShell maxWidth="md">
        <AuthCard className="p-6 text-center sm:p-8">
          <CheckCircle2 className="mx-auto h-14 w-14 text-[var(--fa-link)]" aria-hidden />
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-[var(--fa-text)]">E-mail enviado!</h1>
          <p className="mt-3 text-sm leading-relaxed text-[var(--fa-text-muted)]">
            Verifique sua caixa de entrada em{' '}
            <span className="font-semibold text-[var(--fa-text)]">{sentTo}</span>. Se não encontrar, verifique a pasta
            de spam.
          </p>
          <AuthAlert variant="info" className="mt-6 text-left">
            O link de recuperação expira em 24 horas por segurança.
          </AuthAlert>
          <AuthButton type="button" className="mt-8" onClick={() => nav('/familiar/login')}>
            Voltar para o login
          </AuthButton>
          <button
            type="button"
            onClick={resetFlow}
            className="mt-4 min-h-11 text-sm font-semibold text-[var(--fa-link)] underline-offset-4 transition-colors hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fa-link)]"
          >
            Não recebeu? Enviar novamente
          </button>
        </AuthCard>
      </FamilyAuthShell>
    )
  }

  return (
    <FamilyAuthShell maxWidth="md">
      <div className="mb-8 sm:mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--fa-text)] sm:text-3xl">Recuperar senha</h1>
        <p className="mt-2 text-sm text-[var(--fa-text-muted)] sm:text-base">
          Insira seu e-mail cadastrado e enviaremos um link para redefinir sua senha.
        </p>
      </div>

      <AuthCard as="form" onSubmit={onSubmit} className="p-6 sm:p-8" noValidate>
        <AuthInput
          id="fp-email"
          name="email"
          type="email"
          label="E-mail"
          autoComplete="email"
          placeholder="nome@exemplo.com"
          icon={<Mail className="h-4 w-4" aria-hidden />}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (error) setError(null)
          }}
          disabled={step === 'sending'}
          error={error ?? undefined}
        />

        <AuthButton type="submit" isLoading={step === 'sending'} className="mt-8">
          {step === 'sending' ? 'Enviando…' : 'Enviar link de recuperação'}
        </AuthButton>

        <div className="mt-6 flex justify-center">
          <Link
            to="/familiar/login"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[var(--fa-text-muted)] transition-colors hover:text-[var(--fa-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fa-link)]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Voltar para o login
          </Link>
        </div>
      </AuthCard>
    </FamilyAuthShell>
  )
}
