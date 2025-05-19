import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import * as authService from '../../services/auth.service'
import resetIcon from "../../assets/resetRediret.svg"
import { AxiosError } from 'axios'
import BeatLoader from "react-spinners/BeatLoader";
import Header from '../../components/Header';
import resetImage from "../../assets/resetImage.svg"
import traitText from "../../assets/traitstext.svg"

export default function ForgotPassword() {
  // const navigate = useNavigate()
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

  // const handletest = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setIsLoading(true)
  //   setTimeout(() => {
  //     setIsLoading(false)
  //     setSuccess(true)
  //   }, 3000)
  // }

  return (
    <div className="relative h-screen w-full bg-[#FCFCFD]">
      <Header />

      {
        success ? (
          <div className='flex flex-col items-center bg-[white] p-[20px] gap-y-[20px] mt-10'>
            <div className=''>
              <img src={resetIcon} />
            </div>
            <p className='text-[#4C4E53]'>We’ve sent an email to <span className='text-[#101828]'>{email}</span> with a link to get back into your account.</p>
          </div>
        ) : (
        <div className='flex justify-between bg-[white] p-[20px]'>
          <div className="w-[700px] h-[500px] flex flex-col justify-center items-center gap-y-[30px]">
            <div className="space-y-2 w-[500px]">
              <h2 className="text-2xl font-bold text-[#101828]">
                Forget your password?
              </h2>
              <p className="text-[16px] text-[#101828] font-semibold">
                Enter the email you used to register with Aligntraits
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
              <div className="space-y-4">
                <input
                  id="email"
                  type="email"
                  placeholder='Please enter your email'
                  required
                  className="mt-1 block w-[500px] rounded-xl border border-[#000000] p-2"
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
                className="w-[500px] py-2 px-4 bg-[#004085] hover:bg-blue-700 text-white rounded-xl disabled:opacity-50"
              >
                {isLoading ? <BeatLoader /> : "Reset Password"}
              </button>

              <p className='text-center text-[#101828] text-[12px] font-semibold'>Didn’t receive any email? <span className='text-[#004085]'>Resend</span></p>
            </form>
          </div>

          <div className='w-[600px] h-[900px] bg-[#004085] rounded-xl flex flex-col gap-y-[30px] p-[40px] items-start'>
            <img src={traitText} alt='text' className='h-[25px] ml-[-10px]' />

            <p className='text-[25px] text-[white] font-semibold'>The simplest way to navigate your educational future</p>

            <p className='text-[white] text-[12px]'>Enter your credentials to access your account</p>

            <img src={resetImage} alt='reset Image' className='h-[600px]' />
          </div>
        </div>
        )
      }
    </div>
  );
} 