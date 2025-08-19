import styled from 'styled-components'

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background-color: ${(props) => props.theme.COLORS.PRIMARY_MAIN};
  color: ${(props) => props.theme.COLORS.NEUTRAL_50};
  border: none;
  border-radius: 6px;
  font-weight: ${(props) => props.theme.FONT_WEIGHT.MEDIUM};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  &:hover {
    background-color: ${(props) => props.theme.COLORS.PRIMARY_DARK};
  }

  &:focus {
    outline: 2px solid ${(props) => props.theme.COLORS.PRIMARY_LIGHTER};
    outline-offset: 2px;
  }
`

export const PlusIcon = styled.span`
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`
