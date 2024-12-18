import  { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import { useNavigate } from "react-router-dom";
import PathfinderIcon from "../../assets/dashboard/icons/PathfinderIcon.svg";
import Logo from "../../assets/logo.svg";
import {
  FiBook,
  FiSettings,
  FiChevronDown,
  FiShoppingBag,
  FiSearch,
  FiBookOpen,
  FiShoppingCart,
  FiGlobe,
  FiGrid,
  FiLogOut,
  FiList,
  FiX

} from "react-icons/fi";

const SideBar = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [learningOpen, setLearningOpen] = useState<boolean>(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div
      className={`fixed z-20 lg:sticky top-0 left-0 h-screen w-[250px] bg-[#F7FAFF] border-[2px] border-[#E0E0E0] shadow-md px-4 py-8 flex flex-col transition-transform duration-300 ${
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
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center p-3 font-[500] rounded-md transition-colors ${
              isActive ? " text-blue-500" : "text-[#212121] hover:bg-gray-100"
            }`
          }
        >
          <FiGrid className="w-5 h-5 mr-3" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/dashboard/pathfinder"
          className={({ isActive }) =>
            `flex items-center p-3 font-[500] rounded-md transition-colors ${
              isActive ? " text-blue-500" : "text-[#212121] hover:bg-gray-100"
            }`
          }
        >
          <img
            src={PathfinderIcon}
            alt="AlignTraits Pathfinder"
            className="w-5 h-5 mr-3 fill-[#007BFF]"
          />
          <span>Pathfinder</span>
        </NavLink>

        {/* Learning Dropdown */}
        <div className="relative">
          <button
            onClick={() => setLearningOpen(!learningOpen)}
            className="flex items-center w-full p-3 text-[#212121] font-[500] rounded-md hover:bg-gray-100 transition-colors"
          >
            <FiBookOpen className="w-5 h-5 mr-3" />
            <span>Learning</span>
            <FiChevronDown
              className={`w-5 h-5 transition-transform duration-200 ${
                learningOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {learningOpen && (
            <div className="pl-4 mt-2 space-y-4">
              <NavLink
                to="/dashboard/learning"
                className={({ isActive }) =>
                  `flex items-center p-3 font-[500] rounded-md transition-colors ${
                    isActive
                      ? " text-blue-500"
                      : "text-[#212121] hover:bg-gray-100"
                  }`
                }
              >
                <FiShoppingBag className="w-5 h-5 mr-3" />
                <span>Store</span>
              </NavLink>
              <NavLink
                to="/dashboard/search"
                className={({ isActive }) =>
                  `flex items-center p-3 font-[500] rounded-md transition-colors ${
                    isActive
                      ? " text-blue-500"
                      : "text-[#212121] hover:bg-gray-100"
                  }`
                }
              >
                <FiSearch className="w-5 h-5 mr-3" />
                <span>Search</span>
              </NavLink>
              <NavLink
                to="/dashboard/library"
                className={({ isActive }) =>
                  `flex items-center p-3 font-[500] rounded-md transition-colors ${
                    isActive
                      ? " text-blue-500"
                      : "text-[#212121] hover:bg-gray-100"
                  }`
                }
              >
                <FiBook className="w-5 h-5 mr-3" />
                <span>Library</span>
              </NavLink>
              <NavLink
                to="/dashboard/task"
                className={({ isActive }) =>
                  `flex items-center p-3 font-[500] rounded-md transition-colors ${
                    isActive
                      ? " text-blue-500"
                      : "text-[#212121] hover:bg-gray-100"
                  }`
                }
              >
                <FiList className="w-5 h-5 mr-3" />
                <span>Task</span>
              </NavLink>
              <NavLink
                to="/dashboard/basket"
                className={({ isActive }) =>
                  `flex items-center p-3 font-[500] rounded-md transition-colors ${
                    isActive
                      ? " text-blue-500"
                      : "text-[#212121] hover:bg-gray-100"
                  }`
                }
              >
                <FiShoppingCart className="w-5 h-5 mr-3" />
                <span>Basket</span>
              </NavLink>
            </div>
          )}
        </div>

        <NavLink
          to="/dashboard/community"
          className={({ isActive }) =>
            `flex items-center p-3 font-[500] rounded-md transition-colors ${
              isActive ? " text-blue-500" : "text-[#212121] hover:bg-gray-100"
            }`
          }
        >
          <FiGlobe className="w-5 h-5 mr-3" />
          <span>Community</span>
        </NavLink>

        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            `flex items-center p-3 font-[500] rounded-md transition-colors ${
              isActive ? " text-blue-500" : "text-[#212121] hover:bg-gray-100"
            }`
          }
        >
          <FiSettings className="w-5 h-5 mr-3" />
          <span>Settings</span>
        </NavLink>
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center p-3 text-[#212121] rounded-md hover:bg-red-50 hover:text-red-500 transition-colors"
      >
        <FiLogOut className="w-5 h-5 mr-3" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default SideBar;



