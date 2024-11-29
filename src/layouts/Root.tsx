import { Outlet, } from 'react-router-dom'
// import { useEffect } from 'react'
// import { useAuth } from "../contexts/useAuth";

export default function Root() {
  // const navigate = useNavigate()
  // const { user } = useAuth()

  // // Redirect authenticated users to dashboard
  // if (user) {
  //   return <Navigate to="/dashboard" replace />
  // }
 

  return (
    <div className="min-h-screen bg-gray-100">
      <main>
        <Outlet />
      </main>
    </div>
  )
} 