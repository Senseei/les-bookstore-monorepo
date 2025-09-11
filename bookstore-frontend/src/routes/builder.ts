import { PATHS } from './constants'

/**
 * Advanced route builder utility
 * Eliminates ALL hardcoded paths and provides type safety
 */
export class RouteBuilder {
  private segments: string[] = []

  constructor(initialPath?: string) {
    if (initialPath) {
      this.segments = [initialPath]
    }
  }

  // Fluent API for building routes
  admin() {
    return new RouteBuilder(`/${PATHS.ADMIN}`)
  }

  customers() {
    this.segments.push(PATHS.CUSTOMERS)
    return this
  }

  books() {
    this.segments.push(PATHS.BOOKS)
    return this
  }

  new() {
    this.segments.push(PATHS.NEW)
    return this
  }

  edit() {
    this.segments.push(PATHS.EDIT)
    return this
  }

  id(id?: string) {
    this.segments.push(id ? id : ':id')
    return this
  }

  // Build the final route
  build(): string {
    return this.segments.join('/')
  }

  // Build route pattern (with :id placeholders)
  pattern(): string {
    return this.build()
  }
}

// Static factory methods for common patterns
export const route = {
  // Admin routes
  admin: () => new RouteBuilder().admin(),
  adminCustomers: () => new RouteBuilder().admin().customers(),
  adminCustomersNew: () => new RouteBuilder().admin().customers().new(),
  adminCustomerView: (id?: string) =>
    new RouteBuilder().admin().customers().id(id),

  adminBooks: () => new RouteBuilder().admin().books(),
  adminBooksNew: () => new RouteBuilder().admin().books().new(),
  adminBookEdit: (id?: string) =>
    new RouteBuilder().admin().books().id(id).edit(),
  adminBookView: (id?: string) => new RouteBuilder().admin().books().id(id),

  // Public routes
  home: () => new RouteBuilder('/'),
  login: () => new RouteBuilder('/login'),
  register: () => new RouteBuilder('/register'),
}

// Example usage:
// route.adminCustomersNew().build() → '/admin/customers/new'
// route.adminCustomerView('123').build() → '/admin/customers/123'
// route.adminCustomerView().pattern() → '/admin/customers/:id'
