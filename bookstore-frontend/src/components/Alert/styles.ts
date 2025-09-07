import styled, { css, keyframes } from 'styled-components'

const slideInFromRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`

const slideOutToRight = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`

export interface AlertProps {
  variant?: 'success' | 'error' | 'warning' | 'info'
  isVisible?: boolean
}

export const Alert = styled.div<AlertProps>`
  display: flex;
  align-items: flex-start;
  gap: ${(props) => props.theme.SPACING.SM};
  padding: ${(props) => props.theme.SPACING.MD};
  border-radius: ${(props) => props.theme.BORDER_RADIUS.LG};
  font-size: ${(props) => props.theme.FONT_SIZE.SMALL};
  font-weight: ${(props) => props.theme.FONT_WEIGHT.MEDIUM};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(8px);
  animation: ${slideInFromRight} 0.3s ease-out;
  min-width: 300px;
  max-width: 400px;
  position: relative;
  overflow: hidden;

  ${(props) =>
    !props.isVisible &&
    css`
      animation: ${slideOutToRight} 0.3s ease-in forwards;
    `}

  /* Variant styles with modern colors */
  ${(props) => {
    const variant = props.variant || 'info'
    switch (variant) {
      case 'success':
        return css`
          background: linear-gradient(135deg, #d4f6db 0%, #c6f7d0 100%);
          border-left: 4px solid #22c55e;
          color: #15803d;
        `
      case 'error':
        return css`
          background: linear-gradient(135deg, #fed7d7 0%, #fecaca 100%);
          border-left: 4px solid #ef4444;
          color: #dc2626;
        `
      case 'warning':
        return css`
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          border-left: 4px solid #f59e0b;
          color: #d97706;
        `
      default:
        return css`
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
          border-left: 4px solid #3b82f6;
          color: #1d4ed8;
        `
    }
  }}

  /* Subtle hover effect */
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;
  }
`

export const AlertIcon = styled.span`
  display: flex;
  align-items: center;
  font-size: 18px;
  margin-top: 1px;
  flex-shrink: 0;
`

export const AlertMessage = styled.span`
  flex: 1;
  line-height: 1.4;
  word-break: break-word;
`

export const AlertCloseButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 2px;
  display: flex;
  align-items: center;
  opacity: 0.6;
  transition: all 0.2s ease;
  border-radius: ${(props) => props.theme.BORDER_RADIUS.SM};
  flex-shrink: 0;
  margin-top: 1px;

  &:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.1);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`
