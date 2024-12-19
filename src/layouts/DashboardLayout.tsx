import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/useAuth"; 
import Sidebar from "../components/dashboard/SideBar";
import Header from "../components/dashboard/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DashboardLayout() {
  const { token, isAuthenticated } = useAuth();

  const [open, setOpen] = useState(false); 
  const location = useLocation(); 

  console.log("Token:", token, "Is Authenticated:", isAuthenticated);


  if (isAuthenticated && token) {
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
    );
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}
