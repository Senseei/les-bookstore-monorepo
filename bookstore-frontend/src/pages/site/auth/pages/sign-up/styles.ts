import styled from 'styled-components'

export const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.COLORS.NEUTRAL_50};
  padding: ${({ theme }) => theme.SPACING.XXL};
  padding-left: ${({ theme }) => theme.SPACING.LG};
  padding-right: ${({ theme }) => theme.SPACING.LG};
`

export const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

export const Form = styled.form`
  padding: ${({ theme }) => theme.SPACING.XXL};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.SPACING.XXL};
`

export const ErrorMessage = styled.div`
  padding: ${({ theme }) => theme.SPACING.LG};
  background-color: ${({ theme }) => theme.COLORS.ERROR_LIGHTER};
  border: 1px solid ${({ theme }) => theme.COLORS.ERROR_LIGHT};
  border-radius: ${({ theme }) => theme.BORDER_RADIUS.MD};
  color: ${({ theme }) => theme.COLORS.ERROR_DARK};
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
`

export const GlobalErrorAlert = styled.div`
  margin-bottom: ${({ theme }) => theme.SPACING.MD};
`

export const LoginLink = styled.div`
  margin-top: ${({ theme }) => theme.SPACING.XL};
  text-align: center;
`

export const LoginText = styled.p`
  color: ${({ theme }) => theme.COLORS.NEUTRAL_600};
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  margin: 0;
`

export const LoginAnchor = styled.a`
  color: ${({ theme }) => theme.COLORS.PRIMARY_MAIN};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.MEDIUM};

  &:hover {
    color: ${({ theme }) => theme.COLORS.PRIMARY_DARK};
    text-decoration: underline;
  }
`
