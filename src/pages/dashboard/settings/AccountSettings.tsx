import React, { useState } from "react";
import Header from "../../../components/Settings/Header";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { FiToggleLeft, FiToggleRight } from "react-icons/fi";
import { toast } from 'react-toastify';
// import { useAuth } from "../../../contexts/useAuth";
// import { changePassword } from "../../../services/auth.service";


export default function AccountSettings() {
  // const navigate = useNavigate()
  // const {token, logout} = useAuth()
  const [accountSettings, setAccountSetting] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    allNotification: false,
    chatNotification: false,
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, ] = useState(false)


  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAccountSetting((prevSetting) => ({
      ...prevSetting,
      [name]: value,
    }));
  };

  const handleToggle = (field: keyof typeof accountSettings) => {
    setAccountSetting((prevSetting) => ({
      ...prevSetting,
      [field]: !prevSetting[field],
    }));
  };

  const handleClick = () => {

    if (accountSettings.currentPassword.length === 0 || accountSettings.confirmPassword.length === 0 
      || accountSettings.newPassword.length === 0) {
        return toast("Please fill all password fields!", {autoClose: 2000})
    }

    if (accountSettings.confirmPassword !== accountSettings.newPassword) {
      setAccountSetting((prevSetting) => ({
        ...prevSetting,
        confirmPassword: "",
        newPassword: ""
      }))
      return toast("confirm password and new password is not the same!", {autoClose: 2000})
    }

    // Add save logic here
    handleChangePassword()
  };

  const handleChangePassword = async () => {
    // try {
    //   await changePassword(token as string, accountSettings.newPassword)

    //   await logout();
    //   window.location.href = '/login'
    // } catch (err) {
    //   // setError(err instanceof Error ? err.message : 'An error occurred');
    //   toast.error("An error occured!")
    // } finally {
    //   setIsLoading(false);
    // }    setIsLoading(true);
  
  };
  

  return (
    <div className="space-y-8">
      <Header
        heading="Password"
        text="Kindly enter your current password to change your password"
        buttonText="Save Changes"
        handleClick={handleClick}
        isLoading={isLoading}
      />
      <div className="grid grid-cols-[20%_40%] pb-10 border-b-[1px] border-[#E0E0E0]">
        <label
          htmlFor="currentPassword"
          className="text-[#000000] font-[600] text-[16px] my-auto"
        >
          Current Password:
        </label>


        <div className="relative">
          <input
            type={showCurrentPassword ? "text" : "password"}
            id="currentPassword"
            name="currentPassword"
            className="border-[1px] w-full border-[#757575] rounded-md py-2 px-3"
            value={accountSettings.currentPassword}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-[#004085] "
          >
            {showCurrentPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[20%_40%] pb-10 border-b-[1px] border-[#E0E0E0]">
        <label
          htmlFor="newPassword"
          className="text-[#000000] font-[600] text-[16px] my-auto"
        >
          New Password:
        </label>

        <div className="relative">
          <input
            type={showNewPassword ? "text" : "password"}
            id="newPassword"
            name="newPassword"
            className="border-[1px] w-full border-[#757575] rounded-md py-2 px-3"
            value={accountSettings.newPassword}
            onChange={handleChange}
          />

          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-[#004085] "
          >
            {showNewPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[20%_40%] pb-10 border-b-[1px] border-[#E0E0E0]">
        <label
          htmlFor="confirmPassword"
          className="text-[#000000] font-[600] text-[16px] my-auto"
        >
          Confirm Password:
        </label>

        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            className="border-[1px] w-full border-[#757575] rounded-md py-2 px-3"
            value={accountSettings.confirmPassword}
            onChange={handleChange}
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-[#004085] "
          >
            {showConfirmPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </button>
        </div>
      </div>

      <div className="flex justify-between pb-10 border-b-[1px] border-[#E0E0E0] items-center">
        <span className="text-[#000000] font-[600] text-[16px] my-auto ">
          Turn on All Notifications
        </span>
        <div
          className="cursor-pointer text-[50px] flex justify-center"
          onClick={() => handleToggle("allNotification")}
        >
          {accountSettings.allNotification ? (
            <FiToggleRight className="text-[#007BFF]" />
          ) : (
            <FiToggleLeft className="text-[#757575]" />
          )}
        </div>
      </div>

      <div className="flex justify-between pb-10 border-b-[1px] border-[#E0E0E0] items-center">
        <span className="text-[#000000] font-[600] text-[16px] my-auto ">
          Turn on Chat Notifications
        </span>
        <div
          className="cursor-pointer text-[50px] flex justify-center"
          onClick={() => handleToggle("chatNotification")}
        >
          {accountSettings.chatNotification ? (
            <FiToggleRight className="text-[#007BFF] " />
          ) : (
            <FiToggleLeft className="text-[#757575] " />
          )}
        </div>
      </div>
    </div>
  );
}
