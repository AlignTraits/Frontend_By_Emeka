import { FaCcMastercard } from "react-icons/fa";
import { CiBank } from "react-icons/ci";

interface SelectPaymentTypeProps {
  paymentType: string;
  setPaymentType: (type: string) => void;
}

const SelectPaymentType = ({paymentType, setPaymentType}: SelectPaymentTypeProps) => {
    const selectedPlanRaw = localStorage.getItem("selectedPlan");
    const selectedPlan = selectedPlanRaw ? JSON.parse(selectedPlanRaw) : 0;

    console.log("paymentType: ", paymentType)

  return (

      <div className="flex gap-x-[20px] justify-center items-center mt-1 p-4">
        <button 
          // onClick={() => setPaymentType("card")} 
          className={`${selectedPlan === 0 ? "bg-[#EAF2FB]" : ""} transition-all duration-300 cursor-pointer flex justify-center gap-x-[2px] h-[50px] w-[250px] rounded-[10px] border-[1px] border-[#004085] shadow-lg items-center`}
        >
          <FaCcMastercard className="w-6 h-6 text-[#004085]" /> 
          <div className="w-px h-6 bg-gray-300 mx-3"></div>
          
          <p className="text-[#004085] text-[16px] font-semibold">Credit or Debit Card</p>
        </button>
        <button 
          onClick={() => setPaymentType("transfer")} 
          className={`${selectedPlan !== 0 ? "bg-[#EAF2FB]" : ""} transition-all duration-300 cursor-pointer flex justify-center gap-x-[2px] h-[50px] w-[200px] rounded-[10px] border-[1px] border-[#004085] shadow-lg items-center`}
        >
          <CiBank className="w-6 h-6 text-[#004085]"  /> 
          <div className="w-px h-6 bg-gray-300 mx-3"></div>
          <p className="text-[#004085] text-[16px] font-semibold">Bank Transfer</p>
        </button>
      </div>
  )
}

export default SelectPaymentType;