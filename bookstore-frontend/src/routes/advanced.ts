// Previous constants.ts (for comparison) - still good for simple cases
export * from './constants'

// New approach using route builder - for complex applications
import { route } from './builder'

// Routes built using the fluent API - zero duplication
export const ROUTES_V2 = {
  // Public routes
  HOME: route.home().build(),
  LOGIN: route.login().build(),
  REGISTER: route.register().build(),

  // Admin routes - built dynamically, no hardcoded strings
  ADMIN: route.admin().build(),
  ADMIN_CUSTOMERS: route.adminCustomers().build(),
  ADMIN_CUSTOMERS_NEW: route.adminCustomersNew().build(),
  ADMIN_BOOKS: route.adminBooks().build(),
  ADMIN_BOOKS_NEW: route.adminBooksNew().build(),
} as const

// Route patterns - built using the same builder
export const ROUTE_PATTERNS_V2 = {
  ADMIN_CUSTOMER_VIEW: route.adminCustomerView().pattern(),
  ADMIN_BOOK_EDIT: route.adminBookEdit().pattern(),
  ADMIN_BOOK_VIEW: route.adminBookView().pattern(),
} as const

// Helper functions - using the same builder with IDs
export const createRoute_V2 = {
  adminCustomerView: (id: string) => route.adminCustomerView(id).build(),
  adminBookEdit: (id: string) => route.adminBookEdit(id).build(),
  adminBookView: (id: string) => route.adminBookView(id).build(),
}

/*
Examples of how this eliminates duplication:

❌ Before (lots of duplication):
ADMIN_CUSTOMERS: '/admin/customers',
ADMIN_CUSTOMERS_NEW: '/admin/customers/new',

✅ After (zero duplication):
ADMIN_CUSTOMERS: route.adminCustomers().build(),
ADMIN_CUSTOMERS_NEW: route.adminCustomersNew().build(),

Benefits:
1. Single source of truth for path segments
2. Type-safe route building
3. Fluent API that's easy to read
4. Automatic consistency across all routes
5. Easy to refactor - change path segment once, updates everywhere
*/
