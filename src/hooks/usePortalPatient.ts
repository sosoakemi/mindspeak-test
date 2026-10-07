import { useEffect, useState } from 'react'
import { listPatients, type BackendPatient } from '../lib/backendApi'

// O portal familiar guarda na sessão o id do USUÁRIO logado, que não é o
// id do paciente — são tabelas diferentes no backend. Para saber de quem
// mostrar os dados é preciso perguntar: GET /patients devolve, para um
// cuidador, só os pacientes atribuídos a ele.
//
// Quando há mais de um, o hook fica com o primeiro. Um seletor aqui só
// faz sentido quando o produto decidir como o familiar alterna entre
// pessoas; até lá, escolher sozinho e em silêncio seria pior.
export function usePortalPatient() {
  const [patient, setPatient] = useState<BackendPatient | null>(null)
  const [patients, setPatients] = useState<BackendPatient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    listPatients()
      .then((list) => {
        if (cancelled) return
        setPatients(list)
        setPatient(list[0] ?? null)
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

  return { patient, patients, loading, error }
}
