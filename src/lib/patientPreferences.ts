const STORAGE_KEY = 'mindspeak_patient_preferences'

export type PatientPreferences = {
  attentionThreshold: number
  confirmDwellSec: number
  soundEnabled: boolean
  /** voiceURI da SpeechSynthesisVoice escolhida, ou null = melhor voz pt-BR disponível */
  voiceURI: string | null
}

const DEFAULTS: PatientPreferences = {
  attentionThreshold: 75,
  confirmDwellSec: 1.5,
  soundEnabled: true,
  voiceURI: null,
}

export function getPatientPreferences(): PatientPreferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULTS }
    const parsed = JSON.parse(raw) as Partial<PatientPreferences>
    return {
      attentionThreshold:
        typeof parsed.attentionThreshold === 'number'
          ? Math.min(95, Math.max(50, parsed.attentionThreshold))
          : DEFAULTS.attentionThreshold,
      confirmDwellSec:
        typeof parsed.confirmDwellSec === 'number'
          ? Math.min(4, Math.max(1, parsed.confirmDwellSec))
          : DEFAULTS.confirmDwellSec,
      soundEnabled: typeof parsed.soundEnabled === 'boolean' ? parsed.soundEnabled : DEFAULTS.soundEnabled,
      voiceURI: typeof parsed.voiceURI === 'string' ? parsed.voiceURI : DEFAULTS.voiceURI,
    }
  } catch {
    return { ...DEFAULTS }
  }
}

export function savePatientPreferences(prefs: PatientPreferences) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
    window.dispatchEvent(new CustomEvent('mindspeak-patient-prefs-changed'))
  } catch {
    // ignore
  }
}

export function resetPatientPreferences() {
  try {
    localStorage.removeItem(STORAGE_KEY)
    window.dispatchEvent(new CustomEvent('mindspeak-patient-prefs-changed'))
  } catch {
    // ignore
  }
}

export const PATIENT_PREFS_CHANGED_EVENT = 'mindspeak-patient-prefs-changed'
