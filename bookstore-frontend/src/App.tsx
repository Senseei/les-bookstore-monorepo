import { ThemeProvider } from 'styled-components'

import { SignIn } from './pages'
import { defaultTheme, GlobalStyle } from './styles'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <SignIn />
    </ThemeProvider>
  )
}

export default App
