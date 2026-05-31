import { useState } from 'react'
import { RotateCcw, Save } from 'lucide-react'
import { Button } from '../../components/shared/Button'

export function SettingsPage() {
  const [saved, setSaved] = useState(false)

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-emerald-950">Configurações</h1>
        <p className="mt-1 text-sm text-slate-600">Parâmetros principais do protocolo (mock estático).</p>
      </div>

      <form
        className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        onSubmit={(e) => {
          e.preventDefault()
          setSaved(true)
          window.setTimeout(() => setSaved(false), 2000)
        }}
      >
        <div>
          <label htmlFor="threshold" className="block text-sm font-medium text-slate-800">
            Limiar de atenção (%)
          </label>
          <p className="mt-1 text-xs text-slate-500">Alinhado à interface do paciente (75% padrão clínico).</p>
          <input
            id="threshold"
            name="threshold"
            type="range"
            min={50}
            max={95}
            defaultValue={75}
            className="mt-4 w-full accent-green-700"
          />
          <div className="mt-2 flex justify-between text-xs font-medium text-slate-500">
            <span>50%</span>
            <span>75%</span>
            <span>95%</span>
          </div>
        </div>

        <div>
          <label htmlFor="dwell" className="block text-sm font-medium text-slate-800">
            Tempo de confirmação (s)
          </label>
          <input
            id="dwell"
            name="dwell"
            type="number"
            min={1}
            max={4}
            step={0.1}
            defaultValue={1.5}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-green-600/20 focus:bg-white focus:ring-2"
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-slate-800">
            Notas da equipe
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-green-600/20 focus:bg-white focus:ring-2"
            placeholder="Registrar observações clínicas…"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button type="submit" variant="primary" icon={<Save className="h-4 w-4" aria-hidden />}>
            Salvar
          </Button>
          <Button type="reset" variant="secondary" icon={<RotateCcw className="h-4 w-4" aria-hidden />}>
            Restaurar padrões
          </Button>
        </div>
        {saved ? <p className="text-sm font-medium text-green-700">Preferências salvas (mock).</p> : null}
      </form>
    </div>
  )
}
