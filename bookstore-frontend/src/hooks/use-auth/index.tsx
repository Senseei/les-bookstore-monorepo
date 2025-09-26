import { useState } from 'react'

import type { NewUserDTO } from '@/dtos/user'
import { AuthService } from '@/services/auth.service'
import type { JwtToken } from '@/utils'

interface AuthState {
  token: JwtToken | null
  isLoading: boolean
  error: string | null
}

/**
 * Authentication Hook
 * Manages authentication state and provides auth-related functions
 */
export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    isLoading: false,
    error: null,
  })

  /**
   * Sign up a new user
   */
  const signUp = async (userData: NewUserDTO) => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await AuthService.signUp(userData)

      // Handle successful signup - response is the user object directly
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: null,
      }))

      return { success: true, data: response }
    } catch (error: unknown) {
      const axiosError = error as {
        response?: { data?: { message?: string } }
      }
      const errorMessage =
        axiosError.response?.data?.message || 'Erro ao criar conta'

      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))

      return { success: false, error: errorMessage }
    }
  }

  /**
   * Sign in user
   */
  const signIn = async (credentials: { email: string; password: string }) => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const token = await AuthService.signIn(credentials)

      setAuthState((prev) => ({
        ...prev,
        token,
        isLoading: false,
        error: null,
      }))

      return { success: true, data: token }
    } catch (error: unknown) {
      const axiosError = error as {
        response?: { data?: { message?: string } }
      }
      const errorMessage =
        axiosError.response?.data?.message || 'Erro ao fazer login'

      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))

      return { success: false, error: errorMessage }
    }
  }

  /**
   * Sign out user
   */
  const signOut = async () => {
    // TODO
  }

  /**
   * Clear auth error
   */
  const clearError = () => {
    setAuthState((prev) => ({ ...prev, error: null }))
  }

  return {
    // State
    token: authState.token,
    isLoading: authState.isLoading,
    error: authState.error,
    isAuthenticated: !!authState.token,

    // Actions
    signUp,
    signIn,
    signOut,
    clearError,
  }
}
