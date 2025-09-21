import styled from 'styled-components'

export const CustomerDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.SPACING.XL};
  padding: ${(props) => props.theme.SPACING.XL};
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: ${(props) => props.theme.SPACING.LG};
    gap: ${(props) => props.theme.SPACING.LG};
  }
`

export const NavigationSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.SPACING.MD};
`

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: ${(props) => props.theme.SPACING.XL};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: ${(props) => props.theme.SPACING.LG};
  }
`

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.SPACING.XL};
`

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.SPACING.LG};

  @media (max-width: 1024px) {
    order: -1;
  }
`

export const StatusHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  h3 {
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.SPACING.SM};
    margin: 0;
  }
`

export const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${(props) => props.theme.SPACING.LG};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${(props) => props.theme.SPACING.MD};
  }
`

export const StatusItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.SPACING.XS};
`

export const StatusLabel = styled.span`
  font-size: ${(props) => props.theme.FONT_SIZE.SMALL};
  color: ${(props) => props.theme.COLORS.NEUTRAL_600};
  font-weight: ${(props) => props.theme.FONT_WEIGHT.MEDIUM};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const StatusValue = styled.span`
  font-size: ${(props) => props.theme.FONT_SIZE.MEDIUM};
  color: ${(props) => props.theme.COLORS.NEUTRAL_800};
  font-weight: ${(props) => props.theme.FONT_WEIGHT.MEDIUM};
`

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.SPACING.SM};
`

export const InfoSectionTitle = styled.h4`
  margin: 0;
  font-size: ${(props) => props.theme.FONT_SIZE.MEDIUM};
  font-weight: ${(props) => props.theme.FONT_WEIGHT.BOLD};
  color: ${(props) => props.theme.COLORS.NEUTRAL_800};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.SPACING.SM};
`

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

export const AddressCard = styled.div`
  padding: ${(props) => props.theme.SPACING.LG};
  border: 1px solid ${(props) => props.theme.COLORS.NEUTRAL_200};
  border-radius: ${(props) => props.theme.BORDER_RADIUS.MD};
  background-color: ${(props) => props.theme.COLORS.NEUTRAL_50};
  transition: all ${(props) => props.theme.TRANSITIONS.FAST};

  &:hover {
    border-color: ${(props) => props.theme.COLORS.PRIMARY_LIGHT};
    box-shadow: 0 2px 4px ${(props) => props.theme.COLORS.NEUTRAL_200}40;
  }
`

export const AddressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${(props) => props.theme.SPACING.MD};
`

export const AddressTitle = styled.h5`
  margin: 0;
  font-size: ${(props) => props.theme.FONT_SIZE.MEDIUM};
  font-weight: ${(props) => props.theme.FONT_WEIGHT.BOLD};
  color: ${(props) => props.theme.COLORS.NEUTRAL_800};
`

export const AddressType = styled.span`
  padding: ${(props) => props.theme.SPACING.XS}
    ${(props) => props.theme.SPACING.SM};
  background-color: ${(props) => props.theme.COLORS.PRIMARY_LIGHTER};
  color: ${(props) => props.theme.COLORS.PRIMARY_DARK};
  border-radius: ${(props) => props.theme.BORDER_RADIUS.SM};
  font-size: ${(props) => props.theme.FONT_SIZE.XSMALL};
  font-weight: ${(props) => props.theme.FONT_WEIGHT.MEDIUM};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const AddressDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.SPACING.XS};
`

export const AddressLine = styled.span`
  font-size: ${(props) => props.theme.FONT_SIZE.MEDIUM};
  color: ${(props) => props.theme.COLORS.NEUTRAL_700};
  line-height: 1.4;
`

export const OrderHistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.SPACING.MD};
`

export const OrderCard = styled.div`
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

export const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${(props) => props.theme.SPACING.SM};
`

export const OrderNumber = styled.h6`
  margin: 0;
  font-size: ${(props) => props.theme.FONT_SIZE.SMALL};
  font-weight: ${(props) => props.theme.FONT_WEIGHT.BOLD};
  color: ${(props) => props.theme.COLORS.NEUTRAL_800};
`

export const OrderDate = styled.span`
  font-size: ${(props) => props.theme.FONT_SIZE.XSMALL};
  color: ${(props) => props.theme.COLORS.NEUTRAL_600};
`

export const OrderDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.SPACING.XS};
`

export const OrderValue = styled.span`
  font-size: ${(props) => props.theme.FONT_SIZE.MEDIUM};
  font-weight: ${(props) => props.theme.FONT_WEIGHT.BOLD};
  color: ${(props) => props.theme.COLORS.PRIMARY_MAIN};
`

export const OrderStatus = styled.span<{ status: string }>`
  padding: ${(props) => props.theme.SPACING.XS}
    ${(props) => props.theme.SPACING.SM};
  border-radius: ${(props) => props.theme.BORDER_RADIUS.SM};
  font-size: ${(props) => props.theme.FONT_SIZE.XSMALL};
  font-weight: ${(props) => props.theme.FONT_WEIGHT.MEDIUM};
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${(props) => {
    switch (props.status) {
      case 'Entregue':
        return `
          background-color: ${props.theme.COLORS.SUCCESS_LIGHTER};
          color: ${props.theme.COLORS.SUCCESS_DARK};
        `
      case 'Em Trânsito':
        return `
          background-color: ${props.theme.COLORS.WARNING_LIGHTER};
          color: ${props.theme.COLORS.WARNING_DARK};
        `
      case 'Preparando':
        return `
          background-color: ${props.theme.COLORS.SECONDARY_LIGHTER};
          color: ${props.theme.COLORS.SECONDARY_DARK};
        `
      case 'Cancelado':
        return `
          background-color: ${props.theme.COLORS.ERROR_LIGHTER};
          color: ${props.theme.COLORS.ERROR_DARK};
        `
      default:
        return `
          background-color: ${props.theme.COLORS.NEUTRAL_200};
          color: ${props.theme.COLORS.NEUTRAL_700};
        `
    }
  }}
`

export const EmptyOrders = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.SPACING.XL};
  text-align: center;
  color: ${(props) => props.theme.COLORS.NEUTRAL_500};

  p {
    margin: 0;
    font-size: ${(props) => props.theme.FONT_SIZE.SMALL};
  }
`
