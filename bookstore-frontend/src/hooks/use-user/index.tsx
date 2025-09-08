import { useCallback, useState } from 'react'

import type { MinUserDTO } from '@/dtos/user/min-user'
import type { GetUsersParams } from '@/services/user.service'
import { UserService } from '@/services/user.service'

interface UserState {
  users: MinUserDTO[]
  totalCount: number
  currentPage: number
  pageSize: number
  isLoading: boolean
  error: string | null
}

/**
 * User Hook
 * Manages user state and provides user-related functions
 */
export const useUser = () => {
  const [userState, setUserState] = useState<UserState>({
    users: [],
    totalCount: 0,
    currentPage: 1,
    pageSize: 10,
    isLoading: false,
    error: null,
  })

  /**
   * Get all users with pagination
   */
  const getAllUsers = useCallback(async (params: GetUsersParams = {}) => {
    setUserState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await UserService.getAllUsers(params)

      setUserState((prev) => ({
        ...prev,
        users: response.items,
        totalCount: response.totalCount,
        currentPage: response.currentPage,
        pageSize: response.pageSize,
        isLoading: false,
        error: null,
      }))

      return { success: true, data: response }
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } }
      const errorMessage =
        axiosError.response?.data?.message || 'Erro ao buscar usuários'

      setUserState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))

      return { success: false, error: errorMessage }
    }
  }, [])

  /**
   * Clear user error
   */
  const clearError = useCallback(() => {
    setUserState((prev) => ({ ...prev, error: null }))
  }, [])

  return {
    // State
    users: userState.users,
    totalCount: userState.totalCount,
    currentPage: userState.currentPage,
    pageSize: userState.pageSize,
    isLoading: userState.isLoading,
    error: userState.error,

    // Actions
    getAllUsers,
    clearError,
  }
}
