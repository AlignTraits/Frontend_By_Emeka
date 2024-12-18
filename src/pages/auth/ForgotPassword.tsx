import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as authService from '../../services/auth.service'
import { AxiosError } from 'axios'
import BeatLoader from "react-spinners/BeatLoader";

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      await authService.forgotPasswordRequest(email);
      setSuccess(true);
    } catch (err: unknown) {
      setError(
        err instanceof AxiosError
          ? err.response?.data?.message
          : "An error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  }

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

        {success ? (
          <div className="text-center space-y-4">
            <div className="text-green-600">
              Check your email for reset instructions.
            </div>
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:underline"
            >
              Return to login
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
              <h2>Kindly enter your email to reset password.</h2>
              <div className="space-y-4">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="mt-1 block w-full rounded-xl border border-[#000000] p-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {error && (
                <div className="bg-red-50 text-red-500 p-3 rounded">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-[30%] mx-auto py-2 px-4 bg-[#004085] hover:bg-blue-700 text-white rounded-[30px] disabled:opacity-50"
              >
                {isLoading ? <BeatLoader /> : "SUBMIT"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
} 