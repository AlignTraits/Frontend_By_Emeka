import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAuth } from "../../contexts/useAuth";
import { BeatLoader } from "react-spinners";
// import { verifyEmail } from "../../services/auth.service";

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<boolean>(false);
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
const {error, isLoading, verifyEmailToken} = useAuth()
const [token, setToken]  = useState<string>('')
const [email, setEmail] = useState<string>('')



useEffect(()=> {
  const token  = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  if(!token || !email) {
    navigate('/login')
  } 
  setToken(token)
  setEmail(email)
    
}, [searchParams, navigate])

   

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
     
      const response = await verifyEmailToken(
        token,
        email,
        password
      );
      console.log(response)
      if(response.status === 200) {
        setStatus(true)
        setTimeout(() => navigate('/login'), 3000)
      }
      
      console.log(response);
    };

   

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7FAFF]">
      <div className="max-w-2xl w-full space-y-12 p-10 bg-white rounded-xl shadow">
        <div className="mx-auto space-y-2">
          <h2 className="text-3xl font-bold text-center">
            Forget your password?
          </h2>
          <p className="text-center text-[16px]">
            Don’t worry, it happens.{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[16px] text-[#007AFF] font-[500] underline"
            >
              Login
            </span>
          </p>
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="space-y-6 flex flex-col"
        >
          <h2>Kindly enter your email to reset password.</h2>
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded">{error}</div>
          )}
          {status && (
            <div className="bg-green-50 text-green-500 p-3 rounded">
              Password reset successful. Redirecting...
            </div>
          )}
          <div>
            <label htmlFor="password" className="block text-[16px] font-[600]">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                className="mt-1 block w-full rounded-xl border border-[#000000] p-3"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#004085] "
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-[16px] font-[600]"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                required
                className="mt-1 block w-full rounded-xl border border-[#000000] p-3"
                placeholder="Enter your Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#004085] "
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-[30%] mx-auto py-2 px-4 bg-[#004085] hover:bg-blue-700 text-white rounded-[30px] disabled:opacity-50"
          >
            {isLoading ? <BeatLoader /> : "SUBMIT"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
