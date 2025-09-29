import { Funnel, MagnifyingGlass } from 'phosphor-react'

import { Button, Input, Select } from '@/components'

import * as S from './styles'

interface SearchAndFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  showFilters: boolean
  onToggleFilters: () => void
  statusFilter: string
  onStatusChange: (value: string) => void
  rankingFilter: string
  onRankingChange: (value: string) => void
  onClearFilters: () => void
  resultsCount: number
  totalCount: number
}

export const SearchAndFilters = ({
  searchTerm,
  onSearchChange,
  showFilters,
  onToggleFilters,
  statusFilter,
  onStatusChange,
  rankingFilter,
  onRankingChange,
  onClearFilters,
  resultsCount,
  totalCount,
}: SearchAndFiltersProps) => {
  return (
    <S.SearchAndFiltersContainer>
      <S.SearchRow>
        <S.SearchInputWrapper>
          <S.SearchIcon>
            <MagnifyingGlass size={16} />
          </S.SearchIcon>
          <S.SearchInputWithIcon>
            <Input
              data-testid="customer-search-input"
              placeholder="Pesquisar por nome, email, CPF, código do cliente ou telefone..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              fullWidth
            />
          </S.SearchInputWithIcon>
        </S.SearchInputWrapper>
        <Button
          data-testid="filters-toggle-button"
          variant="outline"
          onClick={onToggleFilters}
          startIcon={<Funnel size={16} />}
        >
          Filtros
        </Button>
      </S.SearchRow>

      <S.FiltersContainer show={showFilters}>
        <S.FiltersGrid>
          <S.FilterGroup>
            <S.FilterLabel>Status</S.FilterLabel>
            <Select
              data-testid="status-filter-select"
              value={statusFilter}
              onChange={onStatusChange}
              placeholder="Todos"
              options={[
                { value: 'Ativo', label: 'Ativo' },
                { value: 'Inativo', label: 'Inativo' },
                { value: 'Suspenso', label: 'Suspenso' },
              ]}
              fullWidth
            />
          </S.FilterGroup>

          <S.FilterGroup>
            <S.FilterLabel>Ranking</S.FilterLabel>
            <Select
              value={rankingFilter}
              onChange={onRankingChange}
              placeholder="Todos"
              options={[
                { value: '5', label: '5 Estrelas' },
                { value: '4', label: '4 Estrelas' },
                { value: '3', label: '3 Estrelas' },
                { value: '2', label: '2 Estrelas' },
                { value: '1', label: '1 Estrela' },
              ]}
              fullWidth
            />
          </S.FilterGroup>

          <S.FilterGroup>
            <S.ClearFiltersButtonWrapper>
              <Button
                data-testid="clear-filters-button"
                variant="outline"
                onClick={onClearFilters}
                fullWidth
              >
                Limpar Filtros
              </Button>
            </S.ClearFiltersButtonWrapper>
          </S.FilterGroup>
        </S.FiltersGrid>
      </S.FiltersContainer>

      <S.ResultsInfo data-testid="results-count">
        Mostrando {resultsCount} de {totalCount} clientes
      </S.ResultsInfo>
    </S.SearchAndFiltersContainer>
  )
}
