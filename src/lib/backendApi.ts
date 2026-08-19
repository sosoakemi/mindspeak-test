import { getAccessToken } from './authSession'
import { getApiBaseUrl } from './backendConfig'

export class BackendApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export type BackendWord = {
  id: number
  text: string
}

export type BackendSession = {
  id: number
  organization_id: number
  patient_id: number
  device_id: number
  external_session_id: string
  status: 'active' | 'completed' | 'cancelled'
  started_at: string
  ended_at: string | null
}

export type BackendSelection = {
  id: number
  session_id: number
  word_id: number
  utterance: string
  confidence: number
  selected_at: string
}

export type BackendUserRole = 'patient' | 'clinician' | 'caregiver' | 'admin'

export type BackendUser = {
  id: number
  email: string
  full_name: string
  role: BackendUserRole
  organization_id: number | null
}

export type BackendTokenResponse = {
  access_token: string
  token_type: string
  user: BackendUser
}

export type BackendPatient = {
  id: number
  organization_id: number
  display_name: string
  external_ref: string | null
}

export type BackendDevice = {
  id: number
  organization_id: number
  device_uid: string
  name: string
  patient_id: number | null
}

export type CalibrationLabel = 'foco' | 'repouso'

export type CalibrationCaptureStartResponse = {
  patient_id: number
  session_id: string
  label: CalibrationLabel
}

export type CalibrationCaptureStopResponse = {
  patient_id: number
  session_id: string
  label: CalibrationLabel
  window_count: number
  total_window_count: number
  artifact_path: string
}

export type CalibrationStatus = {
  patient_id: number
  total_windows: number
  foco_windows: number
  repouso_windows: number
}

export type TrainResponse = {
  patient_id: number
  accuracy: number
  version: number
  artifact_path: string
  classifier: string
}

async function extractErrorMessage(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as { detail?: string }
    if (typeof body?.detail === 'string') return body.detail
  } catch {
    // resposta sem corpo JSON — usa a mensagem genérica abaixo.
  }
  return `HTTP ${response.status}`
}

function authHeaders(): Record<string, string> {
  const token = getAccessToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, { headers: authHeaders() })
  if (!response.ok) {
    throw new BackendApiError(response.status, await extractErrorMessage(response))
  }
  return (await response.json()) as T
}

async function postJson<T>(path: string, body: unknown, useAuth = false): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(useAuth ? authHeaders() : {}),
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) {
    throw new BackendApiError(response.status, await extractErrorMessage(response))
  }
  return (await response.json()) as T
}

export function getSessionByExternalId(externalSessionId: string): Promise<BackendSession> {
  return getJson(`/sessions/by-external/${encodeURIComponent(externalSessionId)}`)
}

export function getSessionWords(sessionId: number): Promise<BackendWord[]> {
  return getJson(`/sessions/${sessionId}/words`)
}

export function getSessionSelections(
  sessionId: number,
): Promise<{ items: BackendSelection[]; next_cursor: string | null }> {
  return getJson(`/sessions/${sessionId}/selections`)
}

export function registerCaregiver(payload: {
  full_name: string
  email: string
  password: string
}): Promise<BackendTokenResponse> {
  return postJson('/auth/register/caregiver', payload)
}

export function registerClinician(payload: {
  full_name: string
  email: string
  password: string
  organization_name: string
}): Promise<BackendTokenResponse> {
  return postJson('/auth/register/clinician', payload)
}

export function login(payload: {
  email: string
  password: string
}): Promise<BackendTokenResponse> {
  return postJson('/auth/login', payload)
}

export function assignCaregiver(
  patientId: number,
  caregiverUserId: number,
): Promise<BackendUser> {
  return postJson(
    `/patients/${patientId}/caregivers`,
    { caregiver_user_id: caregiverUserId },
    true,
  )
}

export function createPatient(payload: {
  display_name: string
  external_ref?: string
}): Promise<BackendPatient> {
  return postJson('/patients', payload, true)
}

export function listPatients(): Promise<BackendPatient[]> {
  return getJson('/patients')
}

export function createDevice(
  patientId: number,
  payload: { device_uid: string; name: string },
): Promise<BackendDevice> {
  return postJson(`/patients/${patientId}/devices`, payload, true)
}

export function listDevices(patientId: number): Promise<BackendDevice[]> {
  return getJson(`/patients/${patientId}/devices`)
}

export function createSession(payload: {
  patient_id: number
  device_id: number
  external_session_id: string
}): Promise<BackendSession> {
  return postJson('/sessions', payload, true)
}

export function listPatientSessions(
  patientId: number,
): Promise<{ items: BackendSession[]; next_cursor: string | null }> {
  return getJson(`/patients/${patientId}/sessions`)
}

export function startCalibrationCapture(
  patientId: number,
  payload: { session_id: string; label: CalibrationLabel },
): Promise<CalibrationCaptureStartResponse> {
  return postJson(`/patients/${patientId}/calibration/capture/start`, payload, true)
}

export function stopCalibrationCapture(
  patientId: number,
  sessionId: string,
): Promise<CalibrationCaptureStopResponse> {
  return postJson(
    `/patients/${patientId}/calibration/capture/stop`,
    { session_id: sessionId },
    true,
  )
}

export function getCalibrationStatus(patientId: number): Promise<CalibrationStatus> {
  return getJson(`/patients/${patientId}/calibration/status`)
}

export function trainPatientModel(patientId: number): Promise<TrainResponse> {
  return postJson(`/patients/${patientId}/train`, {}, true)
}
