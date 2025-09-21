/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Only import if you have @testing-library/cypress installed
// import '@testing-library/cypress/add-commands'

declare global {
  namespace Cypress {
    interface Chainable {
      // Add custom command signatures here if needed
      // login(email: string, password: string): Chainable<void>
    }
  }
}

export {}
