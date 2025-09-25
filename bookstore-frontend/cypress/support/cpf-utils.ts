/**
 * Utility functions for generating valid test data
 */

/**
 * Generates a valid Brazilian CPF number randomly
 * Based on the CPF validation algorithm
 * @returns {string} A valid CPF in the format 000.000.000-00
 */
export function generateValidCPF(): string {
  // Generate the first 9 digits randomly
  const firstNineDigits = Array.from({ length: 9 }, () =>
    Math.floor(Math.random() * 10),
  )

  // Calculate the first verification digit
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += firstNineDigits[i] * (10 - i)
  }
  let digit1 = 11 - (sum % 11)
  if (digit1 > 9) digit1 = 0

  // Calculate the second verification digit
  sum = 0
  for (let i = 0; i < 9; i++) {
    sum += firstNineDigits[i] * (11 - i)
  }
  sum += digit1 * 2
  let digit2 = 11 - (sum % 11)
  if (digit2 > 9) digit2 = 0

  // Combine all digits
  const allDigits = [...firstNineDigits, digit1, digit2]

  // Format as XXX.XXX.XXX-XX
  return allDigits.join('')
}

/**
 * Generates a valid Brazilian CPF number without formatting
 * @returns {string} A valid CPF with only numbers (11 digits)
 */
export function generateValidCPFNumbers(): string {
  const formattedCPF = generateValidCPF()
  return formattedCPF.replace(/\D/g, '') // Remove all non-numeric characters
}

/**
 * Validates if a CPF is valid using the same algorithm as the backend
 * @param {string} cpf - The CPF to validate
 * @returns {boolean} True if CPF is valid, false otherwise
 */
export function isValidCPF(cpf: string): boolean {
  if (!cpf) return false

  // Remove non-numeric characters
  const cleanCpf = cpf.replace(/\D/g, '')

  // Must have exactly 11 digits
  if (cleanCpf.length !== 11) return false

  // Check if all digits are the same (invalid CPFs like 111.111.111-11)
  if (/^(\d)\1{10}$/.test(cleanCpf)) return false

  // Validate CPF algorithm
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCpf.charAt(i)) * (10 - i)
  }
  let digit1 = 11 - (sum % 11)
  if (digit1 > 9) digit1 = 0

  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCpf.charAt(i)) * (11 - i)
  }
  let digit2 = 11 - (sum % 11)
  if (digit2 > 9) digit2 = 0

  return (
    digit1 === parseInt(cleanCpf.charAt(9)) &&
    digit2 === parseInt(cleanCpf.charAt(10))
  )
}

/**
 * Generates multiple valid CPFs for batch testing
 * @param {number} count - Number of CPFs to generate
 * @param {boolean} formatted - Whether to include formatting (default: true)
 * @returns {string[]} Array of valid CPFs
 */
export function generateMultipleCPFs(
  count: number,
  formatted: boolean = true,
): string[] {
  const cpfs: string[] = []
  const usedCPFs = new Set<string>()

  while (cpfs.length < count) {
    const cpf = formatted ? generateValidCPF() : generateValidCPFNumbers()

    // Ensure uniqueness
    if (!usedCPFs.has(cpf)) {
      usedCPFs.add(cpf)
      cpfs.push(cpf)
    }
  }

  return cpfs
}

/**
 * Generates a valid CPF and validates it (for testing purposes)
 * @returns {object} Object with CPF and validation result
 */
export function generateAndValidateCPF(): {
  cpf: string
  isValid: boolean
  numbersOnly: string
} {
  const cpf = generateValidCPF()
  const numbersOnly = generateValidCPFNumbers()
  const isValid = isValidCPF(cpf)

  return {
    cpf,
    numbersOnly,
    isValid,
  }
}

/**
 * Gets a predefined set of valid CPFs for consistent testing
 * @returns {string[]} Array of known valid CPFs
 */
export function getTestCPFs(): string[] {
  return [
    '123.456.789-09',
    '111.444.777-35',
    '987.654.321-00',
    '616.008.770-36', // The one currently used in tests
    '123.123.123-96',
  ]
}

/**
 * Gets a predefined set of invalid CPFs for validation testing
 * @returns {string[]} Array of known invalid CPFs
 */
export function getInvalidTestCPFs(): string[] {
  return [
    '111.111.111-11', // All same digits
    '000.000.000-00', // All zeros
    '123.456.789-10', // Wrong check digits
    '12345678901', // Numbers only but invalid
    '123.456.789', // Incomplete
    '123.456.789-ABC', // Non-numeric characters in check digits
  ]
}
