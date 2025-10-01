import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios'

import { env } from '@/env'
import { AuthStorage } from '@/storage'
import type { JwtToken } from '@/utils'

import { ApiError } from './api-error'
import { NetworkError } from './network-error'

// Types
type SignOut = () => void
type RefreshToken = (refreshToken: string) => Promise<JwtToken>

type QueuedRequest = {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (
    signOut: SignOut,
    refreshTokenFn: RefreshToken,
  ) => () => void
}

// Global state for token refresh
let refreshTokenFunction: RefreshToken | null = null
let isRefreshing = false
let failedRequestsQueue: Array<QueuedRequest> = []

// Create axios instance
export const AxiosApp = axios.create({
  baseURL: env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}) as APIInstanceProps

// Development delay interceptor
if (env.ENABLE_API_DELAY) {
  AxiosApp.interceptors.request.use(
    async (config) => {
      await new Promise((resolve) => window.setTimeout(resolve, 1000))
      return config
    },
    (error) => Promise.reject(error),
  )
}

/**
 * Checks if the error is a network connectivity issue
 */
const isNetworkError = (error: AxiosError): boolean => {
  return !error?.response?.data && !error?.response?.status
}

/**
 * Checks if the error is from a refresh token request
 */
const isRefreshTokenRequest = (error: AxiosError): boolean => {
  return error?.config?.url?.includes('/auth/refresh-token') ?? false
}

/**
 * Checks if user should be signed out (no refresh token or function available)
 */
const shouldSignOut = (
  tokenData: { refreshToken?: string } | null,
): boolean => {
  return !tokenData?.refreshToken || !refreshTokenFunction
}

/**
 * Adds a failed request to the queue to retry later with new token
 */
const queueFailedRequest = (
  originalConfig: AxiosRequestConfig | undefined,
  resolve: (value: AxiosResponse) => void,
  reject: (reason?: unknown) => void,
): void => {
  failedRequestsQueue.push({
    onSuccess: (token) => {
      if (!originalConfig) return
      originalConfig.headers = {
        ...originalConfig.headers,
        Authorization: `Bearer ${token}`,
      }
      resolve(AxiosApp(originalConfig))
    },
    onFailure: (error) => reject(error),
  })
}

/**
 * Processes all queued requests after successful token refresh
 */
const processQueuedRequests = (token: string): void => {
  failedRequestsQueue.forEach((request) => request.onSuccess(token))
  failedRequestsQueue = []
}

/**
 * Clears the queue and fails all pending requests
 */
const clearQueueWithError = (error: AxiosError): void => {
  failedRequestsQueue.forEach((request) => request.onFailure(error))
  failedRequestsQueue = []
}

/**
 * Updates token in storage and axios headers
 */
const updateTokenEverywhere = (tokenData: JwtToken): void => {
  AuthStorage.setAuthToken(tokenData)
  AxiosApp.defaults.headers.common.Authorization = `Bearer ${tokenData.accessToken}`
}

/**
 * Handles the token refresh process
 */
const handleTokenRefresh = async (
  refreshToken: string,
  originalConfig: AxiosRequestConfig | undefined,
  signOut: SignOut,
): Promise<AxiosResponse | undefined> => {
  try {
    const newTokenData = await refreshTokenFunction!(refreshToken)

    updateTokenEverywhere(newTokenData)
    processQueuedRequests(newTokenData.accessToken)

    // Retry original request with new token
    if (originalConfig) {
      originalConfig.headers = {
        ...originalConfig.headers,
        Authorization: `Bearer ${newTokenData.accessToken}`,
      }
      return AxiosApp(originalConfig)
    }
  } catch (refreshError) {
    clearQueueWithError(refreshError as AxiosError)
    signOut()
    throw refreshError
  } finally {
    isRefreshing = false
  }
}

/**
 * Handles 401 Unauthorized errors with token refresh logic
 */
const handle401Error = async (
  error: AxiosError,
  signOut: SignOut,
): Promise<AxiosResponse> => {
  const storageTokenData = AuthStorage.getAuthToken()

  if (shouldSignOut(storageTokenData)) {
    signOut()
    return Promise.reject(error)
  }

  const originalConfig = error.config

  // If already refreshing, queue this request
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      queueFailedRequest(originalConfig, resolve, reject)
    })
  }

  // Start refresh process
  isRefreshing = true
  return handleTokenRefresh(
    storageTokenData!.refreshToken,
    originalConfig,
    signOut,
  )
}

/**
 * Transforms axios errors into custom API errors
 */
const transformApiError = (error: AxiosError): ApiError => {
  if (error.response?.data) {
    const {
      statusCode,
      error: errorMessage,
      message,
    } = error.response.data as {
      statusCode: number
      error: string
      message: string
    }
    return new ApiError(statusCode, errorMessage, message)
  }
  throw error
}

/**
 * Main response interceptor logic
 */
const responseInterceptor = (signOut: SignOut) => async (error: AxiosError) => {
  // Network error
  if (isNetworkError(error)) {
    return Promise.reject(new NetworkError())
  }

  // Don't refresh if this IS the refresh request
  if (isRefreshTokenRequest(error)) {
    signOut()
    return Promise.reject(error)
  }

  // Handle token expiration
  if (error?.response?.status === 401) {
    return handle401Error(error, signOut)
  }

  // Transform other API errors
  if (axios.isAxiosError(error)) {
    return Promise.reject(transformApiError(error))
  }

  return Promise.reject(error)
}

/**
 * Registers the token management interceptor
 */
AxiosApp.registerInterceptTokenManager = (signOut, refreshTokenFn) => {
  refreshTokenFunction = refreshTokenFn

  const interceptorId = AxiosApp.interceptors.response.use(
    (response) => response,
    responseInterceptor(signOut),
  )

  // Return cleanup function
  return () => {
    AxiosApp.interceptors.response.eject(interceptorId)
    refreshTokenFunction = null
  }
}
