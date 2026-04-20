import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AOS from 'aos';
import { Provider } from 'react-redux'
import store from './Redux/store.js'
import { Toaster } from 'sonner'



createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster richColors position='bottom-right' toastOptions={{ duration: 1700 }} />
    </BrowserRouter>
    </Provider>
  // </StrictMode>,
)
