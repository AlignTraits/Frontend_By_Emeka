import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../contexts/useAuth";
import BeatLoader from "react-spinners/BeatLoader";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { ErrorObjType, RequirementList } from "../types/course.types";
import AdmissionRequirements from "../components/Admin/AdmissionRequirements";
import { getCourseDetails } from "../services/schools";
import { toast } from "react-toastify";


export default function CheckEligibility() {
  const {error, isLoading} = useAuth()
  const { courseId } = useParams<{ courseId: string}>();
  const navigate = useNavigate()

  const [agreed, setAgreed] = useState(false);
  const [adminExamType, setAdminExamType] = useState<string[]>([]);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });
  
  // const [responseObj, setResponseObj] = useState({} as any)

  const [requirementList, setRequirementList] = useState<RequirementList[]>([]);
  const [errorObj, setErrorObj] = useState<ErrorObjType>({
    title: false,
    courseDescription: false,
    loanDescription: false,
    scholarshipDescription: false,
    isScholarship: false,
    website: false,
    acceptanceFee: false,
    coursePrice: false,
    previewUrl: false,
    courseDuration: false,
    programLevel: false,
    durationPeriod: false,
    programLocation: false,
    examType: false
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const [displayRequirements, setDisplayRequirements] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (agreed) {
      // localStorage.setItem("pathway-data", JSON.stringify(data));
      // navigate("/questionaire")
      setDisplayRequirements(true)
    }    
  };

  const handleClick = () => {
    // You can open a modal or do nothing
    console.log('Terms & Privacy clicked');
  };  

  useEffect(() => {
    getCourse()
  }, [])

  const getCourse = async () => {
    if (courseId && courseId.length > 0) {
      const tempCourse = await getCourseDetails(courseId)
      // setResponseObj(tempCourse)

      let tempArray:any = []

      for (let i = 1; i < 11; i++) {
        if (tempCourse[`ExamType${i}`].length > 0) {
          tempArray.push(tempCourse[`ExamType${i}`])
        }
      }
      setAdminExamType(tempArray)
      // console.log("tempArray: ", tempArray)
    }
  }

  const handleEligibilityCheck = () => {
    if (requirementList.length === 0) {
      toast.error("Please select at least one exam type to proceed.");
      return
    }
    navigate("/select-payment")
  }

  return (
    <div className={`relative ${displayRequirements ? "size-max": "h-screen" } w-full bg-gradient-to-br from-[#CCE0F5] via-[#e9eff7] to-white`}>
      <Header />

      <div className="flex gap-x-[10px] items-center ml-[30px] mt-[20px] cursor-pointer" onClick={() => navigate(-1)}>
        <FaLongArrowAltLeft className="text-[#004085]" />
        <p className="text-[#004085]">Back to Explore</p>
      </div>

      {
        displayRequirements ? (
          <div className="mt-[20px] space-y-2 w-[700px] mx-auto">
            <p>Eligibility Check*</p>
            <div className="w-full p-6 bg-white rounded-lg shadow-lg border-[#ccc] border-[1px]">
              <AdmissionRequirements 
                errorObj={errorObj}
                setErrorObj={setErrorObj}
                requirementList={requirementList}
                setRequirementList={setRequirementList}
                schoolData={null}
                adminExamType={adminExamType}
                btnTitle="Exam"
                listTitle="Exam List"
              />

              <div className="flex justify-center mt-6">
                <button onClick={handleEligibilityCheck} className="w-[200px] py-2 px-4 bg-[#757575] hover:bg-blue-700 text-white rounded-[30px] disabled:opacity-50">
                  Submit
                </button>
              </div>
            </div>

          </div>
        ) :
        (        
          <>

            <div className="mt-[20px]">
              <p className="text-[#101828] text-[20px] font-semibold w-[500px] mx-auto mb-[10px]">Personal Details</p>
              <form
                onSubmit={(e) => handleSubmit(e)}
                className="mx-auto space-y-4 flex flex-col items-center w-[500px] space-y-5 p-6 bg-white rounded-lg shadow-lg border-[#ccc] border-[1px]"
              >
                {error && (
                  <div className="bg-red-50 text-red-500 p-3 rounded">{error}</div>
                )}
                <div className="w-[400px]">
                  <label htmlFor="first-name" className="block text-[16px] font-[600] text-[#101828]">
                    First Name
                  </label>
                  <div className="relative">
                    <input
                      id="first-name"
                      type={"text"}
                      name="firstName"
                      value={data.firstName}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full h-12 px-4 py-3 border-[1px] border-[#ccc] rounded-full bg-white shadow-md focus:outline-none"
                      placeholder="Enter your new first name"
                    />
                  </div>
                </div>

                <div className="w-[400px]">
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
                      name="lastName"
                      value={data.lastName}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full h-12 px-4 py-3 border-[1px] border-[#ccc] rounded-full bg-white shadow-md focus:outline-none"
                      placeholder="Enter your last name"
                      // value={confirmPassword}
                      // onChange={(e) => setConfirmPassword(e.target.value)}
                      // onFocus={resetInput}
                    />
                  </div>
                </div>

                <div className="w-[400px]">
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
                      name="email"
                      value={data.email}  
                      onChange={handleChange}
                      required
                      className="mt-1 w-full h-12 px-4 py-3 border-[1px] border-[#ccc] rounded-full bg-white shadow-md focus:outline-none"
                      placeholder="Enter your email"
                      // value={confirmPassword}
                      // onChange={(e) => setConfirmPassword(e.target.value)}
                      // onFocus={resetInput}
                    />
                  </div>
                </div>

                <label className="w-[400px] inline-flex items-center space-x-2 cursor-pointer">
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
          </>
        )
      }

      <div className="h-[20px] w-[40px]"></div>
    </div>
  );
} 