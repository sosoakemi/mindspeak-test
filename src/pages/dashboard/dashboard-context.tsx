import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  acknowledgeAlerts,
  listPatientAlerts,
  listPatients,
  type BackendPatient,
  type PatientAlert,
} from '../../lib/backendApi'

// As telas clínicas falam sempre de UM paciente, mas até agora não havia
// essa noção em lugar nenhum: cada tela mostrava um paciente fictício
// fixo. O paciente escolhido vive aqui e é lembrado entre visitas, pra
// quem acompanha a mesma pessoa não ter que reescolher a cada acesso.
const SELECTED_PATIENT_KEY = 'mindspeak_dashboard_patient'

function readStoredPatientId(): number | null {
  try {
    const raw = localStorage.getItem(SELECTED_PATIENT_KEY)
    if (!raw) return null
    const parsed = Number(raw)
    return Number.isInteger(parsed) ? parsed : null
  } catch {
    return null
  }
}

function storePatientId(id: number | null) {
  try {
    if (id === null) localStorage.removeItem(SELECTED_PATIENT_KEY)
    else localStorage.setItem(SELECTED_PATIENT_KEY, String(id))
  } catch {
    // modo privado / cota cheia: a escolha só não sobrevive ao reload.
  }
}

type Ctx = {
  patients: BackendPatient[]
  selectedPatient: BackendPatient | null
  selectPatient: (id: number) => void
  patientsLoading: boolean
  patientsError: string | null

  alerts: PatientAlert[]
  unreadCount: number
  alertsLoading: boolean
  alertsError: string | null
  markRead: (selectionId: number) => Promise<void>
  markAllRead: () => Promise<void>
  reloadAlerts: () => void
}

const DashboardCtx = createContext<Ctx | null>(null)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<BackendPatient[]>([])
  const [patientsLoading, setPatientsLoading] = useState(true)
  const [patientsError, setPatientsError] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<number | null>(() => readStoredPatientId())

  const [alerts, setAlerts] = useState<PatientAlert[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [alertsLoading, setAlertsLoading] = useState(false)
  const [alertsError, setAlertsError] = useState<string | null>(null)
  const [alertsNonce, setAlertsNonce] = useState(0)

  useEffect(() => {
    let cancelled = false
    listPatients()
      .then((list) => {
        if (cancelled) return
        setPatients(list)
        // Sem escolha salva (ou apontando pra um paciente que saiu da
        // lista), cai no primeiro em vez de deixar a tela vazia.
        setSelectedId((current) => {
          if (current !== null && list.some((p) => p.id === current)) return current
          return list[0]?.id ?? null
        })
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setPatientsError(error instanceof Error ? error.message : 'Falha ao carregar pacientes.')
        }
      })
      .finally(() => {
        if (!cancelled) setPatientsLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    storePatientId(selectedId)
  }, [selectedId])

  useEffect(() => {
    if (selectedId === null) {
      setAlerts([])
      setUnreadCount(0)
      return
    }
    let cancelled = false
    setAlertsLoading(true)
    setAlertsError(null)
    listPatientAlerts(selectedId, { limit: 100 })
      .then((page) => {
        if (cancelled) return
        setAlerts(page.items)
        setUnreadCount(page.unacknowledged_count)
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setAlertsError(error instanceof Error ? error.message : 'Falha ao carregar alertas.')
        }
      })
      .finally(() => {
        if (!cancelled) setAlertsLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [selectedId, alertsNonce])

  const reloadAlerts = useCallback(() => setAlertsNonce((n) => n + 1), [])

  const markRead = useCallback(
    async (selectionId: number) => {
      if (selectedId === null) return
      await acknowledgeAlerts(selectedId, { selectionIds: [selectionId] })
      reloadAlerts()
    },
    [selectedId, reloadAlerts],
  )

  const markAllRead = useCallback(async () => {
    if (selectedId === null) return
    await acknowledgeAlerts(selectedId, { all: true })
    reloadAlerts()
  }, [selectedId, reloadAlerts])

  const selectedPatient = useMemo(
    () => patients.find((p) => p.id === selectedId) ?? null,
    [patients, selectedId],
  )

  const value = useMemo<Ctx>(
    () => ({
      patients,
      selectedPatient,
      selectPatient: setSelectedId,
      patientsLoading,
      patientsError,
      alerts,
      unreadCount,
      alertsLoading,
      alertsError,
      markRead,
      markAllRead,
      reloadAlerts,
    }),
    [
      patients,
      selectedPatient,
      patientsLoading,
      patientsError,
      alerts,
      unreadCount,
      alertsLoading,
      alertsError,
      markRead,
      markAllRead,
      reloadAlerts,
    ],
  )

  return <DashboardCtx.Provider value={value}>{children}</DashboardCtx.Provider>
}

export function useDashboard() {
  const value = useContext(DashboardCtx)
  if (!value) throw new Error('useDashboard precisa estar dentro de DashboardProvider')
  return value
}
