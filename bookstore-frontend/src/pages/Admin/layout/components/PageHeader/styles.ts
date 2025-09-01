import styled from 'styled-components'

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px; /* gap-4 equivalent */

  /* sm:flex-row sm:items-center sm:justify-between */
  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
`

export const Title = styled.h1`
  font-size: ${(props) => props.theme.FONT_SIZE.XXXLARGE};
  font-weight: ${(props) => props.theme.FONT_WEIGHT.BOLD};
  color: ${(props) => props.theme.COLORS.NEUTRAL_800};
  margin: 0;
`

export const Subtitle = styled.p`
  color: ${(props) => props.theme.COLORS.NEUTRAL_600};
  margin: 4px 0 0 0;
  font-size: ${(props) => props.theme.FONT_SIZE.MEDIUM};
`
