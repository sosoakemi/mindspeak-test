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
import { cn } from '../../lib/cn'
import { usePatientBci, type SystemPhase } from '../../hooks/usePatientBci'
import { Button, LinkButton } from '../../components/shared/Button'

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
  NÃO: { icon: XCircle, wrapClass: 'bg-slate-100 text-slate-500', iconClass: '' },
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

  return (
    <div className="flex min-h-dvh bg-slate-100 text-slate-900">
      <aside className="flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
        <div className="flex items-center gap-3 border-b border-slate-100 p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-sm font-semibold text-white">
            <UserRound className="h-6 w-6" aria-hidden />
          </div>
          <div>
            <p className="text-sm font-semibold">{patientName}</p>
            <p className="text-xs text-slate-500">ID: {patientId}</p>
          </div>
        </div>
        <div className="p-4">
          <Button type="button" variant="primary" fullWidth>
            Sincronizar
          </Button>
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-3" aria-label="Navegação">
          <div className="flex items-center gap-3 rounded-xl bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-900">
            <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
            Comunicação
          </div>
          <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600">
            <BarChart3 className="h-5 w-5 shrink-0 text-slate-400" aria-hidden />
            Sinais
          </div>
          <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600">
            <History className="h-5 w-5 shrink-0 text-slate-400" aria-hidden />
            Histórico
          </div>
          <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600">
            <HelpCircle className="h-5 w-5 shrink-0 text-slate-400" aria-hidden />
            Suporte
          </div>
        </nav>
        <div className="mt-auto space-y-1 border-t border-slate-100 p-3">
          <div className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-slate-600">
            <Settings className="h-4 w-4" aria-hidden />
            Configurações
          </div>
          {onLogout ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="w-full justify-start px-2"
              icon={<LogOut className="h-4 w-4" aria-hidden />}
              onClick={onLogout}
            >
              Sair
            </Button>
          ) : (
            <LinkButton
              to="/"
              variant="ghost"
              size="sm"
              className="w-full justify-start px-2"
              icon={<LogOut className="h-4 w-4" aria-hidden />}
            >
              Sair
            </LinkButton>
          )}
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-end gap-3 border-b border-slate-200 bg-white px-8 py-4">
          <span className="sr-only">Ações secundárias</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="rounded-full px-2"
            aria-label="Perfil"
          >
            <UserRound className="h-5 w-5" aria-hidden />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="rounded-full px-2"
            aria-label="Configurações rápidas"
          >
            <Settings className="h-5 w-5" aria-hidden />
          </Button>
        </header>

        <main className="flex flex-1 flex-col gap-8 overflow-auto px-8 py-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-violet-600">
                Status da conexão
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-4">
                <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
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
              <p className="mt-2 text-sm text-slate-600">Aguardando comando neural…</p>
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
                      'flex min-h-[140px] flex-col items-center justify-center gap-4 rounded-2xl border bg-white p-6 text-center shadow-sm transition',
                      confirmed && 'border-emerald-600 bg-emerald-50 shadow-emerald-900/10',
                      !confirmed &&
                        highlighted &&
                        'border-emerald-500 shadow-[0_0_0_1px_rgb(16_185_129_0.55),0_0_24px_rgb(16_185_129_0.25)]',
                      !confirmed && !highlighted && 'border-slate-200',
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
                    <p className="text-lg font-semibold leading-snug tracking-tight text-slate-900 sm:text-xl">
                      {word}
                    </p>
                  </article>
                )
              })}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2" aria-label="Monitoramento e demonstração">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">Nível de atenção</h2>
              <p className="mt-1 text-xs text-slate-500">
                Limiar de confirmação em {threshold}% — mantenha o foco por 1,5s sobre a palavra destacada.
              </p>
              <div className="relative mt-5 h-4 overflow-hidden rounded-full bg-slate-100" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={attention} aria-label="Atenção">
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
              <div className="mt-2 flex justify-between text-xs font-medium text-slate-500">
                <span>0%</span>
                <span className="text-slate-800">{attention}%</span>
                <span>100%</span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">Painel de status</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
                  <dt className="text-slate-500">Palavra em foco</dt>
                  <dd className="text-right font-semibold text-slate-900">{focusedWordLabel}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Estado do sistema</dt>
                  <dd className="text-right font-semibold text-emerald-900">{phaseLabel[phase]}</dd>
                </div>
              </dl>
              <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-100 pt-5">
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
              <p className="mt-4 text-xs leading-relaxed text-slate-500">
                Área de demonstração: em uso clínico real, estes controles podem permanecer ocultos ao paciente.
              </p>
            </div>
          </section>

          <div className="grid gap-4 pb-8 lg:grid-cols-[2fr_1fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-900">Sinal neurológico (EEG)</h2>
                <span className="text-xs font-medium text-slate-500">Simulação visual</span>
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
                  <p className="text-lg font-bold text-slate-900">12,4 μV</p>
                  <p className="text-xs text-slate-500">Média de pico</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Ambiente</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">24°C</p>
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
