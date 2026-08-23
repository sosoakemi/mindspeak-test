import { Link } from 'react-router-dom'
import { MindSpeakLogo } from '../../../components/brand/MindSpeakLogo'

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.75" />
      <path d="M7 10v7M7 7v.01" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path
        d="M11 17v-4c0-1.5 1-2.5 2.5-2.5S16 11.5 16 13v4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  )
}

const navigationLinks = [
  { label: 'Projeto', to: '/' },
  { label: 'Instruções', to: '/instrucoes' },
  { label: 'Produto', to: '/produto' },
  { label: 'Equipe', to: '/equipe' },
  { label: 'Referências', to: '/referencias' },
  { label: 'Jogo', to: '/jogo' },
]

const resourceLinks = [
  { label: 'Manual de Uso', to: '/instrucoes' },
  { label: 'GitHub', href: '#' },
  { label: 'EntreSinapses', to: '/jogo' },
]

const socialLinks = [
  { icon: LinkedinIcon, label: 'LinkedIn', href: '#' },
  { icon: GithubIcon, label: 'GitHub', href: '#' },
  { icon: InstagramIcon, label: 'Instagram', href: '#' },
]

export default function InstructionsFooter() {
  return (
    <footer className="border-t border-slate-100 bg-white px-6 py-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center">
            <MindSpeakLogo layout="horizontal" size="sm" />
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Sistema de comunicação assistiva de baixo custo usando Interface
            Cérebro-Computador (BCI).
          </p>
          <div className="mt-6 flex gap-3">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:border-teal-500/30 hover:bg-teal-500/5 hover:text-teal-600"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-800">
            Navegação
          </h3>
          <ul className="mt-4 space-y-3">
            {navigationLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-sm text-slate-600 transition-colors hover:text-teal-600"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-800">
            Recursos
          </h3>
          <ul className="mt-4 space-y-3">
            {resourceLinks.map((link) => (
              <li key={link.label}>
                {'to' in link && link.to ? (
                  <Link
                    to={link.to}
                    className="text-sm text-slate-600 transition-colors hover:text-teal-600"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors hover:text-teal-600"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-800">
            Equipe
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            5 estudantes do 3º ano do Ensino Médio Técnico
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Sophia, Pedro, Edna, Erika + 4 membros
          </p>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-slate-100 pt-8 text-center">
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} MindSpeak. Todos os direitos reservados.
          Projeto estudantil.
        </p>
      </div>
    </footer>
  )
}
