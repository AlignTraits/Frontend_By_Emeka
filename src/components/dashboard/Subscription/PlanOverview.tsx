import { LuCrown } from "react-icons/lu";

import { FaRegCheckCircle } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { useState } from "react";
import UpgradePlanModal from "./UpgradePlanModal";

const PlanOverview = () => {
  const [showModal, setShowModal] = useState(false);

  const onClose = () => {
    setShowModal(false)
  }

  const onConfirmUpgrade = () => {
    setShowModal(false)
    console.log("clicked!")
  }

  const benefits = ["Unlimited checks within one country", "Loan information and course access", "Editable exam records"]
  return (
    <>
      <div className="h-[300px] w-full border-[1px] border-[#EAECF0] shadow-md rounded-xl p-5 w-[100%] size-max">
        <div className="flex justify-between">
          <div className="flex gap-x-[10px] items-center">
            <LuCrown />
            <p className="text-[#212529] font-bold">Current Plan</p>
          </div>

          <div className="flex gap-x-[10px] w-min px-[20px] py-[2px] justify-center items-center bg-[#E0FFF0] rounded-2xl">
            <FaRegCheckCircle className="text-[#17B26A]" />
            <p className="text-[#17B26A]">Active</p>
          </div>
        </div>

        <div className="flex gap-x-[200px] mt-5">
          <div>
            <p className="text-[#212529] text-[16px] font-medium">Silver Plan</p>
            <p className="text-[#757575] text-[16px] font-medium">₦5,500 / $8.99</p>

            <div className="flex gap-x-[5px] items-center mt-5">
              <CiCalendar className="text-[#000000]" />
              <p className="text-[#757575] text-[14px] font-medium">Renews on 7/15/2024</p>
            </div>
          </div>

          <div>
            <p className="text-[#212529] text-[16px] font-medium">Plan Benefits</p>

            <div className="flex flex-col gap-y-[10px] mt-2">
              {
                benefits.map((elem, i) => 
                  <div key={i} className="flex gap-x-[10px] items-center">
                    <FaRegCheckCircle className="text-[#17B26A]" />
                    <p className="text-[#757575] font-medium text-[12px]">{elem}</p>
                  </div>
                )
              }
            </div>
          </div>
        </div>

        <div className="border-t-[1px] border-t-[#75757580] mt-10 flex gap-x-[20px]">
          <button onClick={() => setShowModal(true)} className="flex gap-x-[10px] items-center bg-[#F4F4F4] px-[10px] py-[6px] rounded-lg w-max mt-5">
            <LuCrown className="text-[#000000]" />
            <p className="text-[#000000] font-semibold text-[12px]">Upgrade Plan</p>
          </button>

          <button className="bg-[#FB5448] px-[10px] py-[6px] rounded-lg mt-5 text-[white] font-semibold text-[12px]">Cancel</button>
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