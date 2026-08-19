import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { SessionConnect } from './SessionConnect'
import { BackendApiError, getSessionByExternalId } from '../../lib/backendApi'
import { getActiveSessionId } from '../../lib/activeSession'

vi.mock('../../lib/backendApi', async () => {
  const actual = await vi.importActual<typeof import('../../lib/backendApi')>(
    '../../lib/backendApi',
  )
  return { ...actual, getSessionByExternalId: vi.fn() }
})

const mockedGetSession = vi.mocked(getSessionByExternalId)

beforeEach(() => {
  localStorage.clear()
  mockedGetSession.mockReset()
})

function renderConnect() {
  return render(
    <MemoryRouter>
      <SessionConnect redirectTo={(id) => `/patient/communicate?session=${id}`} />
    </MemoryRouter>,
  )
}

describe('SessionConnect', () => {
  it('salva a sessão ativa quando o backend confirma que ela existe', async () => {
    mockedGetSession.mockResolvedValueOnce({
      id: 1,
      organization_id: 1,
      patient_id: 1,
      device_id: 1,
      external_session_id: 'sess-demo-001',
      status: 'active',
      started_at: new Date().toISOString(),
      ended_at: null,
    })
    const user = userEvent.setup()
    renderConnect()

    await user.type(screen.getByLabelText('Identificador da sessão'), 'sess-demo-001')
    await user.click(screen.getByRole('button', { name: /conectar/i }))

    await waitFor(() => expect(getActiveSessionId()).toBe('sess-demo-001'))
  })

  it('mostra erro quando a sessão não existe ou o usuário não tem acesso', async () => {
    mockedGetSession.mockRejectedValueOnce(new BackendApiError(404, 'não encontrada'))
    const user = userEvent.setup()
    renderConnect()

    await user.type(screen.getByLabelText('Identificador da sessão'), 'sess-inexistente')
    await user.click(screen.getByRole('button', { name: /conectar/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(/não encontrada|acesso/i)
    expect(getActiveSessionId()).toBeNull()
  })

  it('não deixa enviar em branco', async () => {
    const user = userEvent.setup()
    renderConnect()

    await user.click(screen.getByRole('button', { name: /conectar/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(/informe/i)
    expect(mockedGetSession).not.toHaveBeenCalled()
  })
})
