import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import resetIcon from "../../assets/resetRediret.svg"
import Header from '../../components/Header';

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
  const {error, isLoading, verifyEmailToken, setError} = useAuth()
  const [token, setToken]  = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")



useEffect(()=> {
  const token  = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  if(!token || !email) {
    navigate('/login')
  } 
  setToken(token)
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
      setPasswordError("at least 8 characters, include uppercase and lowercase letters, numbers, and special characters.")
    }

    if (!isValidPassword(confirmPassword)) {
      setConfirmPasswordError("at least 8 characters, include uppercase and lowercase letters, numbers, and special characters.")
    }

    if (password !== confirmPassword) {
      setError("New password and confirm password should be the same!")
    }

    if (!isValidPassword(confirmPassword) || !isValidPassword(password) || password !== confirmPassword) {
      return
    }

    try {
      const response = await verifyEmailToken(
        token,
        email,
        password
      );
      if(response.status === 200) {
        setStatus(true)
        setTimeout(() => navigate('/login'), 8000)
      }
    } catch(err) {
        console.log(err)
    }
  };


  const resetInput = () => {
    setError("")
    setConfirmPasswordError("")
    setPasswordError("")
  } 


  // bg-gradient-to-br from-[#F1F5FF] via-white to-[#FFF7E6]

  // bg-gradient-to-br from-[#F1F5FF] via-white to-[#FFF7E6]
   

  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-blue-50 via-blue-25 to-amber-50">
      <Header />
      {
        status ? (
          <div className='flex flex-col items-center p-[20px] gap-y-[20px] mt-10'>
            <div className=''>
              <img src={resetIcon} />
            </div>
            <p className='text-[#4C4E53]'>
              Your password has been reset successfully, <span className="text-[#004085]">you will be redirected in few seconds...</span>
            </p>
          </div>
        ) : (
          <div className="mx-auto mt-[60px] w-[600px] space-y-5 p-10 bg-white rounded-lg shadow-lg">
            <div className="mx-auto space-y-2">
              <h2 className="text-2xl text-[#101828]">
                Reset password
              </h2>
            </div>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="space-y-6 flex flex-col"
            >
              {error && (
                <div className="bg-red-50 text-red-500 p-3 rounded">{error}</div>
              )}
              {status && (
                <div className="bg-green-50 text-green-500 p-3 rounded">
                  Password reset successful. Redirecting...
                </div>
              )}
              <div>
                <label htmlFor="password" className="block text-[16px] font-[600] text-[#101828]">
                  Enter New password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="mt-1 block w-full rounded-xl border border-[#000000] p-3"
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
                  className="block text-[16px] font-[600] text-[#101828]"
                >
                  Confirm new password
                </label>
                <div className="relative">
                  <input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    className="mt-1 block w-full rounded-xl border border-[#000000] p-3"
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
                className="w-[40%] mx-auto py-2 px-4 bg-[#004085] hover:bg-blue-700 text-white rounded-[30px] disabled:opacity-50"
              >
                {isLoading ? <BeatLoader /> : "Update Password"}
              </button>
            </form>
          </div>
        )
      }
    </div>
  );
};

export default ResetPassword;
