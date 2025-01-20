import { useState, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/useAuth"; 
import Sidebar from "../components/dashboard/SideBar";
import Header from "../components/dashboard/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserDetails } from "../services/auth.service";
import { ClipLoader } from "react-spinners";


export default function DashboardLayout() {
  const { token, isAuthenticated, user, setUser } = useAuth();

  const [open, setOpen] = useState(false); 
  const location = useLocation(); 
  const [isLoading, setIsloading] = useState(true)

  console.log("Token:", token, "Is Authenticated:", isAuthenticated);

//  const data =  useRef(localStorage.getItem('user'));
console.log(user)
  useEffect(() => {
    if (user == null && token) {
      async function getData() {
        try {
          const response = await getUserDetails(token as string);
          localStorage.setItem("user", JSON.stringify(response.data))
          setUser(response.data)
          setIsloading(false)

        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
      
      getData();
    }
    
    
  
  }, [token, setUser, user]);


  if (isAuthenticated && token) {
    return (
      <>
        {isLoading ? (
          <div className="flex w-full  h-screen items-center justify-center">
            <ClipLoader />
          </div>
        ) : (
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
        )}
      </>
    );
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}
