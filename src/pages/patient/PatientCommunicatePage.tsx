import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CheckCircle2,
  Crosshair,
  Pause,
  Play,
  X,
} from 'lucide-react'
import { cn } from '../../lib/cn'
import { getEightPhrases, PHRASES_CHANGED_EVENT } from '../../data/patientPhrases'
import { getPhraseVisual } from './patientPhraseIcons'
import { getPatientSession } from '../../lib/patientSession'
import { getPatientPreferences } from '../../lib/patientPreferences'
import { incrementTodaySelectionCount } from '../../lib/patientStats'
import { Button } from '../../components/shared/Button'

const LOGO_SRC = '/logos/logoOficial-6dcbc4e8-0a72-4fd4-be0a-ca6942282816.png'

const THRESHOLD = 75
const LOCK_MS = 1500
const ATTENTION_MS = 200
const POST_CONFIRM_SCAN_PAUSE_MS = 3000
const OVERLAY_MS = 2000
const FLASH_CARD_MS = 1000
const FLASH_BAR_MS = 1000
const FORCE_FOCUS_MS = 3000

function rand(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function speakPhrase(text: string) {
  if (!getPatientPreferences().soundEnabled) return
  if (typeof window === 'undefined' || !window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'pt-BR'
  u.rate = 0.92
  const voices = window.speechSynthesis.getVoices?.() ?? []
  const br = voices.find((v) => v.lang?.toLowerCase().startsWith('pt-br') || v.lang === 'pt_BR')
  if (br) u.voice = br
  window.speechSynthesis.speak(u)
}

function attentionBarClass(v: number) {
  if (v < 40) return 'bg-red-500'
  if (v < 60) return 'bg-yellow-500'
  if (v < 75) return 'bg-blue-500'
  return 'bg-green-500'
}

export function PatientCommunicatePage() {
  const nav = useNavigate()
  const [phrases, setPhrases] = useState(() => getEightPhrases())
  const [scanIndex, setScanIndex] = useState(0)
  const [scanMs, setScanMs] = useState(2000)
  const [demoRunning, setDemoRunning] = useState(false)
  const [scanPaused, setScanPaused] = useState(false)
  const [attention, setAttention] = useState(45)
  const [overlayPhrase, setOverlayPhrase] = useState<string | null>(null)
  const [flashCardIndex, setFlashCardIndex] = useState<number | null>(null)
  const [barFlash, setBarFlash] = useState(false)

  const attentionRef = useRef(45)
  const lockMsRef = useRef(0)
  const lastScanForLockRef = useRef(0)
  const cooldownUntilRef = useRef(0)
  const inSpikeRef = useRef(false)
  const nextSpikeAtRef = useRef(0)
  const spikeEndsAtRef = useRef(0)
  const forcedFocusUntilRef = useRef(0)
  const phrasesRef = useRef(phrases)
  const scanIndexRef = useRef(scanIndex)
  const scanPausedRef = useRef(scanPaused)
  const overlayBlockRef = useRef(false)
  phrasesRef.current = phrases
  scanIndexRef.current = scanIndex
  scanPausedRef.current = scanPaused

  useEffect(() => {
    const sync = () => setPhrases(getEightPhrases())
    window.addEventListener(PHRASES_CHANGED_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(PHRASES_CHANGED_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  useEffect(() => {
    if (!getPatientSession()) {
      nav('/patient/login', { replace: true })
    }
  }, [nav])

  const confirmSelection = useCallback((index: number) => {
    const text = phrasesRef.current[index]
    if (!text) return
    const now = performance.now()
    if (now < cooldownUntilRef.current) return
    cooldownUntilRef.current = now + POST_CONFIRM_SCAN_PAUSE_MS + 500

    overlayBlockRef.current = true

    setFlashCardIndex(index)
    window.setTimeout(() => setFlashCardIndex(null), FLASH_CARD_MS)

    setOverlayPhrase(text)
    window.setTimeout(() => {
      setOverlayPhrase(null)
      overlayBlockRef.current = false
    }, OVERLAY_MS)

    setBarFlash(true)
    window.setTimeout(() => setBarFlash(false), FLASH_BAR_MS)

    incrementTodaySelectionCount()
    speakPhrase(text)

    setScanPaused(true)
    lockMsRef.current = 0
    window.setTimeout(() => {
      setScanPaused(false)
    }, POST_CONFIRM_SCAN_PAUSE_MS)
  }, [])

  /* Scan advance */
  useEffect(() => {
    if (!demoRunning || scanPaused) return
    const id = window.setInterval(() => {
      setScanIndex((i) => {
        const len = phrasesRef.current.length || 8
        return (i + 1) % len
      })
    }, scanMs)
    return () => clearInterval(id)
  }, [demoRunning, scanPaused, scanMs])

  /* Reset lock when highlight moves */
  useEffect(() => {
    if (lastScanForLockRef.current !== scanIndex) {
      lastScanForLockRef.current = scanIndex
      lockMsRef.current = 0
    }
  }, [scanIndex])

  /* Attention simulation + selection */
  useEffect(() => {
    if (!demoRunning) return

    let last = performance.now()
    const id = window.setInterval(() => {
      const now = performance.now()
      const dt = Math.min(ATTENTION_MS + 50, now - last)
      last = now
      const words = phrasesRef.current
      const len = Math.max(1, words.length)
      const idx = scanIndexRef.current % len

      if (now >= nextSpikeAtRef.current && !inSpikeRef.current) {
        inSpikeRef.current = true
        spikeEndsAtRef.current = now + rand(1800, 3200)
      }
      if (inSpikeRef.current && now >= spikeEndsAtRef.current) {
        inSpikeRef.current = false
        nextSpikeAtRef.current = now + rand(4500, 9000)
      }

      const forced = now < forcedFocusUntilRef.current
      const target = forced ? rand(82, 90) : inSpikeRef.current ? rand(70, 90) : rand(30, 55)
      const a = attentionRef.current
      const alpha = 1 - Math.exp(-dt / 420)
      attentionRef.current = Math.round(a + (target - a) * alpha)
      setAttention(attentionRef.current)

      if (now < cooldownUntilRef.current || scanPausedRef.current || overlayBlockRef.current) {
        return
      }

      const att = attentionRef.current
      if (att >= THRESHOLD) {
        lockMsRef.current += ATTENTION_MS
        if (lockMsRef.current >= LOCK_MS) {
          lockMsRef.current = 0
          confirmSelection(idx)
        }
      } else {
        lockMsRef.current = 0
      }
    }, ATTENTION_MS)

    return () => clearInterval(id)
  }, [demoRunning, confirmSelection])

  /* Prime speech voices (Safari) */
  useEffect(() => {
    const v = window.speechSynthesis
    if (!v) return
    const fn = () => v.getVoices()
    fn()
    v.addEventListener('voiceschanged', fn)
    return () => v.removeEventListener('voiceschanged', fn)
  }, [])

  const startDemo = () => {
    const now = performance.now()
    attentionRef.current = 42
    inSpikeRef.current = false
    nextSpikeAtRef.current = now + rand(2000, 5000)
    spikeEndsAtRef.current = 0
    forcedFocusUntilRef.current = 0
    lockMsRef.current = 0
    cooldownUntilRef.current = 0
    overlayBlockRef.current = false
    setAttention(42)
    setScanIndex(0)
    setScanPaused(false)
    setOverlayPhrase(null)
    setDemoRunning(true)
  }

  const pauseDemo = () => {
    setDemoRunning(false)
    setScanPaused(false)
    lockMsRef.current = 0
    overlayBlockRef.current = false
  }

  const simulateFocus = () => {
    forcedFocusUntilRef.current = performance.now() + FORCE_FOCUS_MS
  }

  const attClamped = Math.min(100, Math.max(0, attention))
  const barFillClass = barFlash ? 'bg-green-400 motion-safe:animate-pulse' : attentionBarClass(attClamped)

  return (
    <div className="flex min-h-dvh flex-col bg-slate-900 text-slate-100">
      <header className="flex h-12 max-h-12 shrink-0 items-center justify-between border-b border-slate-800 px-3 sm:px-4">
        <img src={LOGO_SRC} alt="MindSpeak" className="h-7 w-auto max-w-[140px] object-contain object-left" width={140} height={28} decoding="async" />
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none motion-reduce:opacity-0" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="hidden sm:inline">Conectado</span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="gap-1.5 text-slate-300 hover:bg-slate-800 hover:text-white"
            icon={<X className="h-4 w-4" aria-hidden />}
            onClick={() => nav('/patient/dashboard')}
          >
            Sair
          </Button>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-8 px-3 py-6 sm:px-6">
        <div
          className="grid w-full max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
          role="list"
          aria-label="Grade de frases"
        >
          {phrases.map((word, index) => {
            const highlighted = demoRunning && index === scanIndex && !scanPaused
            const flash = flashCardIndex === index
            const { icon: Icon, wrap } = getPhraseVisual(word, 'dark')
            return (
              <article
                key={`${index}-${word}`}
                role="listitem"
                className={cn(
                  'flex min-h-[120px] flex-col items-center justify-center gap-3 rounded-2xl border-2 px-2 py-4 text-center transition duration-300 motion-reduce:transition-none sm:min-h-[140px]',
                  'bg-gray-800 border-slate-700/80',
                  highlighted &&
                    'border-emerald-400 bg-gray-700 shadow-lg shadow-emerald-500/30 ring-1 ring-emerald-400/40',
                  flash && 'border-emerald-300 bg-emerald-600/30 shadow-lg shadow-emerald-400/50',
                )}
                aria-current={highlighted ? 'step' : undefined}
              >
                <div className={cn('flex h-12 w-12 items-center justify-center rounded-full', wrap)}>
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <p className="text-balance text-lg font-bold leading-tight text-white sm:text-2xl md:text-3xl">{word}</p>
              </article>
            )
          })}
        </div>

        <section className="w-full max-w-5xl space-y-2" aria-label="Nível de atenção">
          <div
            className={cn(
              'relative h-4 w-full overflow-hidden rounded-full bg-slate-800 ring-1 ring-slate-700 transition-shadow duration-300',
              barFlash && 'shadow-lg shadow-emerald-400/40',
            )}
            role="meter"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={attClamped}
            aria-label="Nível de atenção"
          >
            <div
              className={cn('h-full rounded-full transition-[width] duration-200 motion-reduce:transition-none', barFillClass)}
              style={{ width: `${attClamped}%` }}
            />
            <div
              className="pointer-events-none absolute inset-y-0 z-[1] w-0 border-l-2 border-dashed border-white/90"
              style={{ left: `${THRESHOLD}%` }}
              aria-hidden
            />
          </div>
          <div className="flex flex-col gap-0.5 text-center text-sm text-slate-300 sm:flex-row sm:justify-center sm:gap-6">
            <span className="font-medium tabular-nums">Nível de Atenção: {attClamped}%</span>
            <span className="tabular-nums text-ms-muted">Limiar: {THRESHOLD}%</span>
          </div>
        </section>
      </main>

      <footer className="shrink-0 px-3 pb-4 text-center text-xs text-gray-500 sm:px-6">
        Mantenha o foco por 1,5s na palavra destacada para confirmar
      </footer>

      {overlayPhrase ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-[2px]"
          role="alertdialog"
          aria-live="assertive"
          aria-label="Confirmação"
        >
          <div className="flex max-w-[95vw] flex-col items-center gap-4 text-center">
            <CheckCircle2 className="h-20 w-20 text-emerald-400 sm:h-24 sm:w-24" aria-hidden />
            <p className="max-w-full text-balance px-2 text-2xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              {overlayPhrase}
            </p>
          </div>
        </div>
      ) : null}

      <div
        className="fixed bottom-3 left-3 right-3 z-40 flex flex-col gap-2 rounded-xl border border-slate-700/80 bg-slate-900/95 p-3 shadow-xl backdrop-blur sm:left-auto sm:right-4 sm:max-w-md"
        aria-label="Controles de demonstração"
      >
        <p className="text-[10px] font-semibold uppercase tracking-wide text-ms-muted">Demo</p>
        <div className="flex flex-wrap gap-2">
          {!demoRunning ? (
            <Button type="button" variant="secondary" size="sm" icon={<Play className="h-4 w-4" aria-hidden />} onClick={startDemo}>
              Iniciar Demo
            </Button>
          ) : (
            <Button type="button" variant="secondary" size="sm" icon={<Pause className="h-4 w-4" aria-hidden />} onClick={pauseDemo}>
              Pausar Demo
            </Button>
          )}
          <Button
            type="button"
            variant="secondary"
            size="sm"
            icon={<Crosshair className="h-4 w-4" aria-hidden />}
            onClick={simulateFocus}
            disabled={!demoRunning}
          >
            Simular Foco
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-ms-muted">Velocidade:</span>
          {(
            [
              { label: 'Lenta (3s)', ms: 3000 },
              { label: 'Normal (2s)', ms: 2000 },
              { label: 'Rápida (1s)', ms: 1000 },
            ] as const
          ).map((opt) => (
            <button
              key={opt.ms}
              type="button"
              onClick={() => setScanMs(opt.ms)}
              className={cn(
                'rounded-lg px-2.5 py-1.5 text-xs font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400',
                scanMs === opt.ms ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700',
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
