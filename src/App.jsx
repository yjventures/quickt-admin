import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/routes'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AuthProvider from './provider/AuthProvider'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

function App() {

  const darkTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });
  
  const queryClient = new QueryClient()

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <RouterProvider router={routes} />
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>

  )
}

export default App
