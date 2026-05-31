import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Eye, EyeOff, Hash, Key } from 'lucide-react'
import { cn } from '../../lib/cn'
import { Button, LinkButton } from '../../components/shared/Button'
import { getPatientSession, savePatientSession } from '../../lib/patientSession'

const LOGO_SRC = '/logos/logoOficial-6dcbc4e8-0a72-4fd4-be0a-ca6942282816.png'

export function PatientLoginPage() {
  const nav = useNavigate()
  const [patientId, setPatientId] = useState('')
  const [accessCode, setAccessCode] = useState('')
  const [showCode, setShowCode] = useState(false)
  const [errors, setErrors] = useState<{ patientId?: string; accessCode?: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (getPatientSession()) {
      nav('/patient/dashboard', { replace: true })
    }
  }, [nav])

  const validate = () => {
    const next: typeof errors = {}
    if (!patientId.trim()) next.patientId = 'Informe o ID do paciente.'
    if (!accessCode.trim()) next.accessCode = 'Informe o código de acesso.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsLoading(true)
    window.setTimeout(() => {
      savePatientSession({
        patientId: patientId.trim(),
        patientName: 'Paciente',
        connectedAt: new Date().toISOString(),
      })
      setIsLoading(false)
      nav('/patient/dashboard', { replace: true })
    }, 600)
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
          <p className="mt-4 text-sm font-medium text-slate-600">Acesso do Paciente</p>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-slate-200/90 bg-white p-8 shadow-md shadow-slate-200/50"
          noValidate
        >
          <div className="space-y-5">
            <div>
              <label htmlFor="patient-id" className="mb-1.5 block text-sm font-medium text-slate-700">
                ID do Paciente
              </label>
              <div className="relative">
                <Hash
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden
                />
                <input
                  id="patient-id"
                  name="patientId"
                  type="text"
                  autoComplete="username"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  className={cn(
                    'w-full rounded-xl border bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-900 outline-none ring-green-600/30 placeholder:text-slate-400 focus:bg-white focus:ring-2',
                    errors.patientId ? 'border-red-300' : 'border-slate-200',
                  )}
                  placeholder="Ex: #9821-BCI"
                />
              </div>
              {errors.patientId ? <p className="mt-1.5 text-xs text-red-600">{errors.patientId}</p> : null}
            </div>

            <div>
              <label htmlFor="patient-code" className="mb-1.5 block text-sm font-medium text-slate-700">
                Código de acesso
              </label>
              <div className="relative">
                <Key
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden
                />
                <input
                  id="patient-code"
                  name="accessCode"
                  type={showCode ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className={cn(
                    'w-full rounded-xl border bg-slate-50 py-3 pl-10 pr-12 text-sm text-slate-900 outline-none ring-green-600/30 placeholder:text-slate-400 focus:bg-white focus:ring-2',
                    errors.accessCode ? 'border-red-300' : 'border-slate-200',
                  )}
                  placeholder="Código fornecido pelo profissional"
                />
                <button
                  type="button"
                  onClick={() => setShowCode((v) => !v)}
                  className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  aria-label={showCode ? 'Ocultar código' : 'Mostrar código'}
                >
                  {showCode ? <EyeOff className="h-4 w-4" aria-hidden /> : <Eye className="h-4 w-4" aria-hidden />}
                </button>
              </div>
              {errors.accessCode ? <p className="mt-1.5 text-xs text-red-600">{errors.accessCode}</p> : null}
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
            {isLoading ? 'Conectando…' : 'Acessar Interface'}
          </Button>

          <p className="mt-6 text-center text-sm text-slate-500">Não tem código? Fale com seu profissional de saúde</p>

          <p className="mt-4 text-center text-sm text-slate-600">
            Primeiro acesso?{' '}
            <Link
              to="/patient/register"
              className="font-semibold text-green-700 underline-offset-2 hover:text-green-800 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
            >
              Cadastrar-se
            </Link>
          </p>
        </form>

        <p className="mt-8 text-center">
          <LinkButton to="/" variant="ghost" size="sm" icon={<ArrowLeft className="h-4 w-4" aria-hidden />}>
            Voltar para a página inicial
          </LinkButton>
        </p>
      </div>
    </div>
  )
}
