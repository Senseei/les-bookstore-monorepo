import { useForm } from 'react-hook-form'

import type { SignUpFormData } from './types'

export const useSignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormData>()

  const password = watch('password')

  const onSubmit = (data: SignUpFormData) => {
    // eslint-disable-next-line no-console
    console.log('Sign Up Data:', data)
  }

  const formValidation = {
    name: { required: 'Nome é obrigatório' },
    cpf: { required: 'CPF é obrigatório' },
    email: {
      required: 'Email é obrigatório',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Email inválido',
      },
    },
    password: {
      required: 'Senha é obrigatória',
      minLength: {
        value: 8,
        message: 'Senha deve ter pelo menos 6 caracteres',
      },
    },
    confirmPassword: {
      required: 'Confirmação de senha é obrigatória',
      validate: (value: string) => value === password || 'Senhas não coincidem',
    },
    gender: { required: 'Gênero é obrigatório' },
    birthDate: { required: 'Data de nascimento é obrigatória' },
    phone: { required: 'Telefone é obrigatório' },
    zipCode: { required: 'CEP é obrigatório' },
    street: { required: 'Logradouro é obrigatório' },
    number: { required: 'Número é obrigatório' },
    neighborhood: { required: 'Bairro é obrigatório' },
    city: { required: 'Cidade é obrigatória' },
    state: { required: 'Estado é obrigatório' },
    residenceType: { required: 'Tipo de residência é obrigatório' },
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    formValidation,
  }
}
