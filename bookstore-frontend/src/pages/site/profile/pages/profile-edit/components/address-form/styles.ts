import styled from 'styled-components'

export const Container = styled.div`
  background: ${({ theme }) => theme.COLORS.NEUTRAL_50};
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`

export const FormTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.COLORS.NEUTRAL_800};
  margin-bottom: 24px;
  text-align: center;
`

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
`

export const FullWidthField = styled.div`
  width: 100%;
  margin-bottom: 16px;
`

export const CheckboxField = styled.div`
  margin-bottom: 24px;

  label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.COLORS.NEUTRAL_600};
    cursor: pointer;

    input[type='checkbox'] {
      width: 18px;
      height: 18px;
      accent-color: ${({ theme }) => theme.COLORS.PRIMARY_MAIN};
    }
  }
`

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`
