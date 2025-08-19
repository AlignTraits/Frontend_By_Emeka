import { useState, useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth"; 
// import Sidebar from "../components/dashboard/SideBar";
import Header from "../components/dashboard/Header";
import { getUserDetails } from "../services/auth.service";
// import { ClipLoader } from "react-spinners";
import NewSidebar from "../components/dashboard/NewSidebar";
import { toast } from "react-toastify";

export default function DashboardLayout() {
  const { token, isAuthenticated, setUser } = useAuth();

  const [open, setOpen] = useState(false); 
  const location = useLocation(); 
  const [isLoading, setIsloading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
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

          // For new users, that filled their career pathway outside of login can they have a pop up on 
          // their first login to redirect them to career path?

          if (!response.data?.isCareerPathChecked) {
            return setShowModal(true);
          }

          // let tempDataTwo = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData") as string) : {ok: true};

          // If this is a first time user, redirect to the career pathway
          // During the career pathway flow, I set userData in localStorage;

          // if (tempDataTwo && !tempDataTwo?.ok) {

          //   toast.success("Welcome back to your Career Pathway");

          //   return setTimeout(() => {
          //     navigate("/dashboard/career-pathway")
          //   }, 1500);
          // }
 
          if (!response.data?.careerResults) {
            toast.success("Take our quiz and check your career path");
            return setTimeout(() => {
              navigate("/career-recommedation");
            }, 1500);
          }

        }
      }
      
      getData();
    }
    
  }, [token]);

  if (isAuthenticated && token) {
    return (
      <>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-screen bg-[#f4f8fb]">
            <svg
              className="animate-spin h-12 w-12 text-[#004085] mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            <span className="text-[#004085] text-lg font-semibold animate-pulse">
              Loading, please wait...
            </span>
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
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Career Pathway</h2>
              <p className="mb-4">Your career path result is ready. Click here to view</p>
              <button
                onClick={() => {
                  setShowModal(false);
                  navigate("/dashboard/career-pathway");
                }}
                className="w-full h-12 bg-[#004085] text-white rounded-lg hover:bg-blue-700"
              >
                View
              </button>
            </div>
          </div>
        )}
      </>
    );
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}
