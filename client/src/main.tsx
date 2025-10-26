import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store'
import "bootstrap/dist/css/bootstrap.min.css";
// @ts-ignore: bootstrap JS file has no type declarations for this path
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
