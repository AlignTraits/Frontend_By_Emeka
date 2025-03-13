// import React from 'react';
import { useAuth } from '../../contexts/useAuth';
import { 
  FiCalendar, 
  FiMenu,
} from 'react-icons/fi';
import { FaBell } from "react-icons/fa";
import { useLocation  } from "react-router-dom";

interface HeaderProps {
  setOpen:  React.Dispatch<React.SetStateAction<boolean>>

}

const Header = ({
  setOpen,

}: HeaderProps) => {
  const { admin } = useAuth();

  const location = useLocation()
  // const navigate = useNavigate()

  const RenderTitle = () => {
    if (location.pathname.endsWith("/add-course")) {
      return (
        <div className="space-y-2 basis-[60%]">
          <h1 className="text-xl font-semibold text-[#000000] ">
            Create New Courses
          </h1>
        </div>
        )
    }
    else if (location.pathname.startsWith("/admin/schools")) {
      return (
        <div className="space-y-2 basis-[60%]">
          <h1 className="text-xl font-semibold text-[#000000] ">
            Schools
          </h1>
          <p className="text-[12px] lg:text-sm text-[#638AB6] font-medium">
            Monitor student responses and track their progress in real time.
          </p>
        </div>
      )
    } else if (location.pathname.startsWith("/admin/accounts")) {
      return (
        <div className="space-y-2 basis-[60%]">
          <h1 className="text-xl font-semibold text-[#000000] ">
            Accounts
          </h1>
          <p className="text-[12px] lg:text-sm text-[#638AB6] font-medium">
            Monitor student responses and track their progress in real time.
          </p>
        </div>
        )
    } 
    else {
      return (
        <div className="space-y-2 basis-[60%]">
          <h1 className="text-xl font-semibold text-[#000000] ">
            Hello, {admin?.username || "User"}
          </h1>
          <p className="text-[12px] lg:text-sm text-[#638AB6] font-medium">
            Monitor student responses and track their progress in real time.
          </p>
        </div>
      )
    } 
  }

  return (
    <div className="relative bg-[#FAFAFA] border-[0.4px] border-y-[#E0E0E0] pl-5 py-3  sticky top-0 z-10 w-full overflow-hidden">
      <FiMenu
        className="absolute left-0 top-0 translate-x-1/2 translate-y-full my-auto lg:hidden"
        onClick={() => setOpen(true)}
      />
      <div className="flex items-center justify-between lg:gap-5 relative">
        {/* <FiArrowLeft onClick={() => navigate(-1)} className="absolute -left-8 -top-50 cursor-pointer" /> */}
        {/* Welcome Message */}
        <RenderTitle />
        <div className='flex gap-5 mr-[50px]'>
          <div className="flex h-[45px] w-[150px] gap-2 border-[#DDDDDD] rounded-lg border-2 flex items-center justify-center">
            <FiCalendar className="w-6 h-6"  />
            <p className="text-sm font-medium text-gray-900 my-auto">
              {Date().slice(3, 15)}
            </p>
          </div>

          <div className='flex h-[45px] w-[45px] border-[#DDDDDD] rounded-[50%] border-2 flex items-center justify-center'>
            <FaBell className="w-6 h-6" />
          </div>
        </div>
  
      </div>
    </div>
  );
};

export default Header;
