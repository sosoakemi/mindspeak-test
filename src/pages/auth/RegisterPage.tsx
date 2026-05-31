import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Building2, Lock, Mail, User } from 'lucide-react'
import { cn } from '../../lib/cn'
import { Button, LinkButton } from '../../components/shared/Button'
import { MindSpeakLogo } from '../../components/brand/MindSpeakLogo'

export function RegisterPage() {
  const nav = useNavigate()
  const [name, setName] = useState('')
  const [organization, setOrganization] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{
    name?: string
    organization?: string
    email?: string
    password?: string
  }>({})

  const validate = () => {
    const next: typeof errors = {}
    if (!name.trim()) next.name = 'Informe seu nome.'
    if (!organization.trim()) next.organization = 'Informe a instituição.'
    const trimmed = email.trim()
    if (!trimmed) next.email = 'Informe o e-mail.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) next.email = 'E-mail inválido.'
    if (!password) next.password = 'Defina uma senha.'
    else if (password.length < 8) next.password = 'Use pelo menos 8 caracteres.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    nav('/dashboard', { replace: true })
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#f4f6f8] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-10 flex flex-col items-center text-center">
          <MindSpeakLogo layout="horizontal" size="lg" />
          <p className="mt-3 text-sm text-slate-600">Cadastro da equipe clínica (demonstração)</p>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm"
          noValidate
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="reg-name" className="mb-1.5 block text-sm font-medium text-slate-700">
                Nome completo
              </label>
              <div className="relative">
                <User
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden
                />
                <input
                  id="reg-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={cn(
                    'w-full rounded-xl border bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-900 outline-none ring-green-600/30 placeholder:text-slate-400 focus:bg-white focus:ring-2',
                    errors.name ? 'border-red-300' : 'border-slate-200',
                  )}
                  placeholder="Dr(a). Nome"
                />
              </div>
              {errors.name ? <p className="mt-1.5 text-xs text-red-600">{errors.name}</p> : null}
            </div>

            <div>
              <label htmlFor="reg-org" className="mb-1.5 block text-sm font-medium text-slate-700">
                Instituição
              </label>
              <div className="relative">
                <Building2
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden
                />
                <input
                  id="reg-org"
                  name="organization"
                  type="text"
                  autoComplete="organization"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className={cn(
                    'w-full rounded-xl border bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-900 outline-none ring-green-600/30 placeholder:text-slate-400 focus:bg-white focus:ring-2',
                    errors.organization ? 'border-red-300' : 'border-slate-200',
                  )}
                  placeholder="Hospital ou clínica"
                />
              </div>
              {errors.organization ? (
                <p className="mt-1.5 text-xs text-red-600">{errors.organization}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="reg-email" className="mb-1.5 block text-sm font-medium text-slate-700">
                E-mail profissional
              </label>
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden
                />
                <input
                  id="reg-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn(
                    'w-full rounded-xl border bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-900 outline-none ring-green-600/30 placeholder:text-slate-400 focus:bg-white focus:ring-2',
                    errors.email ? 'border-red-300' : 'border-slate-200',
                  )}
                  placeholder="nome@hospital.org"
                />
              </div>
              {errors.email ? <p className="mt-1.5 text-xs text-red-600">{errors.email}</p> : null}
            </div>

            <div>
              <label htmlFor="reg-password" className="mb-1.5 block text-sm font-medium text-slate-700">
                Senha
              </label>
              <div className="relative">
                <Lock
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden
                />
                <input
                  id="reg-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn(
                    'w-full rounded-xl border bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-900 outline-none ring-green-600/30 placeholder:text-slate-400 focus:bg-white focus:ring-2',
                    errors.password ? 'border-red-300' : 'border-slate-200',
                  )}
                  placeholder="Mínimo 8 caracteres"
                />
              </div>
              {errors.password ? <p className="mt-1.5 text-xs text-red-600">{errors.password}</p> : null}
            </div>
          </div>

          <Button type="submit" variant="primary" fullWidth className="mt-8">
            Criar conta
          </Button>

          <p className="mt-6 text-center text-sm text-slate-600">
            Já tem conta?{' '}
            <Link
              to="/login"
              className="font-semibold text-green-700 underline-offset-2 hover:text-green-800 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
            >
              Entrar
            </Link>
          </p>
        </form>

        <p className="mt-8 text-center">
          <LinkButton to="/" variant="ghost" size="sm">
            Voltar ao início
          </LinkButton>
        </p>
      </div>
    </div>
  )
}
