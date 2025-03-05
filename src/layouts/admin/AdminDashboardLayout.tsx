import { useEffect, useRef, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import Sidebar from "../../components/Admin/Sidebar";
import Header from "../../components/Admin/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAdminDetails } from "../../services/auth.service";


export default function DashboardLayout() {
  const { token, isAuthenticated, setAdmin, admin } = useAuth();
console.log(admin)
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const data =  useRef(localStorage.getItem('admin'));

  useEffect(() => {
   
    if (data.current == null && token) {
      async function getData() {
        try {
          data.current = await getAdminDetails(token as string);
          localStorage.setItem("admin", JSON.stringify(data.current))
        } catch (error) {
          console.error("Error fetching admin details:", error);
        }
      }
      
      getData();
    }
    
    if(data.current) setAdmin(JSON.parse(data.current))
  
  }, [token, setAdmin]);


  if (isAuthenticated && token) {
    return (
      <div className="h-screen flex relative overflow-y-scroll">
        <Sidebar open={open} setOpen={setOpen} />
        <div className="flex-1 relative">
          <Header setOpen={setOpen}  />
          <main className="p-5 xl:p-6">
            <Outlet />
          </main>
        </div>
        <ToastContainer />
      </div>
    );
  } else {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
}
