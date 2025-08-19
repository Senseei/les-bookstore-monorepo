import { ThemeProvider } from 'styled-components'

import { AdminLayout } from './pages/Admin'
import { defaultTheme, GlobalStyle } from './styles'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <AdminLayout />
    </ThemeProvider>
  )
}

export default App
