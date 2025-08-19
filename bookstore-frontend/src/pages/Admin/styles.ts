import styled from 'styled-components'

export const LayoutContainer = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.COLORS.NEUTRAL_50};
`

export const MainContent = styled.main`
  max-width: 1280px; /* Similar to max-w-7xl (1280px) */
  margin: 0 auto; /* mx-auto */
  padding: 32px 16px; /* py-8 px-4 */

  /* Responsive padding similar to sm:px-6 lg:px-8 */
  @media (min-width: 640px) {
    padding-left: 24px;
    padding-right: 24px;
  }

  @media (min-width: 1024px) {
    padding-left: 32px;
    padding-right: 32px;
  }
`
