import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import resetIcon from "../../assets/resetRediret.svg"
import Header from '../../components/Header';
import * as authService from "../../services/auth.service";
import {useAuth} from "../../contexts/useAuth";


// import { verifyEmail } from "../../services/auth.service";

  const GoogleAuthSuccess: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setToken } = useAuth();

  useEffect(() => {
    const handleAuth = async () => {
      const query = new URLSearchParams(location.search);
      const token = query.get("token");

      if (token) {
        try {
          setToken(token); // assuming this sets cookie synchronously
          await authService.setToken(token); // assuming this sets cookie asynchronously
          setTimeout(() => {
            navigate("/dashboard");
          }, 3000);
        } catch (err) {
          console.error("Failed to set token:", err);
        }
      }
    };

    handleAuth();
  }, [location, navigate]);

  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-[#CCE0F5] via-[#e9eff7] to-white">
      <Header />
      <div className="flex flex-col items-center p-4 sm:p-6 lg:p-8 gap-y-4 sm:gap-y-6 lg:gap-y-8 mt-6 sm:mt-8 lg:mt-10">
        <div className="">
          <img 
            src={resetIcon} 
            alt="Success Icon" 
            className="w-40 h-40 lg:w-60 lg:h-60"
          />
        </div>
        <p className="text-sm sm:text-base lg:text-lg text-[#4C4E53] text-center px-2 sm:px-4 leading-relaxed max-w-md mx-auto">
          You have logged in successfully, <span className="text-[#004085]">you will be redirected in few seconds...</span>
        </p>
      </div>
    </div>
  );
};

export default GoogleAuthSuccess;
