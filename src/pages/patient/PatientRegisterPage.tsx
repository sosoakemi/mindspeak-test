import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Calendar, CheckCircle2, Mail, Phone, User } from 'lucide-react'
import { cn } from '../../lib/cn'
import { Button, LinkButton } from '../../components/shared/Button'
import { ThemeToggle } from '../../components/shared/ThemeToggle'

const LOGO_SRC = '/logos/logoOficial-6dcbc4e8-0a72-4fd4-be0a-ca6942282816.png'

export function PatientRegisterPage() {
  const [fullName, setFullName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [errors, setErrors] = useState<{
    fullName?: string
    birthDate?: string
    contactPhone?: string
    contactEmail?: string
  }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const next: typeof errors = {}
    if (!fullName.trim()) next.fullName = 'Informe o nome completo.'
    if (!birthDate) next.birthDate = 'Informe a data de nascimento.'
    if (!contactPhone.trim()) next.contactPhone = 'Informe o telefone do responsável.'
    const em = contactEmail.trim()
    if (em && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) next.contactEmail = 'E-mail inválido.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsLoading(true)
    window.setTimeout(() => {
      setIsLoading(false)
      setSuccess(true)
    }, 900)
  }

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-x-hidden bg-gradient-to-b from-slate-100 to-ms-surface px-3 py-10 dark:from-[#030712] dark:to-ms-page sm:px-4 sm:py-12">
      <div className="absolute right-3 top-3 z-10 sm:right-4 sm:top-4">
        <ThemeToggle />
      </div>
      <div className="w-full min-w-0 max-w-md">
        <div className="mb-10 flex flex-col items-center text-center">
          <img
            src={LOGO_SRC}
            alt="MindSpeak"
            className="h-20 w-auto max-w-[220px] object-contain md:h-24"
            width={220}
            height={88}
            decoding="async"
          />
          <p className="mt-4 text-sm font-medium text-ms-secondary">Cadastro de Novo Paciente</p>
        </div>

        {!success ? (
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-ms-border/90 bg-ms-surface p-8 shadow-md shadow-slate-200/50"
            noValidate
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="reg-fullname" className="mb-1.5 block text-sm font-medium text-ms-secondary">
                  Nome completo
                </label>
                <div className="relative">
                  <User
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ms-muted"
                    aria-hidden
                  />
                  <input
                    id="reg-fullname"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={cn(
                      'w-full rounded-xl border bg-ms-subtle py-3 pl-10 pr-3 text-sm text-ms-primary outline-none ring-green-600/30 placeholder:text-ms-muted focus:bg-ms-surface focus:ring-2',
                      errors.fullName ? 'border-red-300' : 'border-ms-border',
                    )}
                    placeholder="Nome do paciente"
                  />
                </div>
                {errors.fullName ? <p className="mt-1.5 text-xs text-red-600">{errors.fullName}</p> : null}
              </div>

              <div>
                <label htmlFor="reg-birth" className="mb-1.5 block text-sm font-medium text-ms-secondary">
                  Data de nascimento
                </label>
                <div className="relative">
                  <Calendar
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ms-muted"
                    aria-hidden
                  />
                  <input
                    id="reg-birth"
                    name="birthDate"
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className={cn(
                      'w-full rounded-xl border bg-ms-subtle py-3 pl-10 pr-3 text-sm text-ms-primary outline-none ring-green-600/30 focus:bg-ms-surface focus:ring-2',
                      errors.birthDate ? 'border-red-300' : 'border-ms-border',
                    )}
                  />
                </div>
                {errors.birthDate ? <p className="mt-1.5 text-xs text-red-600">{errors.birthDate}</p> : null}
              </div>

              <div>
                <label htmlFor="reg-phone" className="mb-1.5 block text-sm font-medium text-ms-secondary">
                  Responsável / Contato
                </label>
                <div className="relative">
                  <Phone
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ms-muted"
                    aria-hidden
                  />
                  <input
                    id="reg-phone"
                    name="contactPhone"
                    type="tel"
                    autoComplete="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className={cn(
                      'w-full rounded-xl border bg-ms-subtle py-3 pl-10 pr-3 text-sm text-ms-primary outline-none ring-green-600/30 placeholder:text-ms-muted focus:bg-ms-surface focus:ring-2',
                      errors.contactPhone ? 'border-red-300' : 'border-ms-border',
                    )}
                    placeholder="Telefone com DDD"
                  />
                </div>
                {errors.contactPhone ? <p className="mt-1.5 text-xs text-red-600">{errors.contactPhone}</p> : null}
              </div>

              <div>
                <label htmlFor="reg-email" className="mb-1.5 block text-sm font-medium text-ms-secondary">
                  E-mail do responsável <span className="font-normal text-ms-muted">(opcional)</span>
                </label>
                <div className="relative">
                  <Mail
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ms-muted"
                    aria-hidden
                  />
                  <input
                    id="reg-email"
                    name="contactEmail"
                    type="email"
                    autoComplete="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className={cn(
                      'w-full rounded-xl border bg-ms-subtle py-3 pl-10 pr-3 text-sm text-ms-primary outline-none ring-green-600/30 placeholder:text-ms-muted focus:bg-ms-surface focus:ring-2',
                      errors.contactEmail ? 'border-red-300' : 'border-ms-border',
                    )}
                    placeholder="nome@email.com"
                  />
                </div>
                {errors.contactEmail ? <p className="mt-1.5 text-xs text-red-600">{errors.contactEmail}</p> : null}
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              className="mt-8 bg-green-600 hover:bg-green-700"
              disabled={isLoading}
              isLoading={isLoading}
            >
              Solicitar Cadastro
            </Button>

            <p className="mt-6 text-center text-sm text-ms-secondary">
              Já tem acesso?{' '}
              <Link
                to="/patient/login"
                className="font-semibold text-green-700 underline-offset-2 hover:text-green-800 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
              >
                Fazer login
              </Link>
            </p>
          </form>
        ) : (
          <div className="rounded-2xl border border-ms-border/90 bg-ms-surface p-8 text-center shadow-md shadow-slate-200/50">
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-600" aria-hidden />
            <h1 className="mt-6 text-2xl font-semibold tracking-tight text-ms-primary">Solicitação enviada!</h1>
            <p className="mt-3 text-sm leading-relaxed text-ms-secondary">
              Seu profissional de saúde irá criar seu acesso. Você receberá seu ID e código de acesso em breve.
            </p>
            <LinkButton to="/patient/login" variant="primary" fullWidth className="mt-8 bg-green-600 hover:bg-green-700">
              Voltar para o login
            </LinkButton>
          </div>
        )}

        <p className="mt-8 text-center">
          <LinkButton to="/" variant="ghost" size="sm" icon={<ArrowLeft className="h-4 w-4" aria-hidden />}>
            Voltar para a página inicial
          </LinkButton>
        </p>
      </div>
    </div>
  )
}
