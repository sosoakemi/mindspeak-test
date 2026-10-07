import { Link } from 'react-router-dom'
import { ArrowLeft, KeyRound } from 'lucide-react'
import { FamilyAuthShell } from '../../components/layout/FamilyAuthShell'
import { AuthAlert, AuthCard } from '../../components/ui/family-auth'

// Não existe recuperação por e-mail: o backend não tem infraestrutura de
// envio. Esta tela antes simulava o envio (esperava 2s e dizia "E-mail
// enviado"), deixando quem perdeu a senha esperando uma mensagem que nunca
// chegaria.
//
// O caminho que ela aponta funciona de verdade: a equipe clínica tem, em
// Configurações > Acesso do familiar, como gerar uma senha provisória e
// entregar à pessoa.
export function ForgotPasswordPage() {
  return (
    <FamilyAuthShell maxWidth="md">
      <div className="mb-8 sm:mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--fa-text)] sm:text-3xl">Recuperar senha</h1>
        <p className="mt-2 text-sm text-[var(--fa-text-muted)] sm:text-base">
          A redefinição de senha por e-mail ainda não está disponível.
        </p>
      </div>

      <AuthCard className="p-6 sm:p-8">
        <div className="flex justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--fa-input-bg)]">
            <KeyRound className="h-7 w-7 text-[var(--fa-link)]" aria-hidden />
          </span>
        </div>

        <p className="mt-6 text-center text-sm leading-relaxed text-[var(--fa-text-muted)]">
          Para recuperar o acesso, fale com a equipe clínica responsável pelo
          paciente. Ela consegue gerar uma senha provisória e entregar a você.
        </p>

        <AuthAlert variant="info" className="mt-6 text-left">
          Não enviamos nenhum e-mail de recuperação. Se você receber uma
          mensagem dizendo o contrário, desconfie.
        </AuthAlert>

        <div className="mt-8 flex justify-center">
          <Link
            to="/familiar/login"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[var(--fa-text-muted)] transition-colors hover:text-[var(--fa-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fa-link)]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Voltar para o login
          </Link>
        </div>
      </AuthCard>
    </FamilyAuthShell>
  )
}
