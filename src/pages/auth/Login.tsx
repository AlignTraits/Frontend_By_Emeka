import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/useAuth'
import { LoginCredentials, } from '../../types/auth.types'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import Header from '../../components/Header';
import imgReset from "../../assets/imgReset.png"
import traitText from "../../assets/traitstext.svg"
// import {setToken} from '../../services/auth.service'
import BeatLoader from 'react-spinners/BeatLoader'
import { GOOGLE_AUTH_URL } from '../../constants/auth.constant'
// import { AxiosError } from 'axios'

export default function Login() {
  const { login, isLoading, error } = useAuth()
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const status = await login(credentials.email, credentials.password);

      if (status === 200) {
        navigate("/dashboard");
      } else if (status === 800) {
        navigate("/onboarding-form")
      } else {
        console.error("Unexpected status:", status);
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const isFormValid = () => {
    return credentials.email.trim() !== '' && credentials.password.trim() !== ''
  }

  return (
    <div className="relative h-screen w-full bg-[#FCFCFD]">
      <Header />
      <div className='flex gap-x-[30px] bg-[white] p-[20px] pl-[100px]'>
        <div className="w-[50%] space-y-5 p-8">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold">
              Welcome back
            </h2>
            <p className='text-[#757575] text-[12px] font-medium'>Log in to your Aligntraits account</p>
          </div>
          {error && (
            <p className="text-[#E33629] text-[12px] mt-1">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-[16px] font-[600]">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="mt-1 w-[500px] h-14 px-4 py-3 border-[1px] border-[#ccc] rounded-full bg-white shadow-md focus:outline-none"
                style={{
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)'
                }}
                placeholder="Enter your email address"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
              />
            </div>

            <div className='w-[500px]'>
              <label htmlFor="password" className="block text-[16px] font-[600]">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="mt-1 w-[500px] h-14 px-4 py-3 rounded-full bg-white border-[1px] border-[#ccc] shadow-md focus:outline-none"
                  style={{
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)'
                  }}
                  placeholder="Enter your Password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-[#004085] "
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end w-[500px]">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading || !isFormValid()}
              className="w-[500px] h-14 rounded-full flex items-center justify-center py-2 px-4 bg-[#004085] hover:bg-blue-700 text-white disabled:opacity-50"
            >
              {isLoading ? <BeatLoader   /> : "Login"}
            </button>

            <div className="text-center">
              <span className="text-[16px] font-[400] ">
                Have an account?{" "}
              </span>
              <button
                onClick={() => navigate("/signup")}
                className="text-[16px] text-[#007AFF] font-[700] underline"
              >
                signup
              </button>
            </div>

            <div className="mt-6">
              <div className="mt-6 flex gap-3 w-1/2 mx-auto">
                <button
                  type="button"
                  onClick={() => window.location.href = GOOGLE_AUTH_URL}
                  style={{
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)'
                  }}
                  className="w-full flex justify-center items-center gap-x-[10px] px-2 py-1 rounded-full border border-[#ccc] shadow-sm hover:bg-gray-50"
                >
                  <FcGoogle className="text-4xl" />
                  <p>Log in with Google</p>
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className='w-[50%] flex justify-center'>
          <div className='w-[100%] size-max bg-[#004085] rounded-xl flex flex-col gap-y-[15px] p-[30px] items-start'>
            <img src={traitText} alt='text' className='h-[25px] ml-[-10px]' />

            <p className='text-[20px] text-[white] font-semibold'>The simplest way to navigate your educational future</p>

            <p className='text-[white] text-[12px]'>Enter your credentials to access your account</p>

            <img src={imgReset} alt='reset Image' className='h-[350px] w-[100%]' />
          </div>
        </div>
      </div>
    </div>
  );
} 