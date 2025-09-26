import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { useAuth } from '@/hooks'
import { useToast } from '@/providers/toast/use-toast'
import { ROUTES } from '@/routes/advanced'
import { type SignInFormData, signInSchema } from '@/schemas/auth-schemas'

export const useSignIn = () => {
  const { signIn, isLoading, error, clearError } = useAuth()
  const { showError } = useToast()
  const navigate = useNavigate()

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSignIn = async (data: SignInFormData) => {
    clearError()

    const result = await signIn(data)

    if (result.success) {
      navigate(ROUTES.HOME)
    } else {
      showError(result.error || 'Erro ao fazer login')
    }
  }

  return {
    form,
    handleSignIn,
    isLoading,
    error,
  }
}
