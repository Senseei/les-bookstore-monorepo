import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.COLORS.NEUTRAL_50};
  padding: 1rem;
`

export const ErrorCard = styled.div`
  max-width: 28rem;
  width: 100%;
  background-color: ${({ theme }) => theme.COLORS.NEUTRAL_50};
  border-radius: 0.5rem;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  text-align: center;
`

export const ErrorCodeContainer = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`

export const ErrorCode = styled.div`
  font-size: 6rem;
  font-weight: 900;
  color: ${({ theme }) => theme.COLORS.NEUTRAL_200};
  line-height: 1;
  user-select: none;
`

export const ErrorIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0%,
    100% {
      transform: translate(-50%, -50%) translateY(0px);
    }
    50% {
      transform: translate(-50%, -50%) translateY(-10px);
    }
  }
`

export const IconContainer = styled.div`
  width: 4rem;
  height: 4rem;
  background-color: ${({ theme }) => theme.COLORS.ERROR_LIGHTER};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: ${({ theme }) => theme.COLORS.ERROR_MAIN};
`

export const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.COLORS.NEUTRAL_900};
  margin-bottom: 0.5rem;
`

export const Message = styled.p`
  color: ${({ theme }) => theme.COLORS.NEUTRAL_600};
  margin-bottom: 1.5rem;
  line-height: 1.5;
`
