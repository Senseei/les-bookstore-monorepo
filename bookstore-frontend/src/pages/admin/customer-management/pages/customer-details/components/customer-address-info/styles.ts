import styled from 'styled-components'

export const AddressList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.SPACING.MD};
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

export const EmptyState = styled.div`
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
