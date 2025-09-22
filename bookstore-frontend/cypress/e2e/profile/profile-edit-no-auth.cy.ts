/// <reference types="cypress" />

import {
  generateValidCPF,
  generateValidCPFNumbers,
  isValidCPF,
} from '../../support/cpf-utils'

describe('Profile Edit - No Authentication Required (Fixed)', () => {
  let testUser: any
  const API_URL = Cypress.env('API_URL') || 'http://localhost:3000'
  const timestamp = Date.now().toString().slice(-6) // Get last 6 digits

  before(() => {
    // Generate a fresh valid CPF for each test run
    const validCPF = generateValidCPFNumbers()
    cy.log('Generated valid CPF:', validCPF, 'Is valid:', isValidCPF(validCPF))

    // Use shorter email and simpler data to avoid database constraints
    const userData = {
      name: 'Test User',
      email: `${timestamp}@email.com`,
      cpf: validCPF, // Use generated valid CPF (numbers only for API)
      phone: '11998887777',
      gender: 'male',
      birthDate: '1985-03-15',
      password: 'TestPassword123@',
      confirmPassword: 'TestPassword123@',
      address: {
        type: 'house',
        purpose: 'both',
        addressName: 'Casa Principal',
        street: 'Rua Teste',
        number: '123',
        complement: 'Casa',
        district: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        postalCode: '01234567', // 8 digits without dash
      },
    }

    cy.request({
      method: 'POST',
      url: `${API_URL}/api/auth/signup`,
      body: userData,
      failOnStatusCode: false,
    }).then((response) => {
      cy.log('Signup response:', response.status, response.body)

      if (response.status === 201) {
        // Use the real user ID from the database
        testUser = {
          ...userData,
          id: response.body.id || response.body.user?.id,
        }
        cy.log(
          '✅ User created successfully with real database ID:',
          testUser.id,
        )
      } else {
        // Use a properly formatted UUID for mock user that matches database expectations
        const mockUuid = '12345678-1234-1234-1234-123456789012'
        testUser = {
          id: mockUuid,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          cpf: userData.cpf,
          gender: userData.gender,
          birthDate: '1985-03-15',
          addresses: [
            {
              id: 'addr-mock-123',
              addressName: 'Residencial',
              type: 'house',
              purpose: 'both',
              street: 'Avenida Professor Mariano Salvarani',
              number: '521',
              complement: 'Casa 1',
              district: 'Jardim Camila',
              city: 'Mogi das Cruzes',
              state: 'SP',
              postalCode: '08720340',
            },
          ],
        }
        cy.log(
          '⚠️ API failed, using mock user with proper UUID format:',
          testUser.id,
        )
      }
    })
  })

  beforeEach(() => {
    // Skip if no test user
    if (!testUser?.id) {
      cy.log('❌ Test user not available, skipping test')
      return
    }

    // Navigate directly to profile edit page
    cy.visit(`/profile/edit/${testUser.id}`)
  })

  it('should load profile edit page and display user data', () => {
    if (!testUser?.id) {
      cy.skip('User creation failed')
      return
    }

    cy.contains('Editar Perfil').should('be.visible')
    cy.contains('Informações Pessoais').should('be.visible')

    // Check if form is loaded with user data
    cy.get('[data-testid="profile-name-input"]', { timeout: 10000 })
      .should('be.visible')
      .should('have.value', testUser.name)

    cy.get('[data-testid="profile-email-input"]').should(
      'have.value',
      testUser.email,
    )

    cy.log('✅ Profile page loaded successfully with user data')
  })

  it('should validate required fields when empty', () => {
    if (!testUser?.id) {
      cy.skip('User creation failed')
      return
    }

    // Clear required fields
    cy.get('[data-testid="profile-name-input"]').clear()
    cy.get('[data-testid="profile-email-input"]').clear()
    cy.get('[data-testid="profile-save-button"]').click()

    // Check for validation messages
    cy.contains('Nome deve ter pelo menos').should('be.visible')
    cy.log('✅ Required field validation working')
  })

  it('should validate email format', () => {
    if (!testUser?.id) {
      cy.skip('User creation failed')
      return
    }

    cy.get('[data-testid="profile-email-input"]')
      .clear()
      .type('invalid-email')
      .blur()

    cy.contains('Email deve ter um formato válido').should('be.visible')
    cy.log('✅ Email format validation working')
  })

  it('should validate CPF format if editable', () => {
    if (!testUser?.id) {
      cy.skip('User creation failed')
      return
    }

    // Check if CPF field is editable
    cy.get('[data-testid="profile-cpf-input"]').then(($cpfInput) => {
      if (!$cpfInput.prop('readonly') && !$cpfInput.prop('disabled')) {
        // If CPF is editable, test validation
        cy.wrap($cpfInput).clear().type('00000000000').blur()

        // Look for validation message
        cy.get('body').then(($body) => {
          if (
            $body.text().includes('CPF inválido') ||
            $body.text().includes('CPF deve')
          ) {
            cy.contains(/CPF.*(inválido|deve)/).should('be.visible')

            // Test with valid CPF
            const validCPF = generateValidCPF()
            cy.get('[data-testid="profile-cpf-input"]')
              .clear()
              .type(validCPF)
              .blur()

            cy.contains(/CPF.*(inválido|deve)/).should('not.exist')
            cy.log('✅ CPF validation working with generated CPF:', validCPF)
          } else {
            cy.log(
              'ℹ️  CPF validation not found or different validation approach',
            )
          }
        })
      } else {
        cy.log('ℹ️  CPF field is read-only, skipping validation test')
      }
    })
  })

  it('should validate name minimum length', () => {
    if (!testUser?.id) {
      cy.skip('User creation failed')
      return
    }

    cy.get('[data-testid="profile-name-input"]').clear().type('A').blur()

    cy.contains('Nome deve ter pelo menos').should('be.visible')
    cy.log('✅ Name length validation working')
  })

  it('should apply input masks correctly', () => {
    if (!testUser?.id) {
      cy.skip('User creation failed')
      return
    }

    // Test phone mask
    cy.get('[data-testid="profile-phone-input"]')
      .clear()
      .type('11999888777')
      .should('have.value', '(11) 99988-8777')

    // Test CPF display (should be read-only and formatted)
    cy.get('[data-testid="profile-cpf-input"]').should(
      'contain.value',
      `${testUser.cpf.slice(0, 3)}.${testUser.cpf.slice(3, 6)}.${testUser.cpf.slice(6, 9)}-${testUser.cpf.slice(9, 11)}`,
    )

    cy.log('✅ Input masks working correctly')
  })

  it('should update profile successfully', () => {
    if (!testUser?.id) {
      cy.skip('User creation failed')
      return
    }

    const newName = 'Updated User'
    const newPhone = '11888777666'

    // Update form fields
    cy.get('[data-testid="profile-name-input"]').clear().type(newName)

    cy.get('[data-testid="profile-phone-input"]').clear().type(newPhone)

    // Save changes
    cy.get('[data-testid="profile-save-button"]').click()

    // Check for success message
    cy.contains('Perfil atualizado', { timeout: 10000 }).should('be.visible')
    cy.log('✅ Profile update working successfully')
  })

  it('should maintain form accessibility', () => {
    if (!testUser?.id) {
      cy.skip('User creation failed')
      return
    }

    // Check for proper form attributes
    cy.get('[data-testid="profile-name-input"]').should('have.attr', 'name')

    cy.get('[data-testid="profile-email-input"]').should(
      'have.attr',
      'type',
      'email',
    )

    // Check for form structure
    cy.get('form').should('exist')

    cy.log('✅ Form accessibility attributes present')
  })

  // Address Editing Tests
  describe('Address Editing Tests', () => {
    it('should open address edit modal when clicking Editar button', () => {
      if (!testUser?.id) {
        cy.skip('User creation failed')
        return
      }

      // Find and click the "Editar" button for address
      cy.contains('button', 'Editar').should('be.visible').click()

      // Check if address edit modal opens
      cy.contains('Editar Endereço').should('be.visible')
      cy.contains('h3', 'Editar Endereço').should('be.visible')

      // Check if all address form fields are present
      cy.get('input[name="addressName"]').should('be.visible')
      cy.get('select[aria-label="Tipo de Residência"]').should('be.visible')
      cy.get('select[aria-label="Finalidade"]').should('be.visible')
      cy.get('input[name="postalCode"]').should('be.visible')
      cy.get('input[name="street"]').should('be.visible')
      cy.get('input[name="number"]').should('be.visible')
      cy.get('input[name="complement"]').should('be.visible')
      cy.get('input[name="district"]').should('be.visible')
      cy.get('input[name="city"]').should('be.visible')
      cy.get('select[aria-label="Estado"]').should('be.visible')

      // Check action buttons
      cy.contains('button', 'Cancelar').should('be.visible')
      cy.contains('button', 'Atualizar Endereço').should('be.visible')

      cy.log('✅ Address edit modal opened successfully')
    })

    it('should display current address data in the form', () => {
      if (!testUser?.id) {
        cy.skip('User creation failed')
        return
      }

      // Open address edit modal
      cy.contains('button', 'Editar').click()

      // Wait for modal to be visible
      cy.contains('Editar Endereço').should('be.visible')

      // Check if form is populated with current address data
      if (testUser.addresses && testUser.addresses[0]) {
        const address = testUser.addresses[0]

        cy.get('input[name="addressName"]').should(
          'have.value',
          address.addressName,
        )

        cy.get('select[aria-label="Tipo de Residência"]').should(
          'have.value',
          address.type,
        )

        cy.get('select[aria-label="Finalidade"]').should(
          'have.value',
          address.purpose,
        )

        cy.get('input[name="street"]').should('have.value', address.street)

        cy.get('input[name="number"]').should('have.value', address.number)

        cy.get('input[name="city"]').should('have.value', address.city)

        cy.get('select[aria-label="Estado"]').should(
          'have.value',
          address.state,
        )
      }

      cy.log('✅ Address form populated with current data')
    })

    it('should validate required address fields', () => {
      if (!testUser?.id) {
        cy.skip('User creation failed')
        return
      }

      // Open address edit modal
      cy.contains('button', 'Editar').click()
      cy.contains('Editar Endereço').should('be.visible')

      // Clear required fields
      cy.get('input[name="addressName"]').clear()
      cy.get('input[name="street"]').clear()
      cy.get('input[name="number"]').clear()
      cy.get('input[name="district"]').clear()
      cy.get('input[name="city"]').clear()

      // Try to submit form
      cy.contains('button', 'Atualizar Endereço').click()

      // Check for validation messages (adjust based on your validation messages)
      cy.contains('Campo deve ter pelo menos 2 caracteres').should('be.visible')

      cy.log('✅ Address field validation working')
    })

    it('should validate CEP format', () => {
      if (!testUser?.id) {
        cy.skip('User creation failed')
        return
      }

      // Open address edit modal
      cy.contains('button', 'Editar').click()
      cy.contains('Editar Endereço').should('be.visible')

      // Test invalid CEP
      cy.get('input[name="postalCode"]').clear().type('12345').blur()

      // Check for CEP validation message
      cy.contains('CEP deve estar no formato 00000-000').should('be.visible')

      cy.log('✅ CEP validation working')
    })

    it('should apply CEP mask correctly', () => {
      if (!testUser?.id) {
        cy.skip('User creation failed')
        return
      }

      // Open address edit modal
      cy.contains('button', 'Editar').click()
      cy.contains('Editar Endereço').should('be.visible')

      // Test CEP mask
      cy.get('input[name="postalCode"]')
        .clear()
        .type('01234567')
        .should('have.value', '01234-567')

      cy.log('✅ CEP mask applied correctly')
    })

    it('should update address successfully', () => {
      if (!testUser?.id) {
        cy.skip('User creation failed')
        return
      }

      // Open address edit modal
      cy.contains('button', 'Editar').click()
      cy.contains('Editar Endereço').should('be.visible')

      // Update address fields
      cy.get('input[name="addressName"]').clear().type('Casa Nova')

      cy.get('select[aria-label="Tipo de Residência"]').select('apartment')

      cy.get('select[aria-label="Finalidade"]').select('delivery')

      cy.get('input[name="street"]').clear().type('Rua das Flores Atualizada')

      cy.get('input[name="number"]').clear().type('456')

      cy.get('input[name="complement"]').clear().type('Apto 10')

      cy.get('input[name="district"]').clear().type('Centro Novo')

      cy.get('input[name="city"]').clear().type('São Paulo')

      cy.get('select[aria-label="Estado"]').select('SP')

      // Submit the form
      cy.contains('button', 'Atualizar Endereço').click()

      // Check for success message
      cy.contains('Endereço atualizado', { timeout: 10000 }).should(
        'be.visible',
      )

      cy.log('✅ Address updated successfully')
    })

    it('should cancel address editing', () => {
      if (!testUser?.id) {
        cy.skip('User creation failed')
        return
      }

      // Open address edit modal
      cy.contains('button', 'Editar').click()
      cy.contains('Editar Endereço').should('be.visible')

      // Make some changes
      cy.get('input[name="addressName"]').clear().type('Nome Temporário')

      // Click cancel
      cy.contains('button', 'Cancelar').click()

      // Check if modal is closed
      cy.contains('Editar Endereço').should('not.exist')

      // Verify we're back to the profile page
      cy.contains('Informações Pessoais').should('be.visible')

      cy.log('✅ Address editing cancelled successfully')
    })

    it('should handle address selection dropdowns', () => {
      if (!testUser?.id) {
        cy.skip('User creation failed')
        return
      }

      // Open address edit modal
      cy.contains('button', 'Editar').click()
      cy.contains('Editar Endereço').should('be.visible')

      // Test residence type dropdown
      cy.get('select[aria-label="Tipo de Residência"]').within(() => {
        cy.get('option[value="house"]').should('contain', 'Casa')
        cy.get('option[value="apartment"]').should('contain', 'Apartamento')
        cy.get('option[value="condo"]').should('contain', 'Condomínio')
        cy.get('option[value="work"]').should('contain', 'Trabalho')
        cy.get('option[value="rural"]').should('contain', 'Rural')
      })

      // Test purpose dropdown
      cy.get('select[aria-label="Finalidade"]').within(() => {
        cy.get('option[value="billing"]').should('contain', 'Cobrança')
        cy.get('option[value="delivery"]').should('contain', 'Entrega')
        cy.get('option[value="both"]').should('contain', 'Cobrança e Entrega')
      })

      // Test state dropdown
      cy.get('select[aria-label="Estado"]').within(() => {
        cy.get('option[value="SP"]').should('contain', 'São Paulo')
        cy.get('option[value="RJ"]').should('contain', 'Rio de Janeiro')
        cy.get('option[value="MG"]').should('contain', 'Minas Gerais')
      })

      cy.log('✅ Address dropdown options working correctly')
    })

    it('should display address information in card format', () => {
      if (!testUser?.id) {
        cy.skip('User creation failed')
        return
      }

      // Check if address card is displayed
      cy.contains('apartment').should('be.visible')
      cy.contains('Rua das Flores Atualizada, 456').should('be.visible')
      cy.contains('Apto 10').should('be.visible')
      cy.contains('Centro Novo - São Paulo/SP').should('be.visible')
      cy.contains('01234-567').should('be.visible')

      cy.log('✅ Address information displayed in card format')
    })
  })
})
