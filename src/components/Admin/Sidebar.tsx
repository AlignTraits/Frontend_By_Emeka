// import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
// import { useNavigate } from "react-router-dom";
import SchoolIcon from "../../assets/admin/icons/school-icon.png";
// import AccountIcon from "../../assets/admin/icons/account-icon.png";

import Logo from "../../assets/logo.svg";
import { FiGrid, FiLogOut, FiX } from "react-icons/fi";

const SideBar = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { logout } = useAuth();
  // const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      // navigate("/admin/login");
      window.location.href = '/admin/login'
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div
      className={`fixed z-20 lg:sticky top-0 left-0 h-screen w-[250px] bg-[#E8EAEE] border-[2px] border-[#E0E0E0] rounded-r-2xl px-4 py-8 flex flex-col transition-transform duration-300 ${
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
      <nav className="flex flex-col space-y-4 flex-grow h-full">
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `flex items-center p-3 font-bold rounded-md transition-colors ${
              isActive ? " text-blue-500" : "text-[#5D5D5B] hover:bg-gray-100"
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
              isActive ? "text-blue-500" : "text-[#5D5D5B] hover:bg-gray-100"
            }`
          }
          end
        >
          {({ isActive }) => (
            <>
              <img
                src={SchoolIcon}
                alt="AlignTraits School"
                className={`w-5 h-5 mr-3 ${
                  isActive ? "text-blue-500" : "text-[#5D5D5B]"
                }`}
                style={{
                  filter: isActive
                    ? "invert(36%) sepia(100%) saturate(1000%) hue-rotate(200deg) brightness(100%) contrast(100%)"
                    : "none",
                }}
              />
              <span className={isActive ? "text-blue-500" : "text-[#5D5D5B]"}>
                Schools
              </span>
            </>
          )}
        </NavLink>

        {/* <NavLink
          to="#"
          className={({ isActive }) =>
            `flex items-center p-3 font-bold rounded-md transition-colors ${
              isActive ? " text-blue-500" : "text-[#5D5D5B] hover:bg-gray-100"
            }`
          }
        >
          <img
            src={AccountIcon}
            alt="AlignTraits Account"
            className="w-5 h-5 mr-3 fill-[#007BFF]"
          />
          <span>Accounts</span>
        </NavLink> */}
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center p-3 text-[#5D5D5B] font-bold rounded-md hover:bg-red-50 hover:text-red-500 transition-colors"
      >
        <FiLogOut className="w-5 h-5 mr-3" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default SideBar;
