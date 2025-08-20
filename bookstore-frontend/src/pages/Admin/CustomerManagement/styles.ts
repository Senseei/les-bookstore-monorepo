import styled from 'styled-components'

export const CustomerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.SPACING.XL};
`

export const InputDemo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.SPACING.LG};

  h3 {
    margin: 0;
    color: ${(props) => props.theme.COLORS.NEUTRAL_700};
    font-size: ${(props) => props.theme.FONT_SIZE.MEDIUM};
    font-weight: ${(props) => props.theme.FONT_WEIGHT.MEDIUM};
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.SPACING.SM};
  }
`
