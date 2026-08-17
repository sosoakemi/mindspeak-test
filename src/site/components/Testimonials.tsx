/* ─── Testimonials — "O impacto que esperamos" ───────────────────────────── */

type Testimonial = {
  initials: string
  initialsColor: string
  name: string
  role: string
  quote: string
}

const testimonials: Testimonial[] = [
  {
    initials: 'DR',
    initialsColor: 'text-teal-500',
    name: 'Dr. Ricardo Oliveira',
    role: 'Neurologista',
    quote:
      '"Uma solução como o MindSpeak poderia revolucionar o atendimento de pacientes com ELA em estágios avançados, onde a comunicação tradicional já não é mais possível."',
  },
  {
    initials: 'MF',
    initialsColor: 'text-amber-500',
    name: 'Maria Fernanda',
    role: 'Fonoaudióloga',
    quote:
      '"O custo acessível é um diferencial enorme. Tecnologias assistivas de BCI comercialmente disponíveis são economicamente inviáveis para a maioria das famílias brasileiras."',
  },
  {
    initials: 'PC',
    initialsColor: 'text-sky-500',
    name: 'Prof. Carlos Mendes',
    role: 'Educador Tecnológico',
    quote:
      '"Projetos como esse mostram o poder da educação técnica aplicada a problemas reais. Estudantes de ensino médio criando soluções que podem salvar vidas."',
  },
]

export default function Testimonials() {
  return (
    <section className="bg-slate-50 px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">

        {/* Header — left-aligned */}
        <div className="mb-12">
          <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-teal-500">
            Depoimentos
          </span>
          <h2 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            <span className="text-navy-900">O impacto que </span>
            <span className="text-teal-500">esperamos</span>
          </h2>
        </div>

        {/* Cards row */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {testimonials.map(({ initials, initialsColor, name, role, quote }) => (
            <article
              key={name}
              className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              {/* Avatar + name/role */}
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold ${initialsColor}`}
                >
                  {initials}
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-bold text-navy-900">{name}</p>
                  <p className="text-xs text-slate-500">{role}</p>
                </div>
              </div>

              {/* Quote */}
              <p className="text-sm italic leading-relaxed text-slate-400">
                {quote}
              </p>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
