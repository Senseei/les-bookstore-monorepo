import {
  AdminLayout,
  CustomersList,
  ProfileEdit,
  SignUp,
  SiteLayout,
} from '@/pages'

import { PATHS, ROUTES } from './constants'

// Route configuration using reusable path segments
export const adminRoutes = [
  {
    path: PATHS.CUSTOMERS, // 'customers' - reusable segment
    element: <CustomersList />,
  },
  {
    path: `${PATHS.CUSTOMERS}/${PATHS.NEW}`, // 'customers/new' - composed from segments
    element: <div>New Customer Form</div>,
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
  {
    path: ROUTES.HOME,
    element: <SiteLayout />,
    children: [
      {
        path: '',
        element: <div>Home Page</div>,
      },
      {
        path: ROUTES.REGISTER.slice(1), // Remove leading slash for child route
        element: <SignUp />,
      },
      {
        path: ROUTES.PROFILE_EDIT.slice(1), // Remove leading slash for child route
        element: <ProfileEdit />,
      },
      {
        path: 'profile/edit/:id', // Rota com parâmetro para editar usuário específico
        element: <ProfileEdit />,
      },
    ],
  },
]
