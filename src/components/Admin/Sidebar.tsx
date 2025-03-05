// import { useState } from "react";
import { NavLink, useLocation  } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
// import { useNavigate } from "react-router-dom";
// import SchoolIcon from "../../assets/admin/icons/school-icon.png";
import { LuSchool } from "react-icons/lu";
// import AccountIcon from "../../assets/admin/icons/account-icon.png";

import Logo from "../../assets/logo.svg";
import { FiGrid, FiLogOut, FiX } from "react-icons/fi";
import { TiGroupOutline } from "react-icons/ti";
import { MdKeyboardArrowDown } from "react-icons/md";
import { CgProfile } from "react-icons/cg";



const SideBar = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { logout, admin } = useAuth();
  // const navigate = useNavigate();
  const location = useLocation()

  const handleLogout = async () => {
    try {
      await logout();
      // navigate("/admin/login");
      window.location.href = '/admin/login'
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  let schoolPath:boolean = location.pathname.startsWith("/admin/schools")
  let accountPath:boolean = location.pathname.startsWith("/admin/accounts")


  return (
    <div
      className={`fixed z-20 lg:sticky top-0 left-0 h-screen w-[280px] bg-[#FAFAFA] border-[2px] border-[#E0E0E0] px-4 pt-8 flex flex-col transition-transform duration-300 ${
        open ? "translate-x-0 " : "-translate-x-full lg:translate-x-0"
      }`}
    >
      {/* Close Button */}
      <FiX
        className="absolute right-2 top-2 text-[#212121] w-6 h-6 cursor-pointer hover:animate-spin duration-50 lg:hidden"
        onClick={() => setOpen(false)}
      />
      {/* Logo */}
      <div className="flex mx-auto mb-8 relative right-5 w-[150px]">
        <img src={Logo} alt="AlignTraits Logo" />
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-6 h-full">
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `flex items-center p-3 font-bold rounded-md transition-colors ${
              isActive ? "text-white bg-[#004085]" : "text-[#5D5D5B] hover:bg-gray-100"
            }`
          }
          end
        >
          <FiGrid className="w-5 h-5 mr-3" />
          <span>Overview</span>
        </NavLink>

        <NavLink
          to="/admin/schools"
          className={({ isActive }) =>
            `flex items-center p-3 font-bold rounded-md transition-colors ${
              isActive || schoolPath ? "text-white bg-[#004085]" : "text-[#5D5D5B] hover:bg-gray-100"
            }`
          }
          end
        >
          <LuSchool className="w-5 h-5 mr-3"  />
          <span className={schoolPath ? "text-white bg-[#004085]" : "text-[#5D5D5B]"}>
            Schools
          </span>
        </NavLink>

        <NavLink
          to="/admin/accounts"
          className={({ isActive }) =>
            `flex items-center p-3 font-bold rounded-md transition-colors ${
              isActive || accountPath ? "text-white bg-[#004085]" : "text-[#5D5D5B] hover:bg-gray-100"
            }`
          }
          end
        >
          <TiGroupOutline className="w-5 h-5 mr-3" />
          <span className={accountPath ? "text-white bg-[#004085]" : "text-[#5D5D5B]"}>
            Accounts
          </span>
        </NavLink>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center p-3 text-[#5D5D5B] font-bold rounded-md hover:bg-red-50 hover:text-red-500 transition-colors"
        >
          <FiLogOut className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </nav>


      <div className="h-[80px] w-full border-t border-t-2 border-gray-300 
        flex flex-row justify-between items-center hover:bg-gray-100 cursor-pointer 
        transition-colors duration-300">
        <div className="flex flex-row items-center gap-x-[10px]">
          <CgProfile className="w-7 h-7 " />
          <div>
            <p className="text-[14px]">{admin?.username}</p>
            <p className="text-[12px] text-[#999999]">{admin?.email}</p>
          </div>
        </div>

        <MdKeyboardArrowDown className="w-7 h-7" />
      </div>

    </div>
  );
};

export default SideBar;
