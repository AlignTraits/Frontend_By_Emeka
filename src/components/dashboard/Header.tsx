// import React from 'react';
import { useAuth } from '../../contexts/useAuth';
import { 
  // FiBell, 
  FiSearch, 
  FiUser,
  FiMenu,
  // FiArrowLeft

} from 'react-icons/fi';
import { useLocation } from 'react-router-dom';

const Header = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user, pageDesc, setSearchAllTerm, searchAllTerm } = useAuth();

  const location = useLocation()

  return (
    <div className="relative bg-[white] border-[0.4px] border-y-[#E0E0E0] py-4 px-5 sticky top-0 z-10 w-full overflow-hidden">
      <FiMenu className="absolute left-0 top-0 translate-x-1/2 translate-y-full my-auto xl:hidden" onClick={()=>setOpen(true)} />
      <div className="flex items-center justify-between lg:gap-3 relative">
        <div className="flex items-center xl:justify-between lg:gap-3 xl:gap-5">
          <div className="space-y-2">
            <h1 className="text-xl font-medium text-[#004085]">
              {pageDesc?.title}
            </h1>
            <p className="text-[12px] lg:text-sm text-[#00408533] font-semibold">
              {pageDesc?.desc}
            </p>
          </div>
        </div>

        {
          location.pathname.startsWith("/dashboard/school") && 
          <div className="w-[400px] h-[40px] mx-auto">
            <input
              type="text"
              placeholder="Search"
              value={searchAllTerm}
              onChange={(e) => setSearchAllTerm(e.target.value)}
              className="w-full py-2 px-10 rounded-md font-semibold border-[1px] border-[#DDDDDD] focus:outline-none focus:border-[#757575] text-[14px] font-[400] text-[#8F8F8F]"
            />
            <FiSearch className="absolute left-2 top-[20px] -translate-y-1/2 text-[#999999] w-5 h-5" />
          </div>
        }
        

        <div className="flex items-center lg:space-x-2">
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
      </div>
    </div>
  );
};

export default Header;
