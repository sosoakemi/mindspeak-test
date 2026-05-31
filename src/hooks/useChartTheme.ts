import { useMemo } from 'react'
import { useTheme } from '../theme/useTheme'

export function useChartTheme() {
  const { theme } = useTheme()

  return useMemo(() => {
    const isDark = theme === 'dark'
    return {
      grid: isDark ? '#1e293b' : '#e2e8f0',
      axis: isDark ? '#94a3b8' : '#64748b',
      tooltipBg: isDark ? '#0f172a' : '#ffffff',
      tooltipBorder: isDark ? '#1e293b' : '#e2e8f0',
      tooltipText: isDark ? '#f9fafb' : '#0f172a',
      areaStroke: isDark ? '#3b82f6' : '#059669',
      areaFill: isDark ? 'rgba(59, 130, 246, 0.35)' : 'rgba(16, 185, 129, 0.25)',
      lineAlpha: isDark ? '#60a5fa' : '#2563eb',
      lineBeta: isDark ? '#a78bfa' : '#7c3aed',
    }
  }, [theme])
}
