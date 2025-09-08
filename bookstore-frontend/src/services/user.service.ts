import type { PaginatedResultDTO } from '@/dtos/common'
import type { MinUserDTO } from '@/dtos/user/min-user'

import { AxiosApp } from './axios-app'

export interface GetUsersParams {
  page?: number
  pageSize?: number
  search?: string
  status?: string
  ranking?: string
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
}
