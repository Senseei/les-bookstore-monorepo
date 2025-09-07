import React from 'react'
import { useForm } from 'react-hook-form'

import {
  formatCPF,
  formatDate,
  formatPhone,
  formatZipCode,
  removeMask,
} from '@/utils/input-masks'

import type { SignUpFormData } from './types'

type InputChangeEvent = React.ChangeEvent<{ value: string }>

export const useSignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SignUpFormData>()

  const password = watch('password')

  const onSubmit = (data: SignUpFormData) => {
    // Remove masks before submitting
    // TODO sanitize the data
    const cleanData = {
      ...data,
      cpf: removeMask(data.cpf),
      phone: removeMask(data.phone),
      zipCode: removeMask(data.zipCode),
      birthDate: data.birthDate.replace(/\//g, '-'), // Convert DD/MM/YYYY to DD-MM-YYYY
    }

    // eslint-disable-next-line no-console
    console.log('Sign Up Data:', cleanData)
  }

  // Helper functions for masked inputs
  const registerCPF = (validationRules: object) => ({
    ...register('cpf', validationRules),
    onChange: (e: InputChangeEvent) => {
      const maskedValue = formatCPF(e.target.value)
      setValue('cpf', maskedValue, { shouldValidate: true })
    },
  })

  const registerPhone = (validationRules: object) => ({
    ...register('phone', validationRules),
    onChange: (e: InputChangeEvent) => {
      const maskedValue = formatPhone(e.target.value)
      setValue('phone', maskedValue, { shouldValidate: true })
    },
  })

  const registerZipCode = (validationRules: object) => ({
    ...register('zipCode', validationRules),
    onChange: (e: InputChangeEvent) => {
      const maskedValue = formatZipCode(e.target.value)
      setValue('zipCode', maskedValue, { shouldValidate: true })
    },
  })

  const registerBirthDate = (validationRules: object) => ({
    ...register('birthDate', validationRules),
    onChange: (e: InputChangeEvent) => {
      const maskedValue = formatDate(e.target.value)
      setValue('birthDate', maskedValue, { shouldValidate: true })
    },
  })

  const formValidation = {
    name: {
      required: 'Nome é obrigatório',
      minLength: {
        value: 2,
        message: 'Nome deve ter pelo menos 2 caracteres',
      },
      maxLength: {
        value: 100,
        message: 'Nome deve ter no máximo 100 caracteres',
      },
      pattern: {
        value: /^[a-zA-ZÀ-ÿ\s]+$/,
        message: 'Nome deve conter apenas letras e espaços',
      },
    },
    cpf: {
      required: 'CPF é obrigatório',
      pattern: {
        value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/,
        message:
          'CPF deve estar no formato 000.000.000-00 ou conter 11 dígitos',
      },
      validate: (value: string) => {
        // Basic CPF validation
        const cleanCPF = value.replace(/\D/g, '')
        if (cleanCPF.length !== 11) return 'CPF deve ter 11 dígitos'
        if (/^(\d)\1{10}$/.test(cleanCPF)) return 'CPF inválido'
        return true
      },
    },
    email: {
      required: 'Email é obrigatório',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Email inválido',
      },
      maxLength: {
        value: 255,
        message: 'Email deve ter no máximo 255 caracteres',
      },
    },
    password: {
      required: 'Senha é obrigatória',
      pattern: {
        value:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message:
          'Senha deve conter ao menos uma letra maiúscula, uma minúscula, um número e um caractere especial',
      },
      minLength: {
        value: 8,
        message: 'Senha deve ter pelo menos 8 caracteres',
      },
      maxLength: {
        value: 128,
        message: 'Senha deve ter no máximo 128 caracteres',
      },
    },
    confirmPassword: {
      required: 'Confirmação de senha é obrigatória',
      validate: (value: string) => value === password || 'Senhas não coincidem',
    },
    gender: { required: 'Gênero é obrigatório' },
    birthDate: {
      required: 'Data de nascimento é obrigatória',
      validate: (value: string) => {
        const today = new Date()
        const birthDate = new Date(value)

        // Check if date is valid
        if (isNaN(birthDate.getTime())) return 'Data inválida'

        // Check if date is not in the future
        if (birthDate > today)
          return 'Data de nascimento não pode ser no futuro'

        // Check minimum age (13 years)
        const age = today.getFullYear() - birthDate.getFullYear()
        const monthDiff = today.getMonth() - birthDate.getMonth()
        const dayDiff = today.getDate() - birthDate.getDate()

        let actualAge = age
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
          actualAge--
        }

        if (actualAge < 13) return 'Você deve ter pelo menos 13 anos'
        if (actualAge > 120) return 'Idade inválida'

        return true
      },
    },
    phone: {
      required: 'Telefone é obrigatório',
      pattern: {
        value: /^\(\d{2}\)\s\d{4,5}-\d{4}$|^\d{10,11}$/,
        message:
          'Telefone deve estar no formato (11) 99999-9999 ou conter 10-11 dígitos',
      },
    },
    zipCode: {
      required: 'CEP é obrigatório',
      pattern: {
        value: /^\d{5}-?\d{3}$/,
        message: 'CEP deve estar no formato 00000-000',
      },
    },
    street: {
      required: 'Logradouro é obrigatório',
      minLength: {
        value: 5,
        message: 'Logradouro deve ter pelo menos 5 caracteres',
      },
      maxLength: {
        value: 255,
        message: 'Logradouro deve ter no máximo 255 caracteres',
      },
    },
    number: {
      required: 'Número é obrigatório',
      pattern: {
        value: /^[0-9A-Za-z\s\-/]+$/,
        message: 'Número pode conter apenas letras, números, espaços e hífens',
      },
      maxLength: {
        value: 20,
        message: 'Número deve ter no máximo 20 caracteres',
      },
    },
    neighborhood: {
      required: 'Bairro é obrigatório',
      minLength: {
        value: 2,
        message: 'Bairro deve ter pelo menos 2 caracteres',
      },
      maxLength: {
        value: 100,
        message: 'Bairro deve ter no máximo 100 caracteres',
      },
    },
    city: {
      required: 'Cidade é obrigatória',
      minLength: {
        value: 2,
        message: 'Cidade deve ter pelo menos 2 caracteres',
      },
      maxLength: {
        value: 100,
        message: 'Cidade deve ter no máximo 100 caracteres',
      },
      pattern: {
        value: /^[a-zA-ZÀ-ÿ\s\-']+$/,
        message:
          'Cidade deve conter apenas letras, espaços, hífens e apostrofes',
      },
    },
    state: {
      required: 'Estado é obrigatório',
      pattern: {
        value: /^[A-Z]{2}$/,
        message:
          'Estado deve ser uma sigla de 2 letras maiúsculas (ex: SP, RJ)',
      },
    },
    residenceType: { required: 'Tipo de residência é obrigatório' },
    complement: {
      maxLength: {
        value: 100,
        message: 'Complemento deve ter no máximo 100 caracteres',
      },
    },
    observations: {
      maxLength: {
        value: 500,
        message: 'Observações devem ter no máximo 500 caracteres',
      },
    },
    addressIdentifier: {
      maxLength: {
        value: 50,
        message: 'Nome do endereço deve ter no máximo 50 caracteres',
      },
    },
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    formValidation,
    registerCPF,
    registerPhone,
    registerZipCode,
    registerBirthDate,
  }
}
