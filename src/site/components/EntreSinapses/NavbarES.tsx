import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { MindSpeakLogo } from '../../../components/brand/MindSpeakLogo'
import SiteThemeToggle from '../SiteThemeToggle'

const navLinks = [
  { label: 'Projeto', to: '/' },
  { label: 'Instruções', to: '/instrucoes' },
  { label: 'Produto', to: '/#produto' },
  { label: 'Equipe', to: '/equipe' },
  { label: 'Referências', to: '/referencias' },
  { label: 'Jogo', to: '/jogo' },
]

export default function NavbarES() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-[#030712]/95">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6 lg:px-8"
        aria-label="Navegação principal"
      >
        <Link to="/" className="flex min-w-0 shrink-0 items-center">
          <MindSpeakLogo layout="horizontal" size="sm" />
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const isActive =
              link.to === '/'
                ? location.pathname === '/'
                : link.to === '/instrucoes'
                  ? location.pathname === '/instrucoes'
                  : link.to === '/equipe'
                    ? location.pathname === '/equipe'
                    : link.to === '/referencias'
                      ? location.pathname === '/referencias'
                      : link.to === '/jogo'
                        ? location.pathname === '/jogo'
                        : false

            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`text-sm font-medium transition-colors hover:text-teal-500 dark:hover:text-teal-400 ${
                    isActive
                      ? 'text-teal-500 dark:text-teal-400'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <SiteThemeToggle className="text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-gray-100" />

          <button
            type="button"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            className="rounded-lg p-2 text-slate-600 dark:text-slate-200 lg:hidden"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 dark:border-slate-800 dark:bg-[#030712] sm:px-6 lg:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="block text-sm font-medium text-slate-700 transition-colors hover:text-teal-500 dark:text-slate-200 dark:hover:text-teal-400"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
