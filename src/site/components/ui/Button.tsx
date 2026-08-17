import { ArrowRight } from 'lucide-react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  showArrow?: boolean
}

export default function Button({ children, showArrow = false, className = '', ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-teal-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-teal-600 dark:hover:bg-teal-500 ${className}`}
      {...props}
    >
      {children}
      {showArrow && <ArrowRight className="h-4 w-4" strokeWidth={2} />}
    </button>
  )
}
