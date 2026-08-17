import { useEffect } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  Activity,
  Clock,
  HelpCircle,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  SquarePen,
  X,
} from 'lucide-react'
import { cn } from '../../lib/cn'
import { Button, LinkButton } from '../../components/shared/Button'
import { PatientHeaderActions } from '../../components/patient/PatientHeaderActions'
import { PatientSyncButton } from '../../components/patient/PatientSyncButton'
import { clearPatientSession, getPatientSession } from '../../lib/patientSession'
import { clearAuthSession } from '../../lib/authSession'
import { useMobileSidebar } from '../../hooks/useMobileSidebar'
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

const LOGO_SRC = '/logos/logoCt-2b7c3200-61f0-4a60-96a1-a47d5808bb1f.png'

const navItems = [
  { to: '/patient/dashboard', label: 'Comunicação', icon: MessageSquare, match: (p: string) => p === '/patient/dashboard' || p.endsWith('/comunicacao') },
  { to: '/patient/dashboard/sinais', label: 'Sinais', icon: Activity, match: (p: string) => p.endsWith('/sinais') },
  { to: '/patient/dashboard/historico', label: 'Histórico', icon: Clock, match: (p: string) => p.endsWith('/historico') },
  { to: '/patient/dashboard/suporte', label: 'Suporte', icon: HelpCircle, match: (p: string) => p.endsWith('/suporte') },
] as const

export function PatientDashboardLayout() {
  const nav = useNavigate()
  const location = useLocation()
  const session = getPatientSession()
  const { open, close, openSidebar } = useMobileSidebar()

  useEffect(() => {
    if (!getPatientSession()) {
      nav('/acesso', { replace: true })
    }
  }, [nav, location.pathname])

  if (!session) {
    return (
      <div className={cn('flex min-h-dvh items-center justify-center', msPage)}>
        <p className="text-sm text-ms-secondary">Carregando…</p>
      </div>
    )
  }

  const patientName = session.patientName || 'Paciente'
  const patientId = session.patientId || '#9821-BCI'

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
        className={cn(msSidebarAside, open ? msSidebarOpen : msSidebarClosed)}
        aria-label="Menu lateral"
      >
        <div className="flex items-start justify-between border-b border-ms-border-subtle p-4">
          <div className="min-w-0 flex-1">
            <img
              src={LOGO_SRC}
              alt="MindSpeak"
              className="h-9 w-full max-w-[200px] object-contain object-left dark:brightness-110"
              width={200}
              height={36}
              decoding="async"
            />
            <div className="mt-3">
              <p className="truncate text-sm font-semibold text-ms-primary">{patientName}</p>
              <p className="text-xs text-ms-muted">ID: {patientId}</p>
            </div>
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
        <div className="px-3 pt-2">
          <PatientSyncButton />
        </div>
        <nav className="mt-4 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-3 pb-2" aria-label="Principal">
          {navItems.map(({ to, label, icon: Icon, match }) => {
            const active = match(location.pathname)
            return (
              <NavLink
                key={to}
                to={to}
                end={to === '/patient/dashboard'}
                onClick={close}
                className={() =>
                  cn(
                    'flex min-h-[44px] items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                    active ? msNavActive : msNavInactive,
                  )
                }
              >
                <Icon className={cn('h-5 w-5 shrink-0', active ? 'text-emerald-700 dark:text-emerald-400' : 'text-ms-muted')} aria-hidden />
                {label}
              </NavLink>
            )
          })}
          <div className="mt-4 space-y-2 border-t border-ms-border-subtle pt-4" aria-label="Frases">
            <LinkButton
              to="/patient/dashboard/palavras"
              variant="secondary"
              size="md"
              fullWidth
              icon={<SquarePen className="h-4 w-4 shrink-0" aria-hidden />}
              className={cn(location.pathname.endsWith('/palavras') && msNavActive)}
              onClick={close}
            >
              Frases da grade
            </LinkButton>
          </div>
        </nav>
        <div className="mt-auto space-y-1 border-t border-ms-border-subtle p-3">
          <LinkButton
            to="/patient/dashboard/configuracoes"
            variant="ghost"
            size="sm"
            fullWidth
            className={cn(
              'justify-start px-2',
              location.pathname.endsWith('/configuracoes') && 'bg-ms-subtle ring-1 ring-ms-border',
            )}
            icon={<Settings className="h-4 w-4" aria-hidden />}
            onClick={close}
          >
            Configurações
          </LinkButton>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-full justify-start px-2 text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/40"
            icon={<LogOut className="h-4 w-4" aria-hidden />}
            onClick={() => {
              clearPatientSession()
              clearAuthSession()
              nav('/acesso', { replace: true })
            }}
          >
            Sair
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header
          className={cn(
            'flex items-center justify-between gap-2 border-b border-ms-border px-3 py-3 sm:px-6 lg:px-8',
            msSurface,
          )}
        >
          <button
            type="button"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-ms-border text-ms-secondary hover:bg-ms-subtle lg:hidden"
            onClick={openSidebar}
            aria-label="Abrir menu"
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>
          <PatientHeaderActions />
        </header>
        <main className={cn('flex-1 overflow-x-hidden overflow-y-auto', msMainPad)}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
