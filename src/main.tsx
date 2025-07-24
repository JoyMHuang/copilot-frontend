import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const isDevelopment = import.meta.env.DEV;

createRoot(document.getElementById('root')!).render(
  isDevelopment ? (
    // 开发环境：可选择是否使用StrictMode
    <App />
  ) : (
    // 生产环境：始终使用StrictMode
    <StrictMode>
      <App />
    </StrictMode>
  ),
)
