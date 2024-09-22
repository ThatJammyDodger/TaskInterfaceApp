import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './Pages/App.jsx'
import CssBaseline from '@mui/materials/CssBaseline'
import './main.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CssBaseline />
    <App />
  </StrictMode>,
)
