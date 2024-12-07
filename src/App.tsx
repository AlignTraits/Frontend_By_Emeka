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
import Pathfinder from "./pages/dashboard/Pathfinder";
import Community from "./pages/dashboard/Community";
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
        path: "pathfinder",
        element: <Pathfinder />,
      },
      {
        path: "community",
        element: <Community />,
      },
      {
        path: "settings", 
        element: <SettingsLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="basic-information" />, 
          },
          {
            path: "basic-information", 
            element: <BasicInformation />,
            
          },
          {
            path: "account-settings", 
            element: <AccountSettings />,
          },
          {
            path: "career-recommendation",
            element: <CareerRecommendation />,
          },
          {
            path: "school-information", 
            element: <Schoolnformation />,
          },
          {
            path: "payment",
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
