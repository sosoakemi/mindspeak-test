import { useCallback, useEffect, useMemo, useState } from 'react'
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
import { GripVertical, RotateCcw, Save, Volume2 } from 'lucide-react'
import { cn } from '../../../lib/cn'
import {
  getEightPhrases,
  PHRASES_CHANGED_EVENT,
  resetPhrasesToDefault,
  setEightPhrases,
} from '../../../data/patientPhrases'
import { Button } from '../../../components/shared/Button'

type Row = { id: string; text: string }

function speak(text: string) {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'pt-BR'
  u.rate = 0.95
  window.speechSynthesis.speak(u)
}

function rowsFromPhrases(phrases: string[], prev?: Row[]): Row[] {
  return phrases.map((text, i) => ({
    id: prev?.[i]?.id ?? `r${i}`,
    text,
  }))
}

function SortableRow({
  row,
  index,
  onTextChange,
}: {
  row: Row
  index: number
  onTextChange: (id: string, text: string) => void
}) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } =
    useSortable({ id: row.id })
  const style = { transform: CSS.Transform.toString(transform), transition }

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex flex-col gap-3 rounded-xl border border-ms-border bg-ms-surface p-4 shadow-sm sm:flex-row sm:items-center sm:gap-4',
        isDragging && 'z-10 opacity-95 ring-2 ring-emerald-300',
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
      <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <span className="w-10 shrink-0 text-xs font-bold text-ms-muted">{index + 1}</span>
        <div className="min-w-0 flex-1">
          <label className="sr-only" htmlFor={`phrase-${row.id}`}>
            Frase na posição {index + 1}
          </label>
          <input
            id={`phrase-${row.id}`}
            value={row.text}
            onChange={(e) => onTextChange(row.id, e.target.value)}
            maxLength={80}
            className="w-full rounded-xl border border-ms-border bg-ms-subtle px-3 py-2.5 text-sm font-semibold text-ms-primary outline-none ring-emerald-600/20 focus:bg-ms-surface focus:ring-2"
          />
        </div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="shrink-0"
          icon={<Volume2 className="h-4 w-4" aria-hidden />}
          onClick={() => speak(row.text)}
        >
          Ouvir
        </Button>
      </div>
    </li>
  )
}

export function PatientPhrasesWorkspacePage() {
  const [rows, setRows] = useState<Row[]>(() => rowsFromPhrases(getEightPhrases()))
  const [replaceSlot, setReplaceSlot] = useState(1)
  const [replaceText, setReplaceText] = useState('')
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle')

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const hydrate = useCallback(() => {
    const next = getEightPhrases()
    setRows((prev) => rowsFromPhrases(next, prev))
  }, [])

  useEffect(() => {
    const onEvt = () => hydrate()
    window.addEventListener(PHRASES_CHANGED_EVENT, onEvt)
    window.addEventListener('storage', onEvt)
    return () => {
      window.removeEventListener(PHRASES_CHANGED_EVENT, onEvt)
      window.removeEventListener('storage', onEvt)
    }
  }, [hydrate])

  const ids = useMemo(() => rows.map((r) => r.id), [rows])

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e
    if (!over || active.id === over.id) return
    setRows((items) => {
      const oldIndex = items.findIndex((x) => x.id === active.id)
      const newIndex = items.findIndex((x) => x.id === over.id)
      if (oldIndex < 0 || newIndex < 0) return items
      return arrayMove(items, oldIndex, newIndex)
    })
  }

  const save = () => {
    try {
      setEightPhrases(rows.map((r) => r.text))
      setSaveStatus('saved')
      window.setTimeout(() => setSaveStatus('idle'), 2500)
    } catch {
      setSaveStatus('error')
    }
  }

  const restoreDefaults = () => {
    resetPhrasesToDefault()
    hydrate()
  }

  const applyReplace = () => {
    const t = replaceText.trim()
    if (!t) return
    const idx = Math.min(7, Math.max(0, replaceSlot - 1))
    setRows((prev) => prev.map((r, i) => (i === idx ? { ...r, text: t } : r)))
    setReplaceText('')
  }

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col gap-10">
      <header>
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">Comunicação</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ms-primary">Frases da grade</h1>
        <p className="mt-2 text-sm text-ms-secondary">
          Estas oito frases aparecem na sessão de comunicação em tela cheia. Reordene, edite o texto e salve.
        </p>
      </header>

      <section className="rounded-2xl border border-ms-border bg-ms-surface p-5 shadow-sm sm:p-6" aria-label="Editor">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-ms-primary">Reordenar e editar</h2>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="secondary" size="sm" icon={<RotateCcw className="h-4 w-4" aria-hidden />} onClick={restoreDefaults}>
              Restaurar padrão
            </Button>
            <Button type="button" variant="primary" size="sm" icon={<Save className="h-4 w-4" aria-hidden />} onClick={save}>
              Salvar alterações
            </Button>
          </div>
          {saveStatus === 'saved' ? (
            <p className="mt-3 text-xs font-medium text-green-700 dark:text-emerald-400" role="status">
              Frases salvas com sucesso.
            </p>
          ) : null}
          {saveStatus === 'error' ? (
            <p className="mt-3 text-xs text-red-600" role="alert">
              Não foi possível salvar. Tente novamente.
            </p>
          ) : null}
        </div>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={ids} strategy={verticalListSortingStrategy}>
            <ol className="mt-5 space-y-3">
              {rows.map((row, index) => (
                <SortableRow key={row.id} row={row} index={index} onTextChange={(id, text) => setRows((p) => p.map((r) => (r.id === id ? { ...r, text } : r)))} />
              ))}
            </ol>
          </SortableContext>
        </DndContext>
      </section>

      <section className="rounded-2xl border border-ms-border bg-ms-surface p-5 shadow-sm sm:p-6" aria-label="Substituir frase">
        <h2 className="text-sm font-semibold text-ms-primary">Substituir uma posição</h2>
        <p className="mt-1 text-xs text-ms-muted">Escolha o número do card (1–8) e digite a nova frase.</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
          <div>
            <label htmlFor="slot" className="block text-xs font-medium text-ms-secondary">
              Posição
            </label>
            <select
              id="slot"
              value={replaceSlot}
              onChange={(e) => setReplaceSlot(Number(e.target.value))}
              className="mt-1 w-full rounded-xl border border-ms-border bg-ms-subtle px-3 py-2 text-sm outline-none ring-emerald-600/20 focus:bg-ms-surface focus:ring-2 sm:w-32"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div className="min-w-0 flex-1">
            <label htmlFor="newPhrase" className="block text-xs font-medium text-ms-secondary">
              Nova frase
            </label>
            <input
              id="newPhrase"
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
              maxLength={80}
              placeholder="Digite a frase"
              className="mt-1 w-full rounded-xl border border-ms-border bg-ms-subtle px-3 py-2 text-sm font-medium outline-none ring-emerald-600/20 focus:bg-ms-surface focus:ring-2"
            />
          </div>
          <Button type="button" variant="primary" size="md" onClick={applyReplace}>
            Aplicar na grade
          </Button>
        </div>
        <p className="mt-3 text-xs text-ms-muted">Depois de aplicar, use &quot;Salvar alterações&quot; acima para persistir.</p>
      </section>
    </div>
  )
}
