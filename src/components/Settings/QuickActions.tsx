import { BsPerson } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";
import { RiGraduationCapFill } from "react-icons/ri";

const QuickActions = () => {
  return (
    <div className='border-[1px] border-[#EAECF0] shadow-md rounded-xl h-[250px] w-[100%] lg:w-[100%] p-4'>
      <div>
        <p className="text-[#212529] text-[18px] font-bold">Quick Actions</p>
        <p className='text-[12px] text-[#757575] mt-2'>Common tasks you might want to perform</p>
      </div>

      <div className="mt-5 flex flex-col gap-y-[10px]">
        <div className="bg-[#E3E3E3] h-[40px] w-[100%] rounded-xl flex gap-x-[20px] items-center px-5">
          <BsPerson className="text-[#757575]" />
          <p className="text-[#212529] font-medium text-[14px]">Update Profile Information</p>
        </div>

        <div className="bg-[#E3E3E3] h-[40px] w-[100%] rounded-xl flex gap-x-[20px] items-center px-5">
          <RiGraduationCapFill className="text-[#757575]" />
          <p className="text-[#212529] font-medium text-[14px]">Add Academic Record</p>
        </div>

        <div className="bg-[#E3E3E3] h-[40px] w-[100%] rounded-xl flex gap-x-[20px] items-center px-5">
          <IoSettingsSharp className="text-[#757575]" />
          <p className="text-[#212529] font-medium text-[14px]">Change Password</p>
        </div>
      </div>
    </div>
  )
}

export default QuickActions