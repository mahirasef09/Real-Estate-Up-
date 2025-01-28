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
import Payment from './Pages/DashboardPage/UserPage/Payment';
import MySoldProperties from './Pages/DashboardPage/AgentPage/MySoldProperties';
import MyReviews from './Pages/DashboardPage/UserPage/MyReviews';
import ManageReviews from './Pages/DashboardPage/AdminPage/ManageReviews';
import PrivateRoute from './Routes/PrivateRoute';
import AdminRoute from './Routes/AdminRoute';
import AdvertiseProperty from './Pages/DashboardPage/AdminPage/AdvertiseProperty';

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
        element: <PrivateRoute>
          <AllProperties></AllProperties>
        </PrivateRoute>
      },
      {
        path: "/details/:id",
        element: <PrivateRoute>
          <PropertyDetails></PropertyDetails>
        </PrivateRoute>,
        loader: ({ params }) => fetch(`https://real-estate-platform-server-red.vercel.app/property/${params.id}`)
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
    element: <PrivateRoute>
      <Dashboard></Dashboard>
    </PrivateRoute>,
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
        loader: ({ params }) => fetch(`https://real-estate-platform-server-red.vercel.app/wishlist/${params.id}`)
      },
      {
        path: "/dashboard/propertyBought",
        element: <PropertyBought></PropertyBought>
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment></Payment>
      },
      {
        path: "/dashboard/myReviews",
        element: <MyReviews></MyReviews>
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
        loader: ({ params }) => fetch(`https://real-estate-platform-server-red.vercel.app/property/${params.id}`)
      },
      {
        path: "/dashboard/myAddedProperties",
        element: <MyAddedProperties></MyAddedProperties>
      },
      {
        path: "/dashboard/mySoldProperties",
        element: <MySoldProperties></MySoldProperties>
      },
      {
        path: "/dashboard/myRequestedProperties",
        element: <MyRequestedProperties></MyRequestedProperties>
      },

      // Admin routes
      {
        path: "/dashboard/adminProfile",
        element: <AdminRoute>
          <AdminProfile></AdminProfile>
        </AdminRoute>
      },
      {
        path: "/dashboard/manageProperties",
        element: <AdminRoute>
          <ManageProperties></ManageProperties>
        </AdminRoute>
      },
      {
        path: "/dashboard/manageUsers",
        element: <AdminRoute>
          <ManageUsers></ManageUsers>
        </AdminRoute>
      },
      {
        path: "/dashboard/manageReviews",
        element: <AdminRoute>
          <ManageReviews></ManageReviews>
        </AdminRoute>
      },
      {
        path: "/dashboard/advertiseProperty",
        element: <AdminRoute>
          <AdvertiseProperty></AdvertiseProperty>
        </AdminRoute>
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
