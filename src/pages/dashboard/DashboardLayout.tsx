import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  Activity,
  Bell,
  History,
  LayoutDashboard,
  LogOut,
  MessageSquareText,
  Settings,
} from 'lucide-react'
import { cn } from '../../lib/cn'
import { mockProfessional } from '../../data/mockDashboard'
import { DashboardAlertsProvider, useDashboardAlerts } from './alerts-context'
import { Button } from '../../components/shared/Button'
import { MindSpeakLogo } from '../../components/brand/MindSpeakLogo'

const nav = [
  { to: '/dashboard', label: 'Visão Geral', end: true, icon: LayoutDashboard },
  { to: '/dashboard/monitor', label: 'Monitoramento', icon: Activity },
  { to: '/dashboard/history', label: 'Histórico', icon: History },
  { to: '/dashboard/phrases', label: 'Frases', icon: MessageSquareText },
  { to: '/dashboard/alerts', label: 'Alertas', icon: Bell },
  { to: '/dashboard/settings', label: 'Configurações', icon: Settings },
]

function UnreadAlertsBadge() {
  const { unreadCount } = useDashboardAlerts()
  if (!unreadCount) return null
  return (
    <span className="rounded-full bg-red-600 px-2 py-0.5 text-[11px] font-bold text-white tabular-nums">
      {unreadCount > 9 ? '9+' : unreadCount}
    </span>
  )
}

function DashboardShell() {
  const navFn = useNavigate()

  return (
    <div className="flex min-h-dvh bg-[#f4f6f8] text-slate-900">
      <aside className="flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
        <div className="border-b border-slate-100 p-5">
          <MindSpeakLogo layout="horizontal" size="sm" className="justify-start" />
          <p className="mt-2 text-[11px] text-slate-500">Interface clínica</p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Principal">
          {nav.map(({ to, label, end, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                  isActive
                    ? 'bg-emerald-50 text-emerald-950 ring-1 ring-emerald-100'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
                )
              }
            >
              <Icon className="h-5 w-5 shrink-0 opacity-80" aria-hidden />
              <span className="flex-1">{label}</span>
              {to === '/dashboard/alerts' ? <UnreadAlertsBadge /> : null}
            </NavLink>
          ))}
        </nav>
        <div className="space-y-2 border-t border-slate-100 p-4">
          <Button type="button" variant="primary" fullWidth onClick={() => navFn('/dashboard/monitor')}>
            Nova sessão
          </Button>
          <Button
            type="button"
            variant="ghost"
            fullWidth
            icon={<LogOut className="h-4 w-4" aria-hidden />}
            onClick={() => navFn('/login')}
          >
            Sair
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-8 py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Profissional logado</p>
            <p className="text-sm font-semibold text-slate-900">{mockProfessional.name}</p>
          </div>
          <Button
            type="button"
            variant="secondary"
            size="md"
            icon={<LogOut className="h-4 w-4" aria-hidden />}
            onClick={() => navFn('/login')}
          >
            Sair
          </Button>
        </header>
        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export function DashboardLayout() {
  return (
    <DashboardAlertsProvider>
      <DashboardShell />
    </DashboardAlertsProvider>
  )
}
