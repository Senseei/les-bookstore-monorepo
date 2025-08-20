import { RouterProvider } from 'react-router'
import { ThemeProvider } from 'styled-components'

import { Router } from './routes'
import { defaultTheme, GlobalStyle } from './styles'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <RouterProvider router={Router} />
    </ThemeProvider>
  )
}

export default App
