import styled from 'styled-components'

interface FormContainerProps {
  $noPadding?: boolean
}

export const FormContainer = styled.form<FormContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  padding: ${({ $noPadding, theme }) => ($noPadding ? '0' : theme.SPACING.XXL)};
`
