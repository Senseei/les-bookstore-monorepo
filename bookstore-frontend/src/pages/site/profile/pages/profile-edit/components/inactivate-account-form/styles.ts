import styled from 'styled-components'

export const Container = styled.div`
  padding: 1.5rem;
  border: 1px solid ${(props) => props.theme.COLORS.ERROR_MAIN};
  border-radius: 8px;
  background-color: ${(props) => props.theme.COLORS.NEUTRAL_50};
  margin-top: 2rem;
`

export const FormTitle = styled.h3`
  color: ${(props) => props.theme.COLORS.ERROR_MAIN};
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
`

export const InfoText = styled.p`
  color: ${(props) => props.theme.COLORS.NEUTRAL_700};
  margin-bottom: 1.5rem;
  line-height: 1.5;
`

export const WarningText = styled.p`
  color: ${(props) => props.theme.COLORS.ERROR_MAIN};
  margin-bottom: 1rem;
  line-height: 1.5;

  strong {
    font-weight: 600;
  }
`

export const FormActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
`
