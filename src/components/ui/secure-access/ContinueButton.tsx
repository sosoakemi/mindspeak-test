import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '../../../lib/cn'

type ContinueButtonProps = {
  disabled: boolean
  onClick: () => void
  className?: string
}

export function ContinueButton({ disabled, onClick, className }: ContinueButtonProps) {
  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onClick}
      initial={{ opacity: 0.6 }}
      animate={{ opacity: disabled ? 0.5 : 1 }}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'mt-8 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl px-6 text-sm font-bold uppercase tracking-wide text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sa-continue)] disabled:cursor-not-allowed disabled:bg-[var(--sa-continue-disabled)] sm:mt-10',
        !disabled && 'bg-[var(--sa-continue)] hover:bg-[var(--sa-continue-hover)]',
        className,
      )}
    >
      Continuar
      <ArrowRight className="h-4 w-4" aria-hidden />
    </motion.button>
  )
}
