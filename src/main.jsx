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
import UpdateProperty from './Pages/DashboardPage/AgentPage/UpdateProperty';
import AdminProfile from './Pages/DashboardPage/AdminPage/AdminProfile';
import ManageProperties from './Pages/DashboardPage/AdminPage/ManageProperties';
import Welcome from './Components/Welcome';
import ManageUsers from './Pages/DashboardPage/AdminPage/ManageUsers';
import PropertyDetails from './Components/PropertyDetails';
import Wishlist from './Pages/DashboardPage/UserPage/Wishlist';
import MakeAnOffer from './Pages/DashboardPage/UserPage/MakeAnOffer';
import PropertyBought from './Pages/DashboardPage/UserPage/PropertyBought';
import MyRequestedProperties from './Pages/DashboardPage/AgentPage/MyRequestedProperties';

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
        path: "/details/:id",
        element: <PropertyDetails></PropertyDetails>,
        loader: ({params}) => fetch(`http://localhost:5000/property/${params.id}`)
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
        path: "/dashboard/welcome",
        element: <Welcome></Welcome>
      },
      {
        path: "/dashboard/myProfile",
        element: <MyProfile></MyProfile>
      },
      {
        path: "/dashboard/wishlist",
        element: <Wishlist></Wishlist>
      },
      {
        path: "/dashboard/makeAnOffer/:id",
        element: <MakeAnOffer></MakeAnOffer>,
        loader: ({params}) => fetch(`http://localhost:5000/wishlist/${params.id}`)
      },
      {
        path: "/dashboard/propertyBought",
        element: <PropertyBought></PropertyBought>
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
        path: "/dashboard/updateAddedProperty/:id",
        element: <UpdateProperty></UpdateProperty>,
        loader: ({params}) => fetch(`http://localhost:5000/property/${params.id}`)
      },
      {
        path: "/dashboard/myAddedProperties",
        element: <MyAddedProperties></MyAddedProperties>
      },
      {
        path: "/dashboard/myRequestedProperties",
        element: <MyRequestedProperties></MyRequestedProperties>
      },

      // Admin routes
      {
        path: "/dashboard/adminProfile",
        element: <AdminProfile></AdminProfile>
      },
      {
        path: "/dashboard/manageProperties",
        element: <ManageProperties></ManageProperties>
      },
      {
        path: "/dashboard/manageUsers",
        element: <ManageUsers></ManageUsers>
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
