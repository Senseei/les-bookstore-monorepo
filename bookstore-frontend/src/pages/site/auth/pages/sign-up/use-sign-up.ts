import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { useAuth } from '@/hooks'
import { useToast } from '@/providers/toast/use-toast'
import { ROUTES } from '@/routes/constants'
import { type SignUpFormData, signUpSchema } from '@/schemas'

import { mapFormDataToNewUserDTO } from './mappers'

export const useSignUp = () => {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange', // Validate on every change
    reValidateMode: 'onChange', // Re-validate on every change
  })

  const { signUp, isLoading, error } = useAuth()
  const { showSuccess, showError } = useToast()
  const navigate = useNavigate()

  const onSubmit = async (data: SignUpFormData) => {
    // Map form data to DTO for backend
    const newUserData = mapFormDataToNewUserDTO(data)

    // eslint-disable-next-line no-console
    console.log('New User DTO:', newUserData)

    // Send data to backend API
    const result = await signUp(newUserData)

    if (result.success) {
      // Handle successful signup (redirect, show success message, etc.)
      // Show success toast
      showSuccess('Conta criada com sucesso! Redirecionando...', 3000)

      // Redirect to login page after a short delay
      window.setTimeout(() => {
        navigate(ROUTES.LOGIN)
      }, 3000)
    } else {
      // Error is already handled by the useAuth hook
      // eslint-disable-next-line no-console
      console.error('Signup failed:', result.error)

      // Show error toast
      showError(result.error || 'Erro ao criar conta. Tente novamente.', 5000)
    }
  }

  return {
    form,
    onSubmit,
    // Auth state
    isLoading,
    error,
  }
}
