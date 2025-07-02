
import { NavLink, useLocation  } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import Logo from "../../assets/logo.svg";
import { FiGrid, FiLogOut, FiX } from "react-icons/fi";
// import { MdKeyboardArrowDown } from "react-icons/md";
// import { CgProfile } from "react-icons/cg";
import { BsPersonFillUp } from "react-icons/bs";
import { IoSchoolSharp } from "react-icons/io5";
import { CgGym } from "react-icons/cg";
import { GiProgression } from "react-icons/gi";
import { IoSettingsSharp } from "react-icons/io5";
// import { IoPersonOutline } from "react-icons/io5";
// import { MdOutlineSecurity } from "react-icons/md";
// import { HiAcademicCap } from "react-icons/hi";


const NewSidebar = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { logout } = useAuth();
  // const navigate = useNavigate();
  const location = useLocation()

  const handleLogout = async () => {
    try {
      await logout();
      // navigate("/admin/login");
      window.location.href = '/login'
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  let careerPath:boolean = location.pathname.startsWith("/dashboard/career-pathway")
  let schoolPath:boolean = location.pathname.startsWith("/dashboard/school")
  let skillRoadMapPath:boolean = location.pathname.startsWith("/dashboard/skill-roadmap")
  let progressTrackerPath:boolean = location.pathname.startsWith("/dashboard/progres-tracker")
  let accountPath:boolean = location.pathname.startsWith("/dashboard/settings")
  // let profilePath:boolean = location.pathname.startsWith("/dashboard/profile")
  // let recordPath:boolean = location.pathname.startsWith("/dashboard/records")
  // let securityPath:boolean = location.pathname.startsWith("/dashboard/security")
  // let profilePath:boolean = location.pathname.startsWith("/admin/profile")


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
      <div className="flex mx-auto mb-8 relative right-5 w-[150px] border-b-[4px] w-[200px] pb-[10px]">
        <img src={Logo} alt="AlignTraits Logo" />
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-5">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center p-2 font-bold rounded-md transition-colors ${
              isActive ? "text-white bg-[#004085]" : "text-[#5D5D5B] hover:bg-gray-100"
            }`
          }
          end
        >
          <FiGrid className="w-5 h-5 mr-3" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to={"/dashboard/career-pathway"}
          className={({ isActive }) =>
            `flex items-center p-2 font-bold rounded-md transition-colors ${
              isActive || careerPath ? "text-white bg-[#004085]" : "text-[#5D5D5B] hover:bg-gray-100"
            }`
          }
          end
        >
          <BsPersonFillUp className="w-5 h-5 mr-3"  />
          <span className={careerPath ? "text-white bg-[#004085]" : "text-[#5D5D5B]"}>
            Career Pathway
          </span>
        </NavLink>

        <NavLink
          to="/dashboard/school"
          className={({ isActive }) =>
            `flex items-center p-2 font-bold rounded-md transition-colors ${
              isActive || schoolPath ? "text-white bg-[#004085]" : "text-[#5D5D5B] hover:bg-gray-100"
            }`
          }
          end
        >
          <IoSchoolSharp className="w-5 h-5 mr-3"  />
          <span className={schoolPath ? "text-white bg-[#004085]" : "text-[#5D5D5B]"}>
            School
          </span>
        </NavLink>

        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            `flex items-center p-2 font-bold rounded-md transition-colors ${
              isActive || accountPath ? "text-white bg-[#004085]" : "text-[#5D5D5B] hover:bg-gray-100"
            }`
          }
          end
        >
          <IoSettingsSharp className="w-5 h-5 mr-3"  />
          <span className={accountPath ? "text-white bg-[#004085]" : "text-[#5D5D5B]"}>
            Account Settings
          </span>
        </NavLink>
        
        
        <NavLink
          to="/dashboard/skill-roadmap"
          className={({ isActive }) =>
            `flex items-center p-2 font-bold rounded-md transition-colors ${
              isActive || skillRoadMapPath ? "text-white bg-[#004085]" : "text-[#5D5D5B] hover:bg-gray-100"
            }`
          }
          end
        >
          <CgGym className="w-5 h-5 mr-3" />
          <span className={skillRoadMapPath ? "text-white bg-[#004085]" : "text-[#5D5D5B]"}>
            Skill Roadmap
          </span>
        </NavLink>


        <NavLink
          to="/dashboard/progres-tracker"
          className={({ isActive }) =>
            `flex items-center p-2 font-bold rounded-md transition-colors ${
              isActive || progressTrackerPath ? "text-white bg-[#004085]" : "text-[#5D5D5B] hover:bg-gray-100"
            }`
          }
          end
        >
          <GiProgression className="w-5 h-5 mr-3" />
          <span className={progressTrackerPath ? "text-white bg-[#004085]" : "text-[#5D5D5B]"}>
            Progress Tracker
          </span>
        </NavLink>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center p-2 text-[#5D5D5B] font-bold rounded-md hover:bg-red-50 hover:text-red-500 transition-colors"
        >
          <FiLogOut className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </nav>

    </div>
  );
};

export default NewSidebar;
