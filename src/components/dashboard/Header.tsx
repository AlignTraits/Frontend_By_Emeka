// import React from 'react';
import { useAuth } from '../../contexts/useAuth';
import { 
  FiBell, 
  FiSearch, 
  FiUser 
} from 'react-icons/fi';

const Header = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white border-2 border-[#E0E0E0] px-10 py-5 xl:px-[4rem] sticky top-0 z-10 w-full overflow-hidden">
      <div className="flex items-center justify-between lg:gap-2 xl:gap-0">
        {/* Welcome Message */}
        <div className="flex items-center">
          <div>
            <h1 className="text-xl font-semibold text-[#004085]">
              Hello, {user?.firstName || "User"}
            </h1>
            <p className="text-sm text-[#00408533]">
              Welcome to your dashboard
            </p>
          </div>
        </div>

        <div className="relative w-96">
          <input
            type="text"
            placeholder="Explore careers / schools..."
            className="w-full pl-5 pr-4 py-2 rounded-lg border border-[#007BFF] focus:outline-none focus:border-blue-500 text-[16px] font-[500]"
          />
          <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        <div className="flex items-center space-x-4">
          <button className="flex items-center px-4 py-2 bg-[#004085] text-white rounded-lg hover:bg-blue-700 transition-colors w-[220px]">
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

          <div className="flex items-center space-x-2">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              {user?.image ? (
                <img
                  src={user.image}
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
