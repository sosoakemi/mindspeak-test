export type UserRole = 'patient' | 'clinician' | 'caregiver' | 'admin'

export type StoredAuthUser = {
  id: number
  email: string
  fullName: string
  role: UserRole
  organizationId: number | null
}

export type AuthSessionPayload = {
  accessToken: string
  user: StoredAuthUser
}

const AUTH_STORAGE_KEY = 'mindspeak_auth_session'
export const AUTH_SESSION_CHANGED_EVENT = 'mindspeak-auth-session-changed'

function notifyAuthChanged() {
  window.dispatchEvent(new CustomEvent(AUTH_SESSION_CHANGED_EVENT))
}

export function saveAuthSession(payload: AuthSessionPayload) {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(payload))
    notifyAuthChanged()
  } catch {
    // ignore quota / private mode
  }
}

export function getAuthSession(): AuthSessionPayload | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== 'object') return null
    const o = parsed as Record<string, unknown>
    if (typeof o.accessToken !== 'string' || !o.user || typeof o.user !== 'object') {
      return null
    }
    const u = o.user as Record<string, unknown>
    if (
      typeof u.id !== 'number' ||
      typeof u.email !== 'string' ||
      typeof u.fullName !== 'string' ||
      typeof u.role !== 'string'
    ) {
      return null
    }
    return {
      accessToken: o.accessToken,
      user: {
        id: u.id,
        email: u.email,
        fullName: u.fullName,
        role: u.role as UserRole,
        organizationId: typeof u.organizationId === 'number' ? u.organizationId : null,
      },
    }
  } catch {
    return null
  }
}

export function clearAuthSession() {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    notifyAuthChanged()
  } catch {
    // ignore
  }
}

export function getAccessToken(): string | null {
  return getAuthSession()?.accessToken ?? null
}
