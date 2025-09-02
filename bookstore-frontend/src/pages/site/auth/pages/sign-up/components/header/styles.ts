import styled from 'styled-components'

export const Container = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.SPACING.XL};
`

export const LogoLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.SPACING.SM};
  text-decoration: none;
  margin-bottom: ${({ theme }) => theme.SPACING.XXL};
`

export const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_MAIN};
  border-radius: ${({ theme }) => theme.BORDER_RADIUS.LG};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.FONT_SIZE.XLARGE};
`

export const LogoText = styled.span`
  font-size: ${({ theme }) => theme.FONT_SIZE.XLARGE};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
  color: ${({ theme }) => theme.COLORS.NEUTRAL_800};
`

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.FONT_SIZE.XXXLARGE};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
  color: ${({ theme }) => theme.COLORS.NEUTRAL_800};
  margin: ${({ theme }) => theme.SPACING.XXL} 0
    ${({ theme }) => theme.SPACING.SM} 0;
`

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.COLORS.NEUTRAL_600};
  font-size: ${({ theme }) => theme.FONT_SIZE.MEDIUM};
  margin: 0;
`
