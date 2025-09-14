import { z } from 'zod'

/**
 * Common validation schemas that can be reused across the application
 */

// Basic text validations
export const requiredString = z.string().min(1, 'Campo obrigatório')

export const optionalString = z.string().optional()

// Brazilian specific validations
export const brazilianPhone = z
  .string()
  .min(1, 'Telefone é obrigatório')
  .regex(
    /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
    'Telefone deve estar no formato (11) 99999-9999',
  )

export const brazilianCPF = z
  .string()
  .min(1, 'CPF é obrigatório')
  .regex(
    /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    'CPF deve estar no formato 000.000.000-00',
  )
  .refine((cpf) => {
    // Remove dots and dashes
    const cleanCPF = cpf.replace(/[.-]/g, '')

    // Check if all digits are the same
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false

    // Validate CPF algorithm
    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF[i]) * (10 - i)
    }
    let digit1 = 11 - (sum % 11)
    if (digit1 > 9) digit1 = 0

    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF[i]) * (11 - i)
    }
    let digit2 = 11 - (sum % 11)
    if (digit2 > 9) digit2 = 0

    return parseInt(cleanCPF[9]) === digit1 && parseInt(cleanCPF[10]) === digit2
  }, 'CPF inválido')

export const brazilianZipCode = z
  .string()
  .min(1, 'CEP é obrigatório')
  .regex(/^\d{5}-\d{3}$/, 'CEP deve estar no formato 00000-000')

// Date validations
export const birthDate = z
  .string()
  .min(1, 'Data de nascimento é obrigatória')
  .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Data deve estar no formato DD/MM/AAAA')
  .refine((date) => {
    const [day, month, year] = date.split('/').map(Number)
    const birthDate = new Date(year, month - 1, day)
    const today = new Date()

    // Check if date is valid
    if (
      birthDate.getDate() !== day ||
      birthDate.getMonth() !== month - 1 ||
      birthDate.getFullYear() !== year
    ) {
      return false
    }

    // Check if person is at least 13 years old
    const minAge = 13
    const minDate = new Date(
      today.getFullYear() - minAge,
      today.getMonth(),
      today.getDate(),
    )

    return birthDate <= minDate
  }, 'Você deve ter pelo menos 13 anos')

// Email validation
export const email = z
  .string()
  .min(1, 'Email é obrigatório')
  .email('Email deve ter um formato válido')

// Password validations
export const password = z
  .string()
  .min(8, 'Senha deve ter pelo menos 8 caracteres')
  .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
  .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
  .regex(/\d/, 'Senha deve conter pelo menos um número')
  .regex(
    /[@$!%*?&]/,
    'Senha deve conter pelo menos um caractere especial (@$!%*?&)',
  )

// Person name validation (for personal data)
export const personName = z
  .string()
  .min(2, 'Nome deve ter pelo menos 2 caracteres')
  .max(100, 'Nome deve ter no máximo 100 caracteres')
  .regex(
    /^[a-zA-ZÀ-ÿ\s\-']+$/,
    'Nome deve conter apenas letras, espaços, hífens e apostrofes',
  )

// Address text validation (allows numbers for street addresses)
export const addressText = z
  .string()
  .min(2, 'Campo deve ter pelo menos 2 caracteres')
  .max(100, 'Campo deve ter no máximo 100 caracteres')
  .regex(
    /^[a-zA-ZÀ-ÿ0-9\s\-']+$/,
    'Campo deve conter apenas letras, números, espaços, hífens e apostrofes',
  )

// Optional address text
export const optionalAddressText = addressText.optional().or(z.literal(''))
