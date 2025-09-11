import type { Gender } from '@/utils/types'

export interface SignUpAddressDTO {
  type: string // Will map from AddressType enum
  addressName: string
  postalCode: string
  street: string
  number: string
  complement?: string
  district: string
  city: string
  state: string
}

export interface NewUserDTO {
  email: string
  password: string
  name: string
  cpf: string
  phone: string
  gender: Gender
  birthDate: Date
  address: SignUpAddressDTO
}
