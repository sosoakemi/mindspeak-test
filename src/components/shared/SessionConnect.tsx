import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Radio } from 'lucide-react'
import { Button } from './Button'
import { getSessionByExternalId, BackendApiError } from '../../lib/backendApi'
import { setActiveSessionId } from '../../lib/activeSession'

type SessionConnectProps = {
  /** Rota (com ?session=) pra onde ir depois de confirmar a sessão. */
  redirectTo: (sessionId: string) => string
  title?: string
  description?: string
  placeholder?: string
}

/**
 * Conecta este navegador a uma sessão ao vivo pelo id externo (o mesmo que
 * o simulador/sensor usa em --session-id). Confirma que a sessão existe e
 * que o usuário logado tem acesso a ela antes de navegar — o backend já
 * nega quem não tem permissão (organização errada, cuidador não vinculado).
 */
export function SessionConnect({
  redirectTo,
  title = 'Conectar a uma sessão',
  description = 'Informe o identificador da sessão ativa (ex.: sess-demo-001).',
  placeholder = 'sess-demo-001',
}: SessionConnectProps) {
  const nav = useNavigate()
  const [sessionId, setSessionId] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const trimmed = sessionId.trim()
    if (!trimmed) {
      setError('Informe o identificador da sessão.')
      return
    }
    setIsLoading(true)
    setError(null)
    try {
      await getSessionByExternalId(trimmed)
      setActiveSessionId(trimmed)
      nav(redirectTo(trimmed))
    } catch (err) {
      if (err instanceof BackendApiError && (err.status === 404 || err.status === 403)) {
        setError('Sessão não encontrada, ou você não tem acesso a ela.')
      } else {
        setError('Não foi possível conectar agora. Tente novamente.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-ms-border bg-ms-surface p-6 shadow-sm">
      <h2 className="text-sm font-semibold text-ms-primary">{title}</h2>
      <p className="mt-1 text-xs leading-relaxed text-ms-muted">{description}</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
          placeholder={placeholder}
          aria-label="Identificador da sessão"
          className="min-h-[44px] flex-1 rounded-lg border border-ms-border bg-ms-surface px-3 text-sm text-ms-primary placeholder:text-ms-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
        />
        <Button type="submit" variant="primary" isLoading={isLoading} icon={<Radio className="h-4 w-4" aria-hidden />}>
          Conectar
        </Button>
      </div>
      {error ? (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </form>
  )
}
