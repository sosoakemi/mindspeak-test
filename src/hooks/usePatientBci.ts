import { useCallback, useEffect, useRef, useState } from 'react'
import {
  DEFAULT_PATIENT_PHRASES,
  getEightPhrases,
  PHRASES_CHANGED_EVENT,
} from '../data/patientPhrases'

/** @deprecated use DEFAULT_PATIENT_PHRASES from `data/patientPhrases` */
export const PATIENT_WORDS = DEFAULT_PATIENT_PHRASES

export type SystemPhase = 'aguardando' | 'varrendo' | 'selecionando' | 'confirmado'

const THRESHOLD = 75
const SCAN_MS = 2000
const LOCK_MS = 1500
const TICK_MS = 50

function rand(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function speak(text: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'pt-BR'
  u.rate = 0.95
  window.speechSynthesis.speak(u)
}

export function usePatientBci() {
  const [phrases, setPhrases] = useState(() => getEightPhrases())
  const [demoActive, setDemoActive] = useState(false)
  const [attention, setAttention] = useState(42)
  const [highlightIndex, setHighlightIndex] = useState(0)
  const [phase, setPhase] = useState<SystemPhase>('aguardando')
  const [confirmedIndex, setConfirmedIndex] = useState<number | null>(null)
  const [focusedWordLabel, setFocusedWordLabel] = useState('—')

  const attentionRef = useRef(42)
  const scanAccRef = useRef(0)
  const lockAccRef = useRef(0)
  const highlightRef = useRef(0)
  const phaseRef = useRef<SystemPhase>('aguardando')
  const nextSpikeAtRef = useRef(0)
  const spikeEndsAtRef = useRef(0)
  const inSpikeRef = useRef(false)
  const confirmUntilRef = useRef(0)
  const phrasesRef = useRef(phrases)

  phrasesRef.current = phrases

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
    const n = phrasesRef.current.length
    if (n === 0) return
    if (highlightRef.current >= n) {
      highlightRef.current = 0
      setHighlightIndex(0)
    }
    if (demoActive) {
      setFocusedWordLabel(phrasesRef.current[highlightRef.current] ?? '—')
    }
  }, [phrases, demoActive])

  const syncHighlight = () => {
    const i = highlightRef.current
    setFocusedWordLabel(phrasesRef.current[i] ?? '—')
    setHighlightIndex(i)
  }

  const resetInternal = useCallback(() => {
    window.speechSynthesis?.cancel()
    attentionRef.current = 42
    scanAccRef.current = 0
    lockAccRef.current = 0
    highlightRef.current = 0
    phaseRef.current = 'aguardando'
    inSpikeRef.current = false
    nextSpikeAtRef.current = 0
    spikeEndsAtRef.current = 0
    confirmUntilRef.current = 0
    setDemoActive(false)
    setAttention(42)
    setHighlightIndex(0)
    setPhase('aguardando')
    setConfirmedIndex(null)
    setFocusedWordLabel('—')
  }, [])

  const startDemo = useCallback(() => {
    window.speechSynthesis?.cancel()
    attentionRef.current = 42
    scanAccRef.current = 0
    lockAccRef.current = 0
    highlightRef.current = 0
    phaseRef.current = 'varrendo'
    inSpikeRef.current = false
    const now = performance.now()
    nextSpikeAtRef.current = now + rand(10_000, 15_000)
    spikeEndsAtRef.current = 0
    confirmUntilRef.current = 0
    setDemoActive(true)
    setAttention(42)
    setHighlightIndex(0)
    setPhase('varrendo')
    setConfirmedIndex(null)
    const w = phrasesRef.current[0]
    setFocusedWordLabel(w ?? '—')
  }, [])

  const reset = useCallback(() => {
    resetInternal()
  }, [resetInternal])

  useEffect(() => {
    if (!demoActive) return

    let last = performance.now()
    let id: ReturnType<typeof setInterval>

    id = setInterval(() => {
      const now = performance.now()
      const dt = Math.min(200, now - last)
      last = now
      const words = phrasesRef.current
      const len = Math.max(1, words.length)

      if (now >= nextSpikeAtRef.current && !inSpikeRef.current) {
        inSpikeRef.current = true
        spikeEndsAtRef.current = now + rand(2000, 3000)
      }
      if (inSpikeRef.current && now >= spikeEndsAtRef.current) {
        inSpikeRef.current = false
        nextSpikeAtRef.current = now + rand(10_000, 15_000)
      }

      const target = inSpikeRef.current ? rand(76, 90) : rand(30, 55)
      const a = attentionRef.current
      const alpha = 1 - Math.exp(-dt / 380)
      attentionRef.current = Math.round(a + (target - a) * alpha)
      setAttention(attentionRef.current)

      const ph = phaseRef.current

      if (ph === 'confirmado') {
        if (now >= confirmUntilRef.current) {
          phaseRef.current = 'varrendo'
          setPhase('varrendo')
          setConfirmedIndex(null)
          lockAccRef.current = 0
          scanAccRef.current = 0
        }
        return
      }

      const over = attentionRef.current >= THRESHOLD
      const hi = highlightRef.current

      if (ph === 'selecionando') {
        if (!over) {
          lockAccRef.current = 0
          phaseRef.current = 'varrendo'
          setPhase('varrendo')
          return
        }
        lockAccRef.current += TICK_MS
        if (lockAccRef.current >= LOCK_MS) {
          phaseRef.current = 'confirmado'
          setPhase('confirmado')
          setConfirmedIndex(hi)
          speak(String(words[hi] ?? ''))
          confirmUntilRef.current = now + 4000
          lockAccRef.current = 0
          scanAccRef.current = 0
        }
        return
      }

      if (ph === 'varrendo') {
        if (over) {
          phaseRef.current = 'selecionando'
          setPhase('selecionando')
          lockAccRef.current = 0
          scanAccRef.current = 0
          return
        }
        scanAccRef.current += TICK_MS
        if (scanAccRef.current >= SCAN_MS) {
          scanAccRef.current = 0
          highlightRef.current = (highlightRef.current + 1) % len
          syncHighlight()
        }
      }
    }, TICK_MS)

    return () => clearInterval(id)
  }, [demoActive])

  return {
    words: phrases,
    attention,
    threshold: THRESHOLD,
    highlightIndex,
    phase,
    confirmedIndex,
    focusedWordLabel,
    demoActive,
    startDemo,
    reset,
  }
}
