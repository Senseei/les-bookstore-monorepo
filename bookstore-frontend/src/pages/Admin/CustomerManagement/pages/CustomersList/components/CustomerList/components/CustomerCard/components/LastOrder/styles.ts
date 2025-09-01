import styled from 'styled-components'

export const LastOrderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.SPACING.XS};
  padding: ${(props) => props.theme.SPACING.SM};
  background-color: ${(props) => props.theme.COLORS.NEUTRAL_50};
  border-radius: ${(props) => props.theme.BORDER_RADIUS.SM};
  margin-bottom: ${(props) => props.theme.SPACING.MD};
  border: 1px solid ${(props) => props.theme.COLORS.NEUTRAL_100};
`

export const LastOrderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.SPACING.XS};
`

export const LastOrderDate = styled.span`
  font-size: ${(props) => props.theme.FONT_SIZE.SMALL};
  color: ${(props) => props.theme.COLORS.NEUTRAL_700};
  font-weight: ${(props) => props.theme.FONT_WEIGHT.MEDIUM};
`

export const LastOrderLabel = styled.span`
  font-size: ${(props) => props.theme.FONT_SIZE.XSMALL};
  color: ${(props) => props.theme.COLORS.NEUTRAL_500};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: ${(props) => props.theme.FONT_WEIGHT.MEDIUM};
`
