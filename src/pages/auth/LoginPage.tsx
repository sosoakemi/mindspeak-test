import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { Button, LinkButton } from '../../components/shared/Button'
import { MindSpeakLogo } from '../../components/brand/MindSpeakLogo'

export function LoginPage() {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const validate = () => {
    const next: typeof errors = {}
    const trimmed = email.trim()
    if (!trimmed) next.email = 'Informe o e-mail.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) next.email = 'E-mail inválido.'
    if (!password) next.password = 'Informe a senha.'
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
          <p className="mt-3 text-sm text-slate-600">Acesso da equipe clínica</p>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm"
          noValidate
        >
          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                E-mail
              </label>
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden
                />
                <input
                  id="email"
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
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">
                Senha
              </label>
              <div className="relative">
                <Lock
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn(
                    'w-full rounded-xl border bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-900 outline-none ring-green-600/30 placeholder:text-slate-400 focus:bg-white focus:ring-2',
                    errors.password ? 'border-red-300' : 'border-slate-200',
                  )}
                  placeholder="••••••••"
                />
              </div>
              {errors.password ? (
                <p className="mt-1.5 text-xs text-red-600">{errors.password}</p>
              ) : null}
            </div>
          </div>

          <Button type="submit" variant="primary" fullWidth className="mt-8">
            Entrar
          </Button>

          <div className="mt-6 flex flex-col items-center gap-2 text-center">
            <LinkButton to="/forgot-password" variant="ghost" size="sm">
              Esqueci minha senha
            </LinkButton>
            <p className="text-sm text-slate-600">
              Primeiro acesso?{' '}
              <Link
                to="/cadastro"
                className="font-semibold text-green-700 underline-offset-2 hover:text-green-800 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
              >
                Criar conta
              </Link>
            </p>
          </div>
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
