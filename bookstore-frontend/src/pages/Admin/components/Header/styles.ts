import styled from 'styled-components'

export const HeaderContainer = styled.header`
  background-color: ${(props) => props.theme.COLORS.NEUTRAL_50};
  border-bottom: 1px solid ${(props) => props.theme.COLORS.NEUTRAL_200};
  padding: 16px 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`

export const Title = styled.h1`
  color: ${(props) => props.theme.COLORS.NEUTRAL_800};
  font-size: ${(props) => props.theme.FONT_SIZE.XLARGE};
  font-weight: ${(props) => props.theme.FONT_WEIGHT.BOLD};
  margin: 0;
`

export const Navigation = styled.nav`
  display: flex;
  gap: 12px;
`
