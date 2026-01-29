import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { registerServiceWorker } from './utils/registerServiceWorker.ts'
import { initProjectSync } from './services/githubService.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Register service worker for offline support
registerServiceWorker()

// Initialize GitHub projects sync
initProjectSync()
