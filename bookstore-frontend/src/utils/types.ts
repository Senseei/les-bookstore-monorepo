export type Gender = 'male' | 'female' | 'other' | ''

// Brazilian State Codes - union type for compile-time safety
export type BrazilianStateCode =
  | 'AC' // Acre
  | 'AL' // Alagoas
  | 'AP' // Amapá
  | 'AM' // Amazonas
  | 'BA' // Bahia
  | 'CE' // Ceará
  | 'DF' // Distrito Federal
  | 'ES' // Espírito Santo
  | 'GO' // Goiás
  | 'MA' // Maranhão
  | 'MT' // Mato Grosso
  | 'MS' // Mato Grosso do Sul
  | 'MG' // Minas Gerais
  | 'PA' // Pará
  | 'PB' // Paraíba
  | 'PR' // Paraná
  | 'PE' // Pernambuco
  | 'PI' // Piauí
  | 'RJ' // Rio de Janeiro
  | 'RN' // Rio Grande do Norte
  | 'RS' // Rio Grande do Sul
  | 'RO' // Rondônia
  | 'RR' // Roraima
  | 'SC' // Santa Catarina
  | 'SP' // São Paulo
  | 'SE' // Sergipe
  | 'TO' // Tocantins
  | '' // Empty for initial state

// Address Types - aligned with backend enum
export const AddressType = {
  HOUSE: 'house',
  APARTMENT: 'apartment',
  CONDO: 'condo',
  WORK: 'work',
  RURAL: 'rural',
} as const

// Address Purpose - aligned with backend enum
export const AddressPurpose = {
  BILLING: 'billing',
  DELIVERY: 'delivery',
  BOTH: 'both',
} as const

export type AddressTypeValue = (typeof AddressType)[keyof typeof AddressType]
export type AddressPurposeValue =
  (typeof AddressPurpose)[keyof typeof AddressPurpose]

// Brazilian States
export interface BrazilianState {
  code: BrazilianStateCode
  name: string
}

// Residence Type Option for Select component
export interface ResidenceTypeOption {
  value: AddressTypeValue
  label: string
}

// Brazilian State Option for Select component
export interface StateOption {
  value: BrazilianStateCode
  label: string
}

export interface JwtToken {
  accessToken: string
}
