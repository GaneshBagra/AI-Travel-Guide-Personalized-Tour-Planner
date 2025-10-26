import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import('react-toastify/dist/ReactToastify.css');
  import("bootstrap/dist/css/bootstrap.min.css");
  // @ts-ignore: bootstrap JS file has no type declarations for this path
  import("bootstrap/dist/js/bootstrap.bundle.min.js");
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
