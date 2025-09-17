import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext'
import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardLayout from "./layouts/DashboardLayout";
import AdminLayout from "./layouts/admin/AdminLayout";
import AdminDashboardLayout from './layouts/admin/AdminDashboardLayout'
import Root from "./layouts/Root"

import SettingsLayout from "./layouts/SettingsLayout";
// Lazy imports for code splitting

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
const SelectPayment = lazy(() => import("./pages/SelectPayment"))
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const CareerPath = lazy(() => import("./pages/dashboard/CareerPath"))
const ProgressTracker = lazy(() => import("./pages/dashboard/ProgressTracker"))
const SchoolPage = lazy(() => import("./pages/dashboard/SchoolPage"))
const SkillRoadMap = lazy(() => import("./pages/dashboard/SkillRoadMap"))
const AccountSettings = lazy(() => import("./pages/dashboard/AccountSettings"))
const Profile = lazy(() => import("./pages/dashboard/Profile"))
const AccountRecords = lazy(() => import("./pages/dashboard/AccountRecords"))
const SecurityManagement = lazy(() => import("./pages/dashboard/SecurityManagement"))
const PaymentCallback = lazy(() => import("./pages/PaymentCallback")); 
const SignUpTwo = lazy(() => import("./pages/auth/RegisterTwo"))
const Subscription = lazy(() => import("./pages/dashboard/Subscription"))
const Page404 = lazy(() => import("./pages/404"));
const SetupPassword = lazy(() => import("./pages/auth/SetupPassword"));
const UsersList = lazy(() => import("./pages/admin/Users"))
const Waitlist = lazy(() => import("./pages/admin/Waitlist"))
const TermsAndCondtion = lazy(() => import("./pages/TermsAndCondiotion"))
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"))


const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/signup-two", element: <SignUpTwo /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: '/email-verify', element: <VerifyEmail /> },
  { path: '/reset-password', element: <ResetPassword title="Reset password" /> },
  { path: '/setup-password', element: <SetupPassword title="Setup password" /> },
  { path: '/auth/success', element: <GoogleAuthSuccess /> },
  { path: "/search", element: <HomeSearch /> },
  { path: "/career-recommedation", element: <Recommendation /> },
  { path: "/questionaire", element: <Questionaire /> },
  { path: "/make-payment", element: <PaymentPage /> },
  { path: "/select-payment", element: <SelectPayment /> },
  { path: "/payment/callback", element: <PaymentCallback /> }, 
  { path: "/check-eligibility/:courseId", element: <CheckEligibility /> },
  { path: "/terms-and-conditions", element: <TermsAndCondtion /> },
  { path: "/privacy-policy", element: <PrivacyPolicy /> },
  // { path: "/not-found", element: <Page404 /> },
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
      { path: "career-pathway", element: <CareerPath />},
      { path: "progres-tracker", element: <ProgressTracker /> },
      { path: "school", element: <SchoolPage />},
      { path: "skill-roadmap", element: <SkillRoadMap />},
      

      {
        path: "settings",
        element: <SettingsLayout />, // <-- Add this line
        children: [
          { index: true, element: <AccountSettings /> }, // /dashboard/settings
          { path: "profile", element: <Profile /> },     // /dashboard/settings/profile
          { path: "records", element: <AccountRecords /> }, // /dashboard/settings/records
          { path: "security", element: <SecurityManagement /> }, // /dashboard/settings/security
          { path: "subscription", element: <Subscription /> }
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
          { path: 'waitlist', element: <Waitlist /> },
          { path: 'users', element: <UsersList /> },
          { path: 'schools', element: <Schools /> },
          { path: 'schools/:schoolId/courses', element: <SchoolCourses /> },
          { path: 'schools/:schoolId/add-course', element: <AddCourse /> },
          { path: 'schools/:schoolId/course-details/:courseId', element: <CourseDetails /> },
          { path: 'schools/create-course', element: <CreateCourse /> },
          { path: 'schools/edit-school', element: <EditSchool /> },
        ]
      },
      { path: 'login', element: <AdminLogin /> },
      { path: "forgot-password", element: <ForgotPassword fromAdmin={true} /> },
    ]
  },
  {
    path: "*",
    element: <Page404 />,
  },

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