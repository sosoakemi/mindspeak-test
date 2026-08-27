/**
 * Uso local (clínica/casa): PC e iPad ficam na mesma rede WiFi (ver
 * CLAUDE.md) — por padrão assumimos que o backend está no mesmo host que
 * serviu esta página, na porta 8000. Dá pra sobrescrever só o host via
 * VITE_BACKEND_HOST se o backend estiver em outra máquina da mesma rede.
 *
 * Deploy (Vercel + backend hospedado à parte, ex. Railway/Render): defina
 * VITE_API_BASE_URL com a URL completa (ex. https://api.meudominio.com) —
 * ela tem prioridade sobre o esquema host:porta local. Sem essa variável, o
 * build de produção continuaria tentando falar com "https://<domínio-da-
 * vercel>:8000", que não existe.
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

function explicitBaseUrl(): string | undefined {
  const override = import.meta.env.VITE_API_BASE_URL as string | undefined
  return override ? override.replace(/\/+$/, '') : undefined
}

export function getApiBaseUrl(): string {
  const explicit = explicitBaseUrl()
  if (explicit) return explicit
  return `http://${resolveHost()}:${BACKEND_PORT}`
}

/** `token` é obrigatório no backend — a conexão é recusada sem ele. */
export function getStatusWsUrl(sessionId: string, token: string): string {
  const path = `/ws/status/${encodeURIComponent(sessionId)}`
  const query = `?token=${encodeURIComponent(token)}`

  const explicit = explicitBaseUrl()
  if (explicit) {
    const wsBase = explicit.replace(/^http/, 'ws')
    return `${wsBase}${path}${query}`
  }

  const protocol = typeof window !== 'undefined' && window.location.protocol === 'https:' ? 'wss' : 'ws'
  return `${protocol}://${resolveHost()}:${BACKEND_PORT}${path}${query}`
}
