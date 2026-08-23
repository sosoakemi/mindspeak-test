import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden"
      style={{
        // último stop casado com o fundo escuro do site (#020617) para a
        // transição para a seção seguinte (vídeo do protótipo) ficar sem costura
        background: 'radial-gradient(ellipse 80% 70% at 50% 40%, #0a1628 0%, #050b14 60%, #020617 100%)',
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── Constellation background ─────────────────────────────────── */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Concentric orbit rings */}
        {[180, 300, 430, 570, 720].map((r, i) => (
          <circle
            key={r}
            cx="50%"
            cy="48%"
            r={r}
            fill="none"
            stroke="rgba(45,212,191,0.045)"
            strokeWidth="1"
            opacity={1 - i * 0.12}
          />
        ))}

        {/* Static star dots */}
        {[
          [12, 18], [88, 12], [5, 72], [95, 65], [22, 88], [78, 85],
          [35, 8],  [65, 5],  [8, 45], [92, 42], [50, 95], [18, 55],
          [82, 28], [42, 92], [70, 75], [30, 30], [60, 20], [15, 38],
          [85, 58], [48, 15], [55, 82], [25, 68], [75, 48], [38, 50],
        ].map(([x, y], i) => (
          <circle
            key={i}
            cx={`${x}%`}
            cy={`${y}%`}
            r={i % 3 === 0 ? 1.2 : 0.7}
            fill="rgba(200,230,255,0.55)"
          />
        ))}

        {/* Subtle teal glow blobs */}
        <ellipse cx="30%" cy="35%" rx="220" ry="140" fill="rgba(20,184,166,0.055)" />
        <ellipse cx="72%" cy="62%" rx="180" ry="110" fill="rgba(45,212,191,0.04)"  />
      </svg>

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 py-28 text-center lg:py-36">

        {/* Badge */}
        <div
          className="mb-10 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
          style={{ border: '1px solid rgba(45,212,191,0.45)' }}
        >
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: '#2dd4bf' }}
          >
            • Interface Cérebro-Computador
          </span>
        </div>

        {/* Title */}
        <h1
          className="font-extrabold leading-[1.08] tracking-tight"
          style={{ fontSize: 'clamp(2.6rem, 7vw, 5.25rem)', color: '#ffffff' }}
        >
          Transformando silêncio
          <br />
          <span>em </span>
          <span style={{ color: '#2dd4bf' }}>conexão</span>
        </h1>

        {/* Description */}
        <p
          className="mx-auto mt-7 max-w-xl leading-relaxed"
          style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)', color: '#7ea8be' }}
        >
          MindSpeak{' '}
          <span style={{ color: '#5eead4' }}>transforma sinais cerebrais</span>
          {' '}em comunicação acessível, humana e em{' '}
          <span style={{ color: '#5eead4' }}>tempo real</span>.
        </p>

        {/* CTA buttons */}
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {/* Primary */}
          <a
            href="#projeto"
            className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90 active:scale-[0.97]"
            style={{ backgroundColor: '#2dd4bf', color: '#0a1628' }}
          >
            Conheça o Projeto →
          </a>

          {/* Secondary — a vitrine de componentes agora vive só em /produto
              (a seção "O Produto" com imagens placeholder saiu da home) */}
          <Link
            to="/produto"
            className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/5 active:scale-[0.97]"
            style={{ border: '1px solid rgba(148,163,184,0.35)' }}
          >
            Ver Componentes
          </Link>
        </div>
      </div>
    </section>
  )
}
