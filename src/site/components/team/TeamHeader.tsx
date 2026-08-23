import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MindSpeakLogo } from '../../../components/brand/MindSpeakLogo'
import SiteThemeToggle from '../SiteThemeToggle'

const navLinks = [
  { label: 'Projeto', to: '/' },
  { label: 'Instruções', to: '/instrucoes' },
  { label: 'Produto', to: '/produto' },
  { label: 'Equipe', to: '/equipe' },
  { label: 'Referências', to: '/referencias' },
  { label: 'Jogo', to: '/jogo' },
]

export default function TeamHeader() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-[#020617]/95">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-4 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-4 lg:px-8"
        aria-label="Navegação principal"
      >
        <Link to="/" className="flex min-w-0 shrink-0 items-center justify-self-start lg:justify-self-start">
          <MindSpeakLogo layout="horizontal" size="sm" />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex lg:justify-self-center">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to

            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400'
                      : 'text-slate-600 hover:text-teal-600 dark:text-slate-300 dark:hover:text-teal-400'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center justify-self-end gap-1.5 sm:gap-2">
          <SiteThemeToggle className="text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-gray-100" />

          {isHome && (
            <Link
              to="/acesso"
              className="hidden rounded-lg bg-navy-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-800 active:scale-[0.98] dark:bg-teal-600 dark:hover:bg-teal-500 sm:inline-flex sm:items-center sm:justify-center"
            >
              Login
            </Link>
          )}

          <button
            type="button"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            className="rounded-lg p-2 text-slate-700 dark:text-slate-200 lg:hidden"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 dark:border-slate-800 dark:bg-[#020617] sm:px-6 lg:hidden">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to

              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                      isActive
                        ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400'
                        : 'text-slate-700 dark:text-slate-200'
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
            {isHome && (
              <li className="pt-2">
                <Link
                  to="/acesso"
                  className="flex w-full items-center justify-center rounded-lg bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800 dark:bg-teal-600 dark:hover:bg-teal-500"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  )
}
