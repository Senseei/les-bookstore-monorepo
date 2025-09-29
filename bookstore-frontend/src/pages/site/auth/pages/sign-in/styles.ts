import styled from 'styled-components'

export const SignInContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.SPACING.LG};
  background-color: ${({ theme }) => theme.COLORS.NEUTRAL_50};
`

export const SignInCard = styled.div`
  width: 100%;
  max-width: 400px;
  padding: ${({ theme }) => theme.SPACING.XXL};
  background-color: ${({ theme }) => theme.COLORS.NEUTRAL_50};
  border-radius: ${({ theme }) => theme.BORDER_RADIUS.MD};
  box-shadow: ${({ theme }) => theme.SHADOWS.MD};
`

export const SignInHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.SPACING.XXL};
`

export const SignInTitle = styled.h1`
  font-size: ${({ theme }) => theme.FONT_SIZE.XXLARGE};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
  color: ${({ theme }) => theme.COLORS.NEUTRAL_900};
  margin-bottom: ${({ theme }) => theme.SPACING.SM};
`

export const SignInSubtitle = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.MEDIUM};
  color: ${({ theme }) => theme.COLORS.NEUTRAL_600};
  margin: 0;
`

export const SignInActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.SPACING.MD};
  margin-top: ${({ theme }) => theme.SPACING.LG};
`

export const ErrorMessage = styled.div`
  padding: ${({ theme }) => theme.SPACING.SM};
  background-color: ${({ theme }) => theme.COLORS.ERROR_LIGHTER};
  color: ${({ theme }) => theme.COLORS.ERROR_DARK};
  border: 1px solid ${({ theme }) => theme.COLORS.ERROR_LIGHT};
  border-radius: ${({ theme }) => theme.BORDER_RADIUS.SM};
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  text-align: center;
`

export const SignUpPrompt = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  color: ${({ theme }) => theme.COLORS.NEUTRAL_600};
  margin: 0;
`
