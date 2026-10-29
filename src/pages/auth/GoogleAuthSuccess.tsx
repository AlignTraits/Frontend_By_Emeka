import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import resetIcon from "../../assets/resetRediret.svg"
import Header from '../../components/Header';
import * as authService from "../../services/auth.service";
import { useAuth } from "../../contexts/useAuth";

// Google sends people back to /auth/success#code=... with a one time code.
// The code is read, removed from the address at once (so it never reaches
// analytics or browser history), and swapped for a login token with a POST.
// The login token itself is never put in a web address.
const GoogleAuthSuccess: React.FC = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [failed, setFailed] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const code = new URLSearchParams(window.location.hash.replace(/^#/, "")).get("code");
    // Clear the code from the address bar before doing anything else.
    window.history.replaceState(null, "", "/auth/success");

    if (!code) {
      setFailed(true);
      return;
    }

    (async () => {
      try {
        const result = await authService.exchangeGoogleCode(code);
        const token = result?.data?.token;
        if (!token) throw new Error("No token");
        authService.setToken(token);
        setToken(token);
        navigate("/dashboard", { replace: true });
      } catch (err) {
        setFailed(true);
      }
    })();
  }, [navigate, setToken]);

  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-[#CCE0F5] via-[#e9eff7] to-white">
      <Header />
      <div className="flex flex-col items-center p-4 sm:p-6 lg:p-8 gap-y-4 sm:gap-y-6 lg:gap-y-8 mt-6 sm:mt-8 lg:mt-10">
        <div className="">
          <img
            src={resetIcon}
            alt=""
            className="w-40 h-40 lg:w-60 lg:h-60"
          />
        </div>
        {failed ? (
          <p role="alert" className="text-sm sm:text-base lg:text-lg text-[#4C4E53] text-center px-2 sm:px-4 leading-relaxed max-w-md mx-auto">
            This sign in link has expired.{" "}
            <Link to="/login" className="text-[#004085] underline">Please sign in again</Link>.
          </p>
        ) : (
          <p className="text-sm sm:text-base lg:text-lg text-[#4C4E53] text-center px-2 sm:px-4 leading-relaxed max-w-md mx-auto">
            Signing you in, <span className="text-[#004085]">one moment...</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default GoogleAuthSuccess;
