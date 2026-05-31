import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { mockAlerts } from '../../data/mockDashboard'

export type DashboardAlert = {
  id: string
  time: string
  phrase: string
  read: boolean
}

type Ctx = {
  alerts: DashboardAlert[]
  markRead: (id: string) => void
  markAllRead: () => void
  unreadCount: number
}

const AlertsCtx = createContext<Ctx | null>(null)

export function DashboardAlertsProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<DashboardAlert[]>(() =>
    mockAlerts.map((a) => ({ ...a, read: a.read })),
  )

  const markRead = (id: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, read: true } : a)))
  }

  const markAllRead = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })))
  }

  const unreadCount = useMemo(() => alerts.filter((a) => !a.read).length, [alerts])

  return (
    <AlertsCtx.Provider value={{ alerts, markRead, markAllRead, unreadCount }}>{children}</AlertsCtx.Provider>
  )
}

export function useDashboardAlerts() {
  const v = useContext(AlertsCtx)
  if (!v) throw new Error('useDashboardAlerts must be used within DashboardAlertsProvider')
  return v
}
