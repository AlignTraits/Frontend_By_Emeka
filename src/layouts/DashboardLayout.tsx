import { useState, useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth"; 
// import Sidebar from "../components/dashboard/SideBar";
import Header from "../components/dashboard/Header";
import { getUserDetails } from "../services/auth.service";
import { ClipLoader } from "react-spinners";
import NewSidebar from "../components/dashboard/NewSidebar";
import { toast } from "react-toastify";

export default function DashboardLayout() {
  const { token, isAuthenticated, user, setUser } = useAuth();

  const [open, setOpen] = useState(false); 
  const location = useLocation(); 
  const [isLoading, setIsloading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (user == null && token) {
      async function getData() {
        let response;
        setIsloading(true)
        try {
          response = await getUserDetails(token as string);
          localStorage.setItem("user", JSON.stringify(response.data))
          setUser(response.data)

        } catch (error) {
          console.error("Error fetching user details:", error);
        } finally {
          setIsloading(false)

          if (response.data.firstname === "" || !response.data.gender) {
            return navigate("/onboarding-form")
          }

          // for testing

          // if (true) {
          //   return navigate("/onboarding-form")
          // }

          let tempDataTwo = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData") as string) : null;

          // If this is a first time user, redirect to the career pathway
          // During the career pathway flow, I set userData in localStorage;

          if (tempDataTwo && !tempDataTwo?.ok) {
            toast.success("Welcome back to your Career Pathway");

            return setTimeout(() => {
              navigate("/dashboard/career-pathway")
            }, 1500);
          }
 
          if (!response.data?.careerResults) {
            toast.success("Take our quiz and check your career path");
            return setTimeout(() => {
              navigate("/career-recommedation");
            }, 1500);
          }

          // For new users, that filled their career pathway outside of login can they have a pop up on 
          // their first login to redirect them to career path?

          if (!response.data?.isCareerPathChecked) {
            toast.success("Welcome back to your Career Pathway");
            return setTimeout(() => {
              navigate("/dashboard/career-pathway")
            }, 1500);
          }

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
          <div className="h-screen bg-[white] flex relative overflow-y-scroll">
            <NewSidebar open={open} setOpen={setOpen} />
            <div className="flex-1 relative">
              <Header setOpen={setOpen} />
              <main className="">
                <Outlet />
              </main>
            </div>
          </div>
        )}
      </>
    );
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}
