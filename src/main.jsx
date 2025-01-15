import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

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
import SignIn from './Pages/SignInPage/SignIn';
import SignUp from './Pages/SignUpPage/SignUp';
import { HelmetProvider } from 'react-helmet-async';
import AgentProfile from './Pages/DashboardPage/AgentPage/AgentProfile';
import AddProperty from './Pages/DashboardPage/AgentPage/AddProperty';
import MyAddedProperties from './Pages/DashboardPage/AgentPage/MyAddedProperties';

const queryClient = new QueryClient();

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
      {
        path: "/signIn",
        element: <SignIn></SignIn>
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>
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

      // Agent routes
      {
        path: "/dashboard/agentProfile",
        element: <AgentProfile></AgentProfile>
      },
      {
        path: "/dashboard/addProperty",
        element: <AddProperty></AddProperty>
      },
      {
        path: "/dashboard/myAddedProperties",
        element: <MyAddedProperties></MyAddedProperties>
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
