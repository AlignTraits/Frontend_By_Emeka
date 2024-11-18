import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/useAuth'
import Sidebar from '../components/dashboard/SideBar'
// import Navbar from '../components/Navbar'

export default function DashboardLayout() {
  const { user } = useAuth()

  // Protect dashboard routes
//   if (!user) {
//     return <Navigate to="/login" replace />
//   }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navbar /> */}
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
} 