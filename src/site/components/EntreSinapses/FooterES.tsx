// Footer for Entre Sinapses page — light, white theme matching Figma design
import { Brain } from 'lucide-react'
import { Link } from 'react-router-dom'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
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

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.75" />
      <path d="M10 9.5v5l5-2.5-5-2.5z" fill="currentColor" />
    </svg>
  )
}

const columns = [
  {
    title: 'Conteúdo',
    links: [
      { label: 'Início', href: '#inicio' },
      { label: 'A História', href: '#historia' },
      { label: 'Personagens', href: '#personagens' },
      { label: 'Gameplay', href: '#videos' },
      { label: 'Jogar', href: '#aventura' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { label: 'Não perca nada', href: '#' },
      { label: 'Sobre o Projeto', href: '#' },
      { label: 'Blog', href: '#' },
    ],
  },
  {
    title: 'Suporte',
    links: [
      { label: 'Não perca nada', href: '#' },
      { label: 'Contato', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Termos de Uso', href: '#' },
    ],
  },
]

export default function FooterES() {
  return (
    <footer className="border-t border-slate-100 bg-white px-6 py-14 lg:px-8">
      <div className="mx-auto max-w-7xl grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
        {/* Brand col */}
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2.5 mb-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600">
              <Brain className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <span className="font-display text-lg font-semibold text-navy-900">
              MindSpeak
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-slate-500 max-w-xs">
            Transformando pensamentos em comunicação. Uma jornada pelo universo
            das sinapses cerebrais.
          </p>
          {/* Social icons */}
          <div className="mt-5 flex gap-2.5">
            {[
              { Icon: InstagramIcon, label: 'Instagram' },
              { Icon: LinkedinIcon, label: 'LinkedIn' },
              { Icon: YoutubeIcon, label: 'YouTube' },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-teal-400/50 hover:text-teal-600"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-800 mb-4">
              {col.title}
            </h3>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors hover:text-teal-600"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="mx-auto mt-12 max-w-7xl border-t border-slate-100 pt-7 text-center">
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} MindSpeak — Entre Sinapses. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
