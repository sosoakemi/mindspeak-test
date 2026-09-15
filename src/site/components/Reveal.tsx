import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  /** Atraso em ms antes da animação começar (útil pra escalonar itens de uma lista) */
  delay?: number
  className?: string
}

/**
 * Revela o conteúdo com um fade + leve deslocamento vertical quando ele
 * entra na viewport. Usa IntersectionObserver (dispara uma vez só) e
 * respeita `prefers-reduced-motion` — sem isso a animação nunca é sutil
 * o bastante pra quem tem sensibilidade a movimento.
 *
 * Conteúdo que já está visível no primeiro frame (acima da dobra) aparece
 * direto, sem fade — o IntersectionObserver só dispara depois do primeiro
 * paint, e sem essa checagem síncrona dava um "flash" de invisível em tudo
 * que já estava na tela ao carregar a página.
 */
export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [instant, setInstant] = useState(false)

  useLayoutEffect(() => {
    const node = ref.current
    if (!node) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const alreadyInView = node.getBoundingClientRect().top < window.innerHeight

    if (prefersReducedMotion || alreadyInView) {
      setInstant(true)
      setVisible(true)
      if (prefersReducedMotion) return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`${instant ? '' : 'transition-all duration-700 ease-out'} ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className}`}
      style={{ transitionDelay: !instant && visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}

export default Reveal
