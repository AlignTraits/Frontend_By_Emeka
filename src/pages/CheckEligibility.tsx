import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../contexts/useAuth";
import BeatLoader from "react-spinners/BeatLoader";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { ErrorObjType, RequirementList } from "../types/course.types";
import AdmissionRequirements from "../components/Admin/AdmissionRequirements";
import { getCourseDetails } from "../services/schools";
import { toast } from "react-toastify";
import { checkEligibility, getUser } from "../services/utils";
import { createAcademicRecords, updateAcademicRecords } from "../services/utils";
import { ClipLoader } from "react-spinners";


export default function CheckEligibility() {
  const {error, token, user, academicRecord, academicRecordId} = useAuth()
  const { courseId } = useParams<{ courseId: string}>();
  const navigate = useNavigate()

  const [agreed, setAgreed] = useState(false);
  const [userExist, setUserExist] = useState(false)
  // const [adminExamType, setAdminExamType] = useState<string[]>([]);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  const [getCourseLoading, setGetCourseLoading] = useState(false)
  
  const [responseObj, setResponseObj] = useState({} as any)
  const [responseObjTwo, setResponseObjTwo] = useState({} as any)

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

 
  const [isLoading, setIsLoading] = useState(false)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const [displayRequirements, setDisplayRequirements] = useState(false);

  const isFormValid = data.firstName.length > 0 && data.lastName.length > 0 && data.email.length > 0 && agreed;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (agreed) {
      // localStorage.setItem("pathway-data", JSON.stringify(data));
      // navigate("/questionaire")

      // store first name, last name, and email in localStorage
      localStorage.setItem("eligibility-data", JSON.stringify({...data, schoolLocation: responseObj?.university?.region}));
      setIsLoading(true)
      try {
        const response = await getUser(data.email);
        if (response?.ok) {
          setUserExist(true)
        } else {
          setDisplayRequirements(true)
        }
        setResponseObjTwo(response)
        localStorage.setItem("userData", JSON.stringify(response))
      } catch (err) {
        toast.error("Error in getting user details!")
      } finally {
        setIsLoading(false)
      }
    }    
  };

  const handleClick = () => {
    // You can open a modal or do nothing
    navigate("/terms-and-conditions");
  };  

  useEffect(() => {
    getCourse()
    setRequirementList([...academicRecord])

    if (token) {
      setDisplayRequirements(true)
    } else {
      setDisplayRequirements(false)
    }
  }, [])

  const hasFetched = useRef(false);

  useEffect(() => {
    // Store academic record in context for this to work
    if (token && token.length > 0 && academicRecord.length >= 2 && responseObjTwo?.ok && Object.keys(responseObj).length > 0 && !hasFetched.current) {
      hasFetched.current = true;
      checkEligibilityTwo()
    } 
  }, [responseObjTwo, responseObj])


  useEffect(() => {
    if (token && token.length > 0 ) {
      setData({
        firstName: user?.firstname || "",
        lastName: user?.lastname || "",
        email: user?.email || ""
      });
      localStorage.setItem("userData", JSON.stringify({
        data: user,
        message: "User found",
        ok: true
      }))
      setResponseObjTwo({
        data: user,
        message: "User found",
        ok: true
      })

      localStorage.setItem("eligibility-data", JSON.stringify({...data, schoolLocation: responseObj?.university?.region}));
    }
  }, [responseObj])

  const getCourse = async () => {
    try {
      setGetCourseLoading(true)
      if (courseId && courseId.length > 0) {
        const tempCourse = await getCourseDetails(courseId)

        setResponseObj(tempCourse)

        let tempArray:any = []

        for (let i = 1; i < 11; i++) {
          if (tempCourse[`ExamType${i}`]?.length > 0) {
            tempArray.push(tempCourse[`ExamType${i}`])
          }
        }
      }
    } catch(e:any) {
      console.log(e)
    } finally {
      setGetCourseLoading(false)
    }

  }


  const handleEligibilityCheck = async () => {
    console.log("running 1")
    if (requirementList.length === 0) {
      toast.error("Please select at least one exam type to proceed.");
      return
    }
      
    const newList = [...requirementList, ...academicRecord]

    const maxEntries = 10;

    let temPayloadTwo:any = {}

    for (let i = 0; i < maxEntries; i++) {
      if (i < newList.length) {
        const elem = newList[i];
        temPayloadTwo[`ExamCountry${i + 1}`] = elem.location;
        temPayloadTwo[`ExamType${i + 1}`] = elem.examType;
        temPayloadTwo[`ExamType${i + 1}Subjects`] = elem.subjects.map(sub => sub.subject);
        temPayloadTwo[`ExamType${i + 1}SubGrades`] = elem.subjects.map(sub => sub.grade);
      } else {
        // Pad with nulls
        temPayloadTwo[`ExamCountry${i + 1}`] = "";
        temPayloadTwo[`ExamType${i + 1}`] = "";
        temPayloadTwo[`ExamType${i + 1}Subjects`] = null;
        temPayloadTwo[`ExamType${i + 1}SubGrades`] = null;
      }
    }


    let tempPayload:any = []

    let mainPayload:any = {}

    newList.forEach((item) => {
      let tempSubject: string[] = []
      let tempGrade: string[] = []

      item.subjects.forEach((item) => {
        tempGrade.push(item.grade)
      })

      item.subjects.forEach((item) => {
        tempSubject.push(item.subject)
      })

      tempPayload.push({
        "examType": item.examType,
        "subjects": tempSubject,
        "grades": tempGrade
      })
    })

    mainPayload["email"] = token ? user?.email : data.email;
    mainPayload["courseId"] = courseId;
    mainPayload["exams"] = tempPayload;
    mainPayload["preferences"] = {
      "university": responseObj?.university?.name
    }


    try {
      setIsLoading(true)
      let now = new Date()
      const expiredate = responseObjTwo?.data?.payment_plan_expires_at ? new Date(responseObjTwo?.data?.payment_plan_expires_at) : now;

      // Update academic records if user is logged-in
      if (token && token.length > 0) {
        if (academicRecordId.length > 0) {
          await updateAcademicRecords(temPayloadTwo, academicRecordId)
        } else {
          await createAcademicRecords(temPayloadTwo);
        }
      } 
      // else {
      //   temPayloadTwo['email'] = data.email
      //   await createAcademicRecordsByEmail(temPayloadTwo)
      // }

      if (responseObjTwo?.data?.subscriptionPlanStatus && expiredate > now && responseObjTwo?.ok) {
        const response = await checkEligibility(mainPayload);
        console.log("response: ", response);
        if (token && token.length > 0) {
          toast.success("Check eligibility results in your dashboard");
          setTimeout(() => {
            navigate("/dashboard/school?tab=-1")
          }, 1000) 
        } else {
          toast.success("Please login and check eligibility results in your dashboard");
          setTimeout(() => {
            navigate("/login")
          }, 1000) 
        }
      } else if (!responseObjTwo?.data?.subscriptionPlanStatus || expiredate <= now || !responseObjTwo?.ok) {
        toast.error("No active subscription, make payment!");
        localStorage.setItem("eligibilityPayload", JSON.stringify(mainPayload))
        setTimeout(() => {
          navigate("/select-payment")
        }, 1000) 
      }

    } catch (e:any) {
      console.log("error: ", e)
    } finally {
      setIsLoading(false);
    }
  }

  const checkEligibilityTwo = async () => {
    console.log("running 2")
    if (academicRecord.length < 2) {
      return
    }
    const newList = [ ...academicRecord ]

    const maxEntries = 10;

    let temPayloadTwo:any = {}

    for (let i = 0; i < maxEntries; i++) {
      if (i < newList.length) {
        const elem = newList[i];
        temPayloadTwo[`ExamCountry${i + 1}`] = elem.location;
        temPayloadTwo[`ExamType${i + 1}`] = elem.examType;
        temPayloadTwo[`ExamType${i + 1}Subjects`] = elem.subjects.map(sub => sub.subject);
        temPayloadTwo[`ExamType${i + 1}SubGrades`] = elem.subjects.map(sub => sub.grade);
      } else {
        // Pad with nulls
        temPayloadTwo[`ExamCountry${i + 1}`] = "";
        temPayloadTwo[`ExamType${i + 1}`] = "";
        temPayloadTwo[`ExamType${i + 1}Subjects`] = null;
        temPayloadTwo[`ExamType${i + 1}SubGrades`] = null;
      }
    }

    let tempPayload:any = []

    let mainPayload:any = {}

    newList.forEach((item) => {
      let tempSubject: string[] = []
      let tempGrade: string[] = []

      item.subjects.forEach((item) => {
        tempGrade.push(item.grade)
      })

      item.subjects.forEach((item) => {
        tempSubject.push(item.subject)
      })

      tempPayload.push({
        "examType": item.examType,
        "subjects": tempSubject,
        "grades": tempGrade
      })
    })

    mainPayload["email"] = token ? user?.email : data.email;
    mainPayload["courseId"] = courseId;
    mainPayload["exams"] = tempPayload;
    mainPayload["preferences"] = {
      "university": responseObj?.university?.name
    }

    try {
      setIsLoading(true)
      let now = new Date()
      const expiredate = responseObjTwo?.data?.payment_plan_expires_at ? new Date(responseObjTwo?.data?.payment_plan_expires_at) : now;

      // Update academic records if user is logged-in
      if (responseObjTwo?.data?.subscriptionPlanStatus && expiredate > now && responseObjTwo?.ok) {
        const response = await checkEligibility(mainPayload);
        console.log("response: ", response);
        toast.success("Check eligibility results in your dashboard");
        setTimeout(() => {
          navigate("/dashboard/school?tab=-1")
        }, 1000)
      } else if (!responseObjTwo?.data?.subscriptionPlanStatus || expiredate <= now || !responseObjTwo?.ok) {
        toast.error("No active subscription, make payment!");
        localStorage.setItem("eligibilityPayload", JSON.stringify(mainPayload))
        setTimeout(() => {
          navigate("/select-payment")
        }, 1000) 
      }

    } catch (e:any) {
      console.log("error: ", e)
    } finally {
      setIsLoading(false);
    }
 
  }

  const handleNavigate = () => {
    if (token) {
      navigate("/dashboard")
    } else {
      navigate("/search")
    }
  }

  return (
    <div className={`relative ${displayRequirements ? "size-max": "h-screen" } w-full bg-gradient-to-br from-[#CCE0F5] via-[#e9eff7] to-white`}>
      <Header />

      <div
        className="flex gap-x-2 items-center ml-4 mt-4 cursor-pointer sm:ml-8 sm:mt-6"
        onClick={handleNavigate}
      >
        <FaLongArrowAltLeft className="text-[#004085] text-lg sm:text-xl" />
        <p className="text-[#004085] text-sm sm:text-base">Back to Explore</p>
      </div>

      {
        getCourseLoading ?  
        <div className="h-screen w-full flex flex-col justify-center items-center">
          <ClipLoader color="#004085" size={40} />
        </div>:
        displayRequirements ? (
        <div className="mt-[20px] space-y-2 w-[98%] md:w-[650px] px-5 sm:px-0 mx-auto">
          <p className="text-base sm:text-lg font-semibold">Eligibility Check*</p>
          <div className="w-full p-3 sm:p-6 bg-white rounded-lg shadow-lg border-0 sm:border-[1px] border-[#ccc]">
            <AdmissionRequirements 
              errorObj={errorObj}
              setErrorObj={setErrorObj}
              requirementList={requirementList}
              setRequirementList={setRequirementList}
              schoolData={null}
              // adminExamType={adminExamType}
              btnTitle="Exam"
              listTitle="Exam List"
            />

            <div className="flex justify-center mt-6">
              <button
                onClick={handleEligibilityCheck}
                className="w-full max-w-[200px] py-2 px-4 bg-[#757575] hover:bg-blue-700 text-white rounded-[30px] disabled:opacity-50 text-sm sm:text-base"
              >
                {isLoading ? <BeatLoader /> : "Submit"}
              </button>
            </div>
          </div>
        </div>
        ) :
        (        
          <>

            <div className="mt-[20px] mx-[20px]">
              <p className="text-[#101828] text-lg sm:text-2xl font-semibold w-full max-w-[500px] mx-auto mb-3 text-center">Personal Details</p>
              <form
                onSubmit={(e) => handleSubmit(e)}
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
                      type={"text"}
                      name="firstName"
                      value={data.firstName}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full h-11 sm:h-12 px-4 py-2 border border-[#ccc] rounded-xl bg-white shadow-md focus:outline-none text-sm sm:text-base"
                      placeholder="Enter your new first name"
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
                      type={"text"}
                      name="lastName"
                      value={data.lastName}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full h-11 sm:h-12 px-4 py-2 border border-[#ccc] rounded-xl bg-white shadow-md focus:outline-none text-sm sm:text-base"
                      placeholder="Enter your last name"
                      // value={confirmPassword}
                      // onChange={(e) => setConfirmPassword(e.target.value)}
                      // onFocus={resetInput}
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
                      type={"email"}
                      name="email"
                      value={data.email}  
                      onChange={handleChange}
                      required
                      className="mt-1 w-full h-11 sm:h-12 px-4 py-2 border border-[#ccc] rounded-xl bg-white shadow-md focus:outline-none text-sm sm:text-base"
                      placeholder="Enter your email"
                      // value={confirmPassword}
                      // onChange={(e) => setConfirmPassword(e.target.value)}
                      // onFocus={resetInput}
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
                  {/* {"Continue"} */}
                  {isLoading ? <BeatLoader /> : "Continue"}
                </button>
              </form>
            </div>
          </>
        )
      }

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