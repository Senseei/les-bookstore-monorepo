import styled from 'styled-components'

export const StyledCard = styled.div`
  border-radius: ${(props) => props.theme.BORDER_RADIUS.LG};
  border: 1px solid ${(props) => props.theme.COLORS.NEUTRAL_200};
  background-color: ${(props) => props.theme.COLORS.NEUTRAL_50};
  color: ${(props) => props.theme.COLORS.NEUTRAL_800};
  box-shadow: ${(props) => props.theme.SHADOWS.MD};
`
