
import React,  {useState } from "react"

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
import SuccessCheck from '../assets/success-check.svg'
import { BeatLoader } from "react-spinners"

export default function Home() {
  const date = new Date()
  const [email, setEmail] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit =async ()=> {
    const form = {
      email: email
    }
    setIsLoading(true)
    try {
      console.log(JSON.stringify(form));
      const response = await api.post('/waitlist/add-waitlist',JSON.stringify(form) , {
        headers: {
          "Content-Type" : 'application/json'
        }
      })
      console.log(response);
      setIsLoading(false)
      // toast.success(response.data.message)
      setModalOpen(true)
    } catch (err: any) {
      setIsLoading(false);
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
    <div className="relative flex flex-col justify-center items-center h-screen w-full bg-[#001833] p-5 md:p-10 gap-2 lg:gap-5">
      <img
        src={AlignTraitBanner}
        alt="AlignTraits Banner Image"
        className=" w-[300px] h-[50px] lg:w-[400px] lg:h-[50px]"
      />
      <h1 className="relative text-center text-[#E0E0E0] text-[30px] lg:text-[40px] font-normal lg:font-semibold  md:w-[80%] lg:w-[80%] xl:w-[50%] leading-[40px] lg:eading-[48px]">
        Discover Your Ideal Career Path with AlignTraits
        <img
          src={Confetti}
          alt=""
          className="absolute top-[-20px] xl:top-0 right-0 bottom-0"
        />
      </h1>
      <p className=" text-center text-[#E0E0E0] text-[16px] lg:text-[20px] font-medium md:w-[80%] lg:w-[70%] xl:w-[50%] leading-[20px] md:leading-[30px]">
        Join our waitlist and unlock personalized career recommendations based
        on your unique personality traits. Simplify your career decisions and
        empower your future with insights just for you.
      </p>

      <div className="border-[#E5EFFF] border-[1px] rounded-full flex items-center mt-8 px-2 lg:px-5 py-2 bg-[#F7FAFF] mt-20">
        <FiMail />
        <input
          type="email"
          placeholder="Enter Your Email"
          className="ml-2 outline-none text-[14px] text-[#666666] font-normal lg:p-2"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="text-[#FFFFFF] text-[14px] font-normal bg-gradient-to-r from-[#0062FF] to-[#65D1FF] px-5 py-2 rounded-full w-[150px]"
          onClick={() => handleSubmit()}
          disabled={isLoading}
        >
          {isLoading ? <BeatLoader className="w-full"/> : "Secure My Spot"}
        </button>
      </div>
      <p className="text-[14px] lg:text-[18px] text-[#E0E0E0] font-normal text-center  md:w-[60%] lg:w-[60%] my-5 lg:mt-10">
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

      <img
        src={Glove}
        alt=""
        className="absolute top-[30%] xl:left-20 left-10 hidden lg:block"
      />
      <img
        src={Study}
        alt=""
        className="lg:absolute bottom-[20%] right-10 w-[200px] h-[200px] xl:w-[250px] xl:h-[250px] xl:right-20 xl:bottom-[30%]"
      />
      <img
        src={DirectionArrow}
        alt=""
        className="absolute top-[31%] left-[7%] md:top-[30%] md:left-[15%] lg:top-[40%] xl:top-[42%] xl:left-[23%] h-[55px] md:h-[100px] lg:h-[150px] "
      />

      <ToastContainer />
      {modalOpen && <Modal setModalOpen={setModalOpen} />}
    </div>
  );
} 

interface ModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal = ({ setModalOpen }: ModalProps) => {
  const [isVisible, setIsVisible] = React.useState(true);

  const handleClose = () => {
    setIsVisible(false); 
    setTimeout(() => setModalOpen(false), 300); 
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-5 md:px-0 transition-opacity duration-300 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-[#001833] rounded-lg flex flex-col p-5 px-10 lg:px-20 md:w-1/2 w-full xl:w-1/3 gap-5 transform transition-transform duration-300 ease-out ${
          isVisible ? "scale-100" : "scale-95"
        }`}
      >
        <div className="bg-[#F6C648] w-20 h-20 rounded-full flex items-center mx-auto">
          <img src={SuccessCheck} alt="" className="w-[60%] h-[60%] mx-auto" />
        </div>
        <h2 className="text-[30.64px] font-medium leading-[36.77px] text-[#FFFFFF] text-center">
          We’ve added you to our waiting list!
        </h2>
        <p className="text-[13.67px] text-[#FFFFFF] font-normal leading-[16.4px] text-center">
          We’ll let you know when AlignTraits is ready
        </p>
        <button
          className="bg-[#F6C648] text-[#FFFFFF] text-[20px] font-medium w-[70%] rounded-md mx-auto"
          onClick={handleClose}
        >
          Got it
        </button>
      </div>
    </div>
  );
};

