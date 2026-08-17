import {
  BarChart3,
  CheckCircle2,
  Droplets,
  HelpCircle,
  History,
  LogOut,
  MessageCircle,
  RefreshCw,
  Settings,
  Smile,
  Thermometer,
  UserRound,
  XCircle,
} from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { usePatientBci, type SystemPhase } from '../../hooks/usePatientBci'
import { Button, LinkButton } from '../../components/shared/Button'
import { PatientHeaderActions } from '../../components/patient/PatientHeaderActions'
import { PatientSyncButton } from '../../components/patient/PatientSyncButton'
import { clearPatientSession, getPatientSession } from '../../lib/patientSession'
import { useMobileSidebar } from '../../hooks/useMobileSidebar'
import {
  msNavActive,
  msNavInactive,
  msPage,
  msSidebarAside,
  msSidebarClosed,
  msMainPad,
  msSidebarOpen,
  msSurface,
} from '../../lib/msStyles'
import { Menu, X } from 'lucide-react'

export type PatientPageProps = {
  patientId?: string
  patientName?: string
  onLogout?: () => void
}

const phaseLabel: Record<SystemPhase, string> = {
  aguardando: 'Aguardando',
  varrendo: 'Varrendo',
  selecionando: 'Selecionando',
  confirmado: 'Confirmado',
}

const wordMeta: Record<
  string,
  { icon: typeof CheckCircle2; wrapClass: string; iconClass: string }
> = {
  SIM: { icon: CheckCircle2, wrapClass: 'bg-blue-50 text-blue-600', iconClass: '' },
  NÃO: { icon: XCircle, wrapClass: 'bg-ms-subtle-strong text-ms-muted', iconClass: '' },
  'PRECISO DE AJUDA': { icon: HelpCircle, wrapClass: 'bg-red-50 text-red-600', iconClass: '' },
  'ESTOU BEM': { icon: Smile, wrapClass: 'bg-emerald-50 text-emerald-600', iconClass: '' },
  ÁGUA: { icon: Droplets, wrapClass: 'bg-sky-50 text-sky-600', iconClass: '' },
  OBRIGADO: { icon: Smile, wrapClass: 'bg-violet-50 text-violet-600', iconClass: '' },
  'CHAMAR ALGUÉM': { icon: HelpCircle, wrapClass: 'bg-amber-50 text-amber-600', iconClass: '' },
  'ESTOU COM DOR': { icon: HelpCircle, wrapClass: 'bg-rose-50 text-rose-600', iconClass: '' },
}

