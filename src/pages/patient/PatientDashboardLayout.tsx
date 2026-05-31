import { useEffect } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  Activity,
  Clock,
  HelpCircle,
  LogOut,
  MessageSquare,
  Settings,
  SquarePen,
  User,
  Wifi,
} from 'lucide-react'
import { cn } from '../../lib/cn'
import { Button, LinkButton } from '../../components/shared/Button'
import { clearPatientSession, getPatientSession } from '../../lib/patientSession'

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

  useEffect(() => {
    if (!getPatientSession()) {
      nav('/patient/login', { replace: true })
    }
  }, [nav, location.pathname])

  if (!session) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-slate-100 text-slate-600">
        <p className="text-sm">Carregando…</p>
      </div>
    )
  }

  const patientName = session.patientName || 'Paciente'
  const patientId = session.patientId || '#9821-BCI'

  return (
    <div className="flex min-h-dvh bg-slate-100 text-slate-900">
      <aside className="flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
        <div className="border-b border-slate-100 p-4">
          <img
            src={LOGO_SRC}
            alt="MindSpeak"
            className="h-9 w-full max-w-[200px] object-contain object-left"
            width={200}
            height={36}
            decoding="async"
          />
          <div className="mt-3">
            <p className="text-sm font-semibold text-slate-900">{patientName}</p>
            <p className="text-xs text-slate-500">ID: {patientId}</p>
          </div>
        </div>
        <div className="px-3 pt-2">
          <Button type="button" variant="primary" fullWidth icon={<Wifi className="h-4 w-4" aria-hidden />}>
            Sincronizar
          </Button>
        </div>
        <nav className="mt-4 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-3 pb-2" aria-label="Principal">
          {navItems.map(({ to, label, icon: Icon, match }) => {
            const active = match(location.pathname)
            return (
              <NavLink
                key={to}
                to={to}
                end={to === '/patient/dashboard'}
                className={() =>
                  cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                    active
                      ? 'bg-emerald-50 text-emerald-950 ring-1 ring-emerald-100'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
                  )
                }
              >
                <Icon className={cn('h-5 w-5 shrink-0', active ? 'text-emerald-700' : 'text-slate-400')} aria-hidden />
                {label}
              </NavLink>
            )
          })}
          <div className="mt-4 space-y-2 border-t border-slate-100 pt-4" aria-label="Frases">
            <LinkButton
              to="/patient/dashboard/palavras"
              variant="secondary"
              size="md"
              fullWidth
              icon={<SquarePen className="h-4 w-4 shrink-0" aria-hidden />}
              className={cn(
                location.pathname.endsWith('/palavras') &&
                  'border-emerald-300 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-100',
              )}
            >
              Frases da grade
            </LinkButton>
          </div>
        </nav>
        <div className="mt-auto border-t border-slate-100 p-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-full justify-start px-2 text-red-600 hover:bg-red-50 hover:text-red-700"
            icon={<LogOut className="h-4 w-4" aria-hidden />}
            onClick={() => {
              clearPatientSession()
              nav('/patient/login', { replace: true })
            }}
          >
            Sair
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-end gap-2 border-b border-slate-200 bg-white px-6 py-3 md:px-8">
          <Button type="button" variant="ghost" size="sm" className="rounded-full px-2" aria-label="Perfil">
            <User className="h-5 w-5 text-slate-700" aria-hidden />
          </Button>
          <Button type="button" variant="ghost" size="sm" className="rounded-full px-2" aria-label="Configurações">
            <Settings className="h-5 w-5 text-slate-700" aria-hidden />
          </Button>
        </header>
        <main className="flex-1 overflow-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
