import { useEffect, useMemo, useState } from 'react'
import { Brain, RefreshCw, Unplug } from 'lucide-react'
import { cn } from '../../../lib/cn'
import { usePatientBci, type SystemPhase } from '../../../hooks/usePatientBci'
import { useLiveSession } from '../../../hooks/useLiveSession'
import { Button, LinkButton } from '../../../components/shared/Button'
import { SessionConnect } from '../../../components/shared/SessionConnect'
import { getPhraseVisual } from '../patientPhraseIcons'
import { useTodaySelectionCount } from '../../../hooks/useTodaySelectionCount'
import {
  ACTIVE_SESSION_CHANGED_EVENT,
  clearActiveSessionId,
  getActiveSessionId,
} from '../../../lib/activeSession'

const phaseLabel: Record<SystemPhase, string> = {
  aguardando: 'Aguardando',
  varrendo: 'Varrendo',
  selecionando: 'Selecionando',
  confirmado: 'Confirmado',
}

function useActiveSessionId(): string | null {
  const [sessionId, setSessionId] = useState(() => getActiveSessionId())
  useEffect(() => {
    const sync = () => setSessionId(getActiveSessionId())
    window.addEventListener(ACTIVE_SESSION_CHANGED_EVENT, sync)
    return () => window.removeEventListener(ACTIVE_SESSION_CHANGED_EVENT, sync)
  }, [])
  return sessionId
}

