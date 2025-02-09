import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MainContextProvider } from './context/MainContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <MainContextProvider>
        <App />
        <ToastContainer className={'text-xs  cursor-pointer'} closeOnClick draggable limit={2}  autoClose={900}/>
      </MainContextProvider>
    </StrictMode>
  </BrowserRouter>,
)
