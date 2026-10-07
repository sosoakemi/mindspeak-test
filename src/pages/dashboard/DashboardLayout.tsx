import { useEffect } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  Activity,
  Bell,
  History,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareText,
  Settings,
  UserPlus,
  X,
} from 'lucide-react'
import { cn } from '../../lib/cn'
import { DashboardProvider, useDashboard } from './dashboard-context'
import { Button } from '../../components/shared/Button'
import { MindSpeakLogo } from '../../components/brand/MindSpeakLogo'
import { ThemeToggle } from '../../components/shared/ThemeToggle'
import { useMobileSidebar } from '../../hooks/useMobileSidebar'
import { clearAuthSession, getAuthSession } from '../../lib/authSession'
import {
  msNavActive,
  msNavInactive,
  msPage,
  msSidebarAside,
  msMainPad,
  msSidebarClosed,
  msSidebarOpen,
  msSurface,
} from '../../lib/msStyles'

const nav = [
  { to: '/dashboard', label: 'Visão Geral', end: true, icon: LayoutDashboard },
  { to: '/dashboard/patients', label: 'Pacientes', icon: UserPlus },
  { to: '/dashboard/monitor', label: 'Monitoramento', icon: Activity },
  { to: '/dashboard/history', label: 'Histórico', icon: History },
  { to: '/dashboard/phrases', label: 'Frases', icon: MessageSquareText },
  { to: '/dashboard/alerts', label: 'Alertas', icon: Bell },
  { to: '/dashboard/settings', label: 'Configurações', icon: Settings },
]

function UnreadAlertsBadge() {
  const { unreadCount } = useDashboard()
  if (!unreadCount) return null
  return (
    <span className="rounded-full bg-red-600 px-2 py-0.5 text-[11px] font-bold text-white tabular-nums">
      {unreadCount > 9 ? '9+' : unreadCount}
    </span>
  )
}

// Todas as telas de acompanhamento falam de um paciente só; a escolha
// mora no cabeçalho pra ficar visível de qualquer página, em vez de
// repetida (ou pior, implícita) em cada uma.
function PatientPicker() {
  const { patients, selectedPatient, selectPatient, patientsLoading } = useDashboard()

  if (patientsLoading) {
    return <p className="hidden text-xs text-ms-muted sm:block">Carregando pacientes…</p>
  }
  if (patients.length === 0) {
    return (
      <p className="hidden text-xs text-ms-muted sm:block">
        Nenhum paciente cadastrado
      </p>
    )
  }

  return (
    <div className="hidden min-w-0 sm:block">
      <label htmlFor="dashboard-patient" className="text-xs font-medium uppercase tracking-wide text-ms-muted">
        Paciente
      </label>
      <select
        id="dashboard-patient"
        value={selectedPatient?.id ?? ''}
        onChange={(e) => selectPatient(Number(e.target.value))}
        className="block w-full max-w-[14rem] truncate rounded-lg border border-ms-border bg-ms-surface px-2 py-1 text-sm font-semibold text-ms-primary"
      >
        {patients.map((patient) => (
          <option key={patient.id} value={patient.id}>
            {patient.display_name}
          </option>
        ))}
      </select>
    </div>
  )
}

function DashboardShell() {
  const navFn = useNavigate()
  const location = useLocation()
  const { open, close, openSidebar } = useMobileSidebar()
  const session = getAuthSession()

  useEffect(() => {
    if (!getAuthSession()) {
      navFn('/acesso', { replace: true })
    }
  }, [navFn, location.pathname])

  const signOut = () => {
    clearAuthSession()
    navFn('/clinico/login', { replace: true })
  }

  if (!session) {
    return (
      <div className={cn('flex min-h-dvh items-center justify-center', msPage)}>
        <p className="text-sm text-ms-secondary">Carregando…</p>
      </div>
    )
  }

  return (
    <div className={cn('flex min-h-dvh overflow-x-hidden', msPage)}>
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          aria-label="Fechar menu"
          onClick={close}
        />
      ) : null}

      <aside
        className={cn(
          msSidebarAside,
          open ? msSidebarOpen : msSidebarClosed,
        )}
        aria-label="Menu lateral"
      >
        <div className="flex items-center justify-between border-b border-ms-border-subtle p-4 lg:p-5">
          <div className="min-w-0 flex-1">
            <MindSpeakLogo layout="horizontal" size="sm" />
            <p className="mt-2 text-[11px] text-ms-muted">Interface clínica</p>
          </div>
          <button
            type="button"
            className="ml-2 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-ms-secondary hover:bg-ms-subtle lg:hidden"
            onClick={close}
            aria-label="Fechar menu"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3" aria-label="Principal">
          {nav.map(({ to, label, end, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={close}
              className={({ isActive }) =>
                cn(
                  'flex min-h-[44px] items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                  isActive ? msNavActive : msNavInactive,
                )
              }
            >
              <Icon className="h-5 w-5 shrink-0 opacity-80" aria-hidden />
              <span className="flex-1">{label}</span>
              {to === '/dashboard/alerts' ? <UnreadAlertsBadge /> : null}
            </NavLink>
          ))}
        </nav>
        <div className="space-y-2 border-t border-ms-border-subtle p-4">
          <Button type="button" variant="primary" fullWidth onClick={() => navFn('/dashboard/monitor')}>
            Acompanhar sessão
          </Button>
          <Button
            type="button"
            variant="ghost"
            fullWidth
            icon={<LogOut className="h-4 w-4" aria-hidden />}
            onClick={signOut}
          >
            Sair
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header
          className={cn(
            'flex flex-wrap items-center justify-between gap-2 border-b border-ms-border px-3 py-3 sm:gap-3 sm:px-6 lg:px-8 lg:py-4',
            msSurface,
          )}
        >
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <button
              type="button"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-ms-border text-ms-secondary hover:bg-ms-subtle lg:hidden"
              onClick={openSidebar}
              aria-label="Abrir menu"
            >
              <Menu className="h-5 w-5" aria-hidden />
            </button>
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-ms-muted">Profissional logado</p>
              <p className="truncate text-sm font-semibold text-ms-primary">{session.user.fullName}</p>
            </div>
            <PatientPicker />
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle size="compact" />
            <Button
              type="button"
              variant="secondary"
              size="md"
              className="hidden sm:inline-flex"
              icon={<LogOut className="h-4 w-4" aria-hidden />}
              onClick={signOut}
            >
              Sair
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="sm:hidden"
              aria-label="Sair"
              icon={<LogOut className="h-4 w-4" aria-hidden />}
              onClick={signOut}
            />
          </div>
        </header>
        <main className={cn('flex-1 overflow-x-hidden overflow-y-auto', msMainPad)}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export function DashboardLayout() {
  return (
    <DashboardProvider>
      <DashboardShell />
    </DashboardProvider>
  )
}
