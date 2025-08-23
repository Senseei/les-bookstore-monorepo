import { AdminLayout } from '@/pages'
import { Customers } from '@/pages/Admin/Customers'

import { PATHS, ROUTES } from './constants'

// Route configuration using reusable path segments
export const adminRoutes = [
  {
    path: PATHS.CUSTOMERS, // 'customers' - reusable segment
    element: <Customers />,
  },
  {
    path: `${PATHS.CUSTOMERS}/${PATHS.NEW}`, // 'customers/new' - composed from segments
    element: <div>New Customer Form</div>,
  },
  {
    path: `${PATHS.CUSTOMERS}/:id/${PATHS.EDIT}`, // 'customers/:id/edit' - pattern from segments
    element: <div>Edit Customer Form</div>,
  },
  {
    path: PATHS.BOOKS, // 'books' - reusable segment
    element: <div>Book Management Page</div>,
  },
  {
    path: `${PATHS.BOOKS}/${PATHS.NEW}`, // 'books/new' - composed from segments
    element: <div>New Book Form</div>,
  },
]

// Main route configuration
export const routeConfig = [
  {
    path: ROUTES.ADMIN,
    element: <AdminLayout />,
    children: adminRoutes,
  },
]
