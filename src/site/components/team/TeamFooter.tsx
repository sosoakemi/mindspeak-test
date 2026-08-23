import { Link } from 'react-router-dom'
import { MindSpeakLogo } from '../../../components/brand/MindSpeakLogo'
import { GithubIcon, InstagramIcon, LinkedinIcon } from '../ui/SocialIcons'

const navigationLinks = [
  { label: 'Projeto', to: '/' },
  { label: 'Instruções', to: '/instrucoes' },
  { label: 'Produto', to: '/#produto' },
  { label: 'Equipe', to: '/equipe' },
  { label: 'Referências', to: '/referencias' },
  { label: 'Jogo', to: '/jogo' },
]

const resourceLinks = [
  { label: 'Manual de Uso', to: '/instrucoes' },
  { label: 'GitHub', href: '#' },
  { label: 'Entre Sinapses (Jogo)', to: '/jogo' },
]

const socialLinks = [
  { icon: LinkedinIcon, label: 'LinkedIn', href: '#' },
  { icon: GithubIcon, label: 'GitHub', href: '#' },
  { icon: InstagramIcon, label: 'Instagram', href: '#' },
]

export default function TeamFooter() {
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
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-teal-500/30 hover:bg-teal-500/5 hover:text-teal-600"
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
            Sophia Akemi Silva Itioka + 4 membros
          </p>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 text-xs text-slate-500 sm:flex-row">
        <p>
          © 2026 MindSpeak. Todos os direitos reservados. Projeto estudantil.
        </p>
        <p className="text-center uppercase tracking-[0.08em] sm:text-right">
          Criado com paixão por tecnologia acessível
        </p>
      </div>
    </footer>
  )
}
