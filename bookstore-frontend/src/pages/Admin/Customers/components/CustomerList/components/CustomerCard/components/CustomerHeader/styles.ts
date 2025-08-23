import styled from 'styled-components'

export const CustomerMainInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.SPACING.XS};
  flex: 1;
`

export const CustomerName = styled.h3`
  margin: 0;
  font-size: ${(props) => props.theme.FONT_SIZE.MEDIUM};
  font-weight: ${(props) => props.theme.FONT_WEIGHT.BOLD};
  color: ${(props) => props.theme.COLORS.NEUTRAL_800};
  line-height: 1.2;
`

export const CustomerID = styled.p`
  margin: 0;
  font-size: ${(props) => props.theme.FONT_SIZE.SMALL};
  color: ${(props) => props.theme.COLORS.NEUTRAL_500};
  font-weight: ${(props) => props.theme.FONT_WEIGHT.MEDIUM};
`

export const RankingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.SPACING.XS};
  margin-top: ${(props) => props.theme.SPACING.XS};
`

export const StarsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`

export const RankingText = styled.span`
  font-size: ${(props) => props.theme.FONT_SIZE.XSMALL};
  color: ${(props) => props.theme.COLORS.NEUTRAL_600};
  font-weight: ${(props) => props.theme.FONT_WEIGHT.MEDIUM};
`
