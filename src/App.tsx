import { RouterProvider, createBrowserRouter } from 'react-router-dom'
// import { AuthProvider } from './contexts/AuthContext'
import Root from './layouts/Root'
import DashboardLayout from './layouts/DashboardLayout'
import ErrorPage from './pages/ErrorPage'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import Dashboard from './pages/dashboard/Dashboard'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "signup",
        element: <SignUp />
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />
      },
    ]
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      // Add other dashboard routes here
      // {
      //   path: "profile",
      //   element: <Profile />
      // },
    ]
  }
])

function App() {
  return (
    // <AuthProvider>
    //   <RouterProvider router={router} />
    // </AuthProvider>
    <RouterProvider router={router} />
  )
}

export default App













