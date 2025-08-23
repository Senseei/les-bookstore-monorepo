export const APP_ROUTES_PATHS = {
  admin: {
    base: '/admin',
    customers: 'customers',
    books: 'books',
  },
}

export const NEW_PATH = 'new'

export const APP_ROUTES = {
  admin: {
    base: APP_ROUTES_PATHS.admin.base,
    customers: {
      list: `${APP_ROUTES_PATHS.admin.base}/${APP_ROUTES_PATHS.admin.customers}`,
      new: `${APP_ROUTES_PATHS.admin.base}/${APP_ROUTES_PATHS.admin.customers}/${NEW_PATH}`,
    },
    books: {
      list: `${APP_ROUTES_PATHS.admin.base}/${APP_ROUTES_PATHS.admin.books}`,
      new: `${APP_ROUTES_PATHS.admin.base}/${APP_ROUTES_PATHS.admin.books}/${NEW_PATH}`,
    },
  },
}
