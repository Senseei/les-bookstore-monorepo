import styled from 'styled-components'

export const Container = styled.div`
  background: ${({ theme }) => theme.COLORS.NEUTRAL_50};
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  margin-bottom: 32px;
`

export const FormTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.COLORS.NEUTRAL_800};
  margin-bottom: 24px;
  text-align: center;
`

export const FormField = styled.div`
  margin-bottom: 24px;
`

export const PasswordStrength = styled.div`
  margin-top: 12px;
`

export const StrengthBar = styled.div`
  width: 100%;
  height: 6px;
  background: ${({ theme }) => theme.COLORS.NEUTRAL_200};
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 8px;
`

export const StrengthFill = styled.div<{ $percentage: number }>`
  height: 100%;
  width: ${({ $percentage }) => $percentage}%;
  background: ${({ theme, $percentage }) =>
    $percentage === 100
      ? theme.COLORS.SUCCESS_MAIN
      : $percentage >= 80
        ? theme.COLORS.PRIMARY_MAIN
        : $percentage >= 60
          ? theme.COLORS.WARNING_MAIN
          : $percentage >= 40
            ? theme.COLORS.WARNING_LIGHT
            : theme.COLORS.ERROR_MAIN};
  transition: all 0.3s ease;
`

export const StrengthText = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.COLORS.NEUTRAL_700};
  margin-bottom: 8px;
`

export const RequirementsList = styled.div`
  background: ${({ theme }) => theme.COLORS.NEUTRAL_100};
  border-radius: 8px;
  padding: 12px;
`

export const RequirementsTitle = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.COLORS.NEUTRAL_700};
  margin-bottom: 8px;
  text-transform: uppercase;
`

export const RequirementItem = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.COLORS.NEUTRAL_600};
  margin-bottom: 4px;

  &:last-child {
    margin-bottom: 0;
  }
`

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 32px;
`

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.COLORS.ERROR_MAIN};
  font-size: 0.875rem;
  margin-top: 4px;
`
