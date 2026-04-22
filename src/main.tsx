import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/cascadia-mono/latin-400.css'
import '@fontsource/cascadia-mono/latin-700.css'
import './theme/global.css'
import { App } from './App'

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('#root not found')

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
