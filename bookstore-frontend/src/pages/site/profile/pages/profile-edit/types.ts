export interface Customer {
  id: string
  name: string
  email: string
  cpf: string
  phone: string
  gender: 'Masculino' | 'Feminino' | 'Outro'
  birthDate: string
  addresses?: Address[]
  createdAt?: string
  updatedAt?: string
}

export interface Address {
  id: string
  type: 'house' | 'apartment' | 'condo' | 'work' | 'rural'
  addressName: string // Nome identificador do endereço
  postalCode: string // CEP
  street: string
  number: string
  complement?: string
  district: string // Bairro
  city: string
  state: string
  createdAt?: string
  updatedAt?: string
}

export interface PasswordChangeData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface ProfileData {
  name: string
  email: string
  cpf: string
  phone: string
  gender: string
  birthDate: string
}
