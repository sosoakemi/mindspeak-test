import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Calendar, CheckCircle2, Mail, Phone, User } from 'lucide-react'
import { cn } from '../../lib/cn'
import { Button, LinkButton } from '../../components/shared/Button'

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
    <div className="flex min-h-dvh items-center justify-center bg-gradient-to-b from-slate-100 to-white px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-10 flex flex-col items-center text-center">
          <img
            src={LOGO_SRC}
            alt="MindSpeak"
            className="h-20 w-auto max-w-[220px] object-contain md:h-24"
            width={220}
            height={88}
            decoding="async"
          />
          <p className="mt-4 text-sm font-medium text-slate-600">Cadastro de Novo Paciente</p>
        </div>

        {!success ? (
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-slate-200/90 bg-white p-8 shadow-md shadow-slate-200/50"
            noValidate
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="reg-fullname" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Nome completo
                </label>
                <div className="relative">
                  <User
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
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
                      'w-full rounded-xl border bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-900 outline-none ring-green-600/30 placeholder:text-slate-400 focus:bg-white focus:ring-2',
                      errors.fullName ? 'border-red-300' : 'border-slate-200',
                    )}
                    placeholder="Nome do paciente"
                  />
                </div>
                {errors.fullName ? <p className="mt-1.5 text-xs text-red-600">{errors.fullName}</p> : null}
              </div>

              <div>
                <label htmlFor="reg-birth" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Data de nascimento
                </label>
                <div className="relative">
                  <Calendar
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                    aria-hidden
                  />
                  <input
                    id="reg-birth"
                    name="birthDate"
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className={cn(
                      'w-full rounded-xl border bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-900 outline-none ring-green-600/30 focus:bg-white focus:ring-2',
                      errors.birthDate ? 'border-red-300' : 'border-slate-200',
                    )}
                  />
                </div>
                {errors.birthDate ? <p className="mt-1.5 text-xs text-red-600">{errors.birthDate}</p> : null}
              </div>

              <div>
                <label htmlFor="reg-phone" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Responsável / Contato
                </label>
                <div className="relative">
                  <Phone
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
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
                      'w-full rounded-xl border bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-900 outline-none ring-green-600/30 placeholder:text-slate-400 focus:bg-white focus:ring-2',
                      errors.contactPhone ? 'border-red-300' : 'border-slate-200',
                    )}
                    placeholder="Telefone com DDD"
                  />
                </div>
                {errors.contactPhone ? <p className="mt-1.5 text-xs text-red-600">{errors.contactPhone}</p> : null}
              </div>

              <div>
                <label htmlFor="reg-email" className="mb-1.5 block text-sm font-medium text-slate-700">
                  E-mail do responsável <span className="font-normal text-slate-500">(opcional)</span>
                </label>
                <div className="relative">
                  <Mail
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
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
                      'w-full rounded-xl border bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-900 outline-none ring-green-600/30 placeholder:text-slate-400 focus:bg-white focus:ring-2',
                      errors.contactEmail ? 'border-red-300' : 'border-slate-200',
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

            <p className="mt-6 text-center text-sm text-slate-600">
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
          <div className="rounded-2xl border border-slate-200/90 bg-white p-8 text-center shadow-md shadow-slate-200/50">
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-600" aria-hidden />
            <h1 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900">Solicitação enviada!</h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
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
