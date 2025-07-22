import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/useAuth';
import { AiOutlineEye, AiOutlineEyeInvisible, } from "react-icons/ai";

export interface Credentials {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}


export default function SkillRoadMap() {
  const {setPageDesc} = useAuth()

  const [credentials, setCredentials] = useState<Credentials>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  })

  useEffect(() => {
    setPageDesc({
      desc: "Welcome",
      title: "Security Management"
    })
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="p-5 relative">
      <div className="mt-3 lg:mt-10 border-[1px] border-[#EAECF0] flex flex-col gap-y-[15px] shadow-md rounded-xl p-5 w-[100%] size-max">
        <div>
          <p className="text-[#212529] text-[18px] font-bold">Security & Password</p>
          <p className='text-[12px] text-[#757575] mt-2'>Update your password and manage account security.</p>
        </div>


        <form onSubmit={handleSubmit} className="mt-3 lg:mt-10 border-[1px] border-[#EAECF0] flex flex-col gap-y-[20px] shadow-md rounded-xl p-5 w-[100%] size-max">
          <div>
            <p className="text-[#212529] text-[18px] font-bold">Change Password</p>
            <p className='text-[12px] text-[#757575] mt-2'>Update your password to keep your account secure. You'll be logged out after changing your password.</p>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-[14px] font-[600]"
            >
              Current Password*
            </label>
            <div className="relative w-[100%]">
              <input
                id="password"
                type={showPassword.currentPassword ? "text" : "password"}
                required
                className="mt-1 w-[100%] h-12 px-4 py-3 border-[1px] border-[#ccc] rounded-2xl bg-white shadow-md focus:outline-none"
                placeholder="Current password"
                value={credentials.currentPassword}
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    currentPassword: e.target.value,
                  })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => ({
                  ...prev,
                  currentPassword: !prev.currentPassword
                }))}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-[#004085]"
              >
                {showPassword.currentPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="block text-[14px] font-[600]"
            >
              New Password*
            </label>
            <div className="relative w-[100%]">
              <input
                id="newPassword"
                type={showPassword.newPassword ? "text" : "password"}
                required
                className="mt-1 w-[100%] h-12 px-4 py-3 border-[1px] border-[#ccc] rounded-2xl bg-white shadow-md focus:outline-none"
                placeholder="New password"
                value={credentials.newPassword}
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    newPassword: e.target.value,
                  })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => ({
                  ...prev,
                  newPassword: !prev.newPassword
                }))}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-[#004085]"
              >
                {showPassword.newPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmpassword"
              className="block text-[14px] font-[600]"
            >
              Confirm Password*
            </label>
            <div className="relative w-[100%]">
              <input
                id="confirmpassword"
                type={showPassword.confirmPassword ? "text" : "password"}
                required
                className="mt-1 w-[100%] h-12 px-4 py-3 border-[1px] border-[#ccc] rounded-2xl bg-white shadow-md focus:outline-none"
                placeholder="Current password"
                value={credentials.confirmPassword}
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    confirmPassword: e.target.value,
                  })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => ({
                  ...prev,
                  confirmPassword: !prev.confirmPassword
                }))}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-[#004085]"
              >
                {showPassword.confirmPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
          </div>

          <div className='w-full flex justify-center lg:justify-end'>
            <button type="submit" className='h-[45px] bg-[#004085] rounded-xl text-[white] font-semibold text-[14px] w-[180px] hover:bg-[#0056b3] transition-colors duration-300'>
              {"Change Password"}
            </button>
          </div>

        </form>

        <div className="mt-10 border-[1px] border-[#EAECF0] flex flex-col gap-y-[15px] shadow-md rounded-xl p-5 w-[100%] h-[200px]">
          <p className="text-[#212529] text-[18px] font-bold">Security Information</p>

          <div className='flex flex-col gap-y-[20px]'>
            <div className='flex justify-between'>
              <p className='text-[14px]'>Last password change</p>
              <p className='text-[14px]'>30 days ago</p>
            </div>

            <div className='flex justify-between'>
              <p className='text-[14px]'>Last login</p>
              <p className='text-[14px]'>Today at 2:30 PM</p>
            </div>

            <div className='flex justify-between'>
              <p className='text-[14px]'>Account created</p>
              <p className='text-[14px]'>3 months ago</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
