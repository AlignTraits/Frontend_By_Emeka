import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';
import { useNavigate } from 'react-router-dom';
import PathfinderIcon from '../../assets/dashboard/icons/PathfinderIcon.svg'
import Logo from '../../assets/Logo.svg'
import {
  FiBook,
  FiSettings,
  FiChevronDown,
  FiShoppingBag,
  FiSearch,
  FiBookOpen,
  FiShoppingCart,
  FiShare2,
  FiGlobe,
FiGrid,
FiLogOut,
FiList
} from 'react-icons/fi';


const SideBar = () => {
  const [learningOpen, setLearningOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="w-64 h-screen bg-[#F7FAFF] shadow-md px-4 py-10 fixed left-0 top-0 flex flex-col sticky top-0">
      {/* Logo */}
      <div className="flex mb-8">
        <img src={Logo} alt="AlignTraits Logo" />
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-4 flex-grow">
        <Link
          to="/dashboard"
          className="flex items-center p-3 text-[#212121] font-[500] rounded-md hover:bg-gray-100 transition-colors"
        >
          <FiGrid className="w-5 h-5 mr-3" />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/pathfinder"
          className="flex items-center p-3 text-[#212121] font-[500] rounded-md hover:bg-gray-100 transition-colors"
        >
          <img
            src={PathfinderIcon}
            alt="AlignTraits Pathfinder"
            className="w-5 h-5 mr-3"
          />
          <span>Pathfinder</span>
        </Link>

        {/* Learning Dropdown */}
        <div className="relative">
          <button
            onClick={() => setLearningOpen(!learningOpen)}
            className="flex items-center w-full p-3 text-[#212121] font-[500] rounded-md hover:bg-gray-100 transition-colors"
          >
            <FiBookOpen className="w-5 h-5 mr-3" />
            <span>Learning</span>
            <FiChevronDown
              className={`w-5 h-5 ml-auto transition-transform duration-200 ${
                learningOpen ? "transform rotate-180" : ""
              }`}
            />
          </button>
          {learningOpen && (
            <div className="pl-4 mt-2 space-y-4">
              <Link
                to="/store"
                className="flex items-center p-3 text-[#212121] font-[500] rounded-md hover:bg-gray-100 transition-colors"
              >
                <FiShoppingBag className="w-5 h-5 mr-3" />
                <span>Store</span>
              </Link>
              <Link
                to="/search"
                className="flex items-center p-3 text-[#212121] font-[500] rounded-md hover:bg-gray-100 transition-colors"
              >
                <FiSearch className="w-5 h-5 mr-3" />
                <span>Search</span>
              </Link>
              <Link
                to="/library"
                className="flex items-center p-3 text-[#212121] font-[500] rounded-md hover:bg-gray-100 transition-colors"
              >
                <FiBook className="w-5 h-5 mr-3" />
                <span>Library</span>
              </Link>
              <Link
                to="/task"
                className="flex items-center p-3 text-[#212121] font-[500] rounded-md hover:bg-gray-100 transition-colors"
              >
                <FiList className="w-5 h-5 mr-3" />
                <span>Task</span>
              </Link>
              <Link
                to="/basket"
                className="flex items-center p-3 text-[#212121]  font-[500] rounded-md hover:bg-gray-100 transition-colors"
              >
                <FiShoppingCart className="w-5 h-5 mr-3" />
                <span>Basket</span>
              </Link>
            </div>
          )}
        </div>

        <Link
          to="/community"
          className="flex items-center p-3 text-[#212121] font-[500] rounded-md hover:bg-gray-100 transition-colors"
        >
          <FiShare2 className="w-5 h-5 mr-3" />
          <span>AlignTraits</span>
        </Link>

        <Link
          to="/community"
          className="flex items-center p-3 text-[#212121] font-[500] rounded-md hover:bg-gray-100 transition-colors"
        >
          <FiGlobe className="w-5 h-5 mr-3" />
          <span>Community</span>
        </Link>

        <Link
          to="/settings"
          className="flex items-center p-3 text-[#212121] font-[500] rounded-md hover:bg-gray-100 transition-colors"
        >
          <FiSettings className="w-5 h-5 mr-3" />
          <span>Settings</span>
        </Link>
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center p-3 text-[#212121] rounded-md hover:bg-red-50 hover:text-red-500 transition-colors mt-auto"
      >
        <FiLogOut className="w-5 h-5 mr-3" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default SideBar;
