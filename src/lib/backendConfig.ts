/**
 * PC e iPad ficam na mesma rede WiFi (ver CLAUDE.md) — por padrão assumimos
 * que o backend está no mesmo host que serviu esta página, na porta 8000.
 * Dá pra sobrescrever via VITE_BACKEND_HOST se o backend estiver em outra máquina.
 */
const BACKEND_PORT = 8000

function resolveHost(): string {
  const override = import.meta.env.VITE_BACKEND_HOST as string | undefined
  if (override) return override
  if (typeof window !== 'undefined' && window.location.hostname) {
    return window.location.hostname
  }
  return 'localhost'
}

export function getApiBaseUrl(): string {
  return `http://${resolveHost()}:${BACKEND_PORT}`
}

/** `token` é obrigatório no backend — a conexão é recusada sem ele. */
export function getStatusWsUrl(sessionId: string, token: string): string {
  const protocol = typeof window !== 'undefined' && window.location.protocol === 'https:' ? 'wss' : 'ws'
  const path = `/ws/status/${encodeURIComponent(sessionId)}`
  return `${protocol}://${resolveHost()}:${BACKEND_PORT}${path}?token=${encodeURIComponent(token)}`
}
