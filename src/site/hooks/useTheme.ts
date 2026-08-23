import { useTheme as useAppTheme } from '../../theme/useTheme'

export type SiteTheme = 'light' | 'dark'

/**
 * Antes disto, o site institucional tinha seu PRÓPRIO estado de tema
 * (chave de localStorage separada, `mindspeak-site-theme`) — trocar o tema
 * numa página pública não refletia no app (login/dashboard/paciente) e
 * vice-versa. Agora só delega pro ThemeProvider da raiz (src/theme/), que
 * já envolve o app inteiro em main.tsx: uma única fonte de verdade, um
 * único toggle, uma única chave persistida (`mindspeak-theme`).
 */
export function useThemeState() {
  const { theme, setTheme, toggleTheme } = useAppTheme()
  return { theme, isDark: theme === 'dark', setTheme, toggleTheme }
}
