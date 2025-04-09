import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io";
import ImageUploadWithPreview from "../../components/Admin/ImageUpload";
import CustomSelect from "../../components/dashboard/CustomSelect";
import RichTextEditor from "../../components/Admin/RichTextEditor";
import { createCourse, getCourseDetails } from "../../services/schools";
import { useAuth } from "../../contexts/useAuth";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import AdmissionRequirements from "../../components/Admin/AdmissionRequirements";
import AdmissionRules from "../../components/Admin/AdmissionRules";
import { ErrorObjType, RequirementList } from "../../types/course.types";

// import TextEditor from "../../components/Admin/TextEditorTwo";

// const CURRENCYOBJECT: Record<string, string> = {
//   NGN: "NAIRA",
//   USD: "DOLLAR",
//   EUR: "EURO",
// };

// const CURRENCYVALUE: Record<string, string> = {
//   NAIRA: "NGN",
//   DOLLAR: "USD",
//   EURO: "EUR"
// };

export default function AddCourse () {
  const { schoolId } = useParams<{ schoolId: string}>();
  const { token, currentCourseID } = useAuth();
  const navigate = useNavigate()
   const [requirementList, setRequirementList] = useState<RequirementList[]>([]);
  const [errorObj, setErrorObj] = useState<ErrorObjType>({
    title: false,
    courseDescription: false,
    loanDescription: false,
    scholarshipDescription: false,
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
  const [courseDescription, setCourseDescription] = useState("");
  const [loanDescription, setLoanDescription] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [scholarshipDescription, setScholarshipDescription] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null | ArrayBuffer>(
    null
  );
  const [title, setTitle] = useState("")
  const [website, setWebsite] = useState("")
  const [programLevel, setProgramLevel] = useState("")
  const [courseDuration, setCourseDuration] = useState("")
  const [durationPeriod, setDurationPeriod] = useState("")
  const [isScholarship, setIsScholarship] = useState("")
  const [acceptanceFee, setAcceptanceFee] = useState("")
  const [coursePrice, setCoursePrice] = useState("")

  const [currency, setCurrency] = useState<string>("NGN");
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  const [coursePriceCurrency, setCoursePriceCurrency] = useState<string>("NGN");
  const [showCoursePriceCurrencyDropdown, setShowCoursePriceCurrencyDropdown] = useState(false);

  const currencies = ["NGN", "USD", "EUR"]; // 

  const handleCurrencyChange = (selectedCurrency: string) => {
    setCurrency(selectedCurrency);
    setShowCurrencyDropdown(false);
  };

  const [responseObj, setResponseObj] = useState({} as any)

  const [activeTab, setActiveTab] = useState("tab1");

  const programLevelList = ["Associate Degree", "Master's Degree"]

  const programDurationList = ["1", "2", "3", "4"]

  const periodList = ["YEARS", "MONTHS", "WEEKS"]

  const scholarshipList = ["No Scholarship", "Partial Scholarship", "Full Scholarship"]

  const handleFileError = () => {
    setErrorObj((prev) => ({...prev, previewUrl: false}))
  }

  const handleCourseError = () => {
    setErrorObj((prev) => ({...prev, courseDuration: false}))
  }

  const handleProgramLevelError = () => {
    setErrorObj((prev) => ({...prev, programLevel: false}))
  }

  const handleDurationPeriodError = () => {
    setErrorObj((prev) => ({...prev, durationPeriod: false}))
  }

  const checkAllFields = () => {
    if (title.length === 0) {
      setErrorObj((prev) => ({...prev, title: true}))
    }
    if (courseDescription.length === 0) {
      setErrorObj((prev) => ({...prev, courseDescription: true}))
    }
    if (loanDescription.length === 0) {
      setErrorObj((prev) => ({...prev, loanDescription: true}))
    }
    if (scholarshipDescription.length === 0) {
      setErrorObj((prev) => ({...prev, scholarshipDescription: true}))
    }
    if (website.length === 0) {
      setErrorObj((prev) => ({...prev, website: true}))
    }
    if (acceptanceFee.length === 0) {
      setErrorObj((prev) => ({...prev, acceptanceFee: true}))
    }
    if (coursePrice.length === 0) {
      setErrorObj((prev) => ({...prev, coursePrice: true}))
    }

    if (!previewUrl) {
      setErrorObj((prev) => ({...prev, previewUrl: true}))
    }

    if (courseDuration.length === 0) {
      setErrorObj((prev) => ({...prev, courseDuration: true}))
    }

    if (programLevel.length === 0) {
      setErrorObj((prev) => ({...prev, programLevel: true}))
    }

    if (durationPeriod.length === 0) {
      setErrorObj((prev) => ({...prev, durationPeriod: true}))
    }
  }

  const isFormValid = () => {
    // console.log("previewUrl: ", previewUrl, typeof previewUrl)
    // console.log("title: ", title, typeof title)
    // console.log("courseDescription: ", courseDescription, typeof courseDescription)
    // console.log("loanDescription: ", loanDescription, typeof loanDescription)
    // console.log("scholarshipDescription: ", scholarshipDescription, typeof scholarshipDescription)
    // console.log("website: ", website, typeof website)
    // console.log("acceptanceFee: ", acceptanceFee, typeof acceptanceFee)
    // console.log("coursePrice: ", coursePrice, typeof coursePrice)
    // console.log("courseDuration: ", courseDuration , typeof courseDuration)
    // console.log("programLevel: ", programLevel, typeof programLevel)
    // console.log("durationPeriod: ", durationPeriod, typeof durationPeriod)
    // console.log("isScholarship: ", isScholarship, typeof isScholarship)
    // console.log("currency: ", currency, typeof currency)
    // console.log("coursePriceCurrency: ", coursePriceCurrency, typeof courseDescription)

    if (previewUrl && title.length > 0 && courseDescription && loanDescription.length > 0 && 
      scholarshipDescription.length > 0 && website.length > 0 && acceptanceFee.length > 0 &&
      coursePrice.length > 0 && courseDuration.length > 0 && programLevel.length > 0
    ) {
      return true
    } else {
      return false
    }
  }

  const handleCancel = () => {
   return false 
  }

  const handleSubmit = async () => {

    checkAllFields()

    if (!isFormValid()) {
      toast.error("Please fill all input fields!");
      return 
    }

    const formData = new FormData();

    if (Object.keys(responseObj).length > 0) {
      if (imageFile) {
        formData.append("image", imageFile)
      } else {
        formData.append("image", responseObj?.image)
      }
    } else {
      formData.append("image", imageFile!) 
    }


    formData.append("title", title)
    formData.append("schoolId", schoolId!)
    formData.append("scholarship", isScholarship)
    formData.append("duration", courseDuration)
    formData.append("durationPeriod", durationPeriod)
    formData.append("price", coursePrice)
    formData.append("currency", coursePriceCurrency);
    formData.append("acceptanceFee", acceptanceFee)
    formData.append("acceptanceFeeCurrency", currency)
    formData.append("objectives", courseDescription)  
    formData.append("requirements", JSON.stringify(["High school","diploma","equivalent"]))
    formData.append("courseInformation", "course Information here")
    formData.append("programLevel", programLevel)
    formData.append("estimatedLivingCost", "50000")
    formData.append("loanInformation", "five years apart or more")
    formData.append("courseWebsiteUrl", website)
    formData.append("scholarshipInformation", scholarshipDescription)

    // Log the key/value pairs
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + " - " + pair[1]);
    // }

    // console.log(token, createCourse)
    // setActiveTab("tab2")

    try {
      setIsLoading(true)
      const response =   await createCourse(formData, token as string, currentCourseID ? currentCourseID : undefined)
      console.log("response: ", response)
      if (currentCourseID) {
        toast.success("Course Updated Successfully");
      } else {
        toast.success("Course Created Successfully");
      }
      navigate(-1);
    } catch (error) {
      if (currentCourseID) {
        toast.error("Failed to update course");
      } else {
        toast.success("Failed to create course");
      }
    } finally {
      setIsLoading(false);
    }
    
  }

  useEffect(() => {
    getCourse()
  }, [])

  const getCourse = async () => {
    if (currentCourseID) {
      const tempCourse = await getCourseDetails(currentCourseID)
      setResponseObj(tempCourse)

      setPreviewUrl(tempCourse.image)
      setTitle(tempCourse.title)
      setWebsite(tempCourse.courseWebsiteUrl)
      setProgramLevel(tempCourse.programLevel)
      setCourseDuration(JSON.stringify(tempCourse.duration))
      setDurationPeriod(tempCourse.durationPeriod)
      setIsScholarship(tempCourse.scholarship)
      setAcceptanceFee(JSON.stringify(tempCourse.acceptanceFee))
      setCoursePrice(JSON.stringify(tempCourse.price))
      setLoanDescription(tempCourse.loanInformation)
      setCourseDescription(tempCourse.objectives)
      setCurrency(tempCourse.acceptanceFeeCurrency)
      setScholarshipDescription(tempCourse.scholarshipInformation)
    }
  }


  return (
    <div className="relative">
      <div className="flex flex-col w-full gap-5 p-5 xl:p-6">

        <div onClick={() => navigate(-1)} className="flex gap-x-[5px] items-center">
          <IoIosArrowBack className="h-4 w-4" />
          <p className="text-[#004085] text-[14px] font-medium cursor-pointer">Go back</p>
        </div> 

        <div className="flex border-b border-gray-300 ">
          {["Basic Info", "Admission Logic"].map((tab, index) => {
            const tabKey = `tab${index + 1}`;
            return (
              <button
                key={tabKey}
                className={`py-2 px-4 text-[16px] font-semibold border-b-2 font-medium transition 
                  ${
                    activeTab === tabKey
                      ? "border-[#003064] text-[#003064] text-[16px] font-semibold"
                      : "border-transparent hover:text-blue-500 text-[#999999]"
                  }`}
                onClick={() => setActiveTab(tabKey)}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {
          activeTab === "tab1" &&
          <form className="w-full size-max bg-[#FAFAFA] border-[1px] border-[#E0E0E0] rounded-lg flex flex-col gap-5 p-5">
            <div className="flex">
              <p className="text-[18px] font-semibold text-[#1E1E1E] w-[190px] ">
                Basic Information
              </p>
              <div className="w-[100%] border-b-[2px] border-[#E0E0E0]"></div>
            </div>

            <div className="flex gap-x-[20px]">
              <div className="w-full flex flex-col gap-y-[5px]">
                <p className={`text-[16px] text-[#1E1E1E] font-medium ${errorObj.title ? "text-[#F04438]" : "text-[#1E1E1E]"}`}>Course Title*</p>
                <input
                  onFocus={() => setErrorObj((prev) => ({...prev, title: false}))}
                  type="text"
                  placeholder="What is your title?"
                  name="courseTitle"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-[1px] px-[10px] rounded-md border-[#E9E9E9] py-2 focus:outline-none w-full text-[16px] font-[400] text-[black]"
                />
              </div>

              <div className="w-full flex flex-col gap-y-[5px]">
                <p className={`text-[16px] text-[#1E1E1E] font-medium ${errorObj.website ? "text-[#F04438]" : "text-[#1E1E1E]"}`}>Course Website Url*</p>
                <input
                  type="text"
                  placeholder="https://"
                  name="courseWebsite"
                  onFocus={() => setErrorObj((prev) => ({...prev, website: false}))}
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="border-[1px] px-[10px] rounded-md border-[#E9E9E9] py-2 focus:outline-none w-full text-[16px] font-[400] text-[black]"
                />
              </div>
            </div>

            <div className="w-[300px] flex flex-col gap-y-[5px]">
              <p className="text-[16px] text-[#1E1E1E] font-medium">Course Image*</p>
              <ImageUploadWithPreview
                setImageFile={setImageFile}
                imageFile={imageFile}
                previewUrl={previewUrl}
                setPreviewUrl={setPreviewUrl}
                errorState={errorObj.previewUrl}
                handleFileError={handleFileError}
                
              />
            </div>

            <div className="flex">
              <p className="text-[18px] font-semibold text-[#1E1E1E] w-[210px] ">
                Course Information
              </p>
              <div className="w-[100%] border-b-[2px] border-[#E0E0E0]"></div>
            </div>

            <div className="flex gap-x-[20px]">
              <div className="w-full flex flex-col gap-y-[5px]">
                <p className={`text-[16px] text-[#1E1E1E] font-medium ${errorObj.programLevel ? "text-[#F04438]" : "text-[#1E1E1E]"}`}>Program Level*</p>
                <CustomSelect
                  placeholder="Select Level"
                  options={programLevelList.map((level) => ({
                    value: level,
                    label: level,
                  }))}
                  onChange={(value) => setProgramLevel(value)}
                  selectedProps={{
                    value: programLevel,
                    label: programLevel
                  }}
                  handleError={handleProgramLevelError}

                />
              </div>

              <div className="w-full flex flex-col gap-y-[5px]">
                <p className={`text-[16px] text-[#1E1E1E] font-medium ${errorObj.courseDuration ? "text-[#F04438]" : "text-[#1E1E1E]"}`}>Program Duration*</p>
                <CustomSelect
                  placeholder="0"
                  options={programDurationList.map((duration) => ({
                    value: duration,
                    label: duration,
                  }))}
                  onChange={(value) => setCourseDuration(value)}
                  selectedProps={{
                    value: courseDuration,
                    label: courseDuration
                  }}
                  handleError={handleCourseError}
                />
              </div>

              <div className="w-full flex flex-col gap-y-[5px]">
                <p className={`text-[16px] text-[#1E1E1E] font-medium ${errorObj.durationPeriod ? "text-[#F04438]" : "text-[#1E1E1E]"}`}>Year*</p>
                <CustomSelect
                  placeholder="Year"
                  options={periodList.map((paramPeriod) => ({
                    value: paramPeriod,
                    label: paramPeriod,
                  }))}
                  onChange={(value) => setDurationPeriod(value)}
                  selectedProps={{
                    value: durationPeriod,
                    label: durationPeriod
                  }}
                  handleError={handleDurationPeriodError}
                />
              </div>

            </div>

            <div className="flex gap-x-[20px]">
              <div className="w-full flex flex-col gap-y-[5px]">
                <p className="text-[16px] text-[#1E1E1E] font-medium">Scholarship*</p>
                <CustomSelect
                  placeholder="Select Level"
                  options={scholarshipList.map((level) => ({
                    value: level,
                    label: level,
                  }))}
                  onChange={(value) => setIsScholarship(value)}
                  selectedProps={{
                    value: isScholarship,
                    label: isScholarship
                  }}
                  handleError={handleDurationPeriodError}
                />
              </div>

              <div className="w-full flex flex-col gap-y-[5px]">
                <p className={`text-[16px] text-[#1E1E1E] font-medium ${errorObj.acceptanceFee ? "text-[#F04438]" : "text-[#1E1E1E]"}`}>Acceptance Fee*</p>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="0.00"
                    name="AcceptanceFee"
                    onFocus={() => setErrorObj((prev) => ({...prev, acceptanceFee: false}))}
                    value={acceptanceFee}
                    onChange={(e) => setAcceptanceFee(e.target.value)}
                    className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none 
                      border-[1px] px-[10px] rounded-md border-[#E9E9E9] py-2 focus:outline-none w-full text-[16px] font-[400] text-[black]"
                  />
                  <div className="absolute h-[40px] top-[0] right-0 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                      className="h-full rounded-r-md border-l border-gray-300 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      {currency}
                      <span className="ml-1">▼</span>
                    </button>
                  </div>
                  {showCurrencyDropdown && (
                    <div className="absolute right-0 z-10 mt-1 w-20 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {currencies.map((curr) => (
                          <button
                            key={curr}
                            onClick={() => handleCurrencyChange(curr)}
                            className={`block w-full px-4 py-2 text-sm ${
                              currency === curr
                                ? "bg-blue-100 text-blue-900"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {curr}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                </div>
              </div>

              <div className="w-full flex flex-col gap-y-[5px]">
                <p className={`text-[16px] text-[#1E1E1E] font-medium ${errorObj.coursePrice ? "text-[#F04438]" : "text-[#1E1E1E]"}`}>Course Price*</p>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="0.00"
                    name="CoursePrice"
                    onFocus={() => setErrorObj((prev) => ({ ...prev, coursePrice: false }))}
                    value={coursePrice}
                    onChange={(e) => setCoursePrice(e.target.value)}
                    className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none 
                      border-[1px] px-[10px] rounded-md border-[#E9E9E9] py-2 focus:outline-none w-full text-[16px] font-[400] text-[black]"
                  />
                  <div className="absolute h-[40px] top-[0] right-0 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowCoursePriceCurrencyDropdown(!showCoursePriceCurrencyDropdown)}
                      className="h-full rounded-r-md border-l border-gray-300 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      {coursePriceCurrency}
                      <span className="ml-1">▼</span>
                    </button>
                  </div>
                  {showCoursePriceCurrencyDropdown && (
                    <div className="absolute right-0 z-10 mt-1 w-20 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {currencies.map((curr) => (
                          <button
                            key={curr}
                            onClick={() => {
                              setCoursePriceCurrency(curr);
                              setShowCoursePriceCurrencyDropdown(false);
                            }}
                            className={`block w-full px-4 py-2 text-sm ${
                              coursePriceCurrency === curr
                                ? "bg-blue-100 text-blue-900"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {curr}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>

            <div className="w-full flex flex-col gap-y-[5px] h-max ">
              <p className={`text-[16px] text-[#1E1E1E] font-medium ${errorObj.courseDescription ? "text-[#F04438]" : "text-[#1E1E1E]"}`}>Course Description*</p>
              <RichTextEditor 
                placeholder="Write few things about the course..." 
                value={courseDescription} 
                onFocus={() => setErrorObj((prev) => ({...prev, courseDescription: false}))}
                onChange={setCourseDescription} 
              />
            </div>

            <div className="flex mt-[50px]">
              <p className="text-[18px] font-semibold text-[#1E1E1E] w-[210px] ">
                Loan Requirements
              </p>
              <div className="w-[100%] border-b-[2px] border-[#E0E0E0]"></div>
            </div>

            <div className="w-full flex flex-col gap-y-[5px] h-max">
              <p className={`text-[16px] text-[#1E1E1E] font-medium ${errorObj.loanDescription ? "text-[#F04438]" : "text-[#1E1E1E]"}`}>Loan Description*</p>
              <RichTextEditor 
                placeholder="Write few things about the course..." 
                value={loanDescription} 
                onChange={setLoanDescription}
                onFocus={() => setErrorObj((prev) => ({...prev, loanDescription: false}))}
              />
              {/* <p className="text-[12px] text-[#737373] font-normal">What students will learn and achieve by completing this course.</p> */}
            </div>

            <div className="flex mt-[50px]">
              <p className="text-[18px] font-semibold text-[#1E1E1E] w-[300px] ">
                Scholarship Requirements
              </p>
              <div className="w-[100%] border-b-[2px] border-[#E0E0E0]"></div>
            </div>

            <div className="w-full flex flex-col gap-y-[5px] h-max">
              <p className={`text-[16px] text-[#1E1E1E] font-medium ${errorObj.scholarshipDescription ? "text-[#F04438]" : "text-[#1E1E1E]"}`}>Scholarship Description*</p>
              <RichTextEditor 
                value={scholarshipDescription} 
                onChange={setScholarshipDescription} 
                onFocus={() => setErrorObj((prev) => ({...prev, scholarshipDescription: false}))}
                placeholder="Write few things about the course..."
              />
              {/* <p className="text-[12px] text-[#737373] font-normal">What students will learn and achieve by completing this course.</p> */}
            </div>
            
            <div className="flex gap-x-[20px] mt-[50px]">
              <button type="button" onClick={handleCancel} className="rounded-lg w-full h-[40px] bg-[#D9E2ED] text-[14px] text-[#004085] semi-bold cursor-pointer">Cancel</button>

              <button type="button" onClick={handleSubmit} className="rounded-lg w-full h-[40px] bg-[#004085] text-[14px] text-[white] semi-bold cursor-pointer">
                {isLoading ? <BeatLoader /> : currentCourseID ? "Update Course" : "Add Course"}
              </button>

            </div>

          </form>
        }

        {
          activeTab === "tab2" &&
          <div>
            <AdmissionRequirements 
              errorObj={errorObj}
              setErrorObj={setErrorObj}
              requirementList={requirementList}
              setRequirementList={setRequirementList}
            />

            <AdmissionRules 
              requirementList={requirementList}
            />

            <div className="mt-5">
              <button className="rounded-lg w-full h-[40px] bg-[#004085] text-[14px] text-[white] semi-bold cursor-pointer">
                {isLoading ? <BeatLoader /> : currentCourseID ? "Update Admission Logic" : "Create Admission Logic"}
              </button>
            </div>
          </div>


        }

        {/* {
          activeTab === "tab3" &&
          <AdmissionRules />
        } */}
      </div>
    </div>
    
  )
}