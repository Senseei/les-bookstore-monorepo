import { RouterProvider } from 'react-router'
import { ThemeProvider } from 'styled-components'

import { ToastProvider } from '@/providers'

import { Router } from './routes'
import { defaultTheme, GlobalStyle } from './styles'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <ToastProvider>
        <RouterProvider router={Router} />
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App
