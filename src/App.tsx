export function App() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: '#0d0014',
        color: '#e7d7ff',
        fontFamily: 'ui-monospace, monospace',
      }}
    >
      <div style={{ textAlign: 'center', lineHeight: 1.6 }}>
        <h1 style={{ margin: 0, color: '#c084fc', letterSpacing: '0.05em' }}>nethack-webapp</h1>
        <p style={{ opacity: 0.7, marginTop: '0.5rem' }}>Phase 1 · scaffold</p>
        <p style={{ fontSize: '0.85rem', opacity: 0.5, marginTop: '2rem' }}>
          <code>/sandbox</code> workbench → <a style={{ color: '#c084fc' }} href="/sandbox.html">sandbox.html</a>
        </p>
      </div>
    </main>
  )
}
