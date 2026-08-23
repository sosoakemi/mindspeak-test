import { cn } from '../../lib/cn'
import { useTheme } from '../../theme/useTheme'

const MARK_SRC = '/favicon.svg'

// Logo com ícone + "MindSpeak" já compostos na imagem — usada no
// header/rodapé de toda página (pública ou do sistema). `lg.modonoturno`
// entra no lugar quando o tema é escuro (a versão clara do arquivo fica
// ilegível em fundo escuro).
const HEADER_LIGHT_SRC = '/logos/lg.header.rd.png'
const HEADER_DARK_SRC = '/logos/lg.modonoturno.png'

// Versão maior, centralizada dentro dos cards de login/cadastro. Reaproveita
// lg.modonoturno no escuro pelo mesmo motivo do header — não existe um
// arquivo "logo.forms" separado para modo noturno.
const FORMS_LIGHT_SRC = '/logos/logo.forms.png'
const FORMS_DARK_SRC = '/logos/lg.modonoturno.png'

const sizeMap = {
  sm: { mark: 'h-8 w-8', horizontal: 'h-8', text: 'text-lg' },
  md: { mark: 'h-10 w-10', horizontal: 'h-10', text: 'text-xl' },
  lg: { mark: 'h-12 w-12', horizontal: 'h-14', text: 'text-2xl' },
} as const

export type MindSpeakLogoProps = {
  /** mark: só o ícone · horizontal: logo de header/rodapé · forms: logo grande dos formulários */
  layout?: 'mark' | 'horizontal' | 'forms'
  size?: keyof typeof sizeMap
  className?: string
  /**
   * Ignora o tema global e força qual versão do arquivo usar. Só necessário
   * em telas com fundo fixo independente do toggle claro/escuro (ex.:
   * PatientCommunicatePage, que é sempre escura) — sem isso a logo clara
   * ficaria ilegível sobre esse fundo quando o tema global for "claro".
   */
  forceTheme?: 'light' | 'dark'
  /** @deprecated sem efeito — o wordmark já vem desenhado nos arquivos de logo novos */
  wordmarkClassName?: string
}

/** Marca MindSpeak — troca automaticamente entre a versão clara e a versão
 * para modo noturno conforme o tema ativo (ThemeProvider, raiz do app). */
export function MindSpeakLogo({ layout = 'horizontal', size = 'md', className, forceTheme }: MindSpeakLogoProps) {
  const { theme } = useTheme()
  const isDark = forceTheme ? forceTheme === 'dark' : theme === 'dark'
  const s = sizeMap[size]

  if (layout === 'mark') {
    return (
      <img
        src={MARK_SRC}
        alt="MindSpeak"
        width={48}
        height={46}
        className={cn(s.mark, 'shrink-0 object-contain', className)}
        decoding="async"
      />
    )
  }

  const isForms = layout === 'forms'
  const src = isForms
    ? isDark
      ? FORMS_DARK_SRC
      : FORMS_LIGHT_SRC
    : isDark
      ? HEADER_DARK_SRC
      : HEADER_LIGHT_SRC

  return (
    <img
      src={src}
      alt="MindSpeak"
      className={cn(
        isForms ? 'h-12 sm:h-16' : s.horizontal,
        'w-auto max-w-full shrink-0 object-contain',
        className,
      )}
      decoding="async"
    />
  )
}
