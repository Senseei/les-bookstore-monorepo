import { AdminLayout } from '@/pages'
import { CustomerManagement } from '@/pages/Admin/CustomerManagement'

import { ROUTES } from './constants'

// Route configuration objects - easier to maintain
export const adminRoutes = [
  {
    path: 'customers',
    element: <CustomerManagement />,
  },
  {
    path: 'customers/new',
    element: <div>New Customer Form</div>, // TODO: Create CustomerForm component
  },
  {
    path: 'customers/:id/edit',
    element: <div>Edit Customer Form</div>, // TODO: Create CustomerForm component
  },
  {
    path: 'books',
    element: <div>Book Management Page</div>, // TODO: Create BookManagement component
  },
  {
    path: 'books/new',
    element: <div>New Book Form</div>, // TODO: Create BookForm component
  },
]

// Main route configuration
export const routeConfig = [
  {
    path: ROUTES.ADMIN,
    element: <AdminLayout />,
    children: adminRoutes,
  },
  // Future: public routes
  // {
  //   path: ROUTES.HOME,
  //   element: <HomePage />,
  // },
]
