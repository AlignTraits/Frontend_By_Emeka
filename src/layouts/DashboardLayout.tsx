import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/useAuth'
import Sidebar from '../components/dashboard/SideBar'
import Header from '../components/dashboard/Header'

export default function DashboardLayout() {
  const { user } = useAuth()

  // Protect dashboard routes
//   if (!user) {
//     return <Navigate to="/login" replace />
//   }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="px-20 py-5">
          <Outlet />
        </main>
      </div>
    </div>
  )
} 