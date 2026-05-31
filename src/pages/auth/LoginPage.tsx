import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { Button, LinkButton } from '../../components/shared/Button'
import { MindSpeakLogo } from '../../components/brand/MindSpeakLogo'
import { AuthPageShell } from '../../components/layout/AuthPageShell'
import { msCard, msInputBase, msInputBorder, msInputError, msLabel } from '../../lib/msStyles'

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
    <AuthPageShell>
      <div className="mb-10 flex flex-col items-center text-center">
        <MindSpeakLogo layout="horizontal" size="lg" />
        <p className="mt-3 text-sm text-ms-secondary">Acesso da equipe clínica</p>
      </div>

      <form onSubmit={onSubmit} className={cn(msCard, 'p-6 sm:p-8')} noValidate>
        <div className="space-y-5">
          <div>
            <label htmlFor="email" className={msLabel}>
              E-mail
            </label>
            <div className="relative">
              <Mail
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ms-muted"
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
                  msInputBase,
                  'pl-10 pr-3',
                  errors.email ? msInputError : msInputBorder,
                )}
                placeholder="nome@hospital.org"
              />
            </div>
            {errors.email ? <p className="mt-1.5 text-xs text-red-600">{errors.email}</p> : null}
          </div>

          <div>
            <label htmlFor="password" className={msLabel}>
              Senha
            </label>
            <div className="relative">
              <Lock
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ms-muted"
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
                  msInputBase,
                  'pl-10 pr-3',
                  errors.password ? msInputError : msInputBorder,
                )}
                placeholder="••••••••"
              />
            </div>
            {errors.password ? <p className="mt-1.5 text-xs text-red-600">{errors.password}</p> : null}
          </div>
        </div>

        <Button type="submit" variant="primary" fullWidth className="mt-8">
          Entrar
        </Button>

        <div className="mt-6 flex flex-col items-center gap-2 text-center">
          <LinkButton to="/forgot-password" variant="ghost" size="sm">
            Esqueci minha senha
          </LinkButton>
          <p className="text-sm text-ms-secondary">
            Primeiro acesso?{' '}
            <Link
              to="/cadastro"
              className="font-semibold text-green-700 underline-offset-2 hover:text-green-800 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 dark:text-green-400 dark:hover:text-green-300"
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
    </AuthPageShell>
  )
}
