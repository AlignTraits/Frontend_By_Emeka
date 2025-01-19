// import React from 'react';
import { useAuth } from '../../contexts/useAuth';
import { 

  FiCalendar, 
  FiUser,
  FiMenu 

} from 'react-icons/fi';

interface HeaderProps {
  setOpen:  React.Dispatch<React.SetStateAction<boolean>>

}

const Header = ({
  setOpen,

}: HeaderProps) => {
  const { admin } = useAuth();
  
// console.log(data)
  return (
    <div className="relative bg-gray-50 border-[0.4px] border-y-[#E0E0E0] pl-10 py-3  sticky top-0 z-10 w-full overflow-hidden">
      <FiMenu
        className="absolute left-0 top-0 translate-x-1/2 translate-y-full my-auto lg:hidden"
        onClick={() => setOpen(true)}
      />
      <div className="flex items-center justify-between lg:gap-5">
        {/* Welcome Message */}
        <div className="space-y-2 basis-[60%]">
          <h1 className="text-xl font-semibold text-[#000000] ">
            Hello, {admin?.username || "User"}🔥
          </h1>
          <p className="text-[12px] lg:text-sm text-[#638AB6] font-medium">
            Monitor student responses and track their progress in real time.
          </p>
        </div>

        <div className="flex items-center lg:space-x-2 basis-[40%]">
          <div className="flex  text-right gap-2 pr-10 border-r-[2px] border-[#004085] ">
            <p className="text-sm font-medium text-gray-900 my-auto">
              {Date().slice(3, 15)}
            </p>
            <span className="h-10 w-10 rounded-full bg-[#F2F2F2] flex items-center justify-center">
              <FiCalendar />
            </span>
          </div>
          <div className="flex items-center gap-2 pl-10">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              {admin?.image ? (
                <img
                  src={admin.image}
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <FiUser className="w-6 h-6 text-gray-600" />
              )}
            </div>
            <span className="text-[#000000] text-[16px] font-semibold">
              {admin?.username}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
