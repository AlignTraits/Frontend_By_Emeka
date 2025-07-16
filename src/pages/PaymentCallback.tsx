import { useEffect, useState } from "react"
import Header from "../components/Header";
import { toast } from "react-toastify";
import { checkEligibility } from "../services/utils"
import { useNavigate } from "react-router-dom";
import resetIcon from "../assets/resetRediret.svg"

const PaymentCallback = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  let tempData = localStorage.getItem("eligibilityPayload") ? JSON.parse(localStorage.getItem("eligibilityPayload") as string) : null;
  let tempDataTwo = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData") as string) : null;

  const handleEligibilityCheck = async () => {
    if (!localStorage.getItem("eligibilityPayload")) {
      return;
    }
    
    try {
      setIsLoading(true)
      const response = await checkEligibility(tempData);
      toast.success("Login to view result...")
      setTimeout(() => {
        if (tempDataTwo?.ok) {
          navigate("/login")
        } else {
          navigate("/signup-two")
        }
      }, 5000)
      return response;
    } catch (err:any) {
      if (tempDataTwo?.ok) {
        toast.error("Error occurred, please login!")
      }
      setTimeout(() => {
        if (tempDataTwo?.ok) {
          navigate("/login")
        } else {
          navigate("/signup-two")
        }
      }, 5000)
    } finally {
      setIsLoading(false)
    }
  } 

  useEffect(() => {
    handleEligibilityCheck();
  }, [])

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#CCE0F5] via-[#e9eff7] to-white">
      <Header />
      <div className='flex flex-col items-center p-[20px] md:p-[20px] p-[10px] gap-y-[20px] mt-10'>
        <div className=''>
          <img src={resetIcon} />
        </div>
        {
          isLoading ?
        <p className='text-[#4C4E53] text-center max-w-[450px] px-4'>
          Loading
        </p>:
        <p className='text-[#4C4E53] text-center max-w-[450px] px-4'>
          Payment successful, <span className="text-[#004085]">you will be redirected in few seconds...</span>
        </p>
        }
      </div>
    </div>
  )  
}

export default PaymentCallback