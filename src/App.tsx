import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext'
import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Lazy imports for code splitting
const Root = lazy(() => import("./layouts/Root"));
const DashboardLayout = lazy(() => import("./layouts/DashboardLayout"));
const SettingsLayout = lazy(() => import("./layouts/SettingsLayout"));
const AdminLayout = lazy(() => import("./layouts/admin/AdminLayout"));
const AdminDashboardLayout = lazy(() => import('./layouts/admin/AdminDashboardLayout'));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/auth/Login"));
const SignUp = lazy(() => import("./pages/auth/Register"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const VerifyEmail = lazy(() => import("./pages/auth/VerifyEmail"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Pathfinder = lazy(() => import("./pages/dashboard/Pathfinder"));
const Community = lazy(() => import("./pages/dashboard/Community"));
const BasicInformation = lazy(() => import("./pages/dashboard/settings/BasicInformation"));
const AccountSettings = lazy(() => import("./pages/dashboard/settings/AccountSettings"));
const CareerRecommendation = lazy(() => import("./pages/dashboard/settings/CareerRecommendation"));
const Schoolnformation = lazy(() => import("./pages/dashboard/settings/Schoolnformation"));
const Payment = lazy(() => import("./pages/dashboard/settings/Payment"));
const Admin = lazy(() => import('./pages/admin/Index'));
const AdminLogin = lazy(() => import('./pages/admin/Login'));
const Schools = lazy(() => import('./pages/admin/Schools'));
const CreateCourse = lazy(() => import("./pages/admin/CreateCourse"));
const EditSchool = lazy(() => import("./pages/admin/EditSchool"));
const SchoolCourses = lazy(() => import("./pages/admin/SchoolCourses"));
const AddCourse = lazy(() => import("./pages/admin/AddCourse"));
const CourseDetails = lazy(() => import("./pages/admin/CourseDetails"));
const DataManagement = lazy(() => import("./pages/admin/DataManagement"));
const Loans = lazy(() => import("./pages/admin/Loans"));
const BulkCenter = lazy(() => import("./pages/admin/BulkCenter"));
const ProfileManagement = lazy(() => import("./pages/admin/ProfileManagement"));
const HomeSearch = lazy(() => import("./pages/HomeSearch"));
const OnboardingPage = lazy(() => import("./pages/auth/OnboardingPage"))
const GoogleAuthSuccess = lazy(() => import("./pages/auth/GoogleAuthSuccess"));
const Recommendation = lazy(() => import("./pages/Recommendation"))
const Questionaire = lazy (() => import("./pages/Questionaire"))
const CheckEligibility = lazy(() => import("./pages/CheckEligibility"));

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: '/email-verify', element: <VerifyEmail /> },
  { path: '/reset-password', element: <ResetPassword /> },
  { path: '/auth/success', element: <GoogleAuthSuccess /> },
  { path: "/search", element: <HomeSearch /> },
  { path: "/career-recommedation", element: <Recommendation /> },
  { path: "/questionaire", element: <Questionaire /> },
  { path: "/check-eligibility", element: <CheckEligibility /> },
  { index: true, element: <Home /> },

  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: 'onboarding-form', element: <OnboardingPage /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "pathfinder", element: <Pathfinder /> },
      { path: "community", element: <Community /> },
      {
        path: "settings",
        element: <SettingsLayout />,
        children: [
          { index: true, element: <BasicInformation /> },
          { path: "basic-information", element: <BasicInformation /> },
          { path: "account-settings", element: <AccountSettings /> },
          { path: "career-recommendation", element: <CareerRecommendation /> },
          { path: "school-information", element: <Schoolnformation /> },
          { path: "payment", element: <Payment /> },
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
          { index: true, element: <Admin /> },
          { path: 'accounts', element: <ProfileManagement /> },
          { path: 'bulk-center', element: <BulkCenter /> },
          { path: 'loans', element: <Loans /> },
          { path: 'data-management', element: <DataManagement /> },
          { path: 'schools', element: <Schools /> },
          { path: 'schools/:schoolId/courses', element: <SchoolCourses /> },
          { path: 'schools/:schoolId/add-course', element: <AddCourse /> },
          { path: 'schools/:schoolId/course-details/:courseId', element: <CourseDetails /> },
          { path: 'schools/create-course', element: <CreateCourse /> },
          { path: 'schools/edit-school', element: <EditSchool /> },
        ]
      },
      { path: 'login', element: <AdminLogin /> }
    ]
  }
]);

function App() {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center min-h-screen bg-[#f4f8fb]">
            <svg
              className="animate-spin h-12 w-12 text-[#004085] mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            <span className="text-[#004085] text-lg font-semibold animate-pulse">
              Loading, please wait...
            </span>
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  );
}

export default App;