import { beforeEach, describe, expect, it } from 'vitest'
import {
  clearAuthSession,
  getAccessToken,
  getAuthSession,
  saveAuthSession,
} from './authSession'

const PAYLOAD = {
  accessToken: 'token-123',
  user: {
    id: 1,
    email: 'ana@hospital.example',
    fullName: 'Dra. Ana',
    role: 'clinician' as const,
    organizationId: 7,
  },
}

beforeEach(() => {
  localStorage.clear()
})

describe('authSession', () => {
  it('retorna null quando não há sessão salva', () => {
    expect(getAuthSession()).toBeNull()
    expect(getAccessToken()).toBeNull()
  })

  it('salva e recupera a sessão exatamente como foi salva', () => {
    saveAuthSession(PAYLOAD)
    expect(getAuthSession()).toEqual(PAYLOAD)
    expect(getAccessToken()).toBe('token-123')
  })

  it('limpa a sessão', () => {
    saveAuthSession(PAYLOAD)
    clearAuthSession()
    expect(getAuthSession()).toBeNull()
  })

  it('ignora dado corrompido no localStorage em vez de quebrar', () => {
    localStorage.setItem('mindspeak_auth_session', '{ isto não é json')
    expect(getAuthSession()).toBeNull()
  })

  it('ignora dado com formato inesperado (sem os campos certos)', () => {
    localStorage.setItem('mindspeak_auth_session', JSON.stringify({ foo: 'bar' }))
    expect(getAuthSession()).toBeNull()
  })

  it('aceita organizationId nulo (cuidador sem organização ainda)', () => {
    saveAuthSession({ ...PAYLOAD, user: { ...PAYLOAD.user, organizationId: null } })
    expect(getAuthSession()?.user.organizationId).toBeNull()
  })
})
