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

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`

export const FormActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`
