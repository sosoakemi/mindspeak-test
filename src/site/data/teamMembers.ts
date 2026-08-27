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
    socials: {
      linkedin: 'https://www.linkedin.com/in/sophia-akemi-177208396/',
      github: 'https://github.com/sosoakemi',
      instagram:
        'https://www.instagram.com/sophiakemi__?igsi=MXMwaTFtajRvMndtMg%3D%3D&utm_source=qr',
    },
  },
  {
    name: 'Gabriel José',
    role: 'Hardware / Firmware',
    image: '/images/team/gabriel-jose.png',
    socials: {
      linkedin: 'https://www.linkedin.com/in/gabriel-josé-12a807398/',
      github: 'https://github.com/GABRIELJOSEDASILVAA11bti',
      instagram: 'https://www.instagram.com/gabriell.silvaz',
    },
  },
  {
    name: 'Lara Freitas',
    role: 'Designer Game',
    image: '/images/team/lara-freitas.png',
    socials: {
      linkedin: 'https://www.linkedin.com/in/lara-freitas-42ba28398/',
      github: 'https://github.com/larafreitass',
      instagram: 'https://www.instagram.com/laarafreits',
    },
  },
  {
    name: 'Guilherme Totte',
    role: 'Game Dev',
    image: '/images/team/guilherme-totte.png',
    // sem GitHub ainda — o ícone só aparece quando o link existe (ver TeamCard.tsx)
    socials: {
      linkedin: 'https://www.linkedin.com/in/guilhermetotte/',
      instagram: 'https://www.instagram.com/guilhermetotte?igsi=NHAxOGlpNDdiNmEw',
    },
  },
  {
    name: 'Sophia Santana',
    role: 'Pesquisa / Documentação',
    image: '/images/team/sophia-santana.png',
    socials: {
      linkedin: 'https://www.linkedin.com/in/sophia-s-790600361/',
      github: 'https://github.com/sophisantna',
      instagram: 'https://www.instagram.com/sophia_santna',
    },
  },
]
