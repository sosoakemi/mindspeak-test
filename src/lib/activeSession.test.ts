import { beforeEach, describe, expect, it } from 'vitest'
import { clearActiveSessionId, getActiveSessionId, setActiveSessionId } from './activeSession'

beforeEach(() => {
  localStorage.clear()
})

describe('activeSession', () => {
  it('retorna null quando nenhuma sessão foi conectada ainda', () => {
    expect(getActiveSessionId()).toBeNull()
  })

  it('salva e recupera o id da sessão ativa', () => {
    setActiveSessionId('sess-demo-001')
    expect(getActiveSessionId()).toBe('sess-demo-001')
  })

  it('limpa a sessão ativa', () => {
    setActiveSessionId('sess-demo-001')
    clearActiveSessionId()
    expect(getActiveSessionId()).toBeNull()
  })
})
