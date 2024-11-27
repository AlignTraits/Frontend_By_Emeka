import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
// import { useAuth } from "../contexts/useAuth";

export default function Root() {
  const navigate = useNavigate()
  // const { user } = useAuth()

  // // Redirect authenticated users to dashboard
  // if (user) {
  //   return <Navigate to="/dashboard" replace />
  // }
  useEffect(()=>{
    navigate('/login')
  })

// navigate('/login')
  return (
    <div className="min-h-screen bg-gray-100">
      <main>
        <Outlet />
      </main>
    </div>
  )
} 