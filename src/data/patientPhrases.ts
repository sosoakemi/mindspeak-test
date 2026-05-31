export const DEFAULT_PATIENT_PHRASES = [
  'SIM',
  'NÃO',
  'PRECISO DE AJUDA',
  'ESTOU BEM',
  'ÁGUA',
  'OBRIGADO',
  'CHAMAR ALGUÉM',
  'ESTOU COM DOR',
] as const

const STORAGE_KEY = 'mindspeak_patient_grid_phrases'

export const PHRASES_CHANGED_EVENT = 'mindspeak-phrases-changed'

function padEight(list: string[]): string[] {
  const d = [...DEFAULT_PATIENT_PHRASES]
  const next = list.map((s) => s.trim()).filter(Boolean)
  if (next.length === 0) return [...d]
  while (next.length < 8) next.push(d[next.length]!)
  return next.slice(0, 8)
}

export function getEightPhrases(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return [...DEFAULT_PATIENT_PHRASES]
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return [...DEFAULT_PATIENT_PHRASES]
    const cleaned = parsed.filter((x): x is string => typeof x === 'string').map((s) => s.trim())
    return padEight(cleaned)
  } catch {
    return [...DEFAULT_PATIENT_PHRASES]
  }
}

export function setEightPhrases(phrases: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(padEight(phrases)))
    window.dispatchEvent(new CustomEvent(PHRASES_CHANGED_EVENT))
  } catch {
    // ignore
  }
}

export function resetPhrasesToDefault() {
  try {
    localStorage.removeItem(STORAGE_KEY)
    window.dispatchEvent(new CustomEvent(PHRASES_CHANGED_EVENT))
  } catch {
    // ignore
  }
}
