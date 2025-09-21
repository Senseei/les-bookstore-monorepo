import styled from 'styled-components'

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.COLORS.NEUTRAL_900};
  margin: 0;
`

export const SectionContent = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`
