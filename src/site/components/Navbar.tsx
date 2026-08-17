import { useState } from 'react'
import { Brain, Menu, Search, User, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Projeto', to: '/' },
  { label: 'Instruções', to: '/instrucoes' },
  { label: 'Produto', to: '/#produto' },
  { label: 'Equipe', to: '/equipe' },
  { label: 'Referências', to: '/referencias' },
  { label: 'Jogo', to: '/jogo' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-900/95 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8"
        aria-label="Navegação principal"
      >
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500/15 text-teal-400">
            <Brain className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-white">
            MindSpeak
          </span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
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
                  className={`text-sm font-medium transition-colors hover:text-teal-400 ${
                    isActive ? 'text-teal-400' : 'text-slate-300'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            aria-label="Buscar"
            className="rounded-lg p-2 text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Perfil"
            className="rounded-lg p-2 text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
          >
            <User className="h-5 w-5" />
          </button>
        </div>

        <button
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          className="rounded-lg p-2 text-white lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-navy-900 px-6 py-4 lg:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="block text-sm font-medium text-slate-200"
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
