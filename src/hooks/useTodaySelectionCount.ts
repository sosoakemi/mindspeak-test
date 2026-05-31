import { useCallback, useEffect, useState } from 'react'
import { getTodaySelectionCount, PATIENT_STATS_CHANGED_EVENT } from '../lib/patientStats'

export function useTodaySelectionCount() {
  const [count, setCount] = useState(() => getTodaySelectionCount())

  const refresh = useCallback(() => setCount(getTodaySelectionCount()), [])

  useEffect(() => {
    refresh()
    window.addEventListener(PATIENT_STATS_CHANGED_EVENT, refresh)
    return () => window.removeEventListener(PATIENT_STATS_CHANGED_EVENT, refresh)
  }, [refresh])

  return count
}
