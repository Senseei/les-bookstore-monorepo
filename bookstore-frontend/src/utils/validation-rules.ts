/**
 * React Hook Form Validation Rules
 *
 * This module provides pre-configured validation rules for React Hook Form
 * using the Brazilian validation utilities.
 */

import {
  validateBrazilianDate,
  validateBrazilianPhone,
  validateBrazilianZipCode,
  validateCPF,
  validateEmail,
  validatePassword,
  validatePersonName,
} from './validations'

/**
 * Validation rules for Brazilian CPF
 */
export const cpfValidationRules = {
  required: 'CPF é obrigatório',
  pattern: {
    value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/,
    message: 'CPF deve estar no formato 000.000.000-00 ou conter 11 dígitos',
  },
  validate: validateCPF,
} as const

/**
 * Validation rules for email
 */
export const emailValidationRules = {
  required: 'Email é obrigatório',
  validate: (value: string) => validateEmail(value, 255),
} as const

/**
 * Validation rules for password
 */
export const passwordValidationRules = {
  required: 'Senha é obrigatória',
  validate: (value: string) => validatePassword(value),
} as const

/**
 * Validation rules for password confirmation
 * @param passwordValue - The password value to compare against
 */
export const confirmPasswordValidationRules = (passwordValue: string) =>
  ({
    required: 'Confirmação de senha é obrigatória',
    validate: (value: string) =>
      value === passwordValue || 'Senhas não coincidem',
  }) as const

/**
 * Validation rules for person name
 */
export const personNameValidationRules = {
  required: 'Nome é obrigatório',
  validate: (value: string) => validatePersonName(value),
} as const

/**
 * Validation rules for Brazilian phone
 */
export const phoneValidationRules = {
  required: 'Telefone é obrigatório',
  pattern: {
    value: /^\(\d{2}\)\s\d{4,5}-\d{4}$|^\d{10,11}$/,
    message:
      'Telefone deve estar no formato (11) 99999-9999 ou conter 10-11 dígitos',
  },
  validate: validateBrazilianPhone,
} as const

/**
 * Validation rules for birth date
 */
export const birthDateValidationRules = {
  required: 'Data de nascimento é obrigatória',
  validate: (value: string) =>
    validateBrazilianDate(value, {
      minAge: 13,
      maxAge: 120,
      allowFuture: false,
    }),
} as const

/**
 * Validation rules for Brazilian ZIP code
 */
export const zipCodeValidationRules = {
  required: 'CEP é obrigatório',
  pattern: {
    value: /^\d{5}-?\d{3}$/,
    message: 'CEP deve estar no formato 00000-000',
  },
  validate: validateBrazilianZipCode,
} as const

/**
 * Validation rules for gender selection
 */
export const genderValidationRules = {
  required: 'Gênero é obrigatório',
} as const

/**
 * Validation rules for Brazilian state
 */
export const stateValidationRules = {
  required: 'Estado é obrigatório',
  pattern: {
    value: /^[A-Z]{2}$/,
    message: 'Estado deve ser uma sigla de 2 letras maiúsculas (ex: SP, RJ)',
  },
} as const

/**
 * Validation rules for residence type
 */
export const residenceTypeValidationRules = {
  required: 'Tipo de residência é obrigatório',
} as const

/**
 * Address field validation rules
 */
export const addressValidationRules = {
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
    validate: (value: string) =>
      validatePersonName(value, {
        minLength: 2,
        maxLength: 100,
        allowNumbers: true,
      }),
  },
  city: {
    required: 'Cidade é obrigatória',
    validate: (value: string) =>
      validatePersonName(value, {
        minLength: 2,
        maxLength: 100,
        allowNumbers: false,
      }),
  },
  complement: {
    maxLength: {
      value: 100,
      message: 'Complemento deve ter no máximo 100 caracteres',
    },
  },
  addressIdentifier: {
    maxLength: {
      value: 50,
      message: 'Nome do endereço deve ter no máximo 50 caracteres',
    },
  },
} as const
