import type { JwtToken } from '@/utils'

const AUTH_TOKEN_KEY = 'auth-token'

/**
 * Auth Storage Utilities
 * Provides type-safe localStorage operations for authentication tokens
 */
export class AuthStorage {
  /**
   * Store authentication token in localStorage
   */
  static setAuthToken(token: JwtToken): void {
    try {
      localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(token))
    } catch {
      // Silent fail - storage not available
    }
  }

  /**
   * Retrieve authentication token from localStorage
   */
  static getAuthToken(): JwtToken | null {
    try {
      const storedToken = localStorage.getItem(AUTH_TOKEN_KEY)
      if (!storedToken) {
        return null
      }
      return JSON.parse(storedToken) as JwtToken
    } catch {
      // Clear corrupted token
      AuthStorage.removeAuthToken()
      return null
    }
  }

  /**
   * Remove authentication token from localStorage
   */
  static removeAuthToken(): void {
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY)
    } catch {
      // Silent fail - storage not available
    }
  }

  /**
   * Check if authentication token exists in localStorage
   */
  static hasAuthToken(): boolean {
    try {
      return localStorage.getItem(AUTH_TOKEN_KEY) !== null
    } catch {
      return false
    }
  }

  /**
   * Clear all authentication-related data from localStorage
   */
  static clearAuthData(): void {
    try {
      AuthStorage.removeAuthToken()
      // Add other auth-related cleanup here if needed
    } catch {
      // Silent fail - storage not available
    }
  }
}
