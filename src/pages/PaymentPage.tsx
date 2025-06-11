import Header from "../components/Header";
import bg1 from "../assets/bg1.svg";
import bg2 from "../assets/bg2.svg";
import bg3 from "../assets/bg3.svg";
import bg4 from "../assets/bg4.svg";
import bg5 from "../assets/bg5.svg";
import bg6 from "../assets/bg6.svg";
import alightTraitText from "../assets/AlignTraitsFlaire.svg"
import atmIcon from "../assets/atmCard.svg"
import { useState } from "react";
import SelectPaymentType from "../components/Payment/SelectPaymentType";
import CardForm from "../components/Payment/CardForm";
import BankTransferComponent from "../components/Payment/BankTransferComponent";

export default function PaymentPage() {

  const [paymentType, setPaymentType] = useState("card")

  const selectedPlanRaw = localStorage.getItem("selectedPlan");
  const selectedPlan = selectedPlanRaw ? JSON.parse(selectedPlanRaw) : 0;

  return (
    <div className="relative overflow-hidden h-screen w-full bg-gradient-to-b from-white via-[#e9eff7] to-[#CCE0F5]">
      <Header />

      <div className="w-full flex flex-col space-y-2 mt-[30px]">
        <p className="w-[70%] mx-auto text-[#101828] font-semibold text-[20px]">Payment Page</p>

        <div className="w-[70%] rounded-2xl h-[500px] mx-auto z-[100] border-[1px] border-[#D0D5DD] shadow-lg flex">
          <div className="w-[50%] h-full bg-[#EAF2FB] rounded-l-2xl flex flex-col justify-center p-10 space-y-10">
            <img src={alightTraitText} alt="Align Traits" className="w-[200px]" />

            <img src={atmIcon} alt="ATM Icon" className="w-[400px]" />
          </div>

          <div className="w-[50%] h-full bg-[#fff] rounded-r-2xl px-4 py-2">
            <SelectPaymentType setPaymentType={setPaymentType} paymentType={paymentType} />

            {
              selectedPlan === 0 ? (<CardForm />) : (<BankTransferComponent />)
            }
          </div>
        </div>
      </div>

      <img src={bg1} alt="bg1" className="absolute top-[100px] right-[200px]" />
      <img src={bg2} alt="bg2" className="absolute top-[120px] right-[250px]" />
      <img src={bg3} alt="bg2" className="absolute top-[120px] right-[90px] z-[1]" />
      <img src={bg4} alt="bg2" className="absolute top-[150px] right-[0px] z-[0]" />
      <img src={bg5} alt="bg2" className="absolute bottom-[-300px] left-[0px] h-[600px] z-[1]" />
      <img src={bg6} alt="bg2" className="absolute bottom-[-400px] right-[0px] h-[600px] z-[0]" />

      <div className="h-[60px] w-[40px]"></div>
    </div>
  );
} 