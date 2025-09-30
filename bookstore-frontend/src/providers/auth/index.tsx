import { useEffect, useState } from 'react'

import type { NewUserDTO } from '@/dtos/user'
import { AuthService } from '@/services/auth.service'

import { AuthContext } from './auth-context'
import type { AuthProviderProps, AuthState } from './types'

const TOKEN_STORAGE_KEY = 'auth-token'

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    isLoading: true, // Start with loading true to check for existing token
    error: null,
  })

  /**
   * Load token from storage on app initialization
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check for stored token
        const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY)

        if (storedToken) {
          const token = JSON.parse(storedToken)

          // Set token in axios headers
          await AuthService.setToken(token.accessToken)

          // Update auth state
          setAuthState({
            token,
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
      } catch (error) {
        console.error('Error initializing auth:', error)
        // Clear invalid token
        localStorage.removeItem(TOKEN_STORAGE_KEY)
        setAuthState({
          token: null,
          isLoading: false,
          error: 'Erro ao restaurar sessão',
        })
      }
    }

    initializeAuth()
  }, [])

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

      // Store token in localStorage
      localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(token))

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
    // Clear token from storage
    localStorage.removeItem(TOKEN_STORAGE_KEY)

    // Clear token from axios headers
    await AuthService.removeToken()

    // Clear local auth state
    setAuthState((prev) => ({
      ...prev,
      token: null,
      error: null,
    }))
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
