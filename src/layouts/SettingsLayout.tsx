import { Outlet, } from "react-router-dom";
// import { useAuth } from "../contexts/useAuth";
import Sidebar from "../components/Settings/Sidebar";
// import Header from "../components/dashboard/Header";

export default function DashboardLayout() {
//   const { user } = useAuth();

  // Protect dashboard routes
  //   if (!user) {
  //     return <Navigate to="/login" replace />
  //   }

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      <Sidebar />
      <div className="px-10 py-5 w-full bg-[#FFFFFF] ">
        <Outlet />
      </div>
    </div>
  );
}
