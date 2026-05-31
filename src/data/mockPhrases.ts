import type { AlertSeverity } from './mockDashboard'

export type PhraseRow = {
  id: string
  text: string
  alert: AlertSeverity
  gridPosition: number
}

export const initialPhrases: PhraseRow[] = [
  { id: 'p1', text: 'SIM', alert: 'informativo', gridPosition: 1 },
  { id: 'p2', text: 'NÃO', alert: 'informativo', gridPosition: 2 },
  { id: 'p3', text: 'PRECISO DE AJUDA', alert: 'critico', gridPosition: 3 },
  { id: 'p4', text: 'ESTOU BEM', alert: 'informativo', gridPosition: 4 },
  { id: 'p5', text: 'ÁGUA', alert: 'informativo', gridPosition: 5 },
  { id: 'p6', text: 'OBRIGADO', alert: 'informativo', gridPosition: 6 },
  { id: 'p7', text: 'CHAMAR ALGUÉM', alert: 'moderado', gridPosition: 7 },
  { id: 'p8', text: 'ESTOU COM DOR', alert: 'critico', gridPosition: 8 },
]
