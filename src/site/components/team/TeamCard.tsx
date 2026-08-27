import type { TeamMember } from '../../data/teamMembers'
import { GithubIcon, InstagramIcon, LinkedinIcon } from '../ui/SocialIcons'

type TeamCardProps = {
  member: TeamMember
}

export default function TeamCard({ member }: TeamCardProps) {
  const socialItems = [
    { key: 'linkedin', href: member.socials.linkedin, icon: LinkedinIcon, label: 'LinkedIn' },
    { key: 'github', href: member.socials.github, icon: GithubIcon, label: 'GitHub' },
    { key: 'instagram', href: member.socials.instagram, icon: InstagramIcon, label: 'Instagram' },
  ] as const

  return (
    <article className="flex flex-col rounded-xl bg-navy-900 p-4">
      <div className="overflow-hidden rounded-lg">
        <img
          src={member.image}
          alt={`Foto de ${member.name}`}
          className="aspect-square w-full object-cover object-top"
        />
      </div>

      <h3 className="mt-4 font-display text-base font-semibold text-white">
        {member.name}
      </h3>

      <p className="mt-1 min-h-[2.5rem] text-sm leading-snug text-teal-400">
        {member.role}
      </p>

      <div className="mt-4 flex justify-center gap-2">
        {socialItems.map(({ key, href, icon: Icon, label }) =>
          href ? (
            <a
              key={key}
              href={href}
              aria-label={`${label} de ${member.name}`}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500/15 text-teal-400 transition-colors hover:bg-teal-500/25 hover:text-teal-300"
            >
              <Icon className="h-3.5 w-3.5" />
            </a>
          ) : null,
        )}
      </div>
    </article>
  )
}
