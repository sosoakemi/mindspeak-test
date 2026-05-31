import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export function useMobileSidebar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const close = useCallback(() => setOpen(false), [])
  const openSidebar = useCallback(() => setOpen(true), [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return { open, close, openSidebar, setOpen }
}
