import { useMemo, useState } from 'react'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Plus, Trash2, Volume2 } from 'lucide-react'
import { cn } from '../../lib/cn'
import { initialPhrases, type PhraseRow } from '../../data/mockPhrases'
import type { AlertSeverity } from '../../data/mockDashboard'
import { Button } from '../../components/shared/Button'

const voices = [
  { id: 'pt-BR-neural', label: 'Português (Brasil) · Neural' },
  { id: 'pt-BR-standard', label: 'Português (Brasil) · Standard' },
  { id: 'pt-PT', label: 'Português (Portugal)' },
]

function speak(text: string) {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'pt-BR'
  window.speechSynthesis.speak(u)
}

function SortablePhraseRow({
  row,
  onChange,
  onRemove,
}: {
  row: PhraseRow
  onChange: (id: string, patch: Partial<PhraseRow>) => void
  onRemove: (id: string) => void
}) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } =
    useSortable({
      id: row.id,
    })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:gap-4',
        isDragging && 'z-10 opacity-90 ring-2 ring-green-300',
      )}
    >
      <Button
        ref={setActivatorNodeRef}
        type="button"
        variant="secondary"
        size="sm"
        className="h-11 w-11 shrink-0 p-0"
        aria-label="Arrastar para reordenar"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-5 w-5" aria-hidden />
      </Button>
      <div className="grid flex-1 gap-3 md:grid-cols-[2fr_1fr_auto] md:items-center">
        <div>
          <label className="sr-only" htmlFor={`text-${row.id}`}>
            Texto da frase
          </label>
          <input
            id={`text-${row.id}`}
            value={row.text}
            onChange={(e) => onChange(row.id, { text: e.target.value })}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium outline-none ring-green-600/20 focus:bg-white focus:ring-2"
          />
        </div>
        <div>
          <label className="sr-only" htmlFor={`alert-${row.id}`}>
            Nível de alerta
          </label>
          <select
            id={`alert-${row.id}`}
            value={row.alert}
            onChange={(e) => onChange(row.id, { alert: e.target.value as AlertSeverity })}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-green-600/20 focus:bg-white focus:ring-2"
          >
            <option value="critico">Crítico</option>
            <option value="moderado">Moderado</option>
            <option value="informativo">Informativo</option>
          </select>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:justify-end">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
            Posição {row.gridPosition}
          </span>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            icon={<Volume2 className="h-4 w-4" aria-hidden />}
            onClick={() => speak(row.text)}
          >
            Ouvir
          </Button>
          <Button
            type="button"
            variant="danger"
            size="sm"
            icon={<Trash2 className="h-4 w-4" aria-hidden />}
            onClick={() => onRemove(row.id)}
          >
            Remover
          </Button>
        </div>
      </div>
    </li>
  )
}

export function PhrasesPage() {
  const [rows, setRows] = useState<PhraseRow[]>(initialPhrases)
  const [voice, setVoice] = useState(voices[0]!.id)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const preview = useMemo(() => {
    return [...rows].sort((a, b) => a.gridPosition - b.gridPosition)
  }, [rows])

  const reorderPositions = (next: PhraseRow[]) => next.map((r, idx) => ({ ...r, gridPosition: idx + 1 }))

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = rows.findIndex((r) => r.id === active.id)
    const newIndex = rows.findIndex((r) => r.id === over.id)
    if (oldIndex < 0 || newIndex < 0) return
    setRows(reorderPositions(arrayMove(rows, oldIndex, newIndex)))
  }

  const addPhrase = () => {
    const id = `phrase-${crypto.randomUUID()}`
    setRows((prev) =>
      reorderPositions([
        ...prev,
        { id, text: 'NOVA FRASE', alert: 'informativo', gridPosition: prev.length + 1 },
      ]),
    )
  }

  const removePhrase = (id: string) => {
    setRows((prev) => reorderPositions(prev.filter((r) => r.id !== id)))
  }

  const patchPhrase = (id: string, patch: Partial<PhraseRow>) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)))
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-emerald-950">Editar palavras e frases</h1>
        <p className="mt-1 text-sm text-slate-600">
          Organize a grade, níveis de alerta e voz · arraste o ícone à esquerda para reordenar.
        </p>
      </div>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-slate-900">Frases configuradas</h2>
            <Button type="button" variant="primary" size="md" icon={<Plus className="h-4 w-4" aria-hidden />} onClick={addPhrase}>
              Adicionar frase
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="voice" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Voz TTS
              </label>
              <select
                id="voice"
                value={voice}
                onChange={(e) => setVoice(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-green-600/20 focus:bg-white focus:ring-2"
              >
                {voices.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="audio" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Áudio personalizado
              </label>
              <input
                id="audio"
                name="audio"
                type="file"
                accept="audio/*"
                className="mt-2 block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-green-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-green-900 hover:file:bg-green-100"
              />
              <p className="mt-1 text-[11px] text-slate-500">Upload ou gravação serão integrados ao backend.</p>
            </div>
          </div>

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={rows.map((r) => r.id)} strategy={verticalListSortingStrategy}>
              <ul className="space-y-3">
                {rows.map((row) => (
                  <SortablePhraseRow key={row.id} row={row} onChange={patchPhrase} onRemove={removePhrase} />
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        </div>

        <aside className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">Pré-visualização da grade (2×4)</h2>
          <p className="text-xs text-slate-500">Reflete a ordem atual após arrastar e soltar.</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {preview.map((r) => (
              <div
                key={r.id}
                className="flex min-h-[96px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-3 text-center text-xs font-semibold leading-snug text-slate-900"
              >
                {r.text}
              </div>
            ))}
          </div>
        </aside>
      </section>
    </div>
  )
}
