import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/cascadia-mono/latin-400.css'
import '@fontsource/cascadia-mono/latin-700.css'
import '../theme/global.css'
import { ThemeSandbox } from './theme'

type PageId = 'theme' | 'button-group' | 'layout-manager' | 'settings' | 'auth' | 'mock-engine'

const pages: { id: PageId; label: string; phase: number; component?: () => JSX.Element }[] = [
  { id: 'theme', label: 'theme tokens', phase: 2, component: ThemeSandbox },
  { id: 'button-group', label: 'button group', phase: 4 },
  { id: 'layout-manager', label: 'layout manager', phase: 5 },
  { id: 'mock-engine', label: 'mock engine', phase: 6 },
  { id: 'settings', label: 'settings', phase: 7 },
  { id: 'auth', label: 'auth', phase: 8 },
]

function useHashPage(): PageId | null {
  const [page, setPage] = useState<PageId | null>(() => hashToPage(window.location.hash))
  useEffect(() => {
    const onChange = () => setPage(hashToPage(window.location.hash))
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return page
}

function hashToPage(hash: string): PageId | null {
  const stripped = hash.replace(/^#/, '') as PageId
  return pages.some((p) => p.id === stripped) ? stripped : null
}

function SandboxIndex() {
  const page = useHashPage()
  if (page) {
    const match = pages.find((p) => p.id === page)
    if (match?.component) {
      return (
        <div>
          <nav style={navStyle}>
            <a href="#" style={linkStyle}>← sandbox index</a>
          </nav>
          <match.component />
        </div>
      )
    }
    return (
      <Menu>
        <p style={{ color: 'var(--color-warn)' }}>
          <code>{page}</code> has no sandbox page yet.
        </p>
      </Menu>
    )
  }
  return <Menu />
}

function Menu({ children }: { children?: React.ReactNode }) {
  return (
    <main style={{ padding: '2rem', maxWidth: '40rem' }}>
      <h1 style={{ color: 'var(--color-accent-hi)', fontFamily: 'var(--font-bios)', marginTop: 0 }}>
        Sandbox
      </h1>
      <p style={{ color: 'var(--color-fg-muted)' }}>
        Isolated workbenches for each shell component. Click a page to load it.
      </p>
      {children}
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '2rem' }}>
        {pages.map((p) => (
          <li key={p.id} style={{ marginBottom: '0.5rem' }}>
            {p.component ? (
              <a href={`#${p.id}`} style={linkStyle}>
                <span style={{ color: 'var(--color-fg-dim)', marginRight: '0.75rem' }}>
                  phase {p.phase}
                </span>
                {p.label}
              </a>
            ) : (
              <span style={{ color: 'var(--color-fg-dim)' }}>
                <span style={{ marginRight: '0.75rem' }}>phase {p.phase}</span>
                {p.label} <em>(not yet)</em>
              </span>
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}

const linkStyle: React.CSSProperties = {
  color: 'var(--color-accent-hi)',
  textDecoration: 'none',
}

const navStyle: React.CSSProperties = {
  padding: '0.75rem 2rem',
  borderBottom: '1px solid var(--color-border)',
  background: 'var(--color-surface)',
}

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('#root not found')

createRoot(rootEl).render(
  <StrictMode>
    <SandboxIndex />
  </StrictMode>,
)
