import { useCallback, useState } from 'react'

export interface ToastMessage {
  id: string
  variant: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
}

/**
 * Simple toast hook for managing alert messages
 */
export const useToast = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const addToast = useCallback(
    (
      message: string,
      variant: ToastMessage['variant'] = 'info',
      duration = 5000,
    ) => {
      const id = Math.random().toString(36).substring(2, 9)
      const newToast: ToastMessage = { id, message, variant, duration }

      setToasts((prev) => [...prev, newToast])

      // Auto remove after duration
      if (duration > 0) {
        window.setTimeout(() => {
          removeToast(id)
        }, duration)
      }
      return id
    },
    [],
  )

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const clearAllToasts = useCallback(() => {
    setToasts([])
  }, [])

  // Convenience methods
  const showSuccess = useCallback(
    (message: string, duration?: number) =>
      addToast(message, 'success', duration),
    [addToast],
  )

  const showError = useCallback(
    (message: string, duration?: number) =>
      addToast(message, 'error', duration),
    [addToast],
  )

  const showWarning = useCallback(
    (message: string, duration?: number) =>
      addToast(message, 'warning', duration),
    [addToast],
  )

  const showInfo = useCallback(
    (message: string, duration?: number) => addToast(message, 'info', duration),
    [addToast],
  )

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  }
}
