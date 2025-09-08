export interface Customer {
  id: number
  name: string
  customerId: string
  email: string
  status: 'Ativo' | 'Inativo' | 'Suspenso'
  ranking: number
  phoneAreaCode: string
  phoneNumber: string
  address: string
  lastOrder: string
  cpf?: string
  birthDate?: string
  gender?: 'Masculino' | 'Feminino' | 'Outro'
}

export interface Address {
  id: number
  type: 'apartment' | 'condo' | 'work' | 'rural'
  name: string
  residenceType: 'Casa' | 'Apartamento' | 'Comercial'
  streetType: string
  street: string
  number: string
  neighborhood: string
  zipCode: string
  city: string
  state: string
  country: string
  observations?: string
}

export interface CreditCard {
  id: number
  number: string
  holderName: string
  brand: string
  securityCode: string
  isPreferred: boolean
}

export interface CustomerEditData {
  name: string
  email: string
  phoneAreaCode: string
  phoneNumber: string
  cpf: string
  birthDate: string
  gender: 'Masculino' | 'Feminino' | 'Outro'
  addresses: Address[]
  creditCards: CreditCard[]
}
