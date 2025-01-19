
import {useState } from "react"

import AlignTraitBanner from '../assets/aligntraits-banner.svg'
import OtherUsers from '../assets/other-users.svg'
import { FiMail,  } from "react-icons/fi"
import Confetti from '../assets/confetti.svg'
import Glove from '../assets/Glove.svg'
import DirectionArrow from '../assets/DirectionArrow.svg'
import Study from '../assets/study.svg'
import api from '../api/axios'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Home() {
  const date = new Date()
  const [email, setEmail] = useState('')

  const handleSubmit =async ()=> {
    const form = {
      email: email
    }
    try {
      console.log(JSON.stringify(form));
      const response = await api.post('/waitlist/add-waitlist',JSON.stringify(form) , {
        headers: {
          "Content-Type" : 'application/json'
        }
      })
      console.log(response);
      toast.success(response.data.message)
    } catch (err: any) {
    if (err.response && err.response.data && err.response.data.errors) {
      console.log(err);
      const errors = err.response.data.errors;
      console.log(errors);

      errors.forEach((error: { message: string }) => {
        if (error.message) {
          toast.error(error.message);
        }
      });
    }
    if (err.response && err.response.data) {
      toast.error(err.response.data.error);
    }

    if (
      err.response &&
      err.response.data.message &&
      !err.response.data.errors
    ) {
      toast.error(err.response.data.message);
    }
    throw err;
  } 
  }

  return (
    <div className="relative flex flex-col justify-center items-center h-screen w-full bg-[#001833] gap-5">
      <img src={AlignTraitBanner} alt="AlignTraits Banner Image" className="mb-10" />
      <h1 className="relative text-center text-[#E0E0E0] text-[40px] font-semibold lg:w-[60%] xl:w-[50%] leading-[48px]">
        Discover Your Ideal Career Path with AlignTraits
        <img src={Confetti} alt="" className="absolute top-[-20px] xl:top-0 right-0 bottom-0" />
      </h1>
      <p className=" text-center text-[#E0E0E0] text-[20px] font-medium w-[55%] xl:w-[43%] leading-[30px]">
        Join our waitlist and unlock personalized career recommendations based
        on your unique personality traits. Simplify your career decisions and
        empower your future with insights just for you.
      </p>

      <div className="border-[#E5EFFF] border-[1px] rounded-full flex items-center mt-5 px-5 py-2 bg-[#F7FAFF] mt-20">
        <FiMail />
        <input
          type="email"
          placeholder="Enter Your Email"
          className="ml-2 outline-none text-[14px] text-[#666666] font-normal p-2"
          onChange={(e)=> setEmail(e.target.value)}       
           />
        <button className="text-[#FFFFFF] text-[14px] font-normal bg-gradient-to-r from-[#0062FF] to-[#65D1FF] px-5 py-2 rounded-full" onClick={()=> handleSubmit()}>
          Secure My Spot
        </button>
      </div>
      <p className="text-[18px] text-[#E0E0E0] font-normal text-center w-[45%] mt-10">
        AlignTraits' AI-driven career guidance is here to revolutionize your
        future. Join our waitlist today!
      </p>
      <div className="flex gap-5 ">
        <img src={OtherUsers} alt="" />
        <span className="text-[14px] text-[#F6C648] font-medium my-auto">
          Join 500+ others who signed up
        </span>
      </div>
      <p className="text-[14px] text-[#F6C648] font-medium ">
        © {date.getUTCFullYear()} AlignTraits
      </p>

      <img src={Glove} alt="" className="absolute top-[30%] left-10" />
      <img src={Study} alt="" className="absolute bottom-[20%] right-10" />
      <img src={DirectionArrow} alt="" className="absolute top-[48%] left-[20%] xl:top-[48%] xl:left-[28%]" />

      <ToastContainer />
    </div>
  );
} 