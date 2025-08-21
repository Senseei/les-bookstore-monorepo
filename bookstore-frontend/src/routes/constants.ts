export const APP_ROUTES_PATHS = {
  admin: {
    base: '/admin',
    customers: 'customers',
    books: 'books',
  },
}

export const APP_ROUTES = {
  admin: {
    base: APP_ROUTES_PATHS.admin.base,
    customers: `${APP_ROUTES_PATHS.admin.base}/${APP_ROUTES_PATHS.admin.customers}`,
    books: `${APP_ROUTES_PATHS.admin.base}/${APP_ROUTES_PATHS.admin.books}`,
  },
}
