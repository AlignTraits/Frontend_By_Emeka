import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as authService from '../../services/auth.service'
import resetIcon from "../../assets/imgTwo.svg"
import { AxiosError } from 'axios'
import BeatLoader from "react-spinners/BeatLoader";
import Header from '../../components/Header';
// import resetImage from "../../assets/resetImage.svg"
import traitText from "../../assets/traitstext.svg"
import imgReset from "../../assets/imgReset.png"

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

  // const handletest = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setIsLoading(true)
  //   setTimeout(() => {
  //     setIsLoading(false)
  //     setSuccess(true)
  //   }, 3000)
  // }

  const gotToLogin = () => {
    navigate("/login")
  }

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
        <div className='flex gap-x-[30px] bg-[white] p-[20px] pl-[100px] w-full'>
          <div className="w-[50%] h-[500px] flex flex-col justify-center items-center gap-y-[30px]">
            <div className="space-y-2 w-[450px]">
              <h2 className="text-2xl font-bold text-[#101828]">
                Forget your password?
              </h2>
              <p className="text-[16px] text-[#101828] font-semibold">
                Enter the email you used to register with Aligntraits
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
              <div className="">
                <input
                  id="email"
                  type="email"
                  placeholder='Please enter your email'
                  required
                  // className="mt-1 block w-[450px] rounded-xl border border-[#000000] p-2"
                  className="mt-1 w-[450px] h-14 px-4 py-3 border-[1px] border-[#ccc] rounded-full bg-white shadow-md focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setError(null)}
                />
                {error && (
                  <p className="text-[#E33629] text-[12px] mt-1">
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-[450px] h-[50px] py-2 px-4 bg-[#004085] hover:bg-blue-700 text-white rounded-full disabled:opacity-50"
              >
                {isLoading ? <BeatLoader /> : "Reset Password"}
              </button>

              <p className='text-center text-[#101828] text-[12px] font-semibold'>Remember password? <span onClick={gotToLogin} className='text-[#004085] cursor-pointer'>Login</span></p>
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
        )
      }
    </div>
  );
} 