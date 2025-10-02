import { Navigate } from 'react-router'

import { useAuth } from '@/providers'
import { ROUTES } from '@/routes/constants'
import { getUserFromToken } from '@/utils'

import type { ProtectedRouteProps } from './types'

/**
 * ProtectedRoute Component
 *
 * Protects routes based on authentication and role requirements.
 *
 * @param children - The components to render if access is allowed
 * @param requiredRoles - Array of roles that can access this route
 * @param fallbackPath - Path to redirect to if access is denied (defaults to signin)
 */
export const ProtectedRoute = ({
  children,
  requiredRoles = [],
  fallbackPath = ROUTES.SIGNIN,
}: ProtectedRouteProps) => {
  const { token, isLoading } = useAuth()

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Verificando acesso...</p>
        </div>
      </div>
    )
  }

  // Redirect to signin if not authenticated
  if (!token) {
    return <Navigate to={fallbackPath} replace />
  }

  // Get user information from token
  const user = getUserFromToken(token.accessToken)

  // Redirect if token is invalid
  if (!user) {
    return <Navigate to={fallbackPath} replace />
  }

  // Check role requirements if specified
  if (requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.includes(user.role)

    if (!hasRequiredRole) {
      return <Navigate to={ROUTES.ERROR} replace />
    }
  }

  // All checks passed, render the protected content
  return <>{children}</>
}
