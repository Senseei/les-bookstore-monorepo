import { AxiosApp } from '@/services/axios-app'

import type { Address } from '../types'

type AddressType = 'house' | 'apartment' | 'condo' | 'work' | 'rural'

interface CreateAddressData {
  type: AddressType
  addressName: string
  postalCode: string
  street: string
  number: string
  complement?: string
  district: string
  city: string
  state: string
}

export interface AddressService {
  createAddress(
    userId: string,
    addressData: CreateAddressData,
  ): Promise<Address>
  updateAddress(
    userId: string,
    addressId: string,
    addressData: Partial<CreateAddressData>,
  ): Promise<Address>
  deleteAddress(userId: string, addressId: string): Promise<void>
  getUserAddresses(userId: string): Promise<Address[]>
}

export class AddressServiceImpl implements AddressService {
  async createAddress(
    userId: string,
    addressData: CreateAddressData,
  ): Promise<Address> {
    const response = await AxiosApp.post<Address>(
      `/users/${userId}/addresses`,
      addressData,
    )
    return response.data
  }

  async updateAddress(
    userId: string,
    addressId: string,
    addressData: Partial<CreateAddressData>,
  ): Promise<Address> {
    const response = await AxiosApp.put<Address>(
      `/users/${userId}/addresses/${addressId}`,
      addressData,
    )
    return response.data
  }

  async deleteAddress(userId: string, addressId: string): Promise<void> {
    await AxiosApp.delete(`/users/${userId}/addresses/${addressId}`)
  }

  async getUserAddresses(userId: string): Promise<Address[]> {
    const response = await AxiosApp.get<Address[]>(`/users/${userId}/addresses`)
    return response.data
  }
}

export const addressService = new AddressServiceImpl()