export function PatientPage({
  patientId = '#9821-BCI',
  patientName = 'Paciente',
  onLogout,
}: PatientPageProps = {}) {
  const nav = useNavigate()
  const session = getPatientSession()
  const {
    words,
    attention,
    threshold,
    highlightIndex,
    phase,
    confirmedIndex,
    focusedWordLabel,
    demoActive,
    startDemo,
    reset,
  } = usePatientBci()
  const { open, close, openSidebar } = useMobileSidebar()

  return (
    <div className={cn('flex min-h-dvh overflow-x-hidden', msPage)}>
      {open ? (
        <button type="button" className="fixed inset-0 z-30 bg-black/50 lg:hidden" aria-label="Fechar menu" onClick={close} />
      ) : null}
      <aside
        className={cn(msSidebarAside, open ? msSidebarOpen : msSidebarClosed)}
        aria-label="Menu lateral"
      >
        <div className="flex items-center justify-between gap-3 border-b border-ms-border-subtle p-4 lg:p-5">
          <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-sm font-semibold text-white">
            <UserRound className="h-6 w-6" aria-hidden />
          </div>
          <div>
            <p className="text-sm font-semibold">{patientName}</p>
            <p className="text-xs text-ms-muted">ID: {patientId}</p>
          </div>
          </div>
          <button
            type="button"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-ms-secondary hover:bg-ms-subtle lg:hidden"
            onClick={close}
            aria-label="Fechar menu"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
        <div className="p-4">
          <PatientSyncButton />
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-3" aria-label="Navegação">
          {(
            [
              { to: '/patient/dashboard', label: 'Comunicação', icon: MessageCircle, end: true },
              { to: '/patient/dashboard/sinais', label: 'Sinais', icon: BarChart3, end: false },
              { to: '/patient/dashboard/historico', label: 'Histórico', icon: History, end: false },
              { to: '/patient/dashboard/suporte', label: 'Suporte', icon: HelpCircle, end: false },
            ] as const
          ).map(({ to, label, icon: Icon, end }) => (
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
              <Icon className="h-5 w-5 shrink-0" aria-hidden />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto space-y-1 border-t border-ms-border-subtle p-3">
          <LinkButton
            to="/patient/dashboard/configuracoes"
            variant="ghost"
            size="sm"
            fullWidth
            className="justify-start px-2"
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
              if (onLogout) onLogout()
              else if (session) {
                clearPatientSession()
                nav('/acesso', { replace: true })
              } else {
                nav('/acesso')
              }
            }}
          >
            Sair
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className={cn('flex items-center justify-between gap-3 border-b border-ms-border px-4 py-3 sm:px-6 lg:px-8 lg:py-4', msSurface)}>
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

        <main className={cn('flex flex-1 flex-col gap-6 overflow-x-hidden overflow-y-auto sm:gap-8', msMainPad)}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-violet-600">
                Status da conexão
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-4">
                <h1 className="text-2xl font-semibold tracking-tight text-ms-primary sm:text-3xl lg:text-4xl">
                  {Math.min(100, Math.max(0, attention))}% Neural Sync
                </h1>
                <div className="flex h-10 items-end gap-0.5" aria-hidden>
                  {[4, 7, 3, 8, 5, 9, 4, 6].map((h, i) => (
                    <span
                      key={i}
                      className="w-1 rounded-full bg-violet-500"
                      style={{ height: `${h * 10}%` }}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-sm text-ms-secondary">Aguardando comando neural…</p>
            </div>
          </div>

          <section aria-label="Grade de comunicação">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
              {words.map((word, index) => {
                const meta = wordMeta[word] ?? wordMeta.SIM
                const Icon = meta.icon
                const highlighted = demoActive && index === highlightIndex && phase !== 'confirmado'
                const confirmed = confirmedIndex === index
                const locking = highlighted && phase === 'selecionando'

                return (
                  <article
                    key={word}
                    className={cn(
                      'flex min-h-[140px] flex-col items-center justify-center gap-4 rounded-2xl border bg-ms-surface p-6 text-center shadow-sm transition',
                      confirmed && 'border-emerald-600 bg-emerald-50 shadow-emerald-900/10',
                      !confirmed &&
                        highlighted &&
                        'border-emerald-500 shadow-[0_0_0_1px_rgb(16_185_129_0.55),0_0_24px_rgb(16_185_129_0.25)]',
                      !confirmed && !highlighted && 'border-ms-border',
                      locking && 'animate-ms-pulse-glow',
                    )}
                    aria-current={highlighted ? 'true' : undefined}
                  >
                    <div
                      className={cn(
                        'flex h-14 w-14 items-center justify-center rounded-full',
                        confirmed ? 'bg-emerald-600 text-white' : meta.wrapClass,
                      )}
                    >
                      <Icon className={cn('h-8 w-8', meta.iconClass)} aria-hidden />
                    </div>
                    <p className="text-lg font-semibold leading-snug tracking-tight text-ms-primary sm:text-xl">
                      {word}
                    </p>
                  </article>
                )
              })}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2" aria-label="Monitoramento e demonstração">
            <div className="rounded-2xl border border-ms-border bg-ms-surface p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-ms-primary">Nível de atenção</h2>
              <p className="mt-1 text-xs text-ms-muted">
                Limiar de confirmação em {threshold}% — mantenha o foco por 1,5s sobre a palavra destacada.
              </p>
              <div className="relative mt-5 h-4 overflow-hidden rounded-full bg-ms-subtle-strong" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={attention} aria-label="Atenção">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-[width] duration-150"
                  style={{ width: `${Math.min(100, Math.max(0, attention))}%` }}
                />
                <div
                  className="pointer-events-none absolute inset-y-0 w-0.5 bg-slate-900/70"
                  style={{ left: `${threshold}%` }}
                  title={`Limiar ${threshold}%`}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs font-medium text-ms-muted">
                <span>0%</span>
                <span className="text-ms-primary">{attention}%</span>
                <span>100%</span>
              </div>
            </div>

            <div className="rounded-2xl border border-ms-border bg-ms-surface p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-ms-primary">Painel de status</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-4 border-b border-ms-border-subtle pb-3">
                  <dt className="text-ms-muted">Palavra em foco</dt>
                  <dd className="text-right font-semibold text-ms-primary">{focusedWordLabel}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-ms-muted">Estado do sistema</dt>
                  <dd className="text-right font-semibold text-emerald-900">{phaseLabel[phase]}</dd>
                </div>
              </dl>
              <div className="mt-6 flex flex-wrap gap-3 border-t border-ms-border-subtle pt-5">
                <Button
                  type="button"
                  variant="primary"
                  className="min-[420px]:flex-none min-[420px]:flex-initial flex-1"
                  icon={<RefreshCw className="h-4 w-4" aria-hidden />}
                  onClick={startDemo}
                >
                  Iniciar demonstração
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="min-[420px]:flex-none min-[420px]:flex-initial flex-1"
                  onClick={reset}
                >
                  Resetar
                </Button>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-ms-muted">
                Área de demonstração: em uso clínico real, estes controles podem permanecer ocultos ao paciente.
              </p>
            </div>
          </section>

          <div className="grid gap-4 pb-8 lg:grid-cols-[2fr_1fr]">
            <div className="rounded-2xl border border-ms-border bg-ms-surface p-5 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-ms-primary">Sinal neurológico (EEG)</h2>
                <span className="text-xs font-medium text-ms-muted">Simulação visual</span>
              </div>
              <div className="flex h-28 items-end gap-1 rounded-xl bg-sky-50/80 p-3">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm bg-sky-400/80"
                    style={{ height: `${20 + ((i * 13) % 70)}%` }}
                  />
                ))}
              </div>
              <div className="mt-3 flex justify-end gap-2 text-right">
                <div>
                  <p className="text-lg font-bold text-ms-primary">12,4 μV</p>
                  <p className="text-xs text-ms-muted">Média de pico</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-ms-border bg-ms-surface p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-ms-muted">Ambiente</p>
                  <p className="mt-2 text-3xl font-semibold text-ms-primary">24°C</p>
                </div>
                <Thermometer className="h-8 w-8 text-emerald-600" aria-hidden />
              </div>
              <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-emerald-800">
                <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                Temperatura estável
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
