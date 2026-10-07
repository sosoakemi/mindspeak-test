import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { KeyRound, UserPlus } from 'lucide-react'
import { Button } from '../../components/shared/Button'
import {
  assignCaregiver,
  BackendApiError,
  getDecisionConfig,
  listPatientCaregivers,
  resetCaregiverPassword,
  type BackendUser,
  type CaregiverPasswordReset,
  type DecisionConfig,
} from '../../lib/backendApi'
import { useDashboard } from './dashboard-context'

function AssignCaregiverCard() {
  const [patientId, setPatientId] = useState('')
  const [caregiverEmail, setCaregiverEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const patientIdNum = Number(patientId)
    const email = caregiverEmail.trim()
    if (!patientIdNum || !email) {
      setMessage({ kind: 'error', text: 'Informe o ID do paciente e o e-mail do cuidador.' })
      return
    }
    setIsLoading(true)
    setMessage(null)
    try {
      const caregiver = await assignCaregiver(patientIdNum, email)
      setMessage({ kind: 'ok', text: `${caregiver.full_name} vinculado(a) ao paciente #${patientIdNum}.` })
      setPatientId('')
      setCaregiverEmail('')
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
          Concede acesso ao histórico do paciente para um familiar/cuidador que já se cadastrou em
          "Portal Familiar". Só funciona pra pacientes da sua organização — peça o e-mail que a
          pessoa usou no cadastro.
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
          <label htmlFor="caregiverEmail" className="block text-sm font-medium text-ms-primary">
            E-mail do cuidador
          </label>
          <input
            id="caregiverEmail"
            type="email"
            value={caregiverEmail}
            onChange={(e) => setCaregiverEmail(e.target.value)}
            placeholder="familiar@exemplo.com"
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

// Não existe recuperação de senha por e-mail: o backend não tem
// infraestrutura de envio. Sem esta tela, um familiar que esquecesse a
// senha simplesmente ficava de fora do portal, sem caminho de volta — e
// a tela de "Esqueci minha senha" manda procurar a equipe clínica, o que
// só é verdade se a equipe tiver como resolver. É esta tela.
function CaregiverAccessCard() {
  const { selectedPatient } = useDashboard()
  const [caregivers, setCaregivers] = useState<BackendUser[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [busyId, setBusyId] = useState<number | null>(null)
  const [reset, setReset] = useState<CaregiverPasswordReset | null>(null)

  const patientId = selectedPatient?.id ?? null

  const carregar = useCallback(() => {
    if (patientId === null) {
      setCaregivers([])
      return
    }
    setLoading(true)
    setError(null)
    listPatientCaregivers(patientId)
      .then(setCaregivers)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Falha ao carregar os familiares.')
      })
      .finally(() => setLoading(false))
  }, [patientId])

  useEffect(() => {
    setReset(null)
    carregar()
  }, [carregar])

  const redefinir = async (caregiver: BackendUser) => {
    if (patientId === null) return
    setBusyId(caregiver.id)
    setError(null)
    setReset(null)
    try {
      setReset(await resetCaregiverPassword(patientId, caregiver.id))
    } catch (err) {
      setError(
        err instanceof BackendApiError ? err.message : 'Não foi possível redefinir a senha.',
      )
    } finally {
      setBusyId(null)
    }
  }

  return (
    <section className="space-y-4 rounded-2xl border border-ms-border bg-ms-surface p-6 shadow-sm">
      <div>
        <h2 className="text-sm font-semibold text-ms-primary">Acesso do familiar</h2>
        <p className="mt-1 text-xs leading-relaxed text-ms-muted">
          Quem tem acesso ao portal de{' '}
          <strong className="text-ms-secondary">
            {selectedPatient?.display_name ?? 'nenhum paciente selecionado'}
          </strong>
          . Não há recuperação de senha por e-mail, então é aqui que se restabelece o acesso de
          quem esqueceu a senha.
        </p>
      </div>

      {error ? (
        <p
          className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800 dark:bg-red-950/40 dark:text-red-200"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      {reset ? (
        <div className="rounded-xl bg-amber-50 p-4 ring-1 ring-amber-200 dark:bg-amber-950/40 dark:ring-amber-900">
          <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
            Senha provisória de {reset.full_name}
          </p>
          <p className="mt-2 select-all rounded-lg bg-white px-3 py-2 font-mono text-base font-bold tracking-wide text-amber-950 dark:bg-amber-950 dark:text-amber-100">
            {reset.temporary_password}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-amber-900 dark:text-amber-200">
            Anote agora: ela aparece uma única vez e não pode ser consultada depois. Entregue à
            pessoa pelo canal que você já usa com a família.
          </p>
        </div>
      ) : null}

      {loading ? (
        <p className="text-sm text-ms-secondary">Carregando familiares…</p>
      ) : caregivers.length === 0 ? (
        <p className="text-sm text-ms-secondary">
          Nenhum familiar vinculado ainda. Use o formulário abaixo para dar acesso.
        </p>
      ) : (
        <ul className="divide-y divide-ms-border-subtle">
          {caregivers.map((caregiver) => (
            <li key={caregiver.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ms-primary">{caregiver.full_name}</p>
                <p className="truncate text-xs text-ms-muted">{caregiver.email}</p>
              </div>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                disabled={busyId !== null}
                isLoading={busyId === caregiver.id}
                icon={<KeyRound className="h-4 w-4" aria-hidden />}
                onClick={() => void redefinir(caregiver)}
              >
                Redefinir senha
              </Button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

// Os parâmetros do motor são GLOBAIS: vêm do .env do servidor, não do
// banco, e valem para todos os pacientes ao mesmo tempo. Vários foram
// calibrados empiricamente com o sensor físico (os comentários em
// app/core/config.py contam a história de cada um). Por isso a tela
// mostra o que está em vigor em vez de oferecer sliders que não teriam
// onde gravar — era o que ela fazia antes, anunciando "Preferências
// salvas (mock)" depois de não salvar nada.
const PARAMETER_LABELS: { key: keyof DecisionConfig; label: string; hint: string; unit?: string }[] = [
  {
    key: 'scan_interval_seconds',
    label: 'Intervalo da varredura',
    hint: 'Quanto tempo cada palavra fica destacada.',
    unit: 's',
  },
  {
    key: 'sustained_focus_windows',
    label: 'Janelas de foco sustentado',
    hint: 'Leituras seguidas acima do limiar para contar como foco.',
  },
  {
    key: 'focus_probability_threshold',
    label: 'Limiar de probabilidade de foco',
    hint: 'Confiança mínima do modelo para a janela valer como foco.',
  },
  {
    key: 'confirmation_detections',
    label: 'Detecções para confirmar',
    hint: 'Quantos gatilhos seguidos selecionam a palavra.',
  },
  {
    key: 'selection_cooldown_seconds',
    label: 'Pausa após seleção',
    hint: 'Impede uma segunda seleção disparar logo na sequência.',
    unit: 's',
  },
  {
    key: 'highlight_settle_seconds',
    label: 'Acomodação após troca de destaque',
    hint: 'Dá tempo do foco na palavra anterior dissipar.',
    unit: 's',
  },
  {
    key: 'uncertain_margin',
    label: 'Margem de incerteza',
    hint: 'Faixa em torno do limiar tratada como sinal duvidoso.',
  },
  {
    key: 'poor_signal_threshold',
    label: 'Limite de sinal ruim',
    hint: 'Acima disso o motor pausa em vez de decidir.',
  },
  {
    key: 'strong_blink_threshold',
    label: 'Piscada forte',
    hint: 'Intensidade que conta como clique intencional.',
  },
  {
    key: 'blink_contamination_threshold',
    label: 'Piscada que contamina',
    hint: 'A partir daqui a janela é descartada do cálculo de foco.',
  },
  {
    key: 'focus_smoothing_alpha',
    label: 'Suavização do foco',
    hint: 'Peso da leitura nova na média móvel do eSense.',
  },
]

export function SettingsPage() {
  const [config, setConfig] = useState<DecisionConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    getDecisionConfig()
      .then((value) => {
        if (!cancelled) setConfig(value)
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Falha ao ler a configuração do motor.')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-emerald-950 dark:text-emerald-100">
          Configurações
        </h1>
        <p className="mt-1 text-sm text-ms-secondary">
          Acesso dos familiares e parâmetros do motor de decisão.
        </p>
      </div>

      <CaregiverAccessCard />

      <AssignCaregiverCard />

      <section className="space-y-4 rounded-2xl border border-ms-border bg-ms-surface p-6 shadow-sm">
        <div>
          <h2 className="text-sm font-semibold text-ms-primary">Motor de decisão</h2>
          <p className="mt-1 text-xs leading-relaxed text-ms-muted">
            Valores em vigor no servidor. São globais — valem para todos os pacientes — e mudam
            pelo arquivo de ambiente do backend, não por aqui. Vários foram calibrados com o sensor
            físico; alterar sem testar de novo quebra a seleção.
          </p>
          <p className="mt-2 text-xs leading-relaxed text-ms-muted">
            O limiar de foco de cada paciente não está nesta lista: ele sai da calibração
            individual, na tela de Pacientes.
          </p>
        </div>

        {error ? (
          <p
            className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800 dark:bg-red-950/40 dark:text-red-200"
            role="alert"
          >
            {error}
          </p>
        ) : loading ? (
          <p className="py-4 text-sm text-ms-secondary">Carregando parâmetros…</p>
        ) : config ? (
          <dl className="divide-y divide-ms-border-subtle">
            {PARAMETER_LABELS.map(({ key, label, hint, unit }) => (
              <div key={key} className="flex items-start justify-between gap-4 py-3">
                <div className="min-w-0">
                  <dt className="text-sm font-medium text-ms-primary">{label}</dt>
                  <dd className="mt-0.5 text-xs text-ms-muted">{hint}</dd>
                </div>
                <span className="shrink-0 rounded-lg bg-ms-subtle px-3 py-1 text-sm font-semibold tabular-nums text-ms-primary">
                  {config[key]}
                  {unit ?? ''}
                </span>
              </div>
            ))}
          </dl>
        ) : null}
      </section>
    </div>
  )
}
