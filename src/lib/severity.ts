import { AlertTriangle, Info, ShieldAlert, type LucideIcon } from 'lucide-react'
import type { WordSeverity } from './backendApi'

// Apresentação da severidade. Vivia em data/mockDashboard.ts junto com os
// dados falsos, mas não é mock: é a tradução visual de um campo que agora
// existe no banco (words.severity).
//
// O que ficou para trás foi a função que adivinhava a severidade pelo
// texto da frase, procurando "DOR" e "AJUDA". Quem decide é o clínico, na
// tela de Frases — a heurística errava em qualquer vocabulário fora do
// exemplo e em qualquer outro idioma.
export const severityMeta: Record<
  WordSeverity,
  { label: string; icon: LucideIcon; badgeClass: string; rowClass: string }
> = {
  critico: {
    label: 'Crítico',
    icon: ShieldAlert,
    badgeClass: 'bg-red-100 text-red-800 ring-red-200 dark:bg-red-950/50 dark:text-red-200 dark:ring-red-900',
    rowClass: 'border-l-4 border-red-500',
  },
  moderado: {
    label: 'Moderado',
    icon: AlertTriangle,
    badgeClass:
      'bg-amber-100 text-amber-900 ring-amber-200 dark:bg-amber-950/50 dark:text-amber-200 dark:ring-amber-900',
    rowClass: 'border-l-4 border-amber-400',
  },
  informativo: {
    label: 'Informativo',
    icon: Info,
    badgeClass:
      'bg-emerald-50 text-emerald-900 ring-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-200 dark:ring-emerald-900',
    rowClass: 'border-l-4 border-emerald-400',
  },
}

export function formatTimeOfDay(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  } catch {
    return '—'
  }
}

export function formatDateTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return '—'
  }
}
