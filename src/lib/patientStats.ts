const STORAGE_KEY = 'mindspeak_patient_daily_stats'

type DailyStats = {
  date: string
  selectionCount: number
}

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

function read(): DailyStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { date: todayKey(), selectionCount: 0 }
    const parsed = JSON.parse(raw) as DailyStats
    if (parsed.date !== todayKey()) return { date: todayKey(), selectionCount: 0 }
    return {
      date: todayKey(),
      selectionCount: typeof parsed.selectionCount === 'number' ? parsed.selectionCount : 0,
    }
  } catch {
    return { date: todayKey(), selectionCount: 0 }
  }
}

function write(stats: DailyStats) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats))
    window.dispatchEvent(new CustomEvent('mindspeak-patient-stats-changed'))
  } catch {
    // ignore
  }
}

export const PATIENT_STATS_CHANGED_EVENT = 'mindspeak-patient-stats-changed'

export function getTodaySelectionCount(): number {
  return read().selectionCount
}

export function incrementTodaySelectionCount() {
  const stats = read()
  write({ ...stats, selectionCount: stats.selectionCount + 1 })
}
