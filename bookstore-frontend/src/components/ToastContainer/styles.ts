import styled from 'styled-components'

export const ToastContainer = styled.div`
  position: fixed;
  top: ${(props) => props.theme.SPACING.LG};
  right: ${(props) => props.theme.SPACING.LG};
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.SPACING.MD};
  max-width: 420px;
  width: 100%;
  pointer-events: none;

  /* Allow interactions with toast content */
  > * {
    pointer-events: auto;
  }

  @media (max-width: 768px) {
    top: ${(props) => props.theme.SPACING.MD};
    right: ${(props) => props.theme.SPACING.MD};
    left: ${(props) => props.theme.SPACING.MD};
    max-width: none;
  }
`
