import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.SPACING.LG};
  padding: ${(props) => props.theme.SPACING.LG};
`

export const ErrorMessage = styled.div`
  padding: ${(props) => props.theme.SPACING.MD};
  background-color: ${(props) => props.theme.COLORS.ERROR_LIGHT};
  color: ${(props) => props.theme.COLORS.ERROR_DARK};
  border: 1px solid ${(props) => props.theme.COLORS.ERROR_MAIN};
  border-radius: ${(props) => props.theme.BORDER_RADIUS.MD};
  text-align: center;
`

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.SPACING.MD};
  padding: ${(props) => props.theme.SPACING.XL};
  min-height: 400px;
`

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(props) => props.theme.SPACING.MD};
`

export const FormActions = styled.div`
  display: flex;
  gap: ${(props) => props.theme.SPACING.MD};
  justify-content: flex-end;
  margin-top: ${(props) => props.theme.SPACING.LG};
  padding-top: ${(props) => props.theme.SPACING.LG};
  border-top: 1px solid ${(props) => props.theme.COLORS.NEUTRAL_200};
`
