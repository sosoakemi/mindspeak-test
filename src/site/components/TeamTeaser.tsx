import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { teamMembers } from '../data/teamMembers'
import { Reveal } from './Reveal'
import TeamCard from './team/TeamCard'

export default function TeamTeaser() {
  return (
    <section className="bg-white px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col items-center text-center">
          <span className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-teal-500">
            Quem Constrói
          </span>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            <span className="text-navy-900">Cinco estudantes, um </span>
            <span className="text-teal-500">projeto de TCC</span>
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-500">
            Ensino Médio Técnico — hardware, software, IA, design e pesquisa, tudo construído pelo time.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
          {teamMembers.map((member, i) => (
            <Reveal key={member.name} delay={i * 80}>
              <TeamCard member={member} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={250} className="mt-12 flex justify-center">
          <Link
            to="/equipe"
            className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800 active:scale-[0.97] dark:bg-teal-600 dark:hover:bg-teal-500"
          >
            Conheça toda a equipe
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