export function PatientCommunicationPage() {
  const activeSessionId = useActiveSessionId()
  const isLive = Boolean(activeSessionId)

  const demo = usePatientBci()
  const live = useLiveSession(activeSessionId)
  const selectionsToday = useTodaySelectionCount()

  const displayWords = useMemo(
    () => (isLive ? live.words.map((w) => w.text) : demo.words),
    [isLive, live.words, demo.words],
  )

  const highlightIndex = isLive ? live.scanningIndex : demo.highlightIndex
  const isHighlighting = isLive ? live.status === 'open' && !live.paused : demo.demoActive
  const attentionValue = isLive ? Math.round(live.focusLevel) : demo.attention
  const lastSelectedLabel = isLive
    ? (live.lastSelected?.utterance ?? '—')
    : (demo.confirmedIndex != null ? (demo.words[demo.confirmedIndex] ?? '—') : '—')
  const focusedWordLabel = isLive ? (live.candidateWord ?? '—') : demo.focusedWordLabel

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-8">
      <section className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm ring-1 ring-emerald-100/80" aria-label="Sessão de comunicação">
        <h2 className="text-lg font-semibold text-ms-primary">Sessão em tela cheia</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ms-secondary">
          Abra o modo foco com a grade de frases e a barra de atenção — ideal para usar com o BCI, sem menus nem distrações.
        </p>
        {isLive ? (
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <LinkButton
              to={`/patient/communicate?session=${encodeURIComponent(activeSessionId as string)}`}
              variant="primary"
              size="lg"
              className="max-w-xl sm:inline-flex sm:min-h-[52px] sm:px-10"
              icon={<Brain className="h-5 w-5 shrink-0" aria-hidden />}
            >
              Iniciar Sessão de Comunicação
            </LinkButton>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              icon={<Unplug className="h-4 w-4" aria-hidden />}
              onClick={clearActiveSessionId}
            >
              Trocar sessão
            </Button>
          </div>
        ) : (
          <div className="mt-5 max-w-xl">
            <SessionConnect
              redirectTo={() => '/patient/dashboard'}
              title="Conectar à sessão ao vivo"
              description="Peça o identificador da sessão a quem estiver acompanhando (clínico ou familiar) — sem isso, a tela abaixo mostra só uma demonstração local."
            />
          </div>
        )}
      </section>

      <section aria-label="Status da conexão">
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
          {isLive ? 'Sessão ao vivo' : 'Status da conexão (demonstração)'}
        </p>
        <div className="mt-2 flex flex-wrap items-end gap-4">
          <h1 className="text-4xl font-semibold tracking-tight text-ms-primary md:text-5xl">
            {Math.min(100, Math.max(0, attentionValue))}% Neural Sync
          </h1>
          <div className="flex h-12 items-end gap-0.5 motion-safe:animate-pulse" aria-hidden>
            {Array.from({ length: 12 }).map((_, i) => {
              const h = 25 + ((i * 7 + attentionValue) % 55)
              return (
                <span
                  key={i}
                  className="w-1.5 rounded-full bg-emerald-500 transition-[height] duration-150"
                  style={{ height: `${h}%` }}
                />
              )
            })}
          </div>
        </div>
        <p className="mt-2 text-sm text-ms-secondary">
          {isLive
            ? live.paused
              ? 'Sinal ruim — o sistema está pausado, nenhuma palavra será decidida agora.'
              : `Qualidade do sinal: ${live.signalQuality}%`
            : 'Aguardando comando neural…'}
        </p>
      </section>

      <section aria-label="Grade de frases">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-5">
          {displayWords.map((word, index) => {
            const meta = getPhraseVisual(word, 'light')
            const Icon = meta.icon
            const highlighted = isHighlighting && index === highlightIndex
            const confirmed = isLive
              ? live.lastSelected?.utterance === word && index === highlightIndex
              : demo.confirmedIndex === index
            const locking = !isLive && highlighted && demo.phase === 'selecionando'

            return (
              <article
                key={`${index}-${word}`}
                className={cn(
                  'flex min-h-[140px] flex-col items-center justify-center gap-4 rounded-2xl border bg-ms-surface p-5 text-center shadow-sm ring-1 ring-slate-100/80 transition duration-200 will-change-transform',
                  'hover:scale-[1.02] hover:shadow-md motion-reduce:hover:scale-100',
                  confirmed && 'border-emerald-500 bg-emerald-50/80 shadow-emerald-900/10 ring-emerald-200',
                  !confirmed &&
                    highlighted &&
                    'border-emerald-400 shadow-[0_0_0_1px_rgb(16_185_129_0.45),0_8px_28px_rgb(16_185_129_0.18)] ring-emerald-100',
                  !confirmed && !highlighted && 'border-ms-border',
                  locking && 'animate-ms-pulse-glow',
                )}
                aria-current={highlighted ? 'true' : undefined}
              >
                <div
                  className={cn(
                    'flex h-14 w-14 items-center justify-center rounded-full ring-2',
                    confirmed ? 'bg-emerald-600 text-white ring-emerald-700' : meta.wrap,
                  )}
                >
                  <Icon className="h-7 w-7" aria-hidden />
                </div>
                <p className="text-base font-bold leading-snug tracking-tight text-ms-primary sm:text-lg">{word}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2" aria-label="Painéis inferiores">
        <div className="rounded-2xl border border-ms-border bg-ms-surface p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-ms-primary">Nível de atenção</h2>
          <p className="mt-1 text-xs leading-relaxed text-ms-muted">
            {isLive
              ? 'Nível de foco medido pelo sensor em tempo real.'
              : `Limiar de confirmação em ${demo.threshold}% — mantenha o foco por 1,5s sobre a palavra destacada.`}
          </p>
          <div
            className="relative mt-5 h-4 overflow-hidden rounded-full bg-ms-subtle-strong"
            role="meter"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={attentionValue}
            aria-label="Atenção"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-[width] duration-150"
              style={{ width: `${Math.min(100, Math.max(0, attentionValue))}%` }}
            />
            {!isLive ? (
              <div
                className="pointer-events-none absolute inset-y-0 w-0.5 bg-slate-900/70"
                style={{ left: `${demo.threshold}%` }}
              />
            ) : null}
          </div>
          <div className="mt-2 flex justify-between text-xs font-medium text-ms-muted">
            <span>0%</span>
            <span className="tabular-nums text-ms-primary">{attentionValue}%</span>
            <span>100%</span>
          </div>
        </div>

        <div className="rounded-2xl border border-ms-border bg-ms-surface p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-ms-primary">Painel de status</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4 border-b border-ms-border-subtle pb-3">
              <dt className="text-ms-muted">Palavra em foco</dt>
              <dd className="text-right font-semibold text-ms-primary">
                {isLive || demo.demoActive ? focusedWordLabel : '—'}
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-ms-border-subtle pb-3">
              <dt className="text-ms-muted">Última seleção</dt>
              <dd className="text-right font-semibold text-ms-primary">{lastSelectedLabel}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-ms-border-subtle pb-3">
              <dt className="text-ms-muted">Seleções hoje</dt>
              <dd className="text-right font-semibold text-ms-primary tabular-nums">{selectionsToday}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ms-muted">Qualidade do sinal</dt>
              <dd className="text-right font-semibold text-ms-primary">
                {isLive ? `${live.signalQuality}%` : '—'}
              </dd>
            </div>
          </dl>
          {!isLive ? (
            <>
              <div className="mt-5 flex flex-wrap gap-2 border-t border-ms-border-subtle pt-4">
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  icon={<RefreshCw className="h-4 w-4" aria-hidden />}
                  onClick={demo.startDemo}
                >
                  Iniciar demonstração
                </Button>
                <Button type="button" variant="secondary" size="sm" onClick={demo.reset}>
                  Resetar
                </Button>
              </div>
              <p className="mt-3 text-xs text-ms-muted">Estado do sistema (demo): {phaseLabel[demo.phase]}</p>
            </>
          ) : null}
        </div>
      </section>
    </div>
  )
}
