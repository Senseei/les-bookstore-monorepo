import { useState } from 'react'

import type { NewUserDTO } from '@/dtos/user'
import { AuthService } from '@/services/auth.service'

import { AuthContext } from './auth-context'
import type { AuthProviderProps, AuthState } from './types'

export const AuthProvider = ({ children }: AuthProviderProps) => {
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

      // Set token in axios headers
      await AuthService.setToken(token.accessToken)

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
    try {
      // Call backend signout endpoint
      await AuthService.signOut()
    } catch {
      // Continue with local signout even if backend call fails
    } finally {
      // Clear token from axios headers
      await AuthService.removeToken()

      // Clear local auth state
      setAuthState((prev) => ({
        ...prev,
        token: null,
        error: null,
      }))
    }
  }

  /**
   * Clear auth error
   */
  const clearError = () => {
    setAuthState((prev) => ({ ...prev, error: null }))
  }

  const contextValue = {
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

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
