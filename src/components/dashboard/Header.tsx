// import React from 'react';
import { useAuth } from '../../contexts/useAuth';
import { 
  FiBell, 
  FiSearch, 
  FiUser,
  FiMenu,
  FiArrowLeft

} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Header = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user } = useAuth();
  console.log(user)

  const navigate = useNavigate()

  const handleRecommendationClick = () => {
    navigate('/dashboard/pathfinder')
  }
  return (
    <div className="relative bg-gray-50 border-[0.4px] border-y-[#E0E0E0] pl-10 py-3 lg:pl-[2rem] xl:pl-[4rem] xl:pr-[2rem] sticky top-0 z-10 w-full overflow-hidden">
      <FiMenu className="absolute left-0 top-0 translate-x-1/2 translate-y-full my-auto xl:hidden" onClick={()=>setOpen(true)} />
      <div className="flex items-center justify-between lg:gap-3 relative">
        <FiArrowLeft onClick={() => navigate(-1)} className="absolute -left-10 -top-50 cursor-pointer" />
        {/* Welcome Message */}
        <div className="flex items-center xl:justify-between lg:gap-3 xl:gap-5">
          <div className="space-y-2">
            <h1 className="text-xl font-medium text-[#004085]">
              Hello, {user?.firstname || "User"}
            </h1>
            <p className="text-[12px] lg:text-sm text-[#00408533] font-semibold">
              Welcome to your dashboard
            </p>
          </div>
          <div className="relative lg:w-[15rem] xl:w-[16rem]">
            <input
              type="text"
              placeholder="Explore careers / schools..."
              className="w-full pl-5 pr-4 py-2 font-semibold  border border-[#007BFF] focus:outline-none focus:border-blue-500 text-[14px] font-[500]"
            />
            <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div className="flex  lg:space-x-4">
          <button onClick={handleRecommendationClick} className="px-4 py-2 bg-[#004085] text-[14px]  text-white rounded-lg hover:bg-blue-700 transition-colors w-[200px]">
            Career Recommendations
          </button>

          <button className="relative p-2 hover:bg-gray-100 rounded-full">
            <FiBell
              className="w-6 h-6 text-gray-600 
            fill-[#000000]"
            />
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </button>

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
    </div>
  );
};

export default Header;
