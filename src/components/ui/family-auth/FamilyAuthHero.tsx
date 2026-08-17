import { Activity, Heart, Shield } from 'lucide-react'

type FamilyAuthHeroProps = {
  variant?: 'login' | 'register'
}

export function FamilyAuthHero({ variant = 'login' }: FamilyAuthHeroProps) {
  const isRegister = variant === 'register'

  return (
    <aside
      className="relative hidden min-h-[420px] overflow-hidden rounded-[var(--fa-radius)] border border-[var(--fa-border)]/50 bg-[var(--fa-surface)] shadow-[var(--fa-shadow)] lg:flex lg:flex-col lg:justify-between"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(145deg, var(--fa-badge-bg) 0%, var(--fa-surface) 42%, color-mix(in srgb, var(--fa-mint) 55%, var(--fa-surface)) 100%)',
        }}
      />
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[var(--fa-mint)]/40 blur-3xl" />
      <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-[var(--fa-badge-bg)] blur-3xl" />

      <div className="relative flex flex-1 flex-col justify-center p-8 xl:p-10">
        {isRegister ? (
          <span className="mb-5 inline-flex w-fit rounded-[var(--fa-radius-pill)] bg-[var(--fa-badge-bg)] px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--fa-badge-text)]">
            Início da jornada
          </span>
        ) : null}

        <h2 className="max-w-sm text-2xl font-bold leading-tight tracking-tight text-[var(--fa-text)] xl:text-3xl">
          {isRegister ? 'Cuidando de quem você ama.' : 'Acompanhamento próximo, com segurança clínica.'}
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--fa-text-muted)] sm:text-base">
          {isRegister
            ? 'Bem-vindo ao MindSpeak. Juntos, vamos facilitar a comunicação e o acompanhamento clínico através de inteligência BCI avançada.'
            : 'O Portal Familiar conecta você ao cuidado diário do paciente — com transparência, privacidade e suporte contínuo.'}
        </p>

        <ul className="mt-8 space-y-4">
          <li className="flex items-start gap-3 text-sm text-[var(--fa-text-secondary)]">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--fa-radius-sm)] bg-[var(--fa-surface)]/80 text-[var(--fa-link)] shadow-sm">
              <Heart className="h-4 w-4" aria-hidden />
            </span>
            <span>Comunicação assistida e acompanhamento em tempo real</span>
          </li>
          <li className="flex items-start gap-3 text-sm text-[var(--fa-text-secondary)]">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--fa-radius-sm)] bg-[var(--fa-surface)]/80 text-[var(--fa-link)] shadow-sm">
              <Activity className="h-4 w-4" aria-hidden />
            </span>
            <span>Sinais e histórico organizados para decisões informadas</span>
          </li>
          <li className="flex items-start gap-3 text-sm text-[var(--fa-text-secondary)]">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--fa-radius-sm)] bg-[var(--fa-surface)]/80 text-[var(--fa-link)] shadow-sm">
              <Shield className="h-4 w-4" aria-hidden />
            </span>
            <span>Dados protegidos com padrões de segurança em saúde</span>
          </li>
        </ul>
      </div>

      <div className="relative border-t border-[var(--fa-border)]/60 bg-[var(--fa-surface)]/70 px-8 py-5 backdrop-blur-sm">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--fa-text-muted)]">MindSpeak BCI</p>
        <p className="mt-1 text-sm text-[var(--fa-text-secondary)]">Tecnologia a serviço do cuidado humano.</p>
      </div>
    </aside>
  )
}
