// xterm.js theme object. The 16-color ANSI palette is re-tinted into the
// purple family while keeping the canonical hue order so NetHack's coloured
// glyphs remain readable (monsters, spellbooks, potions all use ANSI slots).
//
// Reference: https://xtermjs.org/docs/api/terminal/interfaces/itheme/

import { colors } from './theme'

export const xtermTheme = {
  background: colors.bg,
  foreground: colors.fg,
  cursor: colors.accentHi,
  cursorAccent: colors.bg,
  selectionBackground: colors.accentLo,
  selectionForeground: colors.fg,

  // Normal intensities
  black: '#1a0a24',
  red: '#d46a9c',       // red shifted toward magenta
  green: '#8ae0c8',     // green shifted toward teal/violet
  yellow: '#d8b4a0',    // warm muted
  blue: '#8b7ad8',      // blue shifted violet
  magenta: '#c084fc',   // accent high
  cyan: '#b8a0e0',      // cyan shifted lavender
  white: '#e7d7ff',     // foreground

  // Bright intensities — slightly higher luminance, same hue bias
  brightBlack: '#4a3060',
  brightRed: '#f5a3c8',
  brightGreen: '#b0f5dc',
  brightYellow: '#f5d4b8',
  brightBlue: '#ad9cff',
  brightMagenta: '#e0b3ff',
  brightCyan: '#d4bffc',
  brightWhite: '#ffffff',
} as const

export type XtermTheme = typeof xtermTheme
