import { Navigate, Outlet, RouteObject } from 'react-router-dom';

import { Login } from './Auth';
import { Category } from './Category';
import { Expense } from './Expense';
import { Home } from './Home';

export const routes = (isLoggedIn?: boolean): RouteObject[] => [
  {
    path: '/',
    element: <Outlet />,
    children: [
      {
        path: '',
        element: isLoggedIn ? <Home /> : <Navigate to="login" />
      },
      {
        path: 'login',
        element: <Login />
      }
    ]
  },
  {
    path: '/app',
    element: isLoggedIn ? <Outlet /> : <Navigate to="/login" />,
    children: [
      {
        path: 'categories',
        element: <Outlet />,
        children: [
          { path: '', element: <Category /> },
          { path: ':categoryId', element: <Category /> }
        ]
      },
      {
        path: 'expenses',
        element: <Expense />
      }
    ]
  }
];
