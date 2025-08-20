import { createBrowserRouter } from 'react-router'

import { AdminLayout } from '@/pages'
import { CustomerManagement } from '@/pages/Admin/CustomerManagement'

export const Router = createBrowserRouter([
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'customers',
        element: <CustomerManagement />,
      },
      {
        path: 'books',
        element: <div>Book Management Page</div>,
      },
    ],
  },
])
