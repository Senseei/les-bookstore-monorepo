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

export type AddressTypeValue = (typeof AddressType)[keyof typeof AddressType]

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

export interface SignUpFormData {
  name: string
  cpf: string
  email: string
  password: string
  confirmPassword: string
  gender: Gender
  birthDate: string
  phone: string
  // Address
  addressIdentifier: string
  residenceType: AddressTypeValue | ''
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: BrazilianStateCode
  zipCode: string
  observations: string
}

export interface FormErrors {
  [key: string]: string
}

export interface FormProps {
  formData: SignUpFormData
  errors: FormErrors
  onChange: (name: string, value: string) => void
}
