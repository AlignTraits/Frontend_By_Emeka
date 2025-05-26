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
      <div className='flex flex-col items-center p-[20px] gap-y-[20px] mt-10'>
        <div className=''>
          <img src={resetIcon} />
        </div>
        <p className='text-[#4C4E53]'>
          You have logged in successfully, <span className="text-[#004085]">you will be redirected in few seconds...</span>
        </p>
      </div>
    </div>
  );
};

export default GoogleAuthSuccess;
