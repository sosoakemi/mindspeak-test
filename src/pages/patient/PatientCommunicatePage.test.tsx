import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { PatientCommunicatePage } from './PatientCommunicatePage'
import { ThemeProvider } from '../../theme/ThemeProvider'
import { savePatientSession } from '../../lib/patientSession'
import { getEightPhrases } from '../../data/patientPhrases'
import { getTodaySelectionCount } from '../../lib/patientStats'

// A página fala por síntese de voz e abre WebSocket em sessão ao vivo —
// nenhum dos dois existe no jsdom. Aqui só interessa o atalho de teclado.
vi.mock('../../lib/speech', () => ({
  isSpeechSupported: () => true,
  listVoices: () => [],
  primeSpeech: () => {},
  speakTextAI: vi.fn(() => Promise.resolve()),
}))

// jsdom não implementa speechSynthesis; a página escuta 'voiceschanged'.
Object.defineProperty(window, 'speechSynthesis', {
  configurable: true,
  value: { addEventListener: () => {}, removeEventListener: () => {}, getVoices: () => [] },
})

// jsdom não implementa matchMedia, de que o ThemeProvider depende.
window.matchMedia = window.matchMedia ?? ((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: () => {},
  removeEventListener: () => {},
  addListener: () => {},
  removeListener: () => {},
  dispatchEvent: () => false,
}) as unknown as MediaQueryList)

beforeEach(() => {
  localStorage.clear()
  savePatientSession({
    patientId: '1',
    patientName: 'Teste',
    connectedAt: new Date().toISOString(),
  })
})

function renderPage() {
  return render(
    <ThemeProvider>
      <MemoryRouter>
        <PatientCommunicatePage />
      </MemoryRouter>
    </ThemeProvider>,
  )
}

describe('PatientCommunicatePage — atalho de confirmação', () => {
  it('não confirma nada enquanto a varredura não está rodando', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.keyboard('a')

    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
    expect(getTodaySelectionCount()).toBe(0)
  })

  it('confirma a palavra destacada quando a varredura está rodando', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole('button', { name: /iniciar demo/i }))
    await user.keyboard('a')

    const overlay = await screen.findByRole('alertdialog', { name: /confirma/i })
    // A varredura começa no índice 0, então é a 1ª palavra da grade.
    expect(overlay).toHaveTextContent(getEightPhrases()[0])
    expect(getTodaySelectionCount()).toBe(1)
  })

  it('a tecla C adianta a varredura sem confirmar nada', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole('button', { name: /iniciar demo/i }))
    const [primeira] = getEightPhrases()
    expect(screen.getByRole('listitem', { current: 'step' })).toHaveTextContent(primeira)

    await user.keyboard('c')

    await waitFor(() =>
      expect(screen.getByRole('listitem', { current: 'step' })).not.toHaveTextContent(primeira),
    )
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
    expect(getTodaySelectionCount()).toBe(0)
  })

  it('ignora toques repetidos enquanto a confirmação está na tela', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole('button', { name: /iniciar demo/i }))
    await user.keyboard('a')
    await screen.findByRole('alertdialog')
    await user.keyboard('aaa')

    await waitFor(() => expect(getTodaySelectionCount()).toBe(1))
  })
})
