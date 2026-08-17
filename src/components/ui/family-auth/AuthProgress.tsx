type AuthProgressProps = {
  current: number
  total: number
}

export function AuthProgress({ current, total }: AuthProgressProps) {
  return (
    <div className="flex gap-1.5" role="progressbar" aria-valuenow={current} aria-valuemin={1} aria-valuemax={total} aria-label={`Etapa ${current} de ${total}`}>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className="h-1 w-8 rounded-full transition-colors sm:w-10"
          style={{
            backgroundColor: i < current ? 'var(--fa-progress-active)' : 'var(--fa-progress-inactive)',
          }}
          aria-hidden
        />
      ))}
    </div>
  )
}
