import { useRef, useState, type CSSProperties, type MouseEvent } from 'react'
import { cn } from '../../lib/cn'

type TiltImageProps = {
  src: string
  alt: string
  className?: string
}

const MAX_TILT_DEG = 10
const RESET_STYLE: CSSProperties = {
  transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
}

/**
 * Imagem com rotação 3D em CSS que segue o cursor (tilt) + leve zoom no
 * hover — só ativa com mouse (em touch simplesmente não dispara mousemove,
 * a imagem fica estática, o que é o comportamento correto lá).
 */
export function TiltImage({ src, alt, className }: TiltImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState<CSSProperties>(RESET_STYLE)

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    const rotateY = (px - 0.5) * 2 * MAX_TILT_DEG
    const rotateX = -(py - 0.5) * 2 * MAX_TILT_DEG
    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`,
    })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setStyle(RESET_STYLE)}
      className={cn('transition-transform duration-200 ease-out will-change-transform', className)}
      style={style}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" draggable={false} />
    </div>
  )
}
