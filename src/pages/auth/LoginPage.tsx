import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, Mail } from 'lucide-react'
import { FamilyAuthShell } from '../../components/layout/FamilyAuthShell'
import { savePatientSession } from '../../lib/patientSession'
import { saveAuthSession } from '../../lib/authSession'
import { BackendApiError, login } from '../../lib/backendApi'
import { AuthButton, AuthCard, AuthInput, FamilyAuthHero } from '../../components/ui/family-auth'

export function LoginPage() {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const validate = () => {
    const next: typeof errors = {}
    const trimmed = email.trim()
    if (!trimmed) next.email = 'Informe o e-mail.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) next.email = 'E-mail inválido.'
    if (!password) next.password = 'Informe a senha.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsLoading(true)
    try {
      const response = await login({ email: email.trim(), password })
      if (response.user.role !== 'caregiver') {
        setErrors({ form: 'Esta conta não é de familiar/cuidador. Use o portal clínico.' })
        return
      }
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
      savePatientSession({
        patientId: String(response.user.id),
        patientName: response.user.full_name,
        connectedAt: new Date().toISOString(),
      })
      nav('/patient/dashboard', { replace: true })
    } catch (err) {
      if (err instanceof BackendApiError && err.status === 401) {
        setErrors({ form: 'E-mail ou senha inválidos.' })
      } else {
        setErrors({ form: 'Não foi possível entrar agora. Tente novamente.' })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <FamilyAuthShell layout="split" hero={<FamilyAuthHero variant="login" />}>
      <div className="mb-8 sm:mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--fa-text)] sm:text-3xl">Portal Familiar</h1>
        <p className="mt-2 text-sm text-[var(--fa-text-muted)] sm:text-base">
          Entre com suas credenciais autorizadas
        </p>
      </div>

      <AuthCard as="form" onSubmit={onSubmit} className="p-6 sm:p-8" noValidate>
        <div className="space-y-5">
          {errors.form ? (
            <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {errors.form}
            </p>
          ) : null}
          <AuthInput
            label="E-mail"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nome@exemplo.com"
            icon={<Mail className="h-4 w-4" aria-hidden />}
            error={errors.email}
          />

          <AuthInput
            label="Senha"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            icon={<Lock className="h-4 w-4" aria-hidden />}
            error={errors.password}
            labelAction={
              <Link
                to="/familiar/forgot-password"
                className="text-xs font-semibold text-[var(--fa-link)] underline-offset-2 hover:text-[var(--fa-link-hover)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fa-link)]"
              >
                Esqueci minha senha
              </Link>
            }
          />
        </div>

        <AuthButton type="submit" isLoading={isLoading} className="mt-8">
          Próximo passo
        </AuthButton>

        <p className="mt-6 text-center text-sm text-[var(--fa-text-muted)]">
          Não possui acesso?{' '}
          <Link
            to="/familiar/cadastro"
            className="font-bold text-[var(--fa-text)] underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fa-link)]"
          >
            Criar conta
          </Link>
        </p>
      </AuthCard>
    </FamilyAuthShell>
  )
}
