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
 * Profile management related schemas
 */

// Profile edit form schema
export const profileEditSchema = z.object({
  name: personName,
  email,
  cpf: brazilianCPF,
  phone: brazilianPhone,
  birthDate,
  gender,
})

// Address form schema for profile management
export const addressFormSchema = z.object({
  type: residenceType.refine(
    (value) => value !== undefined && value !== '',
    'Tipo de residência é obrigatório',
  ),
  purpose: z
    .string()
    .min(1, 'Finalidade é obrigatória')
    .refine(
      (value) => ['billing', 'delivery', 'both'].includes(value),
      'Finalidade deve ser cobrança, entrega ou ambos',
    ),
  addressName: addressText,
  postalCode: brazilianZipCode,
  street: addressText,
  number: addressText,
  complement: optionalAddressText,
  district: addressText,
  city: addressText,
  state: brazilianState.refine(
    (value) => value !== undefined && value !== '',
    'Estado é obrigatório',
  ),
})

// Password change form schema
export const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
    newPassword: password,
    confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Senhas não coincidem',
    path: ['confirmPassword'],
  })

// Export inferred types
export type ProfileEditFormData = z.infer<typeof profileEditSchema>
export type AddressFormData = z.infer<typeof addressFormSchema>
export type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>
