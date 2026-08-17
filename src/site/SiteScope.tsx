import { Outlet } from 'react-router-dom'
import { SiteThemeProvider, useSiteTheme } from './context/SiteThemeContext'

function SiteScopeInner() {
  const { isDark } = useSiteTheme()

  return (
    <div className={`site-scope min-h-dvh ${isDark ? 'dark' : ''}`}>
      <Outlet />
    </div>
  )
}

// Layout wrapper for the public marketing site (páginas do site institucional).
// Applies the site's own font family so essas páginas mantêm a identidade visual
// original (DM Sans / Sora), independente do tema do portal.
export function SiteScope() {
  return (
    <SiteThemeProvider>
      <SiteScopeInner />
    </SiteThemeProvider>
  )
}
