import styled from 'styled-components'

export const CustomerGrid = styled.div`
  display: grid;
  gap: ${(props) => props.theme.SPACING.MD};
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

export const CustomerCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.SPACING.MD};
  border: 1px solid ${(props) => props.theme.COLORS.NEUTRAL_200};
  border-radius: ${(props) => props.theme.BORDER_RADIUS.MD};
  background-color: ${(props) => props.theme.COLORS.NEUTRAL_50};
  transition: all ${(props) => props.theme.TRANSITIONS.FAST};

  &:hover {
    border-color: ${(props) => props.theme.COLORS.PRIMARY_LIGHT};
    box-shadow: 0 2px 4px ${(props) => props.theme.COLORS.NEUTRAL_200}40;
  }
`

export const CustomerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.SPACING.XS};
`

export const CustomerName = styled.h3`
  margin: 0;
  font-size: ${(props) => props.theme.FONT_SIZE.MEDIUM};
  font-weight: ${(props) => props.theme.FONT_WEIGHT.BOLD};
  color: ${(props) => props.theme.COLORS.NEUTRAL_800};
`

export const CustomerEmail = styled.p`
  margin: 0;
  font-size: ${(props) => props.theme.FONT_SIZE.SMALL};
  color: ${(props) => props.theme.COLORS.NEUTRAL_600};
`

export const CustomerStatus = styled.span<{ status: string }>`
  padding: ${(props) => `${props.theme.SPACING.XS} ${props.theme.SPACING.SM}`};
  border-radius: ${(props) => props.theme.BORDER_RADIUS.SM};
  font-size: ${(props) => props.theme.FONT_SIZE.XSMALL};
  font-weight: ${(props) => props.theme.FONT_WEIGHT.MEDIUM};
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${(props) => {
    const status = props.status
    if (status === 'Ativo') {
      return `
        background-color: ${props.theme.COLORS.SUCCESS_LIGHT}40;
        color: ${props.theme.COLORS.SUCCESS_DARK};
        border: 1px solid ${props.theme.COLORS.SUCCESS_LIGHT};
      `
    }
    if (status === 'Inativo') {
      return `
        background-color: ${props.theme.COLORS.NEUTRAL_200}40;
        color: ${props.theme.COLORS.NEUTRAL_600};
        border: 1px solid ${props.theme.COLORS.NEUTRAL_300};
      `
    }
    if (status === 'Suspenso') {
      return `
        background-color: ${props.theme.COLORS.ERROR_LIGHT}40;
        color: ${props.theme.COLORS.ERROR_DARK};
        border: 1px solid ${props.theme.COLORS.ERROR_LIGHT};
      `
    }
    return `
      background-color: ${props.theme.COLORS.NEUTRAL_100};
      color: ${props.theme.COLORS.NEUTRAL_600};
    `
  }}
`

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.SPACING.XXL};
  text-align: center;

  p {
    margin: 0;
    font-size: ${(props) => props.theme.FONT_SIZE.MEDIUM};
    color: ${(props) => props.theme.COLORS.NEUTRAL_500};
  }
`
