import styled from 'styled-components'

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
