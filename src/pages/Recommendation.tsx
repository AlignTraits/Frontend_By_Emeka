import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../contexts/useAuth";
import BeatLoader from "react-spinners/BeatLoader";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { getUser } from "../services/utils";

export default function Recommendation() {
  const { error, user, token } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [agreed, setAgreed] = useState(false);

  const [userExist, setUserExist] = useState(false)
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = data.firstName.length > 0 && data.lastName.length > 0 && data.email.length > 0 && agreed;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (agreed) {
      localStorage.setItem("pathway-data", JSON.stringify(data));
    }

    try {
      setIsLoading(true);
      const response = await getUser(data.email);
      if (response?.ok) {
        return setUserExist(true)
      }
      localStorage.setItem("userData", JSON.stringify(response))
      navigate("/questionaire");
    } catch (err) {
    } finally {
      setIsLoading(false)
    }
  };

  const handleClick = () => {
    // You can open a modal or do nothing
    navigate("/terms-and-conditions");
  };

  useEffect(() => {
    if (token && token.length > 0 ) {
      localStorage.setItem("pathway-data", JSON.stringify({
        firstName: user?.firstname || "",
        lastName: user?.lastname || "",
        email: user?.email || ""
      }));
      localStorage.setItem("userData", JSON.stringify({
        data: user,
        message: "User found",
        ok: true
      }))
      navigate("/questionaire");
    }
  }, [])

   const handleNavigate = () => {
    if (token) {
      navigate("/dashboard")
    } else {
      navigate("/search")
    }
  }

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#CCE0F5] via-[#e9eff7] to-white">
      <Header />

      <div
        className="flex gap-x-2 items-center ml-4 mt-4 cursor-pointer sm:ml-8 sm:mt-6"
        onClick={handleNavigate}
      >
        <FaLongArrowAltLeft className="text-[#004085] text-lg sm:text-xl" />
        <p className="text-[#004085] text-sm sm:text-base">Back to Explore</p>
      </div>

      <div className="mt-6 mx-[20px]">
        <p className="text-[#101828] text-lg sm:text-2xl font-semibold w-full max-w-[500px] mx-auto mb-3 text-center">
          Career Pathway
        </p>
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex flex-col items-center w-full max-w-[500px] space-y-4 sm:space-y-5 p-3 sm:p-6
            sm:bg-white sm:border-[#ccc] sm:rounded-lg sm:shadow-lg
            bg-transparent border-0 shadow-none"
        >
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded w-full text-center text-sm">
              {error}
            </div>
          )}
          <div className="w-full max-w-[400px]">
            <label htmlFor="first-name" className="block text-[15px] sm:text-[16px] font-[600] text-[#101828]">
              First Name
            </label>
            <div className="relative">
              <input
                id="first-name"
                type="text"
                name="firstName"
                value={data.firstName}
                onChange={handleChange}
                required
                className="mt-1 w-full h-11 sm:h-12 px-4 py-2 border border-[#ccc] rounded-xl bg-white shadow-md focus:outline-none text-sm sm:text-base"
                placeholder="Enter your first name"
              />
            </div>
          </div>

          <div className="w-full max-w-[400px]">
            <label
              htmlFor="last-name"
              className="block text-[15px] sm:text-[16px] font-[600] text-[#101828]"
            >
              Last Name
            </label>
            <div className="relative">
              <input
                id="last-name"
                type="text"
                name="lastName"
                value={data.lastName}
                onChange={handleChange}
                required
                className="mt-1 w-full h-11 sm:h-12 px-4 py-2 border border-[#ccc] rounded-xl bg-white shadow-md focus:outline-none text-sm sm:text-base"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div className="w-full max-w-[400px]">
            <label
              htmlFor="email"
              className="block text-[15px] sm:text-[16px] font-[600] text-[#101828]"
            >
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                required
                className="mt-1 w-full h-11 sm:h-12 px-4 py-2 border border-[#ccc] rounded-xl bg-white shadow-md focus:outline-none text-sm sm:text-base"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <label className="w-full max-w-[400px] inline-flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="form-checkbox w-4 h-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="text-xs sm:text-sm text-gray-800">
              I agree to the{" "}
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
            disabled={isLoading || !isFormValid}
            className="w-full max-w-[400px] mx-auto py-2 px-4 bg-[#004085] hover:bg-blue-700 text-white rounded-xl disabled:opacity-50 text-sm sm:text-base"
          >
            {isLoading ? <BeatLoader /> : "Continue"}
          </button>
        </form>
      </div>

    {userExist && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={() => setUserExist(false)}>
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-[90%]">
          <p className="mb-4">You already have an account. Please login to continue.</p>
          <button
            onClick={() => {
              setUserExist(false);
              navigate("/login");
            }}
            className="w-full h-12 bg-[#004085] text-white rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </div>
    )}

      <div className="h-5 w-full" />
    </div>
  );
}