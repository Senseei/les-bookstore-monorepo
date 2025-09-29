import type { PaginatedResultDTO } from '@/dtos/common'
import type { AddressDTO } from '@/dtos/user/address'
import type { MinUserDTO } from '@/dtos/user/min-user'
import type { UserDTO } from '@/dtos/user/user'
import type { Gender } from '@/utils/types'

import { AxiosApp } from './axios-app'

export interface GetUsersParams {
  page?: number
  pageSize?: number
  search?: string
  status?: string
  ranking?: string
}

export interface UpdateUserData {
  name?: string
  email?: string
  cpf?: string
  phone?: string
  gender?: Gender
  birthDate?: string // ISO format YYYY-MM-DD
}

export interface PasswordChangeData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface CreateAddressData {
  type: 'house' | 'apartment' | 'condo' | 'work' | 'rural'
  addressName: string
  postalCode: string
  street: string
  number: string
  complement?: string
  district: string
  city: string
  state: string
  purpose?: 'billing' | 'delivery' | 'both'
}

/**
 * User API Service
 * Handles all user-related API calls
 */
export class UserService {
  /**
   * Get all users with pagination
   */
  static async getAllUsers(
    params: GetUsersParams = {},
  ): Promise<PaginatedResultDTO<MinUserDTO>> {
    const queryParams: string[] = []

    if (params.page) queryParams.push(`page=${params.page}`)
    if (params.pageSize) queryParams.push(`pageSize=${params.pageSize}`)
    if (params.search)
      queryParams.push(`search=${encodeURIComponent(params.search)}`)
    if (params.status)
      queryParams.push(`status=${encodeURIComponent(params.status)}`)
    if (params.ranking) queryParams.push(`ranking=${params.ranking}`)

    const queryString = queryParams.join('&')
    const url = queryString ? `/users?${queryString}` : '/users'

    const response = await AxiosApp.get(url)
    return response.data
  }

  /**
   * Get user by ID
   */
  static async getUserById(id: string): Promise<UserDTO> {
    const response = await AxiosApp.get<UserDTO>(`/users/${id}`)
    return response.data
  }

  /**
   * Get current authenticated user
   */
  static async getCurrentUser(): Promise<UserDTO> {
    const response = await AxiosApp.get<UserDTO>('/me')
    return response.data
  }

  /**
   * Update user data
   */
  static async updateUser(
    id: string,
    userData: UpdateUserData,
  ): Promise<UserDTO> {
    const response = await AxiosApp.put<UserDTO>(`/users/${id}`, userData)
    return response.data
  }

  /**
   * Change user password
   */
  static async changePassword(
    id: string,
    passwordData: Omit<PasswordChangeData, 'confirmPassword'>,
  ): Promise<void> {
    const changePasswordPayload = {
      oldPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    }
    await AxiosApp.put(`/users/${id}/password`, changePasswordPayload)
  }

  /**
   * Create user address
   */
  static async createAddress(
    userId: string,
    addressData: CreateAddressData,
  ): Promise<AddressDTO> {
    const response = await AxiosApp.post<AddressDTO>(
      `/users/${userId}/addresses`,
      addressData,
    )
    return response.data
  }

  /**
   * Update user address
   */
  static async updateAddress(
    userId: string,
    addressId: string,
    addressData: Partial<CreateAddressData>,
  ): Promise<AddressDTO> {
    const response = await AxiosApp.put<AddressDTO>(
      `/users/${userId}/addresses/${addressId}`,
      addressData,
    )
    return response.data
  }

  /**
   * Delete user address
   */
  static async deleteAddress(userId: string, addressId: string): Promise<void> {
    await AxiosApp.delete(`/users/${userId}/addresses/${addressId}`)
  }

  /**
   * Get user addresses
   */
  static async getUserAddresses(userId: string): Promise<AddressDTO[]> {
    const response = await AxiosApp.get<AddressDTO[]>(
      `/users/${userId}/addresses`,
    )
    return response.data
  }

  /**
   * Inactivate user
   */
  static async inactivateUser(userId: string): Promise<void> {
    await AxiosApp.delete(`/users/${userId}`)
  }
}
