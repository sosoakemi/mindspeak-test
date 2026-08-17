import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '../../../lib/cn'

export type PortalSelectionCardProps = {
  title: string
  description: string
  icon: ReactNode
  selected: boolean
  onSelect: () => void
}

export function PortalSelectionCard({ title, description, icon, selected, onSelect }: PortalSelectionCardProps) {
  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      whileHover={{ scale: selected ? 1 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      animate={
        selected
          ? { scale: 1, boxShadow: 'var(--sa-card-selected-shadow)' }
          : { scale: 1, boxShadow: 'var(--sa-card-shadow)' }
      }
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className={cn(
        'relative w-full rounded-[var(--sa-radius-card)] border-2 p-6 text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sa-card-selected-border)] sm:p-8',
        selected
          ? 'border-[var(--sa-card-selected-border)] bg-[var(--sa-card-selected-bg)]'
          : 'border-transparent bg-[var(--sa-card-bg)] hover:shadow-[var(--sa-card-shadow)]',
      )}
    >
      {selected ? (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 24 }}
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--sa-card-selected-border)] text-white"
          aria-hidden
        >
          <Check className="h-4 w-4" strokeWidth={3} />
        </motion.span>
      ) : null}

      <span
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-xl transition-colors',
          selected
            ? 'bg-[var(--sa-card-selected-bg)] text-[var(--sa-card-selected-icon)] ring-2 ring-[var(--sa-card-selected-border)]/30'
            : 'bg-[var(--sa-card-icon-bg)] text-[var(--sa-card-muted)]',
        )}
      >
        {icon}
      </span>

      <h2 className="mt-5 text-lg font-bold text-[var(--sa-card-text)] sm:text-xl">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--sa-card-muted)]">{description}</p>
    </motion.button>
  )
}
