import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


const AdminPassword = () => {

  const handleCancel = () => {}
  const handleSubmit = () => {}
  const isLoading = false; // Replace with actual loading state

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="w-full size-max bg-[#FAFAFA] border-[1px] border-[#E0E0E0] rounded-lg flex flex-col justify-between gap-6 p-5">
      <div>
        <p className="text-[#101828] text-[20px] font-semibold">Persona Details</p>
        <p className="text-[#737373] text-[14px] font-normal">Update your personal information. This information is used to identify you on the platform.</p>
      </div>

      <div className="flex flex-col gap-y-[10px] w-full">
        <p className={`text-[16px] text-[#1E1E1E] font-medium text-[#1E1E1E]`}>Current Password*</p>
        <input
          type="password"
          name="currentPassword"
          value={"123345666ertrtrt"}
          disabled
          className="border-[1px] px-[10px] rounded-md border-[#E9E9E9] py-2 focus:outline-none w-full text-[16px] font-[400] text-[black]"
        />
      </div>


      <div className="flex flex-col gap-y-[10px] w-full relative">
        <p className={`text-[16px] text-[#1E1E1E] font-medium text-[#1E1E1E]`}>New Password*</p>
        <input
          type={showPassword ? "text" : "password"}
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border-[1px] px-[10px] rounded-md border-[#E9E9E9] py-2 focus:outline-none w-full text-[16px] font-[400] text-[black]"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[55px] -translate-y-1/2"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible size={20} />
          ) : (
            <AiOutlineEye size={20} />
          )}
        </button>
      </div>


      <div className="flex flex-col gap-y-[10px] w-full relative">
        <p className={`text-[16px] text-[#1E1E1E] font-medium text-[#1E1E1E]`}>Confirm Password*</p>
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none border-[1px] px-[10px] rounded-md border-[#E9E9E9] py-2 focus:outline-none w-full text-[16px] font-[400] text-[black]"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-[55px] -translate-y-1/2"
        >
          {showConfirmPassword ? (
            <AiOutlineEyeInvisible size={20} />
          ) : (
            <AiOutlineEye size={20} />
          )}
        </button>
      </div>

      <div className="flex gap-x-[20px] mt-[20px] w-full flex justify-end">
        <button type="button" onClick={handleCancel} className="rounded-lg w-[150px] h-[40px] border-[1px] border-[#DDDDDD] text-[14px] text-[#1E1E1E] semi-bold cursor-pointer">Cancel</button>

        <button type="button" onClick={handleSubmit} className="rounded-lg w-[150px] h-[40px] bg-[#004085] text-[14px] text-[white] semi-bold cursor-pointer">
          {isLoading ? <BeatLoader /> : "Save Changes"}
        </button>

      </div>
    </div>  
  )
}

export default AdminPassword