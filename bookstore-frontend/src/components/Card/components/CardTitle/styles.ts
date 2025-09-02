import styled from 'styled-components'

export const StyledCardTitle = styled.h3`
  font-size: ${(props) =>
    props.theme.FONT_SIZE.XLARGE}; /* text-2xl equivalent */
  font-weight: ${(props) => props.theme.FONT_WEIGHT.MEDIUM}; /* font-semibold */
  line-height: 1;
  letter-spacing: -0.025em; /* tracking-tight */
  margin: 0;
`
