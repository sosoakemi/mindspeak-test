import { useState, type FormEvent } from 'react'
import { RotateCcw, Save, UserPlus } from 'lucide-react'
import { Button } from '../../components/shared/Button'
import { assignCaregiver, BackendApiError } from '../../lib/backendApi'

function AssignCaregiverCard() {
  const [patientId, setPatientId] = useState('')
  const [caregiverUserId, setCaregiverUserId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const patientIdNum = Number(patientId)
    const caregiverIdNum = Number(caregiverUserId)
    if (!patientIdNum || !caregiverIdNum) {
      setMessage({ kind: 'error', text: 'Informe os dois IDs (números).' })
      return
    }
    setIsLoading(true)
    setMessage(null)
    try {
      const caregiver = await assignCaregiver(patientIdNum, caregiverIdNum)
      setMessage({ kind: 'ok', text: `${caregiver.full_name} vinculado(a) ao paciente #${patientIdNum}.` })
      setPatientId('')
      setCaregiverUserId('')
    } catch (err) {
      const text =
        err instanceof BackendApiError
          ? err.message
          : 'Não foi possível vincular agora. Tente novamente.'
      setMessage({ kind: 'error', text })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-2xl border border-ms-border bg-ms-surface p-6 shadow-sm"
    >
      <div>
        <h2 className="text-sm font-semibold text-ms-primary">Vincular cuidador a um paciente</h2>
        <p className="mt-1 text-xs text-ms-muted">
          Concede acesso ao histórico do paciente para um familiar/cuidador já cadastrado. Só
          funciona pra pacientes da sua organização. Ainda não há busca por nome — use os IDs
          numéricos por enquanto.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="patientId" className="block text-sm font-medium text-ms-primary">
            ID do paciente
          </label>
          <input
            id="patientId"
            type="number"
            min={1}
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="mt-2 w-full rounded-xl border border-ms-border bg-ms-subtle px-3 py-2 text-sm outline-none ring-green-600/20 focus:bg-ms-surface focus:ring-2"
          />
        </div>
        <div>
          <label htmlFor="caregiverUserId" className="block text-sm font-medium text-ms-primary">
            ID do cuidador
          </label>
          <input
            id="caregiverUserId"
            type="number"
            min={1}
            value={caregiverUserId}
            onChange={(e) => setCaregiverUserId(e.target.value)}
            className="mt-2 w-full rounded-xl border border-ms-border bg-ms-subtle px-3 py-2 text-sm outline-none ring-green-600/20 focus:bg-ms-surface focus:ring-2"
          />
        </div>
      </div>
      <Button type="submit" variant="primary" isLoading={isLoading} icon={<UserPlus className="h-4 w-4" aria-hidden />}>
        Vincular
      </Button>
      {message ? (
        <p
          role="status"
          className={message.kind === 'ok' ? 'text-sm font-medium text-green-700' : 'text-sm font-medium text-red-600'}
        >
          {message.text}
        </p>
      ) : null}
    </form>
  )
}

export function SettingsPage() {
  const [saved, setSaved] = useState(false)

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-emerald-950">Configurações</h1>
        <p className="mt-1 text-sm text-ms-secondary">
          Vínculo de cuidador é real (fala com o backend). Os parâmetros de protocolo abaixo ainda
          são um mock estático.
        </p>
      </div>

      <AssignCaregiverCard />

      <form
        className="space-y-6 rounded-2xl border border-ms-border bg-ms-surface p-6 shadow-sm"
        onSubmit={(e) => {
          e.preventDefault()
          setSaved(true)
          window.setTimeout(() => setSaved(false), 2000)
        }}
      >
        <div>
          <label htmlFor="threshold" className="block text-sm font-medium text-ms-primary">
            Limiar de atenção (%)
          </label>
          <p className="mt-1 text-xs text-ms-muted">Alinhado à interface do paciente (75% padrão clínico).</p>
          <input
            id="threshold"
            name="threshold"
            type="range"
            min={50}
            max={95}
            defaultValue={75}
            className="mt-4 w-full accent-green-700"
          />
          <div className="mt-2 flex justify-between text-xs font-medium text-ms-muted">
            <span>50%</span>
            <span>75%</span>
            <span>95%</span>
          </div>
        </div>

        <div>
          <label htmlFor="dwell" className="block text-sm font-medium text-ms-primary">
            Tempo de confirmação (s)
          </label>
          <input
            id="dwell"
            name="dwell"
            type="number"
            min={1}
            max={4}
            step={0.1}
            defaultValue={1.5}
            className="mt-2 w-full rounded-xl border border-ms-border bg-ms-subtle px-3 py-2 text-sm outline-none ring-green-600/20 focus:bg-ms-surface focus:ring-2"
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-ms-primary">
            Notas da equipe
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            className="mt-2 w-full rounded-xl border border-ms-border bg-ms-subtle px-3 py-2 text-sm outline-none ring-green-600/20 focus:bg-ms-surface focus:ring-2"
            placeholder="Registrar observações clínicas…"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button type="submit" variant="primary" icon={<Save className="h-4 w-4" aria-hidden />}>
            Salvar
          </Button>
          <Button type="reset" variant="secondary" icon={<RotateCcw className="h-4 w-4" aria-hidden />}>
            Restaurar padrões
          </Button>
        </div>
        {saved ? <p className="text-sm font-medium text-green-700">Preferências salvas (mock).</p> : null}
      </form>
    </div>
  )
}
