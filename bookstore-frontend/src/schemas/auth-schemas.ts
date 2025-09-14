import { z } from 'zod'

import {
  addressText,
  birthDate,
  brazilianCPF,
  brazilianPhone,
  brazilianState,
  brazilianZipCode,
  email,
  gender,
  optionalAddressText,
  password,
  personName,
  residenceType,
} from './common-schemas'

/**
 * Authentication related schemas
 */

// Sign up form schema
export const signUpSchema = z
  .object({
    // Personal data
    name: personName,
    email,
    cpf: brazilianCPF,
    phone: brazilianPhone,
    gender,
    birthDate,
    password,
    confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),

    // Address data
    address: z.object({
      zipCode: brazilianZipCode,
      street: addressText,
      number: addressText,
      complement: optionalAddressText,
      neighborhood: addressText,
      city: addressText,
      state: brazilianState,
      residenceType,
      identifier: addressText,
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas não coincidem',
    path: ['confirmPassword'],
  })

// Sign in form schema
export const signInSchema = z.object({
  email,
  password: z.string().min(1, 'Senha é obrigatória'),
})

// Export inferred types
export type SignUpFormData = z.infer<typeof signUpSchema>
export type SignInFormData = z.infer<typeof signInSchema>
