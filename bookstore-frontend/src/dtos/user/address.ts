import type { AddressPurposeValue, AddressTypeValue } from '@/utils/types'

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
  purpose?: AddressPurposeValue
  createdAt: Date
  updatedAt: Date
}
