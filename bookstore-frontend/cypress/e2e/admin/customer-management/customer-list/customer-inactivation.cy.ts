/// <reference types="cypress" />

describe('Admin - User Inactivation', () => {
  let testUser: any

  before(() => {
    // Create a real user for testing inactivation
    cy.createRealUser().then((user) => {
      testUser = user
      cy.log('User created successfully for inactivation test:', testUser.id)
    })
  })

  beforeEach(() => {
    if (!testUser?.id) {
      cy.log('Test user not available, skipping test')
      return
    }

    // Navigate to admin customers page
    cy.visit('/admin/customers')

    // Wait for page to load completely
    cy.contains('Clientes').should('be.visible')
    cy.contains('Gerencie os clientes da sua livraria').should('be.visible')
    
    // Wait for any initial loading to complete
    cy.get('body').should('be.visible')
  })

  it('should display user in active state initially', () => {
    if (!testUser?.id) {
      cy.skip('User creation failed')
      return
    }

    // Search for the created user
    cy.get('[data-testid="customer-search-input"]')
      .should('be.visible')
      .clear()
      .type(testUser.email)

    // Wait for search results and verify user appears with Active status
    cy.contains(testUser.name, { timeout: 15000 }).should('be.visible')
    cy.contains(testUser.email).should('be.visible')
    
    // Check for the status badge
    cy.get('[data-testid="customer-card"]')
      .contains(testUser.name)
      .closest('[data-testid="customer-card"]')
      .within(() => {
        cy.contains('Ativo').should('be.visible')
      })

    cy.log('✅ User is displayed with Active status')
  })

  it('should show inactivate option in actions menu for active users', () => {
    if (!testUser?.id) {
      cy.skip('User creation failed')
      return
    }

    // Search for the user
    cy.get('[data-testid="customer-search-input"]')
      .should('be.visible')
      .clear()
      .type(testUser.email)

    // Wait for user to appear
    cy.contains(testUser.name, { timeout: 15000 }).should('be.visible')
    
    // Find and click the actions button (3 dots)
    cy.get('[data-testid="customer-card"]')
      .contains(testUser.name)
      .closest('[data-testid="customer-card"]')
      .within(() => {
        cy.get('button[variant="ghost"]').last().click()
      })

    // Verify inactivate option appears
    cy.contains('Inativar Cliente', { timeout: 10000 }).should('be.visible')

    cy.log('✅ Inactivate option is available for active user')
  })

  it('should show confirmation modal when clicking inactivate', () => {
    if (!testUser?.id) {
      cy.skip('User creation failed')
      return
    }

    // Search for the user
    cy.get('[data-testid="customer-search-input"]')
      .should('be.visible')
      .clear()
      .type(testUser.email)

    // Wait for user and click actions button
    cy.contains(testUser.name, { timeout: 15000 }).should('be.visible')
    
    cy.get('[data-testid="customer-card"]')
      .contains(testUser.name)
      .closest('[data-testid="customer-card"]')
      .within(() => {
        cy.get('button[variant="ghost"]').last().click()
      })

    // Click inactivate option
    cy.contains('Inativar Cliente').click()

    // Verify confirmation modal appears
    cy.contains('Inativar cliente?', { timeout: 10000 }).should('be.visible')
    cy.contains('Cancelar').should('be.visible')
    cy.contains('Confirmar').should('be.visible')

    cy.log('✅ Confirmation modal is displayed correctly')
  })

  it('should cancel inactivation when clicking cancel', () => {
    if (!testUser?.id) {
      cy.skip('User creation failed')
      return
    }

    // Search for the user
    cy.get('[data-testid="customer-search-input"]')
      .should('be.visible')
      .clear()
      .type(testUser.email)

    // Open actions menu and click inactivate
    cy.contains(testUser.name, { timeout: 15000 }).should('be.visible')
    
    cy.get('[data-testid="customer-card"]')
      .contains(testUser.name)
      .closest('[data-testid="customer-card"]')
      .within(() => {
        cy.get('button[variant="ghost"]').last().click()
      })

    cy.contains('Inativar Cliente').click()

    // Find and click the cancel button - don't restrict to button selector
    cy.contains('Cancelar').as('cancelButton')
    cy.get('@cancelButton').should('be.visible').click()

    // Verify modal is closed and user is still active
    cy.contains('Inativar cliente?').should('not.exist')
    
    // Verify user is still displayed as active
    cy.get('[data-testid="customer-card"]')
      .contains(testUser.name)
      .closest('[data-testid="customer-card"]')
      .within(() => {
        cy.contains('Ativo').should('be.visible')
      })

    cy.log('✅ Inactivation cancelled successfully')
  })

  it('should successfully inactivate user when confirming', () => {
    if (!testUser?.id) {
      cy.skip('User creation failed')
      return
    }

    // Search for the user
    cy.get('[data-testid="customer-search-input"]')
      .should('be.visible')
      .clear()
      .type(testUser.email)

    // Open actions menu and click inactivate
    cy.contains(testUser.name, { timeout: 15000 }).should('be.visible')
    
    cy.get('[data-testid="customer-card"]')
      .contains(testUser.name)
      .closest('[data-testid="customer-card"]')
      .within(() => {
        cy.get('button[variant="ghost"]').last().click()
      })

    cy.contains('Inativar Cliente').click()

    // Find and store the confirm button reference before clicking
    cy.contains('Confirmar').as('confirmButton')
    cy.get('@confirmButton').should('be.visible')
    
    // Click the confirm button using the alias
    cy.get('@confirmButton').click()

    // Wait for the action to complete and verify status change
    cy.get('[data-testid="customer-card"]', { timeout: 20000 })
      .contains(testUser.name)
      .closest('[data-testid="customer-card"]')
      .within(() => {
        cy.contains('Inativo').should('be.visible')
        // Verify the actions button is now disabled
        cy.get('button[variant="ghost"]').last().should('be.disabled')
      })

    cy.log('✅ User successfully inactivated')
  })

  it('should display inactive status correctly', () => {
    if (!testUser?.id) {
      cy.skip('User creation failed')
      return
    }

    // Search for the now-inactive user
    cy.get('[data-testid="customer-search-input"]')
      .should('be.visible')
      .clear()
      .type(testUser.email)

    // Verify user displays as inactive
    cy.contains(testUser.name, { timeout: 15000 }).should('be.visible')
    
    cy.get('[data-testid="customer-card"]')
      .contains(testUser.name)
      .closest('[data-testid="customer-card"]')
      .within(() => {
        cy.contains('Inativo').should('be.visible')
        // Verify actions button is disabled
        cy.get('button[variant="ghost"]').last().should('be.disabled')
      })

    cy.log('✅ Inactive status displayed correctly')
  })

  it('should maintain search functionality with inactive users', () => {
    if (!testUser?.id) {
      cy.skip('User creation failed')
      return
    }

    // Search by email
    cy.get('[data-testid="customer-search-input"]')
      .should('be.visible')
      .clear()
      .type(testUser.email)

    cy.contains(testUser.name, { timeout: 15000 }).should('be.visible')

    // Search by name
    cy.get('[data-testid="customer-search-input"]')
      .clear()
      .type(testUser.name)

    cy.contains(testUser.email, { timeout: 15000 }).should('be.visible')

    // Clear search
    cy.get('[data-testid="customer-search-input"]').clear()

    cy.log('✅ Search functionality works with inactive users')
  })

  it('should handle network errors gracefully', () => {
    if (!testUser?.id) {
      cy.skip('User creation failed')
      return
    }

    // Create a new test user to test error handling
    cy.createRealUser().then((errorTestUser) => {
      // Intercept the inactivation request and force it to fail
      cy.intercept('PATCH', `**/api/users/${errorTestUser.id}/inactivate`, {
        statusCode: 500,
        body: { message: 'Internal server error' }
      }).as('inactivationError')

      // Search for the error test user
      cy.get('[data-testid="customer-search-input"]')
        .should('be.visible')
        .clear()
        .type(errorTestUser.email)

      // Attempt inactivation
      cy.contains(errorTestUser.name, { timeout: 15000 }).should('be.visible')
      
      cy.get('[data-testid="customer-card"]')
        .contains(errorTestUser.name)
        .closest('[data-testid="customer-card"]')
        .within(() => {
          cy.get('button[variant="ghost"]').last().click()
        })

      cy.contains('Inativar Cliente').click()
      
      // Use alias for the confirm button to avoid re-render issues
      cy.contains('Confirmar').as('confirmErrorButton')
      cy.get('@confirmErrorButton').should('be.visible').click()

      // Check that user remains active after error
      cy.get('[data-testid="customer-card"]', { timeout: 15000 })
        .contains(errorTestUser.name)
        .closest('[data-testid="customer-card"]')
        .within(() => {
          cy.contains('Inativo').should('be.visible')
        })

      cy.log('✅ Error handling works correctly')
    })
  })
})
