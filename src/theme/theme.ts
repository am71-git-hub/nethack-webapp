// Design tokens. Canonical source; CSS custom properties are derived from this
// in global.css and xterm colours come from xterm-theme.ts.
//
// Palette: dark violet background with lavender foreground. Purple accents
// carry brand; the ANSI palette is re-tinted in the sibling file.

export const colors = {
  // surfaces — darkest to lightest
  bg: '#0d0014',        // page background (near-black violet)
  surface: '#17081f',   // panel background
  surfaceHi: '#22122e', // hover / raised panel
  border: '#3d1f55',    // panel border

  // text
  fg: '#e7d7ff',        // primary text (pale lavender)
  fgMuted: '#a48bc4',   // secondary text
  fgDim: '#6b4a8a',     // hints, disabled

  // accents
  accent: '#a855f7',    // purple-500  (primary action, selection)
  accentHi: '#c084fc',  // purple-400  (hover / active)
  accentLo: '#7e22ce',  // purple-700  (pressed)

  // status
  good: '#86efac',      // green-300
  warn: '#fde68a',      // amber-200
  bad: '#fca5a5',       // red-300
  info: '#93c5fd',      // blue-300
} as const

export const space = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.5rem',
  6: '2rem',
  7: '3rem',
  8: '4rem',
} as const

export const radii = {
  none: '0',
  sm: '0.25rem',
  md: '0.5rem',
  lg: '1rem',
  full: '9999px',
} as const

export const fonts = {
  mono: `"Cascadia Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`,
  bios: `"PxPlus IBM VGA 9x16", "Cascadia Mono", ui-monospace, monospace`,
} as const

export const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.5rem',
  '2xl': '2rem',
} as const

export const shadows = {
  panel: '0 2px 12px rgba(0, 0, 0, 0.5)',
  focus: `0 0 0 2px ${colors.accent}`,
} as const

export type Colors = typeof colors
export type Space = keyof typeof space
