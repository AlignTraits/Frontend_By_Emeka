import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import "react-datepicker/dist/react-datepicker.css";
// import { useAuth } from "../../contexts/useAuth";
// import { HiOutlineDownload } from "react-icons/hi";
import { toast } from "react-toastify";
import CustomSelect from "../dashboard/CustomSelect";
import { BeatLoader } from "react-spinners";

interface ModalProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ErrorObjType {
  fullName: boolean;
  lastName: boolean;
  email: boolean;
  phone: boolean;
  role: boolean;
}

const ROLE_LIST = ["Admin", "Super Admin", "Content Manager", "Analyst"]

export default function CreateAdminModal({setModal }: ModalProps) {
  // const {token} = useAuth()

  const [isLoading, setIsLoading] = useState(false)
  const [fullName, setFullName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [role, setRole] = useState("")

  const [errorObj, setErrorObj] = useState<ErrorObjType>({
    fullName: false,
    lastName: false,
    email: false,
    phone: false,
    role: false
  });
  

  const handleClose = () => {
    setModal(false)
  }

  function isValidEmail(email: string): boolean {
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }


    
  const checkAllFields = () => {
    if (fullName.length === 0) {
      setErrorObj((prev) => ({ ...prev, fullName: true }));
    } 

    if (email.length === 0) {
      setErrorObj((prev) => ({ ...prev, email: true }));
    }

    if (lastName.length === 0) {
      setErrorObj((prev) => ({ ...prev, lastName: true }));
    }

    if (phone.length === 0) {
      setErrorObj((prev) => ({ ...prev, phone: true }));
    } 

    if (role.length === 0) {
      setErrorObj((prev) => ({ ...prev, role: true }));
    } 
  }

  const isFormValid = () => {
    if (fullName.length > 0 && email.length > 0 && phone.length > 0 && role.length > 0 && lastName.length > 0) {
      return true;
    }
    return false;
  }


  const handleSubmit = () => {
    checkAllFields()

    if (!isFormValid()) {
      toast.error("Please fill all input fields!");
      return 
    }

    if (!isValidEmail(email)) {
      toast.error("Enter a proper email address!");
      return
    }
    setIsLoading(false)
  }

  const handleRoleError = () => {
    setErrorObj((prev) => ({...prev, role: false}))
  }

  return (
    <div 
      className="absolute inset-0 bg-black bg-opacity-50 flex justify-center"
    >
      <div className="mt-20 bg-white rounded-lg w-[533px] relative size-max p-[20px] flex flex-col justify-between">
        <div className="flex flex-col gap-y-[5px]">
          <p className="text-[18px] text-[#1E1E1E] font-semibold">Create Admin</p>

          <p className="text-[12px] text-[#737373] font-normal">Add a new admin to the platform. They will have access according to their assigned role.</p>
        </div>

        <FiX className="cursor-pointer absolute right-6 top-[30px] -translate-y-1/2 text-[#595959] w-5 h-5" onClick={handleClose} />

        <div className="flex flex-col gap-y-[10px]">
          <div className="flex flex-col w-full">
            <p className={`text-[16px] font-medium  ${errorObj.fullName ? "text-[#F04438]" : "text-[#1E1E1E]"}`}>Full Name*</p>
            <input
              type="text"
              name="firstName"
              onFocus={() => setErrorObj((prev) => ({...prev, fullName: false}))}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="border-[1px] px-[10px] rounded-md border-[#E9E9E9] py-2 focus:outline-none w-full text-[16px] font-[400] text-[black]"
            />
          </div>

          <div className="flex flex-col w-full">
            <p className={`text-[16px] font-medium  ${errorObj.lastName ? "text-[#F04438]" : "text-[#1E1E1E]"}`}>Last Name*</p>
            <input
              type="text"
              name="lastname"
              onFocus={() => setErrorObj((prev) => ({...prev, lastName: false}))}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border-[1px] px-[10px] rounded-md border-[#E9E9E9] py-2 focus:outline-none w-full text-[16px] font-[400] text-[black]"
            />
          </div>

          <div className="flex flex-col w-full">
            <p className={`text-[16px] font-medium  ${errorObj.email ? "text-[#F04438]" : "text-[#1E1E1E]"}`}>Email*</p>
            <input
              type="text"
              name="email"
              onFocus={() => setErrorObj((prev) => ({...prev, email: false}))}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-[1px] px-[10px] rounded-md border-[#E9E9E9] py-2 focus:outline-none w-full text-[16px] font-[400] text-[black]"
            />
          </div>

          <div className="flex flex-col w-full">
            <p className={`text-[16px] font-medium  ${errorObj.phone ? "text-[#F04438]" : "text-[#1E1E1E]"}`}>Phone Number*</p>
            <input
              type="number"
              name="phone"
              onFocus={() => setErrorObj((prev) => ({...prev, phone: false}))}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none border-[1px] px-[10px] rounded-md border-[#E9E9E9] py-2 focus:outline-none w-full text-[16px] font-[400] text-[black]"
            />
          </div>

          <div className="w-full flex flex-col gap-y-[5px]">
            <p className={`text-[16px] text-[#1E1E1E] font-medium ${errorObj.role ? "text-[#F04438]" : "text-[#1E1E1E]"}`}>Role*</p>
            <CustomSelect
              placeholder="Select Role"
              options={ROLE_LIST.map((level) => ({
                value: level,
                label: level,
              }))}
              onChange={(value) => setRole(value)}
              selectedProps={{
                value: role,
                label: role
              }}
              handleError={handleRoleError}
            />
          </div>
        </div>

        <div className="flex gap-x-[20px] justify-end mt-5">
          <button onClick={handleClose} className="bg-[white] border-[#DDDDDD] border-[1px] w-[120px] h-[40px] rounded-md flex justify-center gap-x-[10px] items-center">
            <p className="text-[14px] font-semibold text-[#1E1E1E]">Cancel</p>
          </button>

          <button onClick={handleSubmit} className="bg-[#004085] w-[120px] h-[40px] rounded-md flex justify-center gap-x-[10px] items-center">
            {isLoading ? (
                <BeatLoader color="#ffffff" size={8} />
            ) : (
              <p className="text-[14px] font-semibold text-[#FFFFFF]">Save Changes</p>
            )}
            
          </button>
        </div>
      </div>

    </div>
  );
}
