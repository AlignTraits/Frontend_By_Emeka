import React from 'react'
import AdminAuth from "../../assets/admin/adminAuth.png";
import Logo from "../../assets/logo.svg";
import{AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import { LoginCredentials } from '../../types/auth.types';

export default function Login() {
  const [credentials, setCredentials] = React.useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="flex h-screen p-0 m-0 w-full ">
      <div className="hidden md:flex w-full basis-[50%]">
        <img src={AdminAuth} alt="" className="h-screen w-full" />
      </div>
      <div className="w-full h-screen p-5 lg:p-10  md:basis-[50%] space-y-14">
        <div className="flex justify-between  w-full p-0">
          <img src={Logo} alt="" className="p-0 w-40" />
          <h2 className="font-[500] my-auto text-[14px] lg:text-[18px]">
            Not an admin?{" "}
            <span className="text-[#004085]  font-[500]">Request</span>
          </h2>
        </div>
        <div className="flex flex-col justify-center items-center space-y-10 lg:space-y-12">
          <div className='mx-auto space-y-4'>
            <h1 className="text-[28px] lg:text-[38px] xl:text-[48px] font-[700] text-center leading-[40px] lg:leading-[50px] xl:leading-[60px] mx-auto">
              Access is restricted to authorized personnel only
            </h1>
            <p className="text-center text-[16px] md:w-[80%] xl:w-[70%] mx-auto">
              By logging in, you agree to uphold strict confidentiality
              regarding all data you access, changes are recorded and traceable.
            </p>
          </div>

          <form className="md:w-[80%] xl:w-[65%] space-y-4 lg:space-y-8">
            <div className="space-y-2">
              <label htmlFor="email" className="text-[18px]">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full rounded-md border border-[#000000] px-3 py-2 text-[14px]"
                placeholder="Email"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-[18px]">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full rounded-md border border-[#000000] px-3 py-2 text-[14px]"
                  placeholder="Enter your Password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>
            </div>

            <button className="w-full bg-[#004085] text-[#FFFFFF] rounded-md py-2 text-[18px]">
              Login
            </button>
            <p className="text-[#004085]">forgot password?</p>
          </form>
        </div>
      </div>
    </div>
  );
}
