import type { AddressTypeValue } from '@/utils/types'

export type AddressDTO = {
  id: string
  type: AddressTypeValue
  addressName: string
  postalCode: string
  street: string
  number: string
  complement?: string
  district: string
  city: string
  state: string
  createdAt: Date
  updatedAt: Date
}
