import type { LucideIcon } from 'lucide-react'
import {
  AlertCircle,
  CheckCircle2,
  Droplets,
  HelpCircle,
  Smile,
  SmilePlus,
  XCircle,
} from 'lucide-react'

/** Ícones para cards claros (dashboard) */
export const phraseIconLight: Record<string, { icon: LucideIcon; wrap: string }> = {
  SIM: { icon: CheckCircle2, wrap: 'bg-blue-100 text-blue-600 ring-blue-200/60' },
  NÃO: { icon: XCircle, wrap: 'bg-ms-subtle-strong text-ms-secondary ring-slate-200/80' },
  'PRECISO DE AJUDA': { icon: HelpCircle, wrap: 'bg-red-100 text-red-600 ring-red-200/60' },
  'ESTOU BEM': { icon: Smile, wrap: 'bg-emerald-100 text-emerald-600 ring-emerald-200/60' },
  ÁGUA: { icon: Droplets, wrap: 'bg-sky-100 text-sky-600 ring-sky-200/60' },
  OBRIGADO: { icon: SmilePlus, wrap: 'bg-amber-100 text-amber-700 ring-amber-200/70' },
  'CHAMAR ALGUÉM': { icon: HelpCircle, wrap: 'bg-violet-100 text-violet-700 ring-violet-200/60' },
  'ESTOU COM DOR': { icon: AlertCircle, wrap: 'bg-red-100 text-red-600 ring-red-200/60' },
}

/** Ícones para fundo escuro (modo comunicação) */
export const phraseIconDark: Record<string, { icon: LucideIcon; wrap: string }> = {
  SIM: { icon: CheckCircle2, wrap: 'bg-blue-500/25 text-sky-300 ring-1 ring-blue-400/40' },
  NÃO: { icon: XCircle, wrap: 'bg-slate-600/40 text-slate-200 ring-1 ring-slate-500/50' },
  'PRECISO DE AJUDA': { icon: HelpCircle, wrap: 'bg-red-500/25 text-red-200 ring-1 ring-red-400/40' },
  'ESTOU BEM': { icon: Smile, wrap: 'bg-emerald-500/25 text-emerald-200 ring-1 ring-emerald-400/40' },
  ÁGUA: { icon: Droplets, wrap: 'bg-sky-500/25 text-sky-200 ring-1 ring-sky-400/40' },
  OBRIGADO: { icon: SmilePlus, wrap: 'bg-amber-500/25 text-amber-100 ring-1 ring-amber-400/40' },
  'CHAMAR ALGUÉM': { icon: HelpCircle, wrap: 'bg-violet-500/25 text-violet-200 ring-1 ring-violet-400/40' },
  'ESTOU COM DOR': { icon: AlertCircle, wrap: 'bg-red-500/25 text-red-200 ring-1 ring-red-400/40' },
}

export function getPhraseVisual(word: string, theme: 'light' | 'dark') {
  const map = theme === 'dark' ? phraseIconDark : phraseIconLight
  return map[word] ?? { icon: CheckCircle2, wrap: theme === 'dark' ? 'bg-slate-600/40 text-white ring-1 ring-slate-500/50' : 'bg-ms-subtle-strong text-ms-secondary ring-slate-200' }
}
