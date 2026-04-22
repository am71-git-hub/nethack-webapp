import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('#root not found')

createRoot(rootEl).render(
  <StrictMode>
    <main
      style={{
        minHeight: '100vh',
        padding: '2rem',
        background: '#0d0014',
        color: '#e7d7ff',
        fontFamily: 'ui-monospace, monospace',
      }}
    >
      <h1 style={{ color: '#c084fc', margin: 0 }}>Sandbox</h1>
      <p style={{ opacity: 0.7 }}>
        Component workbenches land here. Nothing mounted yet.
      </p>
      <ul style={{ opacity: 0.6, marginTop: '2rem' }}>
        <li>button-group (phase 4)</li>
        <li>layout-manager (phase 5)</li>
        <li>settings (phase 7)</li>
        <li>auth (phase 8)</li>
        <li>mock-engine (phase 6)</li>
      </ul>
    </main>
  </StrictMode>,
)
