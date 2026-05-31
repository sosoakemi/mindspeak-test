import { cn } from '../../lib/cn'

const MARK_SRC = '/favicon.svg'

const sizeMap = {
  sm: { mark: 'h-8 w-8', text: 'text-lg' },
  md: { mark: 'h-10 w-10', text: 'text-xl' },
  lg: { mark: 'h-12 w-12', text: 'text-2xl' },
} as const

export type MindSpeakLogoProps = {
  /** Ícone só, ou ícone + nome */
  layout?: 'mark' | 'horizontal'
  size?: keyof typeof sizeMap
  className?: string
  /** Classes do texto “MindSpeak” (cor, peso) */
  wordmarkClassName?: string
}

/**
 * Marca MindSpeak: os PNGs referenciados em `/logos/` não estão no repositório;
 * o símbolo em `public/favicon.svg` é a fonte única garantida no build.
 */
export function MindSpeakLogo({
  layout = 'horizontal',
  size = 'md',
  className,
  wordmarkClassName,
}: MindSpeakLogoProps) {
  const s = sizeMap[size]

  if (layout === 'mark') {
    return (
      <img
        src={MARK_SRC}
        alt="MindSpeak"
        width={48}
        height={46}
        className={cn(s.mark, 'shrink-0 object-contain', className)}
        decoding="async"
      />
    )
  }

  return (
    <div role="img" aria-label="MindSpeak" className={cn('flex items-center gap-2', className)}>
      <img
        src={MARK_SRC}
        alt=""
        width={48}
        height={46}
        className={cn(s.mark, 'shrink-0 object-contain')}
        decoding="async"
      />
      <span aria-hidden className={cn('font-semibold tracking-tight text-slate-900', s.text, wordmarkClassName)}>
        MindSpeak
      </span>
    </div>
  )
}
