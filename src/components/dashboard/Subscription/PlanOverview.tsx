import { LuCrown } from "react-icons/lu";
import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { useState } from "react";
import UpgradePlanModal from "./UpgradePlanModal";
import { useAuth } from '../../../contexts/useAuth';

interface PlanOverviewType {

  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const PlanOverview = ({setActiveTab}: PlanOverviewType) => {
  const [showModal, setShowModal] = useState(false);
  const {user} = useAuth()

  const onClose = () => {
    setShowModal(false)
  }

  const onConfirmUpgrade = () => {
    setShowModal(false)
    console.log("clicked!")
  }

  const splitString = (text: any) => {
    if (typeof text === 'string') {
      return text.replace(/_/g, ' ');
    } 
    return text
  }

  function formatDateToYYYYMMDD(date: Date|null) {
    if (!date) {
      return "1970-01-01";
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  const benefits = ["Unlimited checks within one country", "Loan information and course access", "Editable exam records"]
  return (
    <>
    <div className="h-auto w-full border border-[#EAECF0] shadow-md rounded-xl p-5">
      {/* Top row */}
      <div className="flex flex-col sm:flex-row justify-between gap-y-4">
        <div className="flex gap-x-2 items-center">
          <LuCrown />
          <p className="text-[#212529] font-bold">Current Plan</p>
        </div>

        <div className="flex gap-x-2 w-fit px-5 py-1 justify-center items-center bg-[#E0FFF0] rounded-2xl">
          <FaRegCheckCircle className="text-[#17B26A]" />
          <p className="text-[#17B26A]">Active</p>
        </div>
      </div>

  {/* Middle section */}
  <div className="flex flex-col md:flex-row justify-between gap-y-6 gap-x-10 mt-5">
    {/* Left block */}
    <div>
      <p className="text-[#212529] text-[16px] font-medium">{splitString(user?.payment_plan)}</p>
      <p className="text-[#757575] text-[16px] font-medium">₦5,500 / $8.99</p>

      <div className="flex gap-x-2 items-center mt-5">
        <CiCalendar className="text-[#000000]" />
        <p className="text-red-500 text-[14px] font-medium">
          Expires on {user?.payment_plan_expires_at && formatDateToYYYYMMDD(new Date(user?.payment_plan_expires_at))}
        </p>
      </div>
    </div>

    {/* Right block */}
    <div>
      <p className="text-[#212529] text-[16px] font-medium">Plan Benefits</p>

      <div className="flex flex-col gap-y-2 mt-2">
        {benefits.map((elem, i) => (
          <div key={i} className="flex gap-x-2 items-center">
            <FaRegCheckCircle className="text-[#17B26A]" />
            <p className="text-[#757575] font-medium text-[12px]">{elem}</p>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* Action buttons */}
  <div className="border-t border-t-[#75757580] mt-10 pt-5 flex flex-col sm:flex-row gap-3">
    <button
      onClick={() => setActiveTab("available-plans")}
      className="flex gap-x-2 items-center bg-[#F4F4F4] px-4 py-2 rounded-lg text-[12px] text-black font-semibold"
    >
      <LuCrown className="text-[#000000]" />
      <p>Upgrade Plan</p>
    </button>

    {/* <button className="bg-[#FB5448] px-4 py-2 rounded-lg text-white font-semibold text-[12px]">
      Cancel
    </button> */}
  </div>
</div>


      <UpgradePlanModal
        isOpen={showModal}
        onClose={onClose}
        onConfirmUpgrade={onConfirmUpgrade}
       />
    </>
  )
}

export default PlanOverview;