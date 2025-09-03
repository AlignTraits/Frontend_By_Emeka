// import React from 'react';
import { useAuth } from '../../contexts/useAuth';
import { 
  // FiBell, 
  FiUser,
  FiMenu,
  // FiArrowLeft

} from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user, pageDesc } = useAuth();

  const location = useLocation();
  const navigate = useNavigate()

  return (
    <div className="relative bg-[white] border-[0.4px] border-y-[#E0E0E0] py-4 px-5 sticky top-0 z-10 w-full overflow-hidden border-b border-b-[#DDDDDD] bg-white shadow-md sm:rounded-md">
      <div className="flex items-center justify-between lg:gap-3 relative">
        <div className="hidden lg:flex items-center xl:justify-between lg:gap-3 xl:gap-5">
          <div className="space-y-2">
            <h1 className="text-xl font-medium text-[#004085]">
              {pageDesc?.title}
            </h1>
            <p className="text-[12px] lg:text-sm text-[#00408533] font-semibold">
              {pageDesc?.desc}
            </p>
          </div>
        </div>

        <div className="items-center gap-x-[10px] flex lg:hidden lg:space-x-2">
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
            {user?.image ? (
              <img
                src={user.image as string}
                alt="Profile"
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <FiUser className="w-6 h-6 text-gray-600" />
            )}
          </div>
          <div className="">
            <p className="text-sm font-medium text-gray-900">
              {user?.firstname} {user?.lastname}
            </p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>

        

        <div className="items-center hidden lg:flex  lg:space-x-2">
          {
            location.pathname.startsWith("/dashboard/") && 
            <div className="w-[400px] h-[40px] hidden lg:flex justify-end w-[350px] bg-red lg:px-20">
              <button onClick={() => navigate("/career-recommedation")} className="bg-[#004085] h-[40px] w-[90%] lg:w-[180px] font-semibold text-[12px] text-[white] rounded-md">
                Career Recommendation
              </button>
            </div>
          }
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              {user?.firstname} {user?.lastname}
            </p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
            {user?.image ? (
              <img
                src={user.image as string}
                alt="Profile"
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <FiUser className="w-6 h-6 text-gray-600" />
            )}
          </div>
        </div>

        <FiMenu className="lg:hidden" onClick={()=>setOpen(true)} />
      </div>
    </div>
  );
};

export default Header;
