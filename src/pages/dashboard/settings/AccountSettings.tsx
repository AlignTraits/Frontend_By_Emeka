import React, { useState } from "react";
import Header from "../../../components/Settings/Header";
import { FiToggleLeft, FiToggleRight } from "react-icons/fi";

export default function AccountSettings() {
  const [accountSettings, setAccountSetting] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    allNotification: false,
    chatNotification: false,
  });

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
    console.log("Account settings saved:", accountSettings);
    // Add save logic here
  };

  return (
    <div className="space-y-8">
      <Header
        heading="Password"
        text="Kindly enter your current password to change your password"
        buttonText="Save Changes"
        handleClick={handleClick}
      />
      <div className="grid grid-cols-[20%_40%] pb-10 border-b-[1px] border-[#E0E0E0]">
        <label
          htmlFor="currentPassword"
          className="text-[#000000] font-[600] text-[16px] my-auto"
        >
          Current Password:
        </label>
        <input
          type="password"
          id="currentPassword"
          name="currentPassword"
          className="border-[1px] border-[#757575] rounded-md py-2 px-3"
          value={accountSettings.currentPassword}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-[20%_40%] pb-10 border-b-[1px] border-[#E0E0E0]">
        <label
          htmlFor="newPassword"
          className="text-[#000000] font-[600] text-[16px] my-auto"
        >
          New Password:
        </label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          className="border-[1px] border-[#757575] rounded-md py-2 px-3"
          value={accountSettings.newPassword}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-[20%_40%] pb-10 border-b-[1px] border-[#E0E0E0]">
        <label
          htmlFor="confirmPassword"
          className="text-[#000000] font-[600] text-[16px] my-auto"
        >
          Confirm Password:
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className="border-[1px] border-[#757575] rounded-md py-2 px-3"
          value={accountSettings.confirmPassword}
          onChange={handleChange}
        />
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
