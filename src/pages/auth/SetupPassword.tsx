import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from '../../components/Header';
import { toast } from 'react-toastify'

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAuth } from "../../contexts/useAuth";
import { BeatLoader } from "react-spinners";
import { signUpTwo } from '../../services/auth.service'
// import { verifyEmail } from "../../services/auth.service";

interface SetupPasswordProps {
  title: string
}
  const SetupPassword = ({title}: SetupPasswordProps) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const {error, setError} = useAuth()
  const [email, setEmail] = useState<string>('')

  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")
  const [isLoading, setIsLoading] = useState(false)



useEffect(()=> {
  const email = searchParams.get("email") || "";

  if(!email) {
    navigate('/login')
  } 
  setEmail(email)
    
}, [searchParams, navigate])

  function isValidPassword(password: string): boolean {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&^])[A-Za-z\d@$!%*?#&^]{8,}$/;
    return passwordRegex.test(password);
  }

   

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidPassword(password)) {
      return setPasswordError("at least 8 characters, include uppercase and lowercase letters, numbers, and special characters.")
    }

    if (!isValidPassword(confirmPassword)) {
      return setConfirmPasswordError("at least 8 characters, include uppercase and lowercase letters, numbers, and special characters.")
    }

    if (password !== confirmPassword) {
      return setError("New password and confirm password should be the same!")
    }

    if (!isValidPassword(confirmPassword) || !isValidPassword(password) || password !== confirmPassword) {
      return
    }

    try {
      setIsLoading(true)
      const status = await signUpTwo({email: email, password: confirmPassword});

      return status;

    } catch (err:any) {
      console.error("Login failed:", err);
      if (err?.response?.status === 403) {
        // setError(err?.response?.data?.message || "Verify your email to continue");
        toast.success("Check your email to verify your account")
        return navigate("/login");
      }
      setError(err?.message);
    } finally {
      setIsLoading(false);
    }
  };


  const resetInput = () => {
    setError("")
    setConfirmPasswordError("")
    setPasswordError("")
  } 
   

  return (
<div className="relative min-h-screen w-full bg-gradient-to-br from-[#CCE0F5] via-[#e9eff7] to-white">
      <Header />

      <div className="mx-auto mt-[40px] md:mt-[80px] w-full max-w-[600px] px-4 md:px-0">
        <div className="space-y-5 p-6 md:p-10 md:bg-white rounded-lg md:shadow-lg md:border-[#ccc] md:border-[1px]">
          <div className="mx-auto space-y-2 mb-10 md:mb-0">
            <h2 className="text-xl md:text-2xl text-[#101828] text-center md:text-left font-semibold">
              {title}
            </h2>
          </div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="space-y-8 flex flex-col"
          >
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded text-sm">{error}</div>
            )}
            <div>
              <label htmlFor="password" className="block text-[14px] md:text-[16px] font-[600] text-[#101828]">
                Enter New password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="mt-1 w-full h-12 px-4 py-3 border-[1px] border-[#ccc] rounded-xl bg-white shadow-md focus:outline-none text-sm md:text-base"
                  placeholder="Enter your new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={resetInput}
                />
                {passwordError && <p className="mt-1 text-[#E33629] font-normal italic text-[10px]">{passwordError}</p>}
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
                className="block text-[14px] md:text-[16px] font-[600] text-[#101828]"
              >
                Confirm new password
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  className="mt-1 w-full h-12 px-4 py-3 border-[1px] border-[#ccc] rounded-xl bg-white shadow-md focus:outline-none text-sm md:text-base"
                  placeholder="Re-enter your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={resetInput}
                />
                {confirmPasswordError && <p className="mt-1 text-[#E33629] font-normal italic text-[10px]">{confirmPasswordError}</p>}
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
              className="w-full h-12 mx-auto py-2 px-4 bg-[#004085] hover:bg-blue-700 text-white rounded-xl disabled:opacity-50"
            >
              {isLoading ? <BeatLoader /> : "Update Password"}
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default SetupPassword;
