/// <reference types="cypress" />

describe('Sign Up Basic Functionality', () => {
  beforeEach(() => {
    cy.visit('/sign-up')
  })

  it('should display all main sections', () => {
    cy.contains('Criar Conta').should('be.visible')
    cy.contains('Dados Pessoais').should('be.visible')
    cy.contains('Endereço').should('be.visible')
  })

  it('should have all form fields', () => {
    // Personal data fields - use correct data-testid values
    cy.get('[data-testid="name-input"]').should('be.visible')
    cy.get('[data-testid="cpf-input"]').should('be.visible')
    cy.get('[data-testid="email-input"]').should('be.visible')
    cy.get('[data-testid="phone-input"]').should('be.visible')
    cy.get('[data-testid="gender-select"]').should('be.visible')
    cy.get('[data-testid="birth-date-input"]').should('be.visible')
    cy.get('[data-testid="password-input"]').should('be.visible')
    cy.get('[data-testid="confirm-password-input"]').should('be.visible')
    
    // Address fields - use correct data-testid values
    cy.get('[data-testid="zip-code-input"]').should('be.visible')
    cy.get('[data-testid="street-input"]').should('be.visible')
    cy.get('[data-testid="number-input"]').should('be.visible')
    cy.get('[data-testid="complement-input"]').should('be.visible')
    cy.get('[data-testid="neighborhood-input"]').should('be.visible')
    cy.get('[data-testid="city-input"]').should('be.visible')
    cy.get('[data-testid="state-select"]').should('be.visible')
    cy.get('[data-testid="residence-type-select"]').should('be.visible')
    cy.get('[data-testid="address-identifier-input"]').should('be.visible')
    
    // Submit button
    cy.get('[data-testid="submit-button"]').should('be.visible')
  })

  it('should fill out and submit the form', () => {
    // Fill personal data
    cy.get('[data-testid="name-input"]').type('João Silva')
    cy.get('[data-testid="cpf-input"]').type('123.456.789-10')
    cy.get('[data-testid="email-input"]').type('joao@example.com')
    cy.get('[data-testid="phone-input"]').type('(11) 99999-9999')
    cy.get('[data-testid="gender-select"]').select('male')
    cy.get('[data-testid="birth-date-input"]').type('01/01/1990')
    cy.get('[data-testid="password-input"]').type('MinhaSenh@123')
    cy.get('[data-testid="confirm-password-input"]').type('MinhaSenh@123')
    
    // Fill address data
    cy.get('[data-testid="zip-code-input"]').type('01234-567')
    cy.get('[data-testid="street-input"]').type('Rua das Flores')
    cy.get('[data-testid="number-input"]').type('123')
    cy.get('[data-testid="complement-input"]').type('Apto 45')
    cy.get('[data-testid="neighborhood-input"]').type('Centro')
    cy.get('[data-testid="city-input"]').type('São Paulo')
    cy.get('[data-testid="state-select"]').select('SP')
    cy.get('[data-testid="residence-type-select"]').select('house')
    cy.get('[data-testid="address-identifier-input"]').type('Casa')
    
    // Submit form
    cy.get('[data-testid="submit-button"]').click()
  })

  it('should validate required fields', () => {
    // Try to submit empty form
    cy.get('[data-testid="submit-button"]').click()
    
    // Check for validation errors (these would appear based on your validation schema)
    // You might need to adjust these based on how your form displays validation errors
    cy.contains('Nome deve ter pelo menos').should('be.visible')
    cy.contains('CPF é obrigatório').should('be.visible')
    cy.contains('Email é obrigatório').should('be.visible')
  })

  it('should validate email format', () => {
    cy.get('[data-testid="email-input"]').type('invalid-email')
    cy.get('[data-testid="email-input"]').blur()
    
    // Check for email validation error
    cy.contains('Email deve ter um formato válido').should('be.visible')
  })
})