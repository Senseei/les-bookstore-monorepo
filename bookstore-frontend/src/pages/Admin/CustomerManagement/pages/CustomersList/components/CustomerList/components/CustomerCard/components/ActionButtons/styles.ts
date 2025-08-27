import styled from 'styled-components'

export const ActionButtons = styled.div`
  display: flex;
  gap: ${(props) => props.theme.SPACING.SM};
  width: 100%;

  button {
    flex: 1;
  }
`
