import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LoginProvider } from './FuncComps/LoginContext.jsx'

createRoot(document.getElementById('root')).render(
    <LoginProvider>
        <App />
    </LoginProvider>
)
