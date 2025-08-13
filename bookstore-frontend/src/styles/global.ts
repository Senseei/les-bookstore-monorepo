import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  /* Reset CSS */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  }

  html, body {
    width: 100%;
    height: 100%;
    font-family: 'Open Sans', system-ui, Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background-color: ${({ theme }) => theme.COLORS.NEUTRAL_50};
  }

  button, input, textarea {
    font-family: inherit;
  }

  input[type="checkbox"] {
    cursor: pointer;
  }
`
