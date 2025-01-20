import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="w-[25%] h-screen bg-[#FFFFFF] border-[1px] px-4 py-5 flex flex-col sticky top-0 ">
      {/* Navigation Links */}
      <nav className="flex flex-col flex-grow">
        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            `flex items-center mx-auto p-3 font-[500] rounded-md transition-colors text-[14px] ${
              isActive ? " text-blue-600" : "text-[#212121] hover:bg-gray-100 "
            }`
          }
          end
        >
          Basic Information
        </NavLink>

        <NavLink
          to="/dashboard/settings/account-settings"
          className={({ isActive }) =>
            `flex items-center text-center mx-auto  p-3 font-[500] rounded-md transition-colors text-[14px] ${
              isActive ? " text-blue-600" : "text-[#212121] hover:bg-gray-100 "
            }`
          }
        >
          Account Settings
        </NavLink>

        <NavLink
          to="/dashboard/settings/career-recommendation"
          className={({ isActive }) =>
            `flex items-center mx-auto p-3 font-[500] rounded-md transition-colors text-[14px] ${
              isActive ? " text-blue-600" : "text-[#212121] hover:bg-gray-100 "
            }`
          }
        >
          Career Recommendation
        </NavLink>

        <NavLink
          to="/dashboard/settings/school-information"
          className={({ isActive }) =>
            `flex items-center mx-auto p-3 font-[500] rounded-md transition-colors text-[14px] ${
              isActive ? " text-blue-600" : "text-[#212121] hover:bg-gray-100 "
            }`
          }
        >
          School Information
        </NavLink>

        <NavLink
          to="/dashboard/settings/payment"
          className={({ isActive }) =>
            `flex items-center mx-auto p-3 font-[500] rounded-md transition-colors text-[14px] ${
              isActive ? " text-blue-600" : "text-[#212121] hover:bg-gray-100 "
            }`
          }
        >
          Payment/Bills
        </NavLink>
      </nav>
    </div>
  );
};

export default SideBar;
