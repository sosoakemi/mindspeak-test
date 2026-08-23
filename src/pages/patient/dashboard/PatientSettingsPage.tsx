import { useEffect, useState, type FormEvent } from 'react'
import { PlayCircle, RotateCcw, Save } from 'lucide-react'
import { Button } from '../../../components/shared/Button'
import {
  getPatientPreferences,
  PATIENT_PREFS_CHANGED_EVENT,
  resetPatientPreferences,
  savePatientPreferences,
} from '../../../lib/patientPreferences'
import { isSpeechSupported, listPortugueseVoices, speakText } from '../../../lib/speech'
import { msCardPad, msInputBase, msInputBorder, msLabel } from '../../../lib/msStyles'
import { cn } from '../../../lib/cn'

const VOICE_PREVIEW_TEXT = 'Olá, esta é a minha voz.'

export function PatientSettingsPage() {
  const [threshold, setThreshold] = useState(75)
  const [dwell, setDwell] = useState(1.5)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [voiceURI, setVoiceURI] = useState<string | null>(null)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const speechSupported = isSpeechSupported()

  useEffect(() => {
    const load = () => {
      const p = getPatientPreferences()
      setThreshold(p.attentionThreshold)
      setDwell(p.confirmDwellSec)
      setSoundEnabled(p.soundEnabled)
      setVoiceURI(p.voiceURI)
    }
    load()
    window.addEventListener(PATIENT_PREFS_CHANGED_EVENT, load)
    return () => window.removeEventListener(PATIENT_PREFS_CHANGED_EVENT, load)
  }, [])

  useEffect(() => {
    if (!speechSupported) return
    const loadVoices = () => setVoices(listPortugueseVoices())
    loadVoices()
    // algumas engines (Chrome) só populam a lista de vozes de forma async
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', loadVoices)
  }, [speechSupported])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      savePatientPreferences({
        attentionThreshold: threshold,
        confirmDwellSec: dwell,
        soundEnabled,
        voiceURI,
      })
      setSaved(true)
      window.setTimeout(() => setSaved(false), 2500)
    } catch {
      setError('Não foi possível salvar. Tente novamente.')
    }
  }

  const onReset = () => {
    resetPatientPreferences()
    const p = getPatientPreferences()
    setThreshold(p.attentionThreshold)
    setDwell(p.confirmDwellSec)
    setSoundEnabled(p.soundEnabled)
    setVoiceURI(p.voiceURI)
    setSaved(false)
    setError(null)
  }

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-2xl flex-col gap-6 sm:gap-8">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-ms-primary sm:text-2xl">Configurações</h1>
        <p className="mt-1 text-sm text-ms-secondary">
          Ajuste preferências da sessão de comunicação. Alterações são salvas neste dispositivo.
        </p>
      </div>

      <form className={cn(msCardPad, 'space-y-6')} onSubmit={onSubmit} noValidate>
        <div>
          <label htmlFor="patient-threshold" className={msLabel}>
            Limiar de atenção ({threshold}%)
          </label>
          <p className="mb-3 text-xs text-ms-muted">Mantenha o foco acima deste valor para confirmar uma palavra.</p>
          <input
            id="patient-threshold"
            name="threshold"
            type="range"
            min={50}
            max={95}
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="w-full accent-green-700 dark:accent-ms-accent"
          />
          <div className="mt-2 flex justify-between text-xs font-medium text-ms-muted">
            <span>50%</span>
            <span>75%</span>
            <span>95%</span>
          </div>
        </div>

        <div>
          <label htmlFor="patient-dwell" className={msLabel}>
            Tempo de confirmação (segundos)
          </label>
          <input
            id="patient-dwell"
            name="dwell"
            type="number"
            min={1}
            max={4}
            step={0.1}
            value={dwell}
            onChange={(e) => setDwell(Number(e.target.value))}
            className={cn(msInputBase, msInputBorder, 'mt-2')}
          />
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-ms-border bg-ms-subtle px-4 py-3">
          <input
            id="patient-sound"
            type="checkbox"
            checked={soundEnabled}
            onChange={(e) => setSoundEnabled(e.target.checked)}
            className="mt-1 h-5 w-5 shrink-0 rounded border-ms-border accent-green-600 dark:accent-ms-accent"
          />
          <div>
            <label htmlFor="patient-sound" className="text-sm font-medium text-ms-primary">
              Falar frase ao confirmar
            </label>
            <p className="mt-1 text-xs text-ms-muted">Usa síntese de voz do navegador quando uma palavra é selecionada.</p>
          </div>
        </div>

        {!speechSupported ? (
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-300">
            Este navegador não suporta síntese de voz (Web Speech API). O texto ainda aparece na tela,
            mas não será falado em voz alta — use Safari (iPad/iPhone) ou Chrome para ter áudio.
          </p>
        ) : (
          <div>
            <label htmlFor="patient-voice" className={msLabel}>
              Voz
            </label>
            <p className="mb-3 text-xs text-ms-muted">Escolha a voz usada para falar as frases confirmadas.</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <select
                id="patient-voice"
                value={voiceURI ?? ''}
                onChange={(e) => setVoiceURI(e.target.value || null)}
                className={cn(msInputBase, msInputBorder, 'sm:flex-1')}
                disabled={voices.length === 0}
              >
                <option value="">Automática (melhor voz em português)</option>
                {voices.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
              <Button
                type="button"
                variant="secondary"
                icon={<PlayCircle className="h-4 w-4" aria-hidden />}
                onClick={() => speakText(VOICE_PREVIEW_TEXT, { voiceURI })}
                disabled={voices.length === 0}
              >
                Ouvir prévia
              </Button>
            </div>
            {voices.length === 0 ? (
              <p className="mt-2 text-xs text-ms-muted">
                Nenhuma voz carregada ainda — aguarde um instante ou toque na tela.
              </p>
            ) : null}
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button type="submit" variant="primary" icon={<Save className="h-4 w-4" aria-hidden />}>
            Salvar
          </Button>
          <Button type="button" variant="secondary" icon={<RotateCcw className="h-4 w-4" aria-hidden />} onClick={onReset}>
            Restaurar padrões
          </Button>
        </div>

        {saved ? (
          <p className="text-sm font-medium text-green-700 dark:text-emerald-400" role="status">
            Preferências salvas com sucesso.
          </p>
        ) : null}
        {error ? (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}
      </form>
    </div>
  )
}
