import { useCallback, useEffect, useState } from 'react'

import type { NewUserDTO } from '@/dtos/user'
import { AuthService } from '@/services/auth.service'
import { AxiosApp } from '@/services/axios-app'
import { AuthStorage } from '@/storage'
import { getUserFromToken } from '@/utils'

import { AuthContext } from './auth-context'
import type { AuthProviderProps, AuthState } from './types'

export * from './types' // Export types for external use

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    user: null,
    isLoading: true, // Start with loading true to check for existing token
    error: null,
  })

  /**
   * Refresh token function for axios interceptor
   */
  const refreshToken = useCallback(async (refreshTokenValue: string) => {
    return await AuthService.refreshToken(refreshTokenValue)
  }, [])

  /**
   * Sign out user
   */
  const signOut = useCallback(async () => {
    // Clear token from storage
    AuthStorage.removeAuthToken()

    // Clear token from AxiosApp default headers
    delete AxiosApp.defaults.headers.common.Authorization

    // Clear local auth state
    setAuthState((prev) => ({
      ...prev,
      token: null,
      user: null,
      error: null,
    }))
  }, [])

  /**
   * Load token from storage on app initialization
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check for stored token using AuthStorage
        const token = AuthStorage.getAuthToken()

        if (token) {
          // Set token in AxiosApp default headers for interceptor
          AxiosApp.defaults.headers.common.Authorization = `Bearer ${token.accessToken}`

          // Decode user information from token
          const user = getUserFromToken(token.accessToken)

          // Update auth state
          setAuthState({
            token,
            user,
            isLoading: false,
            error: null,
          })
        } else {
          // No token found
          setAuthState((prev) => ({
            ...prev,
            isLoading: false,
          }))
        }
      } catch {
        // Clear invalid token and reset state
        AuthStorage.clearAuthData()
        setAuthState({
          token: null,
          user: null,
          isLoading: false,
          error: 'Erro ao restaurar sessão',
        })
      }
    }

    initializeAuth()
  }, [])

  /**
   * Register axios interceptor for token management
   */
  useEffect(() => {
    const interceptorCleanup = AxiosApp.registerInterceptTokenManager(
      signOut,
      refreshToken,
    )

    // Cleanup interceptor on unmount
    return interceptorCleanup
  }, [signOut, refreshToken])

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

      // Set token in AxiosApp default headers for interceptor
      AxiosApp.defaults.headers.common.Authorization = `Bearer ${token.accessToken}`

      // Store token using AuthStorage
      AuthStorage.setAuthToken(token)

      // Decode user information from token
      const user = getUserFromToken(token.accessToken)

      setAuthState((prev) => ({
        ...prev,
        token,
        user,
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
   * Clear auth error
   */
  const clearError = () => {
    setAuthState((prev) => ({ ...prev, error: null }))
  }

  const contextValue = {
    // State
    token: authState.token,
    user: authState.user,
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
