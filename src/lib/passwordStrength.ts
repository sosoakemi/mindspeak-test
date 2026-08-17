export type PasswordStrength = {
  score: 0 | 1 | 2 | 3 | 4
  label: string
  percent: number
}

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return { score: 0, label: 'Informe uma senha', percent: 0 }

  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  const normalized = Math.min(4, Math.max(1, Math.ceil(score * 0.8))) as 1 | 2 | 3 | 4

  const labels: Record<number, string> = {
    0: 'Informe uma senha',
    1: 'Fraca',
    2: 'Razoável',
    3: 'Boa',
    4: 'Forte',
  }

  return {
    score: password.length < 8 ? 1 : normalized,
    label: labels[password.length < 8 ? 1 : normalized] ?? 'Fraca',
    percent: password.length < 8 ? 25 : normalized * 25,
  }
}
