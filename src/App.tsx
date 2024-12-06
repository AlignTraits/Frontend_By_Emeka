import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext'
import Root from "./layouts/Root";
import DashboardLayout from "./layouts/DashboardLayout";
import SettingsLayout from "./layouts/SettingsLayout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import BasicInformation from "./pages/dashboard/settings/BasicInformation";
import AccountSettings from "./pages/dashboard/settings/AccountSettings";
import CareerRecommendation from "./pages/dashboard/settings/CareerRecommendation";
import Schoolnformation from "./pages/dashboard/settings/Schoolnformation";
import Payment from "./pages/dashboard/settings/Payment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: '/verify-email',
        
      }
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "settings", // Parent path is "/dashboard/settings"
        element: <SettingsLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="basic-information" />, // Relative path for redirection
          },
          {
            path: "basic-information", // Relative path
            element: <BasicInformation />,
            
          },
          {
            path: "account-settings", // Relative path
            element: <AccountSettings />,
          },
          {
            path: "career-recommendation", // Relative path
            element: <CareerRecommendation />,
          },
          {
            path: "school-information", // Relative path
            element: <Schoolnformation />,
          },
          {
            path: "payment", // Relative path
            element: <Payment />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    // <RouterProvider router={router} />
  );
}

export default App;
