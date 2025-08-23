import { createBrowserRouter } from 'react-router'

import { AdminLayout } from '@/pages'
import { CustomerManagement } from '@/pages/Admin/CustomerManagement'
import { APP_ROUTES_PATHS, NEW_PATH } from '@/routes/constants'

export const Router = createBrowserRouter([
  {
    path: APP_ROUTES_PATHS.admin.base,
    element: <AdminLayout />,
    children: [
      {
        path: APP_ROUTES_PATHS.admin.customers,
        element: <CustomerManagement />,
      },
      {
        path: `${APP_ROUTES_PATHS.admin.customers}/${NEW_PATH}`,
        element: <div>New Customer Form</div>,
      },
      {
        path: APP_ROUTES_PATHS.admin.books,
        element: <div>Book Management Page</div>,
      },
    ],
  },
])
