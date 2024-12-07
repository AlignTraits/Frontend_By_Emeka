import { useState } from 'react'
import { Outlet,} from 'react-router-dom'// add Navigate back dont forget
// import { useAuth } from '../contexts/useAuth'
import Sidebar from '../components/dashboard/SideBar'
import Header from '../components/dashboard/Header'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

export default function DashboardLayout() {
  // const { user } = useAuth()
  const [open, setOpen] = useState(false)


  // if (!user) {
  //   return <Navigate to="/login" replace />
  // }

  return (
    <div className="h-screen bg-gray-50 flex relative overflow-y-scroll">
      <Sidebar open={open} setOpen={setOpen} />
      <div className="flex-1 relative">
        <Header setOpen={setOpen} />
        <main className="">
          <Outlet />
        </main>
      </div>
      <ToastContainer />
    </div>
  )
} 