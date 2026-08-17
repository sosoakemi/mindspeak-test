export type TeamMember = {
  name: string
  role: string
  image: string
  socials: {
    linkedin?: string
    github?: string
    instagram?: string
  }
}

export const teamMembers: TeamMember[] = [
  {
    name: 'Sophia Akemi',
    role: 'Líder do Projeto / Desenvolvedora Full Stack',
    image: '/images/team/sophia-akemi.png',
    socials: { linkedin: '#', github: '#', instagram: '#' },
  },
  {
    name: 'Gabriel José',
    role: 'Hardware / Firmware',
    image: '/images/team/gabriel-jose.png',
    socials: { linkedin: '#', github: '#', instagram: '#' },
  },
  {
    name: 'Lara Freitas',
    role: 'Designer Game',
    image: '/images/team/lara-freitas.png',
    socials: { linkedin: '#', github: '#', instagram: '#' },
  },
  {
    name: 'Guilherme Totte',
    role: 'Game Dev',
    image: '/images/team/guilherme-totte.png',
    socials: { linkedin: '#', github: '#', instagram: '#' },
  },
  {
    name: 'Sophia Santana',
    role: 'Pesquisa / Documentação',
    image: '/images/team/sophia-santana.png',
    socials: { linkedin: '#', github: '#', instagram: '#' },
  },
]
