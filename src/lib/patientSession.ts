export const PATIENT_SESSION_STORAGE_KEY = 'mindspeak_patient_session'

export type PatientSessionPayload = {
  patientId: string
  patientName: string
  /** ISO string */
  connectedAt: string
}

export function savePatientSession(data: PatientSessionPayload) {
  try {
    localStorage.setItem(PATIENT_SESSION_STORAGE_KEY, JSON.stringify(data))
  } catch {
    // ignore quota / private mode
  }
}

export function getPatientSession(): PatientSessionPayload | null {
  try {
    const raw = localStorage.getItem(PATIENT_SESSION_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== 'object') return null
    const o = parsed as Record<string, unknown>
    if (typeof o.patientId !== 'string' || typeof o.patientName !== 'string' || typeof o.connectedAt !== 'string') {
      return null
    }
    return { patientId: o.patientId, patientName: o.patientName, connectedAt: o.connectedAt }
  } catch {
    return null
  }
}

export function clearPatientSession() {
  try {
    localStorage.removeItem(PATIENT_SESSION_STORAGE_KEY)
  } catch {
    // ignore
  }
}
