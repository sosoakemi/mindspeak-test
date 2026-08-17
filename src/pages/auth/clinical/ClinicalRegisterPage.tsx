import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Building2, Lock, Mail, ShieldCheck, User } from 'lucide-react'
import { FamilyAuthShell } from '../../../components/layout/FamilyAuthShell'
import { saveAuthSession } from '../../../lib/authSession'
import { BackendApiError, registerClinician } from '../../../lib/backendApi'
import {
  AuthButton,
  AuthCard,
  AuthCheckbox,
  AuthInput,
  AuthProgress,
  FamilyAuthHero,
  PasswordStrength,
} from '../../../components/ui/family-auth'

type Step = 1 | 2

export function ClinicalRegisterPage() {
  const nav = useNavigate()
  const [step, setStep] = useState<Step>(1)
  const [name, setName] = useState('')
  const [organization, setOrganization] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{
    name?: string
    organization?: string
    email?: string
    password?: string
    confirmPassword?: string
    terms?: string
    form?: string
  }>({})

  const validateStep1 = () => {
    const next: typeof errors = {}
    if (!name.trim()) next.name = 'Informe seu nome.'
    if (!organization.trim()) next.organization = 'Informe a instituição.'
    const trimmed = email.trim()
    if (!trimmed) next.email = 'Informe o e-mail.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) next.email = 'E-mail inválido.'
    if (!password) next.password = 'Defina uma senha.'
    else if (password.length < 8) next.password = 'Use pelo menos 8 caracteres.'
    if (!confirmPassword) next.confirmPassword = 'Confirme a senha.'
    else if (password !== confirmPassword) next.confirmPassword = 'As senhas não coincidem.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const validateStep2 = () => {
    const next: typeof errors = {}
    if (!acceptedTerms) next.terms = 'Aceite os termos para continuar.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      if (!validateStep1()) return
      setErrors({})
      setStep(2)
      return
    }
    if (!validateStep2()) return
    setIsLoading(true)
    try {
      const response = await registerClinician({
        full_name: name.trim(),
        email: email.trim(),
        password,
        organization_name: organization.trim(),
      })
      saveAuthSession({
        accessToken: response.access_token,
        user: {
          id: response.user.id,
          email: response.user.email,
          fullName: response.user.full_name,
          role: response.user.role,
          organizationId: response.user.organization_id,
        },
      })
      nav('/dashboard', { replace: true })
    } catch (err) {
      const message =
        err instanceof BackendApiError && err.status === 409
          ? 'Este e-mail já tem cadastro.'
          : 'Não foi possível concluir o cadastro agora. Tente novamente.'
      setErrors({ form: message })
      setStep(1)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <FamilyAuthShell layout="split" hero={<FamilyAuthHero variant="register" />} maxWidth="xl">
      <div className="mb-8 text-center lg:mb-10 lg:hidden">
        <span className="inline-flex rounded-[var(--fa-radius-pill)] bg-[var(--fa-badge-bg)] px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--fa-badge-text)]">
          Acesso profissional
        </span>
        <h1 className="mt-5 text-2xl font-bold tracking-tight text-[var(--fa-text)] sm:text-3xl">
          Interface clínica MindSpeak
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[var(--fa-text-muted)] sm:text-base">
          Cadastre sua equipe para monitorar pacientes e acompanhar sessões BCI com segurança.
        </p>
      </div>

      <AuthCard as="form" onSubmit={onSubmit} className="overflow-hidden" noValidate>
        <div className="border-b border-[var(--fa-border)]/60 p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-[var(--fa-text)] sm:text-xl">Cadastro Clínico</h2>
              <p className="mt-1 text-sm text-[var(--fa-text-muted)]">Etapa {step} de 2</p>
            </div>
            <AuthProgress current={step} total={2} />
          </div>

          {errors.form ? (
            <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {errors.form}
            </p>
          ) : null}

          {step === 1 ? (
            <div className="mt-8 space-y-5">
              <AuthInput
                label="Nome completo"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Dr(a). Maria Silva"
                icon={<User className="h-4 w-4" aria-hidden />}
                error={errors.name}
              />
              <AuthInput
                label="Instituição"
                name="organization"
                type="text"
                autoComplete="organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="Hospital ou clínica"
                icon={<Building2 className="h-4 w-4" aria-hidden />}
                error={errors.organization}
              />
              <AuthInput
                label="E-mail profissional"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nome@hospital.org"
                icon={<Mail className="h-4 w-4" aria-hidden />}
                error={errors.email}
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <AuthInput
                    label="Senha"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    icon={<Lock className="h-4 w-4" aria-hidden />}
                    error={errors.password}
                  />
                  <PasswordStrength password={password} />
                </div>
                <AuthInput
                  label="Confirmar"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repita a senha"
                  icon={<Lock className="h-4 w-4" aria-hidden />}
                  error={errors.confirmPassword}
                />
              </div>
            </div>
          ) : (
            <div className="mt-8 space-y-6">
              <p className="text-sm leading-relaxed text-[var(--fa-text-muted)]">
                Para concluir seu cadastro clínico, confirme que leu e aceita nossos termos de uso e política de
                privacidade.
              </p>
              <AuthCheckbox
                name="terms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                error={errors.terms}
                label={
                  <>
                    Li e aceito os{' '}
                    <Link to="/" className="font-semibold text-[var(--fa-link)] underline-offset-2 hover:underline">
                      Termos de Uso
                    </Link>{' '}
                    e a{' '}
                    <Link to="/" className="font-semibold text-[var(--fa-link)] underline-offset-2 hover:underline">
                      Política de Privacidade
                    </Link>
                    .
                  </>
                }
              />
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {step === 2 ? (
              <AuthButton
                type="button"
                variant="secondary"
                fullWidth={false}
                className="sm:min-w-[140px]"
                onClick={() => setStep(1)}
              >
                Voltar
              </AuthButton>
            ) : null}
            <AuthButton type="submit" isLoading={isLoading} className="sm:flex-1">
              {step === 1 ? 'Próximo passo' : 'Criar conta'}
            </AuthButton>
          </div>

          <p className="mt-6 text-center text-sm text-[var(--fa-text-muted)]">
            Já tem conta?{' '}
            <Link
              to="/clinico/login"
              className="font-bold text-[var(--fa-link)] underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fa-link)]"
            >
              Fazer login
            </Link>
          </p>
        </div>

        <div className="flex items-start gap-3 bg-[var(--fa-input-bg)]/50 px-6 py-5 sm:px-8">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--fa-link)]" aria-hidden />
          <div>
            <p className="text-sm font-bold text-[var(--fa-text)]">Protocolo de segurança ativo</p>
            <p className="mt-1 text-xs leading-relaxed text-[var(--fa-text-muted)] sm:text-sm">
              Seus dados são criptografados de ponta a ponta seguindo normas médicas globais.
            </p>
          </div>
        </div>
      </AuthCard>
    </FamilyAuthShell>
  )
}
