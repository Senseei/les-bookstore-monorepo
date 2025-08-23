// Simple, flat route structure - easier to read and maintain
export const ROUTES = {
  // Admin routes
  ADMIN: '/admin',
  ADMIN_CUSTOMERS: '/admin/customers',
  ADMIN_CUSTOMERS_NEW: '/admin/customers/new',
  ADMIN_BOOKS: '/admin/books',
  ADMIN_BOOKS_NEW: '/admin/books/new',

  // Public routes (for future)
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
} as const

// Route patterns for React Router (with parameters)
export const ROUTE_PATTERNS = {
  ADMIN_CUSTOMER_EDIT: '/admin/customers/:id/edit',
  ADMIN_CUSTOMER_VIEW: '/admin/customers/:id',
  ADMIN_BOOK_EDIT: '/admin/books/:id/edit',
  ADMIN_BOOK_VIEW: '/admin/books/:id',
} as const

// Helper functions for dynamic routes
export const createRoute = {
  adminCustomerEdit: (id: string) => `/admin/customers/${id}/edit`,
  adminCustomerView: (id: string) => `/admin/customers/${id}`,
  adminBookEdit: (id: string) => `/admin/books/${id}/edit`,
  adminBookView: (id: string) => `/admin/books/${id}`,
}
