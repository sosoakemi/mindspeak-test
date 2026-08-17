import type { ReactNode } from 'react'
import { ClipboardList, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { PortalSelectionCard } from './PortalSelectionCard'

export type PortalType = 'familiar' | 'clinico'

type AccessSelectorProps = {
  value: PortalType | null
  onChange: (value: PortalType) => void
}

const options: {
  id: PortalType
  title: string
  description: string
  icon: ReactNode
}[] = [
  {
    id: 'familiar',
    title: 'Portal Familiar',
    description: 'Monitoramento e suporte para pacientes e familiares.',
    icon: <Users className="h-6 w-6" aria-hidden />,
  },
  {
    id: 'clinico',
    title: 'Portal Clínico',
    description: 'Gestão profissional e análise clínica especializada.',
    icon: <ClipboardList className="h-6 w-6" aria-hidden />,
  },
]

export function AccessSelector({ value, onChange }: AccessSelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Selecione o portal de acesso"
      className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6"
    >
      {options.map((option, index) => (
        <motion.div
          key={option.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 + index * 0.08, duration: 0.4, ease: 'easeOut' }}
        >
          <PortalSelectionCard
            title={option.title}
            description={option.description}
            icon={option.icon}
            selected={value === option.id}
            onSelect={() => onChange(option.id)}
          />
        </motion.div>
      ))}
    </div>
  )
}
