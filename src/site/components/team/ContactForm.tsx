import { useState, type FormEvent } from 'react'
import Button from '../ui/Button'

const MAX_MESSAGE_LENGTH = 500

export default function ContactForm() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <label
          htmlFor="contact-email"
          className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"
        >
          E-mail
        </label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="seu@email.com"
          required
          className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-navy-900 placeholder:text-slate-400 transition-colors focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"
        >
          Mensagem
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(event) =>
            setMessage(event.target.value.slice(0, MAX_MESSAGE_LENGTH))
          }
          placeholder="Escreva sua mensagem..."
          rows={5}
          required
          className="mt-2 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-navy-900 placeholder:text-slate-400 transition-colors focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        />
        <p className="mt-2 text-xs uppercase tracking-[0.1em] text-slate-400">
          Máximo {MAX_MESSAGE_LENGTH} caracteres
        </p>
      </div>

      <Button type="submit" showArrow className="self-start">
        Enviar
      </Button>
    </form>
  )
}
