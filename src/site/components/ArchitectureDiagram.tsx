import { Brain, Smartphone, Usb, Wifi } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/*
 * Diagrama da arquitetura real do MindSpeak (seção 2 do CLAUDE.md):
 * TGAM → UART → adaptador USB-TTL → USB → PC (FastAPI + DSP + IA)
 *   → WiFi/WebSocket → iPad (fala via Web Speech API)
 *
 * Substitui a imagem antiga do "diagrama explodido" (ESP32/DFPlayer/LiPo),
 * que não existe mais no projeto — ver seção 10 do CLAUDE.md.
 */

type NodeSpec = {
  icon: LucideIcon
  title: string
  subtitle: string
  detail: string
}

const nodes: NodeSpec[] = [
  {
    icon: Brain,
    title: 'Sensor TGAM',
    subtitle: 'EEG, 1 canal',
    detail: 'NeuroSky · protocolo ThinkGear',
  },
  {
    icon: Usb,
    title: 'PC / servidor',
    subtitle: 'FastAPI + DSP + IA',
    detail: 'Leitura serial direta (pyserial)',
  },
  {
    icon: Smartphone,
    title: 'iPad (Safari)',
    subtitle: 'Fala em voz alta',
    detail: 'Web Speech API · pt-BR',
  },
]

function Connector({ label, icon: Icon }: { label: string; icon: LucideIcon }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 px-2 py-6 lg:py-0">
      {/* Linha com "pulso" animado — sugere o fluxo de dados sem exagerar.
          Vertical em telas pequenas (itens empilhados), horizontal a partir de lg. */}
      <div className="relative h-10 w-px overflow-hidden bg-slate-200 lg:h-px lg:w-full">
        <span className="architecture-pulse-v absolute inset-x-0 top-0 h-3 w-full rounded-full bg-teal-400 lg:hidden" />
        <span className="architecture-pulse hidden absolute inset-y-0 left-0 h-full w-3 rounded-full bg-teal-400 lg:block" />
      </div>
      <span className="flex items-center gap-1.5 whitespace-nowrap text-[11px] font-medium text-slate-400">
        <Icon className="h-3 w-3" />
        {label}
      </span>
    </div>
  )
}

export function ArchitectureDiagram() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm sm:p-10">
      <div className="flex flex-col items-stretch lg:flex-row lg:items-center">
        {nodes.map((node, i) => (
          <div key={node.title} className="contents">
            <div className="flex flex-col items-center text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-600 ring-1 ring-teal-500/15">
                <node.icon className="h-7 w-7" strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-navy-900">
                {node.title}
              </h3>
              <p className="mt-0.5 text-sm font-medium text-teal-600">{node.subtitle}</p>
              <p className="mt-1 text-xs text-slate-500">{node.detail}</p>
            </div>

            {i < nodes.length - 1 && (
              <Connector
                label={i === 0 ? 'USB' : 'Wi-Fi / WebSocket'}
                icon={Wifi}
              />
            )}
          </div>
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-lg text-center text-xs leading-relaxed text-slate-400">
        Todo o processamento de sinal e a IA rodam no PC. O backend nunca toca
        áudio: envia apenas o texto da palavra selecionada para o iPad, que a
        fala em voz alta.
      </p>
    </div>
  )
}

export default ArchitectureDiagram
