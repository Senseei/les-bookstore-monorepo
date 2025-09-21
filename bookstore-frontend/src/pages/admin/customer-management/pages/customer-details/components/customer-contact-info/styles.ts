import styled from 'styled-components'

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${(props) => props.theme.SPACING.MD};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.SPACING.XS};
`

export const InfoLabel = styled.span`
  font-size: ${(props) => props.theme.FONT_SIZE.SMALL};
  color: ${(props) => props.theme.COLORS.NEUTRAL_600};
  font-weight: ${(props) => props.theme.FONT_WEIGHT.MEDIUM};
`

export const InfoValue = styled.span`
  font-size: ${(props) => props.theme.FONT_SIZE.MEDIUM};
  color: ${(props) => props.theme.COLORS.NEUTRAL_800};
`
