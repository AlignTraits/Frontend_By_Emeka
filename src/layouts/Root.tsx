import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from "../contexts/useAuth";

export default function Root() {
  const { user } = useAuth()

  // Redirect authenticated users to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main>
        <Outlet />
      </main>
    </div>
  )
} 