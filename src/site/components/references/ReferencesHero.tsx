import { FileText } from 'lucide-react'

export default function ReferencesHero() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      {/* Brain Watermark Background */}
      <div 
        className="pointer-events-none absolute -right-16 top-0 h-96 w-96 select-none opacity-5 sm:right-0 md:right-12 lg:right-24 lg:opacity-[0.06]"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 200 200"
          className="h-full w-full text-teal-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          {/* Left Hemisphere Outline */}
          <path d="M100 30 C 70 30, 45 45, 45 75 C 45 105, 65 110, 65 125 C 65 135, 75 145, 85 145 C 90 145, 95 140, 100 140" />
          {/* Right Hemisphere Outline */}
          <path d="M100 30 C 130 30, 155 45, 155 75 C 155 105, 135 110, 135 125 C 135 135, 125 145, 115 145 C 110 145, 105 140, 100 140" strokeLinecap="round" />
          
          {/* Midline */}
          <path d="M100 30 L100 140" strokeDasharray="3 3" />
          
          {/* Neural Connections / Nodes (Left) */}
          <circle cx="70" cy="55" r="3" fill="currentColor" />
          <circle cx="60" cy="85" r="2.5" fill="currentColor" />
          <circle cx="85" cy="80" r="3.5" fill="currentColor" />
          <circle cx="75" cy="110" r="2" fill="currentColor" />
          <circle cx="90" cy="120" r="3" fill="currentColor" />
          
          {/* Neural Connections / Nodes (Right) */}
          <circle cx="130" cy="55" r="3" fill="currentColor" />
          <circle cx="140" cy="85" r="2.5" fill="currentColor" />
          <circle cx="115" cy="80" r="3.5" fill="currentColor" />
          <circle cx="125" cy="110" r="2" fill="currentColor" />
          <circle cx="110" cy="120" r="3" fill="currentColor" />
          
          {/* Connection Lines (Left) */}
          <line x1="70" y1="55" x2="60" y2="85" />
          <line x1="70" y1="55" x2="85" y2="80" />
          <line x1="60" y1="85" x2="75" y2="110" />
          <line x1="85" y1="80" x2="75" y2="110" />
          <line x1="85" y1="80" x2="90" y2="120" />
          <line x1="75" y1="110" x2="90" y2="120" />
          <line x1="100" y1="30" x2="70" y2="55" strokeDasharray="2 2" />
          <line x1="100" y1="140" x2="90" y2="120" strokeDasharray="2 2" />
          
          {/* Connection Lines (Right) */}
          <line x1="130" y1="55" x2="140" y2="85" />
          <line x1="130" y1="55" x2="115" y2="80" />
          <line x1="140" y1="85" x2="125" y2="110" />
          <line x1="115" y1="80" x2="125" y2="110" />
          <line x1="115" y1="80" x2="110" y2="120" />
          <line x1="125" y1="110" x2="110" y2="120" />
          <line x1="100" y1="30" x2="130" y2="55" strokeDasharray="2 2" />
          <line x1="100" y1="140" x2="110" y2="120" strokeDasharray="2 2" />
          
          {/* Pulse/Glow circles */}
          <circle cx="85" cy="80" r="7" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 2" />
          <circle cx="115" cy="80" r="7" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 2" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-8">
        {/* Badge Pill */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-teal-600 sm:text-xs">
            <FileText className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={2.5} />
            Referências
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-navy-900 sm:text-5xl md:text-6xl">
          Embasamento <span className="block text-teal-600 sm:inline-block">Científico</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-slate-500 sm:max-w-2xl sm:text-base md:text-lg">
          Pesquisa validada por especialistas. Cada decisão do projeto foi
          fundamentada em literatura científica reconhecida.
        </p>
      </div>
    </section>
  )
}
