import styled from 'styled-components'

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.SPACING.LG};
`

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.FONT_SIZE.XLARGE};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
  color: ${({ theme }) => theme.COLORS.NEUTRAL_800};
  margin: 0;
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.SPACING.LG};

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`
