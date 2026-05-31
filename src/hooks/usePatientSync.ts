import { useCallback, useEffect, useState } from 'react'
import { getPatientSession, patchPatientSession, PATIENT_SESSION_CHANGED_EVENT } from '../lib/patientSession'

export type SyncStatus = 'idle' | 'syncing' | 'success' | 'error'

export function usePatientSync() {
  const [status, setStatus] = useState<SyncStatus>('idle')
  const [lastSyncAt, setLastSyncAt] = useState<string | null>(() => getPatientSession()?.lastSyncAt ?? null)
  const [sensorConnected, setSensorConnected] = useState(() => getPatientSession()?.sensorConnected ?? false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const refresh = useCallback(() => {
    const s = getPatientSession()
    setLastSyncAt(s?.lastSyncAt ?? null)
    setSensorConnected(s?.sensorConnected ?? false)
  }, [])

  useEffect(() => {
    refresh()
    const onChange = () => refresh()
    window.addEventListener(PATIENT_SESSION_CHANGED_EVENT, onChange)
    return () => window.removeEventListener(PATIENT_SESSION_CHANGED_EVENT, onChange)
  }, [refresh])

  const sync = useCallback(async () => {
    if (!getPatientSession()) {
      setErrorMessage('Sessão não encontrada. Faça login novamente.')
      setStatus('error')
      return
    }
    if (status === 'syncing') return

    setStatus('syncing')
    setErrorMessage(null)

    await new Promise((r) => window.setTimeout(r, 1400))

    const fail = Math.random() < 0.08
    if (fail) {
      setStatus('error')
      setErrorMessage('Não foi possível conectar ao sensor. Verifique o Bluetooth e tente novamente.')
      patchPatientSession({ sensorConnected: false })
      return
    }

    const now = new Date().toISOString()
    patchPatientSession({ lastSyncAt: now, sensorConnected: true })
    setStatus('success')
    window.setTimeout(() => setStatus((s) => (s === 'success' ? 'idle' : s)), 2500)
  }, [status])

  const formatLastSync = useCallback(() => {
    if (!lastSyncAt) return '—'
    try {
      return new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short',
      }).format(new Date(lastSyncAt))
    } catch {
      return '—'
    }
  }, [lastSyncAt])

  return {
    status,
    errorMessage,
    lastSyncAt,
    sensorConnected,
    sync,
    formatLastSync,
    isSyncing: status === 'syncing',
  }
}
