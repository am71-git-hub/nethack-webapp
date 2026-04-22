import { colors, fonts, fontSizes, space, radii } from '../theme/theme'
import { xtermTheme } from '../theme/xterm-theme'

export function ThemeSandbox() {
  return (
    <div style={{ padding: space[6], color: colors.fg }}>
      <h1 style={{ fontFamily: fonts.bios, color: colors.accentHi, marginTop: 0 }}>
        Theme tokens
      </h1>

      <Section title="Surfaces">
        <Swatch name="bg" value={colors.bg} />
        <Swatch name="surface" value={colors.surface} />
        <Swatch name="surfaceHi" value={colors.surfaceHi} />
        <Swatch name="border" value={colors.border} />
      </Section>

      <Section title="Text">
        <Swatch name="fg" value={colors.fg} />
        <Swatch name="fgMuted" value={colors.fgMuted} />
        <Swatch name="fgDim" value={colors.fgDim} />
      </Section>

      <Section title="Accents">
        <Swatch name="accent" value={colors.accent} />
        <Swatch name="accentHi" value={colors.accentHi} />
        <Swatch name="accentLo" value={colors.accentLo} />
      </Section>

      <Section title="Status">
        <Swatch name="good" value={colors.good} />
        <Swatch name="warn" value={colors.warn} />
        <Swatch name="bad" value={colors.bad} />
        <Swatch name="info" value={colors.info} />
      </Section>

      <Section title="Typography">
        <Specimen label="UI (Cascadia Mono)" family={fonts.mono} />
        <Specimen label="BIOS (PxPlus IBM VGA 9x16)" family={fonts.bios} />
      </Section>

      <Section title="Font sizes">
        {(Object.entries(fontSizes) as [keyof typeof fontSizes, string][]).map(([name, size]) => (
          <div key={name} style={{ marginBottom: space[2] }}>
            <span style={{ color: colors.fgMuted, marginRight: space[3] }}>{name}</span>
            <span style={{ fontSize: size }}>NetHack @ {size}</span>
          </div>
        ))}
      </Section>

      <Section title="Spacing scale">
        {(Object.entries(space) as [string, string][]).map(([name, value]) => (
          <div key={name} style={{ display: 'flex', alignItems: 'center', gap: space[3], marginBottom: space[1] }}>
            <span style={{ color: colors.fgMuted, width: '2rem' }}>{name}</span>
            <span style={{ color: colors.fgDim, width: '5rem', fontSize: fontSizes.sm }}>{value}</span>
            <span style={{ display: 'inline-block', height: '1rem', width: value, background: colors.accent }} />
          </div>
        ))}
      </Section>

      <Section title="Radii">
        {(Object.entries(radii) as [string, string][]).map(([name, value]) => (
          <div key={name} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', marginRight: space[4] }}>
            <div style={{ width: '3rem', height: '3rem', background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: value }} />
            <small style={{ color: colors.fgMuted, marginTop: space[1] }}>{name}</small>
          </div>
        ))}
      </Section>

      <Section title="xterm 16-color ANSI (re-tinted)">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, minmax(0, 1fr))', gap: space[2] }}>
          {ansiOrder.map((name) => (
            <Swatch key={name} name={name} value={xtermTheme[name as keyof typeof xtermTheme]} />
          ))}
        </div>
      </Section>

      <Section title="Sample NetHack-style map line">
        <pre
          style={{
            background: colors.bg,
            border: `1px solid ${colors.border}`,
            padding: space[3],
            fontFamily: fonts.bios,
            fontSize: '20px',
            lineHeight: 1,
            margin: 0,
          }}
        >
{`                    --------
                    |......|
                    |.....@|
                    |......+
                    -------.
                           #####
                              ..
                Dlvl:1  $:0  HP:16(16)  Pw:2(2)  AC:6  Exp:1`}
        </pre>
      </Section>
    </div>
  )
}

const ansiOrder = [
  'black', 'red', 'green', 'yellow',
  'blue', 'magenta', 'cyan', 'white',
  'brightBlack', 'brightRed', 'brightGreen', 'brightYellow',
  'brightBlue', 'brightMagenta', 'brightCyan', 'brightWhite',
]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: space[6] }}>
      <h2 style={{ fontSize: fontSizes.lg, color: colors.accentHi, marginBottom: space[3], borderBottom: `1px solid ${colors.border}`, paddingBottom: space[1] }}>
        {title}
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: space[3] }}>{children}</div>
    </section>
  )
}

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div
        style={{
          width: '6rem',
          height: '3rem',
          background: value,
          border: `1px solid ${colors.border}`,
          borderRadius: radii.sm,
        }}
      />
      <small style={{ color: colors.fgMuted, marginTop: space[1] }}>{name}</small>
      <small style={{ color: colors.fgDim, fontSize: fontSizes.xs }}>{value}</small>
    </div>
  )
}

function Specimen({ label, family }: { label: string; family: string }) {
  return (
    <div style={{ marginBottom: space[3] }}>
      <div style={{ color: colors.fgMuted, fontSize: fontSizes.sm, marginBottom: space[1] }}>{label}</div>
      <div style={{ fontFamily: family, fontSize: '1.25rem' }}>
        The quick brown fox jumps over the lazy dog · 0123456789 · <code>{'@'}</code>{'  '}
        <code>{'#'}</code> <code>{'$'}</code> <code>{')'}</code> <code>{'['}</code> <code>{'!'}</code>{' '}
        <code>{'?'}</code> <code>{'/'}</code>
      </div>
    </div>
  )
}
