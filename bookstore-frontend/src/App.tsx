import { RouterProvider } from 'react-router'
import { ThemeProvider } from 'styled-components'

import { AuthProvider, ToastProvider } from '@/providers'

import { Router } from './routes'
import { defaultTheme, GlobalStyle } from './styles'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <AuthProvider>
        <ToastProvider>
          <RouterProvider router={Router} />
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
