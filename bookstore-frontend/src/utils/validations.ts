/**
 * Brazilian Data Validation Utilities
 *
 * This module provides validation functions for Brazilian-specific data formats
 * including CPF, phone numbers, ZIP codes, and dates.
 */

/**
 * Validates Brazilian CPF (Cadastro de Pessoas Físicas)
 * @param cpf - CPF string (can be formatted or unformatted)
 * @returns true if valid, string with error message if invalid
 */
export const validateCPF = (cpf: string): string | true => {
  const cleanCPF = cpf.replace(/\D/g, '')

  if (cleanCPF.length !== 11) {
    return 'CPF deve ter 11 dígitos'
  }

  // Check for known invalid patterns (all same digits)
  if (/^(\d)\1{10}$/.test(cleanCPF)) {
    return 'CPF inválido'
  }

  // Calculate verification digits
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i)
  }

  let remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleanCPF.charAt(9))) return 'CPF inválido'

  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i)
  }

  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleanCPF.charAt(10))) return 'CPF inválido'

  return true
}

/**
 * Validates Brazilian phone number
 * @param phone - Phone string (can be formatted or unformatted)
 * @returns true if valid, string with error message if invalid
 */
export const validateBrazilianPhone = (phone: string): string | true => {
  const cleanPhone = phone.replace(/\D/g, '')

  if (cleanPhone.length < 10 || cleanPhone.length > 11) {
    return 'Telefone deve ter 10 ou 11 dígitos'
  }

  // Check for valid area codes (11-99)
  const areaCode = cleanPhone.substring(0, 2)
  const areaCodeNumber = parseInt(areaCode)
  if (areaCodeNumber < 11 || areaCodeNumber > 99) {
    return 'Código de área inválido'
  }

  // For 11-digit numbers, the third digit must be 9 (mobile)
  if (cleanPhone.length === 11 && cleanPhone.charAt(2) !== '9') {
    return 'Para números de 11 dígitos, o terceiro dígito deve ser 9'
  }

  // For 10-digit numbers, the third digit cannot be 9 (landline)
  if (cleanPhone.length === 10 && cleanPhone.charAt(2) === '9') {
    return 'Para números de 10 dígitos, o terceiro dígito não pode ser 9'
  }

  return true
}

/**
 * Validates Brazilian ZIP code (CEP)
 * @param zipCode - ZIP code string
 * @returns true if valid, string with error message if invalid
 */
export const validateBrazilianZipCode = (zipCode: string): string | true => {
  const cleanZip = zipCode.replace(/\D/g, '')

  if (cleanZip.length !== 8) {
    return 'CEP deve ter 8 dígitos'
  }

  // Check for invalid patterns (all zeros, all same digits)
  if (cleanZip === '00000000' || /^(\d)\1{7}$/.test(cleanZip)) {
    return 'CEP inválido'
  }

  return true
}

/**
 * Validates date in DD/MM/YYYY format
 * @param dateString - Date string in DD/MM/YYYY format
 * @param options - Validation options
 * @returns true if valid, string with error message if invalid
 */
export const validateBrazilianDate = (
  dateString: string,
  options: {
    minAge?: number
    maxAge?: number
    allowFuture?: boolean
  } = {},
): string | true => {
  const { minAge = 0, maxAge = 120, allowFuture = false } = options

  // Check format
  const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/
  const match = dateString.match(dateRegex)

  if (!match) {
    return 'Data deve estar no formato DD/MM/AAAA'
  }

  const [, day, month, year] = match
  const birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))

  // Check if the parsed date is valid and matches input
  if (
    birthDate.getDate() !== parseInt(day) ||
    birthDate.getMonth() !== parseInt(month) - 1 ||
    birthDate.getFullYear() !== parseInt(year)
  ) {
    return 'Data inválida'
  }

  const today = new Date()

  // Check if date is not in the future (unless allowed)
  if (!allowFuture && birthDate > today) {
    return 'Data não pode ser no futuro'
  }

  // Calculate age
  const age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  const dayDiff = today.getDate() - birthDate.getDate()

  let actualAge = age
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    actualAge--
  }

  if (actualAge < minAge) {
    return `Você deve ter pelo menos ${minAge} anos`
  }

  if (actualAge > maxAge) {
    return 'Idade inválida'
  }

  return true
}

/**
 * Validates email address
 * @param email - Email string
 * @param maxLength - Maximum length (default: 255)
 * @returns true if valid, string with error message if invalid
 */
export const validateEmail = (
  email: string,
  maxLength = 255,
): string | true => {
  if (!email) {
    return 'Email é obrigatório'
  }

  if (email.length > maxLength) {
    return `Email deve ter no máximo ${maxLength} caracteres`
  }

  // More comprehensive email validation
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

  if (!emailRegex.test(email)) {
    return 'Email inválido'
  }

  return true
}

/**
 * Validates password strength
 * @param password - Password string
 * @param options - Password validation options
 * @returns true if valid, string with error message if invalid
 */
export const validatePassword = (
  password: string,
  options: {
    minLength?: number
    maxLength?: number
    requireUppercase?: boolean
    requireLowercase?: boolean
    requireNumbers?: boolean
    requireSpecialChars?: boolean
  } = {},
): string | true => {
  const {
    minLength = 8,
    maxLength = 128,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = true,
  } = options

  if (password.length < minLength) {
    return `Senha deve ter pelo menos ${minLength} caracteres`
  }

  if (password.length > maxLength) {
    return `Senha deve ter no máximo ${maxLength} caracteres`
  }

  const validationErrors: string[] = []

  if (requireUppercase && !/[A-Z]/.test(password)) {
    validationErrors.push('uma letra maiúscula')
  }

  if (requireLowercase && !/[a-z]/.test(password)) {
    validationErrors.push('uma letra minúscula')
  }

  if (requireNumbers && !/\d/.test(password)) {
    validationErrors.push('um número')
  }

  if (requireSpecialChars && !/[@$!%*?&]/.test(password)) {
    validationErrors.push('um caractere especial (@$!%*?&)')
  }

  if (validationErrors.length > 0) {
    return `Senha deve conter pelo menos ${validationErrors.join(', ')}`
  }

  return true
}

/**
 * Validates Brazilian person name
 * @param name - Person name
 * @param options - Name validation options
 * @returns true if valid, string with error message if invalid
 */
export const validatePersonName = (
  name: string,
  options: {
    minLength?: number
    maxLength?: number
    allowNumbers?: boolean
  } = {},
): string | true => {
  const { minLength = 2, maxLength = 100, allowNumbers = false } = options

  if (name.length < minLength) {
    return `Nome deve ter pelo menos ${minLength} caracteres`
  }

  if (name.length > maxLength) {
    return `Nome deve ter no máximo ${maxLength} caracteres`
  }

  // Pattern for Brazilian names (including accents)
  const namePattern = allowNumbers
    ? /^[a-zA-ZÀ-ÿ0-9\s\-']+$/
    : /^[a-zA-ZÀ-ÿ\s\-']+$/

  if (!namePattern.test(name)) {
    return allowNumbers
      ? 'Nome deve conter apenas letras, números, espaços, hífens e apostrofes'
      : 'Nome deve conter apenas letras, espaços, hífens e apostrofes'
  }

  return true
}
