import { useEffect, useState } from 'react'
import { Info, Volume2 } from 'lucide-react'
import { cn } from '../../../lib/cn'
import { listPatientWords, type BackendWord } from '../../../lib/backendApi'
import { usePortalPatient } from '../portal-patient-context'
import { Button } from '../../../components/shared/Button'
import { getPatientPreferences } from '../../../lib/patientPreferences'
import { severityMeta } from '../../../lib/severity'
import { speakTextAI } from '../../../lib/speech'
import { msCardPad } from '../../../lib/msStyles'

// Esta tela editava uma lista no localStorage do navegador, e essa lista
// NÃO era a grade usada numa sessão real: a sessão ao vivo monta a grade
// com as palavras do backend. Então dava para reescrever as oito frases,
// ver "Salvar alterações" e, na sessão seguinte, o paciente encontrar a
// grade antiga.
//
// Por que leitura e não edição ligada ao backend: as palavras pertencem à
// ORGANIZAÇÃO, não ao paciente (Word.organization_id). Um familiar editando
// aqui mudaria a grade de todos os pacientes da clínica de uma vez. Para
// cada paciente ter a própria grade, as palavras precisariam ser por
// paciente — mudança de modelo, não de tela.
export function PatientPhrasesWorkspacePage() {
  const { patient, loading: patientLoading, error: patientError } = usePortalPatient()
  const [words, setWords] = useState<BackendWord[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const patientId = patient?.id ?? null

  useEffect(() => {
    if (patientId === null) return
    let cancelled = false
    setLoading(true)
    setError(null)
    listPatientWords(patientId)
      .then((list) => {
        if (!cancelled) setWords(list)
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Falha ao carregar a grade.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [patientId])

  const speak = (text: string) => {
    void speakTextAI(text, { voiceURI: getPatientPreferences().voiceURI })
  }

  const message = patientError ?? error
  const busy = patientLoading || loading

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-4xl flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-ms-primary sm:text-2xl">
          Frases da grade
        </h1>
        <p className="mt-1 text-sm text-ms-secondary">
          As frases que aparecem na varredura, na ordem em que são destacadas.
        </p>
      </div>

      <div className="flex items-start gap-3 rounded-xl bg-ms-subtle p-4 ring-1 ring-ms-border-subtle">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-ms-muted" aria-hidden />
        <p className="text-sm leading-relaxed text-ms-secondary">
          Quem define esta lista é a equipe clínica. As frases são compartilhadas por todos os
          pacientes da clínica, por isso não podem ser alteradas por aqui — peça ao profissional
          responsável para incluir, remover ou reordenar.
        </p>
      </div>

      {message ? (
        <p
          className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800 dark:bg-red-950/40 dark:text-red-200"
          role="alert"
        >
          {message}
        </p>
      ) : null}

      <section className={msCardPad}>
        {busy ? (
          <p className="py-8 text-center text-sm text-ms-secondary">Carregando grade…</p>
        ) : words.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-sm font-medium text-ms-primary">Nenhuma frase cadastrada.</p>
            <p className="mt-1 text-sm text-ms-secondary">
              Sem frases, a varredura não tem o que destacar. Fale com a equipe clínica.
            </p>
          </div>
        ) : (
          <ol className="space-y-3">
            {words.map((word, index) => {
              const meta = severityMeta[word.severity]
              return (
                <li
                  key={word.id}
                  className={cn(
                    'flex flex-col gap-3 rounded-xl border border-ms-border bg-ms-surface p-4 sm:flex-row sm:items-center sm:gap-4',
                    meta.rowClass,
                  )}
                >
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ms-subtle-strong text-xs font-bold tabular-nums text-ms-secondary">
                    {index + 1}
                  </span>
                  <p className="min-w-0 flex-1 break-words text-base font-semibold text-ms-primary">
                    {word.text}
                  </p>
                  <span
                    className={cn(
                      'shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1',
                      meta.badgeClass,
                    )}
                  >
                    {meta.label}
                  </span>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="shrink-0"
                    icon={<Volume2 className="h-4 w-4" aria-hidden />}
                    onClick={() => speak(word.text)}
                  >
                    Ouvir
                  </Button>
                </li>
              )
            })}
          </ol>
        )}
      </section>
    </div>
  )
}
