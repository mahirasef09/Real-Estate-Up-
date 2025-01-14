import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthProvider from './Providers/AuthProvider';
import App from './App';
import ErrorPage from './Components/ErrorPage';
import Home from './Layouts/Home';
import Dashboard from './Layouts/Dashboard';
import MyProfile from './Pages/DashboardPage/UserPage/MyProfile';
import AllProperties from './Pages/AllPropertiesPage/AllProperties';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/allProperties",
        element: <AllProperties></AllProperties>
      },
    ]
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/dashboard/myProfile",
        element: <MyProfile></MyProfile>
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
