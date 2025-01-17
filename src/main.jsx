import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import Router from './routes/Router.jsx'
import AppProvider from './context/AppProvider.jsx'
import AuthProvider from './context/AuthProvider.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppProvider>
          <RouterProvider router={Router}/>
        </AppProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
