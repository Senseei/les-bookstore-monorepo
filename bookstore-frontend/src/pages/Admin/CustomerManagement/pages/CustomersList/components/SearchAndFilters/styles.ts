import styled from 'styled-components'

export const SearchAndFiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.SPACING.MD};
`

export const SearchRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.SPACING.MD};

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: flex-start;
  }
`

export const SearchInputWrapper = styled.div`
  position: relative;
  flex: 1;
`

export const SearchIcon = styled.div`
  position: absolute;
  left: ${(props) => props.theme.SPACING.SM};
  top: 50%;
  transform: translateY(-50%);
  color: ${(props) => props.theme.COLORS.NEUTRAL_400};
  font-size: 16px;
  pointer-events: none;
  z-index: 1;
`

export const SearchInputWithIcon = styled.div`
  position: relative;
  width: 100%;

  /* Override Input padding to account for icon */
  input {
    padding-left: 40px !important;
  }
`

export const FiltersContainer = styled.div<{ show: boolean }>`
  display: ${(props) => (props.show ? 'block' : 'none')};
  padding-top: ${(props) => props.theme.SPACING.MD};
  border-top: 1px solid ${(props) => props.theme.COLORS.NEUTRAL_200};
`

export const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${(props) => props.theme.SPACING.MD};

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.SPACING.XS};
`

export const FilterLabel = styled.label`
  font-size: ${(props) => props.theme.FONT_SIZE.SMALL};
  font-weight: ${(props) => props.theme.FONT_WEIGHT.MEDIUM};
  color: ${(props) => props.theme.COLORS.NEUTRAL_700};
`

export const ClearFiltersButtonWrapper = styled.div`
  display: flex;
  align-items: end;
  margin-top: ${(props) => props.theme.SPACING.LG};
`

export const ResultsInfo = styled.div`
  font-size: ${(props) => props.theme.FONT_SIZE.SMALL};
  color: ${(props) => props.theme.COLORS.NEUTRAL_500};
  margin-top: ${(props) => props.theme.SPACING.SM};
`
