/**
 * Wrapper único sobre a síntese de voz. Duas fontes possíveis:
 *
 * 1. **Voz local** (Web Speech API / speechSynthesis) — sempre disponível,
 *    sem internet, sem custo. É o padrão e o fallback.
 * 2. **Voz por IA** (ElevenLabs, via POST /tts/speak no backend) — soa bem
 *    mais humana, mas depende de internet, de chave configurada e tem custo
 *    por uso. Nunca é obrigatória: qualquer falha cai pra voz local.
 *
 * A voz escolhida vive em PatientPreferences.voiceURI. Vozes de IA usam o
 * prefixo `ai:` (ex.: `ai:feminina`) pra caber no mesmo campo que já
 * guardava o voiceURI das vozes locais, sem migração de dado salvo.
 */

import { synthesizeAiSpeech, type AiVoiceName } from './backendApi'

const AI_VOICE_PREFIX = 'ai:'

/** `ai:feminina` → `feminina`. Devolve null se não for uma voz de IA. */
export function parseAiVoice(voiceURI: string | null | undefined): AiVoiceName | null {
  if (!voiceURI?.startsWith(AI_VOICE_PREFIX)) return null
  const name = voiceURI.slice(AI_VOICE_PREFIX.length)
  return name === 'feminina' || name === 'masculina' ? name : null
}

export function toAiVoiceURI(name: AiVoiceName): string {
  return `${AI_VOICE_PREFIX}${name}`
}

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

/** Elemento de áudio reaproveitado pra tocar a voz de IA. Um só, criado
 * dentro do gesto do usuário (primeSpeech), porque o iOS só libera
 * reprodução em elementos "destravados" por interação — criar um novo a
 * cada fala seria bloqueado pelo Safari. */
let aiAudio: HTMLAudioElement | null = null

/** Destrava a síntese de voz no Safari/iOS — precisa rodar dentro de um
 * gesto do usuário (clique/toque), e o efeito vale pro resto da sessão.
 * Destrava as DUAS fontes: a Web Speech API e o elemento de áudio usado
 * pela voz de IA. */
export function primeSpeech(): void {
  if (isSpeechSupported()) {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(''))
  }
  if (typeof Audio !== 'undefined' && aiAudio === null) {
    aiAudio = new Audio()
    // load() dentro do gesto marca o elemento como "iniciado pelo usuário"
    // no Safari/iOS; sem isso o primeiro play() programático é bloqueado.
    try {
      aiAudio.load()
    } catch {
      // navegador sem suporte — a voz de IA cai pro fallback local depois
    }
  }
}

function stopAiAudio(): void {
  if (!aiAudio) return
  aiAudio.pause()
  if (aiAudio.src.startsWith('blob:')) URL.revokeObjectURL(aiAudio.src)
}

/**
 * Fala `text` usando a voz escolhida em `voiceURI`:
 * - `ai:feminina` / `ai:masculina` → pede o áudio ao backend (ElevenLabs).
 * - qualquer outro valor (ou null) → voz local do navegador.
 *
 * Se a voz de IA falhar por QUALQUER motivo (sem internet, chave não
 * configurada, backend fora do ar, iOS bloqueando a reprodução), cai
 * automaticamente pra voz local. A ideia é nunca deixar o paciente sem
 * fala por causa de uma dependência externa.
 */
export async function speakTextAI(
  text: string,
  opts: { voiceURI?: string | null; rate?: number } = {},
): Promise<void> {
  const aiVoice = parseAiVoice(opts.voiceURI)
  if (!aiVoice) {
    speakText(text, opts)
    return
  }

  try {
    const blob = await synthesizeAiSpeech(text, aiVoice)
    const audio = aiAudio ?? new Audio()
    aiAudio = audio
    stopAiAudio()
    audio.src = URL.createObjectURL(blob)
    audio.playbackRate = opts.rate ?? 1
    await audio.play()
  } catch {
    // inclui erro de rede/backend E bloqueio de autoplay do iOS — nos dois
    // casos a voz local resolve, então não vale propagar o erro.
    speakText(text, opts)
  }
}
