import styled from 'styled-components'

export const StyledCard = styled.div`
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.COLORS.NEUTRAL_200};
  background-color: ${(props) => props.theme.COLORS.NEUTRAL_50};
  color: ${(props) => props.theme.COLORS.NEUTRAL_800};
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
`
