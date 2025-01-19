import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import { SignUpCredentials } from "../../types/auth.types";
import { AiOutlineEye, AiOutlineEyeInvisible, } from "react-icons/ai";
import { FcGoogle, } from "react-icons/fc";
import { FaFacebook, FaApple,  } from "react-icons/fa";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import Done from '../../assets/Done 1.png';
import BeatLoader from "react-spinners/BeatLoader";


export default function Register() {
  const { register, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<SignUpCredentials>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);


  const openMail = ()=> {
    window.open(`mailto:${credentials.email}`);
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(
        credentials.firstname,
        credentials.lastname,
        credentials.email,
        credentials.password
      );
      setSuccess(true); // Update success state
      // navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      console.error("Registration failed:", err);
      setSuccess(false); // Ensure success state is reset
    }
  };

  const isFormValid = () => {
    return (
      credentials.firstname.trim() !== "" &&
      credentials.lastname.trim() !== "" &&
      credentials.email.trim() !== "" &&
      credentials.password.trim() !== ""
    );
  };

  return (
    <>
      {success ? (
        <div className="relative min-h-screen flex justify-center bg-[#F7FAFF]">
          <div className="max-w-xl w-full space-y-8 p-20">
            <div className=" flex flex-col items-center  space-y-4">
              <FiMail className="text-6xl  " />
              <h2 className="text-3xl font-[400] text-center text-[#212121]">
                Verify with your email
              </h2>
              <div className="flex flex-col text-center space-y-4 text-[#212121]">
                <span className="text-[16px] font-[400]">
                  We’ve sent a confirmation link to your email
                </span>
                <span className="text-[16px] font-[400]">
                  {credentials.email}
                </span>
                <a
                  href={"mailto:"+ credentials.email}
                  className=" mx-auto flex justify-center py-2 px-4 bg-[#004085] hover:bg-blue-700 text-white rounded-md disabled:opacity-50"
                >
                  Open email app
                </a>
                <span className="text-[16px] font-[400] mt-2">
                  Didn’t receive the email?{" "}
                  <button
                    type="button"
                    className="text-[16px] text-[#007AFF] font-[700]"
                    onClick={() => openMail()}
                  >
                    click to resend
                  </button>
                </span>
                <button
                  className="flex mx-auto cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  <FiArrowLeft className="text-2xl" />
                  <span className="my-auto w-full">back to login</span>
                </button>
              </div>
              <div className="absolute left-[50%] top-0 bottom-0 ">
                <img src={Done} alt="AlignTraits succes image" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative min-h-screen flex items-center justify-center bg-[#F7FAFF]">
          <div className="max-w-xl w-full space-y-8 p-8 bg-white rounded-lg shadow-xl">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold text-center">
                Create Your Account
              </h2>
              <div className="text-center mt-1">
                <span className="text-[16px] font-[400]">
                  Already have an account?{" "}
                </span>
                <button
                  onClick={() => navigate("/login")}
                  className="text-[16px] text-[#007AFF] font-[700] underline"
                >
                  Login
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-[16px] font-[600]"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    required
                    className="mt-1 block w-full rounded-xl border border-[#000000] p-3"
                    placeholder="Enter your first name"
                    value={credentials.firstname}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        firstname: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-[16px] font-[600]"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    required
                    className="mt-1 block w-full rounded-xl border border-[#000000] p-3"
                    placeholder="Enter your last name"
                    value={credentials.lastname}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        lastname: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-[16px] font-[600]">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="mt-1 block w-full rounded-xl border border-[#000000] p-3"
                  placeholder="Enter your email address"
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-[16px] font-[600]"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="mt-1 block w-full rounded-xl border border-[#000000] p-3"
                    placeholder="Enter your Password"
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#004085]"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !isFormValid()}
                className="w-1/4 mx-auto flex justify-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50"
              >
                {isLoading ? <BeatLoader /> : "REGISTER"}
              </button>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      More Sign-In Options
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex gap-3 w-1/2 mx-auto">
                  <button
                    type="button"
                    className="w-full flex justify-center items-center px-2 py-4 border border-[#007AFF] shadow-sm rounded-2xl hover:bg-gray-50"
                  >
                    <FcGoogle className="text-4xl" />
                  </button>
                  <button
                    type="button"
                    className="w-full flex justify-center items-center px-2 py-4 border border-[#007AFF] shadow-sm rounded-2xl hover:bg-gray-50"
                  >
                    <FaFacebook className="text-4xl text-[#1877F2]" />
                  </button>
                  <button
                    type="button"
                    className="w-full flex justify-center items-center px-2 py-4 border border-[#007AFF] shadow-sm rounded-2xl hover:bg-gray-50"
                  >
                    <FaApple className="text-4xl" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
  
}
