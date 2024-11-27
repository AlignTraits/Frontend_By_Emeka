import { Outlet } from 'react-router-dom'// add Navigate back dont forget
// import { useAuth } from '../contexts/useAuth'
import Sidebar from '../components/dashboard/SideBar'
import Header from '../components/dashboard/Header'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

export default function DashboardLayout() {
  // const { user } = useAuth()

  // Protect dashboard routes
//   if (!user) {
//     return <Navigate to="/login" replace />
//   }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="">
          <Outlet />
        </main>
      </div>
      <ToastContainer />
    </div>
  )
} 