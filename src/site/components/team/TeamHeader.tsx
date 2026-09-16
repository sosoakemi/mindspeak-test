import { Menu, X } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
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
  const [headerHeight, setHeaderHeight] = useState(0)
  const headerRef = useRef<HTMLElement>(null)
  const location = useLocation()
  const isHome = location.pathname === '/'

  // Mede a altura real do header (ela muda com o tema/tamanho da logo) pra
  // encostar o painel mobile exatamente abaixo dele, mesmo fora do DOM dele.
  useLayoutEffect(() => {
    const el = headerRef.current
    if (!el) return

    const update = () => setHeaderHeight(el.getBoundingClientRect().height)
    update()

    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Fecha o menu sempre que a rota muda (evita ficar "preso" aberto ao navegar).
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Trava o scroll da página por trás enquanto o menu mobile está aberto —
  // sem isso o fundo rola junto e o overlay parece "quebrado" no celular.
  useEffect(() => {
    if (!open) return

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-[#020617]/95"
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-4 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-4 lg:px-8"
        aria-label="Navegação principal"
      >
        <Link to="/" className="flex min-w-0 shrink items-center justify-self-start lg:shrink-0 lg:justify-self-start">
          {/* lg.header.rd.png é bem mais "largo" (462×44) que a versão
              escura (190×44) — a 32px de altura (size="sm") isso passa de
              300px de largura e, com shrink-0 no <img> base, empurrava o
              botão de menu pra fora da viewport em telas estreitas. Cap de
              largura só até o breakpoint lg, onde sobra espaço de sobra. */}
          <MindSpeakLogo
            layout="horizontal"
            size="sm"
            className="max-w-[140px] shrink sm:max-w-[200px] lg:max-w-none lg:shrink-0"
          />
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

        <div className="flex items-center justify-self-end gap-1 sm:gap-2">
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
            aria-controls="mobile-nav-panel"
            className="-mr-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-slate-100 active:bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-800 dark:active:bg-slate-700 lg:hidden"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Renderizado via portal em document.body: o header tem
          backdrop-blur (backdrop-filter), e um ancestral com filter/
          backdrop-filter vira "containing block" de filhos position:fixed —
          isso prendia o overlay e o painel dentro da faixa de ~70px do
          header, e cliques fora dela nunca fechavam o menu. Fora do header,
          o fixed volta a valer para a viewport inteira. */}
      {createPortal(
        <>
          {open && (
            <div
              className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[1px] lg:hidden"
              aria-hidden="true"
              onClick={() => setOpen(false)}
            />
          )}

          <div
            id="mobile-nav-panel"
            style={{ top: headerHeight }}
            className={`fixed inset-x-0 z-50 origin-top border-b border-slate-100 bg-white shadow-lg transition-all duration-200 ease-out dark:border-slate-800 dark:bg-[#020617] lg:hidden ${
              open
                ? 'visible translate-y-0 opacity-100'
                : 'invisible -translate-y-2 opacity-0'
            }`}
          >
            <ul className="flex flex-col divide-y divide-slate-100 px-4 py-2 dark:divide-slate-800 sm:px-6">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to

                return (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className={`flex min-h-[52px] items-center rounded-lg px-3 text-base font-medium transition-colors ${
                        isActive
                          ? 'text-teal-600 dark:text-teal-400'
                          : 'text-slate-700 hover:text-teal-600 dark:text-slate-200 dark:hover:text-teal-400'
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>

            {isHome && (
              <div className="px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-2 sm:px-6">
                <Link
                  to="/acesso"
                  className="flex w-full items-center justify-center rounded-lg bg-navy-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800 dark:bg-teal-600 dark:hover:bg-teal-500"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </>,
        document.body,
      )}
    </header>
  )
}
