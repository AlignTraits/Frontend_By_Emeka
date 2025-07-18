import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useAuth } from '../../contexts/useAuth';

export default function Subscription() {
  const {setPageDesc} = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    setPageDesc({
      desc: "Manage subscription",
      title: "Subscription"
    })
  }, [])

  const handleNav = () => {
    navigate(-1)
  }

  return (
    <div className="w-full h-full p-5">
           
      <button onClick={handleNav} className="flex gap-x-[10px] items-center">
        <FaArrowLeftLong className="text-[#004085]" />
        <p className="text-[#004085]">Back to Explore</p>
      </button>

      <div className='mt-5'>
        <p className="text-[#212529] text-[18px] font-bold">Subscription Management</p>
        <p className='text-[12px] text-[#757575] mt-2'>Manage your plans, billing, and payment methods</p>
      </div>
           
      <div className='h-[70px] w-[30px]'></div>      
    </div>
  );
}
