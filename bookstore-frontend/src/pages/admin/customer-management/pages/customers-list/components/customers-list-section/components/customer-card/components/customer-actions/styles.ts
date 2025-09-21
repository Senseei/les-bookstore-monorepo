import styled from 'styled-components'

export const CustomerActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${(props) => props.theme.SPACING.XS};
`

export const ConfirmationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${(props) => props.theme.SPACING.XS};
  padding: ${(props) => props.theme.SPACING.SM};
  background: ${(props) => props.theme.COLORS.NEUTRAL_50};
  border: 1px solid ${(props) => props.theme.COLORS.ERROR_LIGHT};
  border-radius: ${(props) => props.theme.BORDER_RADIUS.SM};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

export const ConfirmationText = styled.p`
  margin: 0;
  font-size: ${(props) => props.theme.FONT_SIZE.SMALL};
  color: ${(props) => props.theme.COLORS.ERROR_MAIN};
  font-weight: ${(props) => props.theme.FONT_WEIGHT.MEDIUM};
  text-align: center;
  margin-bottom: ${(props) => props.theme.SPACING.XS};
`

export const ConfirmationActions = styled.div`
  display: flex;
  gap: ${(props) => props.theme.SPACING.XS};
`
