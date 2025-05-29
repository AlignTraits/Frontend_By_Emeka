import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../contexts/useAuth";
import BeatLoader from "react-spinners/BeatLoader";
import { FaLongArrowAltLeft } from "react-icons/fa";

export default function Recommendation() {
  const {error, isLoading} = useAuth()
  const navigate = useNavigate()

  const [agreed, setAgreed] = useState(false);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
  };

  const handleClick = () => {
    // You can open a modal or do nothing
    console.log('Terms & Privacy clicked');
  };

  

  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-[#CCE0F5] via-[#e9eff7] to-white">
      <Header />

      <div className="flex gap-x-[10px] items-center ml-[30px] mt-[20px] cursor-pointer" onClick={() => navigate(-1)}>
        <FaLongArrowAltLeft className="text-[#004085]" />
        <p className="text-[#004085]">Back to Explore</p>
      </div>

      <div className="mx-auto mt-[80px] w-[600px] space-y-5 p-10 bg-white rounded-lg shadow-lg border-[#ccc] border-[1px]">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="space-y-6 flex flex-col"
        >
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded">{error}</div>
          )}
          <div>
            <label htmlFor="first-name" className="block text-[16px] font-[600] text-[#101828]">
              First Name
            </label>
            <div className="relative">
              <input
                id="first-name"
                type={"text"}
                required
                // className="mt-1 block w-full rounded-xl border border-[#000000] p-3"
                className="mt-1 w-full h-12 px-4 py-3 border-[1px] border-[#ccc] rounded-full bg-white shadow-md focus:outline-none"
                placeholder="Enter your new first name"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                // onFocus={resetInput}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="block text-[16px] font-[600] text-[#101828]"
            >
              Last Name
            </label>
            <div className="relative">
              <input
                id="last-name"
                type={"text"}
                required
                // className="mt-1 block w-full rounded-xl border border-[#000000] p-3"
                className="mt-1 w-full h-12 px-4 py-3 border-[1px] border-[#ccc] rounded-full bg-white shadow-md focus:outline-none"
                placeholder="Enter your last name"
                // value={confirmPassword}
                // onChange={(e) => setConfirmPassword(e.target.value)}
                // onFocus={resetInput}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-[16px] font-[600] text-[#101828]"
            >
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                type={"email"}
                required
                // className="mt-1 block w-full rounded-xl border border-[#000000] p-3"
                className="mt-1 w-full h-12 px-4 py-3 border-[1px] border-[#ccc] rounded-full bg-white shadow-md focus:outline-none"
                placeholder="Enter your email"
                // value={confirmPassword}
                // onChange={(e) => setConfirmPassword(e.target.value)}
                // onFocus={resetInput}
              />
            </div>
          </div>

          <label className="w-full inline-flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="form-checkbox w-4 h-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-800">
              I agree to the{' '}
              <button
                type="button"
                onClick={handleClick}
                className="underline font-medium text-gray-900 hover:text-gray-700"
              >
                Terms & Privacy
              </button>
            </span>
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="w-[40%] mx-auto py-2 px-4 bg-[#004085] hover:bg-blue-700 text-white rounded-[30px] disabled:opacity-50"
          >
            {isLoading ? <BeatLoader /> : "Continue"}
          </button>
        </form>
      </div>

      <div className="h-[20px] w-[40px]"></div>
    </div>
  );
} 