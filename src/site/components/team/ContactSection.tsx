import ContactForm from './ContactForm'

export default function ContactSection() {
  return (
    <section className="bg-white px-6 py-20 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="overflow-hidden rounded-2xl">
          <img
            src="/images/team/video-em-breve.png"
            alt="Vídeo da equipe em breve — o conteúdo será adicionado em breve"
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-teal-600">
            Contato
          </span>

          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
            Fale com a{' '}
            <span className="text-teal-500">equipe MindSpeak</span>
          </h2>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-600">
            Tem dúvidas, sugestões ou quer saber mais sobre o projeto? Envie uma
            mensagem e nossa equipe responderá em breve.
          </p>

          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
