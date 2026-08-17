import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { motion } from 'framer-motion'
import { MindSpeakLogo } from '../../components/brand/MindSpeakLogo'
import { ThemeToggle } from '../../components/shared/ThemeToggle'
import {
  AccessSelector,
  ContinueButton,
  SecureAccessContainer,
  type PortalType,
} from '../../components/ui/secure-access'

const portalRoutes: Record<PortalType, string> = {
  familiar: '/familiar/login',
  clinico: '/clinico/login',
}

export function AccessSelectionPage() {
  const nav = useNavigate()
  const [selected, setSelected] = useState<PortalType | null>(null)

  const handleContinue = () => {
    if (!selected) return
    nav(portalRoutes[selected])
  }

  return (
    <div
      data-secure-access
      className="flex min-h-dvh min-w-0 flex-col overflow-x-hidden bg-[var(--sa-bg)] text-[var(--sa-card-text)]"
    >
      <header className="relative z-10 flex items-center justify-between gap-4 px-4 py-6 sm:px-6 sm:py-8">
        <div className="w-24" aria-hidden />
        <MindSpeakLogo layout="horizontal" size="md" className="justify-center" />
        <div className="flex w-24 shrink-0 items-center justify-end gap-2">
          <ThemeToggle size="compact" />
          <button
            type="button"
            onClick={() => nav(-1)}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[var(--sa-card-icon-bg)] bg-white px-3 text-sm font-medium text-[var(--sa-card-muted)] shadow-sm transition hover:bg-[var(--sa-bg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sa-continue)] dark:border-[var(--sa-card-icon-bg)] dark:bg-[var(--sa-card-bg)]"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-4 pb-8 sm:px-6 sm:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full"
        >
          <SecureAccessContainer>
            <AccessSelector value={selected} onChange={setSelected} />
            <ContinueButton disabled={!selected} onClick={handleContinue} />
          </SecureAccessContainer>
        </motion.div>
      </main>

      <footer className="relative z-10 px-4 py-8 text-center">
        <p className="text-xs text-[var(--sa-footer)] sm:text-sm">
          © MindSpeak Technologies. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  )
}
