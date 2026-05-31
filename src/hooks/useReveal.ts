import { useEffect, useRef, useState, type RefObject } from 'react'

export function useReveal<T extends HTMLElement = HTMLElement>(): {
  ref: RefObject<T | null>
  visible: boolean
} {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || visible) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true)
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [visible])

  return { ref, visible }
}

export function useCountUp(target: number, durationMs: number, active: boolean) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) {
      setValue(0)
      return
    }
    let start: number | null = null
    let raf = 0
    const step = (t: number) => {
      if (start == null) start = t
      const p = Math.min(1, (t - start) / durationMs)
      setValue(Math.round(target * p))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, durationMs, active])

  return value
}
