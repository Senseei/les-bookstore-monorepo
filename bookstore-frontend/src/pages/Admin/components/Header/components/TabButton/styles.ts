import styled from 'styled-components'

export const StyledButton = styled.button<{ $isActive: boolean }>`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background-color: ${(props) =>
    props.$isActive ? props.theme.COLORS.PRIMARY_MAIN : 'transparent'};
  color: ${(props) =>
    props.$isActive
      ? props.theme.COLORS.NEUTRAL_50
      : props.theme.COLORS.NEUTRAL_600};
  font-size: ${(props) => props.theme.FONT_SIZE.SMALL};
  font-weight: ${(props) => props.theme.FONT_WEIGHT.MEDIUM};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.$isActive
        ? props.theme.COLORS.PRIMARY_DARK
        : props.theme.COLORS.NEUTRAL_100};
    color: ${(props) =>
      props.$isActive
        ? props.theme.COLORS.NEUTRAL_50
        : props.theme.COLORS.NEUTRAL_800};
  }

  &:focus {
    outline: 2px solid ${(props) => props.theme.COLORS.PRIMARY_LIGHTER};
    outline-offset: 2px;
  }
`
