import { teamMembers } from '../../data/teamMembers'
import TeamCard from './TeamCard'

export default function TeamHeroSection() {
  return (
    <section className="team-grid-bg px-6 pb-20 pt-16 lg:px-8 lg:pb-24 lg:pt-20">
      <div className="mx-auto max-w-7xl text-center">
        <span className="inline-block rounded-full bg-teal-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-teal-600">
          Nossa equipe
        </span>

        <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl lg:text-[3.25rem]">
          <span className="text-teal-500">5</span> estudantes.{' '}
          <span className="text-teal-500">1</span> ideia.
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Somos estudantes do 3º ano do Ensino Médio Técnico, apaixonados por
          tecnologia e movidos pelo desejo de fazer a diferença na vida de quem
          precisa.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {teamMembers.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  )
}
