export const mockProfessional = {
  name: 'Dra. Marina Arantes',
  role: 'Neurologia · UTI',
}

export const mockPatient = {
  name: 'João P. Silva',
  bed: 'UTI 12 · Leito B',
  diagnosis: 'ALS · suporte ventilatório',
  sensorConnected: true,
  lastSelection: 'ÁGUA',
  lastSelectionAt: '14:22',
}

export type AlertSeverity = 'critico' | 'moderado' | 'informativo'

export const severityMeta: Record<
  AlertSeverity,
  { label: string; badgeClass: string; rowClass: string }
> = {
  critico: {
    label: 'Crítico',
    badgeClass: 'bg-red-100 text-red-800 ring-red-200',
    rowClass: 'border-l-4 border-red-500',
  },
  moderado: {
    label: 'Moderado',
    badgeClass: 'bg-amber-100 text-amber-900 ring-amber-200',
    rowClass: 'border-l-4 border-amber-400',
  },
  informativo: {
    label: 'Informativo',
    badgeClass: 'bg-emerald-50 text-emerald-900 ring-emerald-100',
    rowClass: 'border-l-4 border-emerald-400',
  },
}

export function severityFromPhrase(phrase: string): AlertSeverity {
  const p = phrase.toUpperCase()
  if (p.includes('DOR') || p.includes('AJUDA')) return 'critico'
  if (p.includes('CHAMAR')) return 'moderado'
  return 'informativo'
}

export const mockAlerts = [
  {
    id: 'a1',
    time: '14:22',
    phrase: 'ESTOU COM DOR',
    read: false,
  },
  {
    id: 'a2',
    time: '13:58',
    phrase: 'PRECISO DE AJUDA',
    read: false,
  },
  {
    id: 'a3',
    time: '12:10',
    phrase: 'CHAMAR ALGUÉM',
    read: true,
  },
  {
    id: 'a4',
    time: '11:02',
    phrase: 'ÁGUA',
    read: true,
  },
] as const

export const mockDayStats = {
  totalSelections: 128,
  accuracyPct: 97.4,
  avgTimeSec: 2.1,
}
