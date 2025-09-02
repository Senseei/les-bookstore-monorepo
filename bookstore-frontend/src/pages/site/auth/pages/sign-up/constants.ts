import type {
  AddressTypeValue,
  BrazilianState,
  BrazilianStateCode,
  ResidenceTypeOption,
  StateOption,
} from './types'
import { AddressType } from './types'

// Residence types mapped to backend enum values with Portuguese labels
export const residenceTypeOptions: ResidenceTypeOption[] = [
  { value: AddressType.HOUSE, label: 'Casa' },
  { value: AddressType.APARTMENT, label: 'Apartamento' },
  { value: AddressType.CONDO, label: 'Condomínio' },
  { value: AddressType.WORK, label: 'Trabalho' },
  { value: AddressType.RURAL, label: 'Rural' },
]

// Brazilian states data
export const brazilianStatesData: BrazilianState[] = [
  { code: 'AC', name: 'Acre' },
  { code: 'AL', name: 'Alagoas' },
  { code: 'AP', name: 'Amapá' },
  { code: 'AM', name: 'Amazonas' },
  { code: 'BA', name: 'Bahia' },
  { code: 'CE', name: 'Ceará' },
  { code: 'DF', name: 'Distrito Federal' },
  { code: 'ES', name: 'Espírito Santo' },
  { code: 'GO', name: 'Goiás' },
  { code: 'MA', name: 'Maranhão' },
  { code: 'MT', name: 'Mato Grosso' },
  { code: 'MS', name: 'Mato Grosso do Sul' },
  { code: 'MG', name: 'Minas Gerais' },
  { code: 'PA', name: 'Pará' },
  { code: 'PB', name: 'Paraíba' },
  { code: 'PR', name: 'Paraná' },
  { code: 'PE', name: 'Pernambuco' },
  { code: 'PI', name: 'Piauí' },
  { code: 'RJ', name: 'Rio de Janeiro' },
  { code: 'RN', name: 'Rio Grande do Norte' },
  { code: 'RS', name: 'Rio Grande do Sul' },
  { code: 'RO', name: 'Rondônia' },
  { code: 'RR', name: 'Roraima' },
  { code: 'SC', name: 'Santa Catarina' },
  { code: 'SP', name: 'São Paulo' },
  { code: 'SE', name: 'Sergipe' },
  { code: 'TO', name: 'Tocantins' },
]

// State options for Select component
export const stateOptions: StateOption[] = brazilianStatesData.map((state) => ({
  value: state.code,
  label: state.name,
}))

// Helper function to get residence type label by value
export const getResidenceTypeLabel = (value: AddressTypeValue): string => {
  const option = residenceTypeOptions.find((opt) => opt.value === value)
  return option?.label || value
}

// Helper function to get state name by code
export const getStateName = (code: BrazilianStateCode): string => {
  const state = brazilianStatesData.find((state) => state.code === code)
  return state?.name || code
}
