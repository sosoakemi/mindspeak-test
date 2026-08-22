/**
 * Wrapper único sobre a Web Speech API (speechSynthesis). Centraliza aqui:
 * detecção de suporte (pro fallback visual), escolha da melhor voz pt-BR
 * disponível, e o "priming" exigido pelo Safari/iOS antes do primeiro áudio.
 */

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && !!window.speechSynthesis
}

/** Heurística de qualidade: prioriza pt-BR, depois qualquer pt-*, depois vozes
 * de nuvem (localService=false tende a soar menos robótico que a voz local
 * padrão do SO) e nomes que anunciam motor "natural"/"neural"/"enhanced". */
function scoreVoice(v: SpeechSynthesisVoice): number {
  const lang = v.lang?.toLowerCase().replace('_', '-') ?? ''
  let score = 0
  if (lang === 'pt-br') score += 100
  else if (lang.startsWith('pt')) score += 60
  if (v.localService === false) score += 20
  if (/natural|neural|online|enhanced|premium/i.test(v.name ?? '')) score += 15
  if (v.default) score += 5
  return score
}

/** Todas as vozes do navegador, melhores primeiro (ver scoreVoice). Pode vir
 * vazio antes do evento `voiceschanged` disparar em alguns navegadores. */
export function listVoices(): SpeechSynthesisVoice[] {
  if (!isSpeechSupported()) return []
  return [...window.speechSynthesis.getVoices()].sort((a, b) => scoreVoice(b) - scoreVoice(a))
}

/** Vozes em português (qualquer variante) — as relevantes pro seletor. Cai
 * para a lista completa se o navegador não tiver nenhuma voz pt instalada,
 * em vez de mostrar um seletor vazio. */
export function listPortugueseVoices(): SpeechSynthesisVoice[] {
  const all = listVoices()
  const pt = all.filter((v) => v.lang?.toLowerCase().startsWith('pt'))
  return pt.length > 0 ? pt : all
}

export function findVoiceByURI(voiceURI: string | null | undefined): SpeechSynthesisVoice | null {
  if (!voiceURI) return null
  return listVoices().find((v) => v.voiceURI === voiceURI) ?? null
}

/** Fala `text` usando a voz salva (`voiceURI`) ou, se não houver preferência
 * ou a voz não existir mais neste navegador, a melhor voz pt-BR disponível.
 * Devolve false (sem lançar) quando o navegador não suporta TTS — quem
 * chama decide como sinalizar isso na tela. */
export function speakText(
  text: string,
  opts: { voiceURI?: string | null; rate?: number } = {},
): boolean {
  if (!isSpeechSupported()) return false
  const synth = window.speechSynthesis
  synth.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'pt-BR'
  utterance.rate = opts.rate ?? 0.95
  const chosen = findVoiceByURI(opts.voiceURI) ?? listVoices()[0]
  if (chosen) utterance.voice = chosen
  synth.speak(utterance)
  return true
}

/** Destrava a síntese de voz no Safari/iOS — precisa rodar dentro de um
 * gesto do usuário (clique/toque), e o efeito vale pro resto da sessão. */
export function primeSpeech(): void {
  if (!isSpeechSupported()) return
  window.speechSynthesis.speak(new SpeechSynthesisUtterance(''))
}
