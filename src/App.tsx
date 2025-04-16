import {
  RouterProvider,
  createBrowserRouter,
  // Navigate,
} from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext'
import Root from "./layouts/Root";
import DashboardLayout from "./layouts/DashboardLayout";
import SettingsLayout from "./layouts/SettingsLayout";
import AdminLayout from "./layouts/admin/AdminLayout";
import AdminDashboardLayout from './layouts/admin/AdminDashboardLayout'
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import Pathfinder from "./pages/dashboard/Pathfinder";
import Community from "./pages/dashboard/Community";
import BasicInformation from "./pages/dashboard/settings/BasicInformation";
import AccountSettings from "./pages/dashboard/settings/AccountSettings";
import CareerRecommendation from "./pages/dashboard/settings/CareerRecommendation";
import Schoolnformation from "./pages/dashboard/settings/Schoolnformation";
import Payment from "./pages/dashboard/settings/Payment";
import Admin from './pages/admin/Index'
import AdminLogin from './pages/admin/Login'
import Schools from './pages/admin/Schools'
import CreateCourse from "./pages/admin/CreateCourse";
import EditSchool from "./pages/admin/EditSchool";
import AccountsPage from "./pages/admin/AccountsPage";
import SchoolCourses from "./pages/admin/SchoolCourses";
import AddCourse from "./pages/admin/AddCourse";
import CourseDetails from "./pages/admin/CourseDetails";
import DataManagement from "./pages/admin/DataManagement";
import Loans from "./pages/admin/Loans";
import BulkCenter from "./pages/admin/BulkCenter";
import ProfileManagement from "./pages/admin/ProfileManagement";

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
        path: '/email-verify',
        element: <VerifyEmail />
      }, {
        path: '/reset-password',
        element: <ResetPassword />
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
            element: <BasicInformation />,
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
  {
    path: '/admin',
    element: <AdminLayout />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: '',
        element: <AdminDashboardLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Admin />
          },
          {
            path: 'accounts',
            element: <AccountsPage />
          },

          {
            path: 'bulk-center',
            element: <BulkCenter />
          },

          {
            path: 'loans',
            element: <Loans />
          },
          {
            path: 'data-management',
            element: <DataManagement />
          },

          {
            path: 'profile',
            element: <ProfileManagement />
          },

          {
            path: 'schools',
            element: <Schools />,
          },
          {
            path: 'schools/:schoolId/courses',
            element: <SchoolCourses />
          },
          {
            path: 'schools/:schoolId/add-course',
            element: <AddCourse />
          },
          {
            path: 'schools/:schoolId/course-details/:courseId',
            element: <CourseDetails />
          },
          {
            path: 'schools/create-course',
            element: <CreateCourse />
          },
          {
            path: 'schools/edit-school',
            element: <EditSchool />
          },

        ]
      },
      {
        path: 'login',
        element: <AdminLogin />
      }
    ]
  }
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
