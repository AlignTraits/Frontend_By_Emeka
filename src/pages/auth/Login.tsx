import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/useAuth'
import { LoginCredentials } from '../../types/auth.types'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook, FaApple } from 'react-icons/fa'
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
    e.preventDefault()
    try {
      await login(credentials.email, credentials.password)
      navigate('/dashboard')
    } catch (err) {
      // Error is already handled by AuthContext
      // You can add additional UI feedback here if needed
      console.error('Login failed:', err)
    }
  }

  const isFormValid = () => {
    return credentials.email.trim() !== '' && credentials.password.trim() !== ''
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7FAFF]">
      <div className="max-w-xl w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-center">
            Login To Your Account
          </h2>

          <div className="text-center">
            <span className="text-[16px] font-[400] ">
              Don't have an account?{" "}
            </span>
            <button
              onClick={() => navigate("/signup")}
              className="text-[16px] text-[#007AFF] font-[700] underline"
            >
              signup
            </button>
          </div>
        </div>
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-[16px] font-[600]">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-1 block w-full rounded-xl border border-[#000000] p-3"
              placeholder="Enter your email address"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
            />
          </div>

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
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
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

          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={() => navigate("/auth/forgot-password")}
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading || !isFormValid()}
            className="w-1/4 mx-auto flex justify-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50"
          >
            {isLoading ? "loging in..." : "LOGIN"}
          </button>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  More Sign-In Options
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-3 w-1/2 mx-auto">
              <button
                type="button"
                onClick={() => {
                  /* Add Google sign-in logic */
                }}
                className="w-full flex justify-center items-center px-2 py-4 border border-[#007AFF] shadow-sm rounded-2xl hover:bg-gray-50"
              >
                <FcGoogle className="text-4xl" />
              </button>

              <button
                type="button"
                onClick={() => {
                  /* Add Facebook sign-in logic */
                }}
                className="w-full flex justify-center items-center px-2 py-4 border border-[#007AFF] shadow-sm rounded-2xl hover:bg-gray-50"
              >
                <FaFacebook className="text-4xl text-[#1877F2]" />
              </button>

              <button
                type="button"
                onClick={() => {
                  /* Add Apple sign-in logic */
                }}
                className="w-full flex justify-center items-center px-2 py-4 border border-[#007AFF] shadow-sm rounded-2xl hover:bg-gray-50"
              >
                <FaApple className="text-4xl" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 