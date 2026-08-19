/**
 * A sessão ao vivo (external_session_id do backend) que este navegador está
 * acompanhando agora. Sem isso, nenhuma tela sabe qual `?session=` usar —
 * é o que faltava pra ligar os botões "Iniciar sessão"/"Nova sessão" ao
 * backend de verdade.
 */
const ACTIVE_SESSION_KEY = 'mindspeak_active_session'
export const ACTIVE_SESSION_CHANGED_EVENT = 'mindspeak-active-session-changed'

function notifyChanged() {
  window.dispatchEvent(new CustomEvent(ACTIVE_SESSION_CHANGED_EVENT))
}

export function getActiveSessionId(): string | null {
  try {
    return localStorage.getItem(ACTIVE_SESSION_KEY)
  } catch {
    return null
  }
}

export function setActiveSessionId(sessionId: string) {
  try {
    localStorage.setItem(ACTIVE_SESSION_KEY, sessionId)
    notifyChanged()
  } catch {
    // ignore quota / private mode
  }
}

export function clearActiveSessionId() {
  try {
    localStorage.removeItem(ACTIVE_SESSION_KEY)
    notifyChanged()
  } catch {
    // ignore
  }
}
