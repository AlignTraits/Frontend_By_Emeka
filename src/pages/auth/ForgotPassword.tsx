import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as authService from '../../services/auth.service'
import { AxiosError } from 'axios'

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
      await authService.forgotPassword(email);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center">Reset your password</h2>

        {success ? (
          <div className="text-center space-y-4">
            <div className="text-green-600">
              Check your email for reset instructions.
            </div>
            <button
              onClick={() => navigate('/auth/login')}
              className="text-blue-600 hover:underline"
            >
              Return to login
            </button>
          </div>
        ) : (
          <>
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50"
              >
                {isLoading ? 'Sending...' : 'Send reset instructions'}
              </button>
            </form>

            <div className="text-center">
              <button
                onClick={() => navigate('/login')}
                className="text-sm text-blue-600 hover:underline"
              >
                Back to login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
} 