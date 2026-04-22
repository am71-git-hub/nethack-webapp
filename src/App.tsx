export function App() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: 'var(--space-6)',
      }}
    >
      <div style={{ textAlign: 'center', lineHeight: 1.6 }}>
        <h1
          style={{
            margin: 0,
            color: 'var(--color-accent-hi)',
            fontFamily: 'var(--font-bios)',
            fontSize: '2.5rem',
            letterSpacing: '0.05em',
          }}
        >
          nethack-webapp
        </h1>
        <p style={{ color: 'var(--color-fg-muted)', marginTop: 'var(--space-2)' }}>
          Phase 2 · theme + fonts
        </p>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-fg-dim)', marginTop: 'var(--space-6)' }}>
          Sandbox workbench → <a href="/sandbox.html">sandbox.html</a>
        </p>
      </div>
    </main>
  )
}
