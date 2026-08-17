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
