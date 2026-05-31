/** Shared Tailwind class groups — light matches current design; dark via CSS variables. */
export const msPage = 'min-w-0 bg-ms-page text-ms-primary'
export const msSurface = 'bg-ms-surface'
export const msCard =
  'min-w-0 rounded-2xl border border-ms-border bg-ms-surface shadow-sm dark:shadow-black/20'
export const msCardPad = `${msCard} p-4 sm:p-6`
export const msCardPadSm = `${msCard} p-3 sm:p-4`

export const msNavActive =
  'bg-emerald-50 text-emerald-950 ring-1 ring-emerald-100 dark:bg-blue-950/60 dark:text-blue-100 dark:ring-blue-800/80'
export const msNavInactive =
  'text-ms-secondary hover:bg-ms-subtle hover:text-ms-primary dark:hover:bg-ms-surface/80'

export const msInputBase =
  'w-full min-w-0 rounded-xl border bg-ms-subtle py-3 text-base text-ms-primary outline-none ring-ms-accent/30 placeholder:text-ms-muted focus:bg-ms-surface focus:ring-2 sm:text-sm dark:focus:ring-ms-accent/40'
export const msInputBorder = 'border-ms-border'
export const msInputError = 'border-red-300 dark:border-red-500'

export const msLabel = 'mb-1.5 block text-sm font-medium text-ms-secondary'
export const msTableWrap = 'ms-table-wrap max-w-full'

export const msAccentBox =
  'rounded-xl bg-emerald-50/80 p-4 ring-1 ring-emerald-100 dark:bg-blue-950/40 dark:ring-blue-800/60'
export const msStatRow =
  'flex min-w-0 flex-wrap items-center justify-between gap-2 rounded-xl bg-ms-subtle px-3 py-3 sm:px-4 dark:bg-ms-subtle-strong/80'
export const msPill =
  'inline-flex max-w-full rounded-full bg-ms-subtle-strong px-3 py-1 text-xs font-medium text-ms-secondary'

export const msSidebarAside =
  'fixed inset-y-0 left-0 z-40 flex w-[min(16rem,calc(100vw-3rem))] max-w-64 flex-col border-r border-ms-border bg-ms-surface transition-transform duration-200 ease-out lg:static lg:z-auto lg:w-64 lg:max-w-none lg:translate-x-0'
export const msSidebarOpen = 'translate-x-0'
export const msSidebarClosed = '-translate-x-full'

/** Horizontal page padding safe down to 375px */
export const msContainerX = 'px-4 sm:px-5 md:px-6 lg:px-8'
export const msMainPad = 'p-3 sm:p-4 md:p-6 lg:p-8'
