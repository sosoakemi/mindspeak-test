import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { listPatients, type BackendPatient } from '../../lib/backendApi'

// O portal familiar guarda na sessão o id do USUÁRIO logado, que não é o
// id do paciente — são tabelas diferentes no backend. Para saber de quem
// mostrar os dados é preciso perguntar: GET /patients devolve, para um
// cuidador, só os pacientes atribuídos a ele.
//
// Um cuidador pode responder por mais de uma pessoa (um filho e um pai,
// por exemplo). Antes a tela pegava o primeiro da lista em silêncio, o
// que mostraria o histórico da pessoa errada sem nenhum aviso. Agora a
// escolha é explícita e fica lembrada entre visitas.
const SELECTED_KEY = 'mindspeak_portal_patient'

function readStored(): number | null {
  try {
    const raw = localStorage.getItem(SELECTED_KEY)
    if (!raw) return null
    const parsed = Number(raw)
    return Number.isInteger(parsed) ? parsed : null
  } catch {
    return null
  }
}

function store(id: number | null) {
  try {
    if (id === null) localStorage.removeItem(SELECTED_KEY)
    else localStorage.setItem(SELECTED_KEY, String(id))
  } catch {
    // modo privado / cota cheia: a escolha só não sobrevive ao reload.
  }
}

type Ctx = {
  patient: BackendPatient | null
  patients: BackendPatient[]
  selectPatient: (id: number) => void
  loading: boolean
  error: string | null
}

const PortalPatientCtx = createContext<Ctx | null>(null)

export function PortalPatientProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<BackendPatient[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(() => readStored())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    listPatients()
      .then((list) => {
        if (cancelled) return
        setPatients(list)
        // Escolha salva que não está mais na lista (vínculo removido) cai
        // no primeiro, em vez de deixar a tela vazia sem explicação.
        setSelectedId((current) => {
          if (current !== null && list.some((p) => p.id === current)) return current
          return list[0]?.id ?? null
        })
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Falha ao identificar o paciente.')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    store(selectedId)
  }, [selectedId])

  const patient = useMemo(
    () => patients.find((p) => p.id === selectedId) ?? null,
    [patients, selectedId],
  )

  const value = useMemo<Ctx>(
    () => ({ patient, patients, selectPatient: setSelectedId, loading, error }),
    [patient, patients, loading, error],
  )

  return <PortalPatientCtx.Provider value={value}>{children}</PortalPatientCtx.Provider>
}

export function usePortalPatient() {
  const value = useContext(PortalPatientCtx)
  if (!value) throw new Error('usePortalPatient precisa estar dentro de PortalPatientProvider')
  return value
}
