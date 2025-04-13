import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io";
import ImageUploadWithPreview from "../../components/Admin/ImageUpload";
import CustomSelect from "../../components/dashboard/CustomSelect";
import RichTextEditor from "../../components/Admin/RichTextEditor";
import { createCourse, getCourseDetails, updateAdmissionLogic } from "../../services/schools";
import { useAuth } from "../../contexts/useAuth";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import AdmissionRequirements from "../../components/Admin/AdmissionRequirements";
import AdmissionRules from "../../components/Admin/AdmissionRules";
import { ErrorObjType, RequirementList, Rule, Condition } from "../../types/course.types";

type ExamEntry = {
  examType: string;
  operator: string;
};

const programLevelList = ["Bachelor Degree", "Masters Degree", "Diploma", "PGD", "PHD"]

const programDurationList = ["1", "2", "3", "4"]

const periodList = ["YEARS", "MONTHS", "WEEKS"]

const scholarshipList = ["No Scholarship", "Partial Scholarship", "Full Scholarship"]

const currencies = ["NGN", "USD", "EUR"]; // 

export default function AddCourse () {
  const { schoolId } = useParams<{ schoolId: string}>();
  const { token, currentCourseID, setCurrentCourseID } = useAuth();
  const navigate = useNavigate()
  const [requirementList, setRequirementList] = useState<RequirementList[]>([]);
  const [rules, setRules] = useState<Rule[]>([{
    ruleName: '',
    conditions: [{ examType: '', operator: 'or' }],
  }]);
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
  const [courseDescription, setCourseDescription] = useState("");
  const [loanDescription, setLoanDescription] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTwo, setIsLoadingTwo] = useState(false);
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
  const [tempRules1, setTempRules1] = useState<any>(null) 


  const handleCurrencyChange = (selectedCurrency: string) => {
    setCurrency(selectedCurrency);
    setShowCurrencyDropdown(false);
  };

  const [responseObj, setResponseObj] = useState({} as any)

  const [activeTab, setActiveTab] = useState("tab1");

  const [calledCreatedCourseAPI, setCalledCreatedCourseAPI] = useState(false)

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

  const handleIsScholarshipError = () => {
    setErrorObj((prev) => ({...prev, isScholarship: false}))
  }


  const checkAllFields = () => {
    if (title.length === 0) {
      setErrorObj((prev) => ({...prev, title: true}))
    }
    if (courseDescription.length === 0) {
      setErrorObj((prev) => ({...prev, courseDescription: true}))
    }

    if (isScholarship.length === 0) {
      setErrorObj((prev) => ({...prev, isScholarship: true}))
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
    if (previewUrl && title.length > 0 && courseDescription && website.length > 0 && acceptanceFee.length > 0 &&
      coursePrice.length > 0 && courseDuration.length > 0 && programLevel.length > 0 && isScholarship.length > 0
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


    try {
      setIsLoading(true)
      const response =   await createCourse(formData, token as string, currentCourseID ? currentCourseID : undefined)
      console.log("response: ", response)
      setCalledCreatedCourseAPI(true)
      if (currentCourseID) {
        toast.success("Course Updated Successfully");
      } else {
        toast.success("Course Created Successfully");
      }
      if (response.status === 201) {
        setCurrentCourseID(response.data.id)
      }
      // navigate(-1);
      setActiveTab("tab2")
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
      setCoursePriceCurrency(tempCourse.currency)

      let tempRules = {} as any
      Object.keys(tempCourse).forEach((key) => {
        if (key.startsWith("Adminrule")) {
          const ruleIndex = parseInt(key.replace("Adminrule", "")) - 1;
          const ruleValue = tempCourse[key];
          tempRules[`Adminrule${ruleIndex + 1}`] = ruleValue;
        }
      })
      setTempRules1(tempRules)
    }
  }

  const verifyTabChange = () => {
    if (currentCourseID) {
      return true
    } else if (calledCreatedCourseAPI) {
      return true
    }
    return false
  }


  const handleTabChange = (tab:string) => {
    if (tab === "tab1") {
      setActiveTab("tab1")
    } else if (verifyTabChange()) {
      setActiveTab("tab2")
    }
  }
  
  function buildExamString(exams: ExamEntry[]): string {
    if (exams.length === 0) return "";
  
    // Start with the first examType
    let result = exams[0].examType;
  
    // Append the rest with operator and examType
    for (let i = 1; i < exams.length; i++) {
      result += ` ${exams[i].operator} ${exams[i].examType}`;
    }
  
    return result;
  }


  const handleUpdateLogic = async () => {
    setIsLoadingTwo(true)

    let temPayload:any = {}

    const maxEntries = 10;

    for (let i = 0; i < maxEntries; i++) {
      if (i < requirementList.length) {
        const elem = requirementList[i];
        temPayload[`ExamCountry${i + 1}`] = elem.location;
        temPayload[`ExamType${i + 1}`] = elem.examType;
        temPayload[`ExamType${i + 1}Subjects`] = elem.subjects.map(sub => sub.subject);
        temPayload[`ExamType${i + 1}SubGrades`] = elem.subjects.map(sub => sub.grade);
      } else {
        // Pad with nulls
        temPayload[`ExamCountry${i + 1}`] = "";
        temPayload[`ExamType${i + 1}`] = "";
        temPayload[`ExamType${i + 1}Subjects`] = null;
        temPayload[`ExamType${i + 1}SubGrades`] = null;
      }
    }

    const maxRules = 5;

    for (let i = 0; i < maxRules; i++) {
      if (i < rules.length) {
        temPayload[`Adminrule${i + 1}`] = buildExamString(rules[i].conditions);
      } else {
        temPayload[`Adminrule${i + 1}`] = "";
      }
    }

    console.log("temPayload: ", temPayload)
    temPayload = { ...temPayload, id: currentCourseID }

    try {
      let response = await updateAdmissionLogic(temPayload, token as string, currentCourseID as string)
      console.log("response of updateAdmissionLogic: ", response)
      toast.success("Admission Logic Created Successfully")
      navigate(-1)
    } catch(err) {
      toast.error("Failed to create admission logic")
    }
    finally {
      setIsLoadingTwo(false)
    }
  }

  useEffect(() => {
    if (!tempRules1) return;
  
    const isValidOperator = (op: string): op is "or" | "+" => op === "or" || op === "+";
  
    const parsedRules: Rule[] = Object.entries(tempRules1)
      .filter(([key, value]) => key.toLowerCase().startsWith("adminrule") && value)
      .map(([key, value]) => {
        const tokens = (value as string).trim().split(/\s+/);
        const conditions: Condition[] = [];
  
        for (let i = 0; i < tokens.length; i++) {
          const token = tokens[i];
          if (i === 0) {
            conditions.push({ examType: token, operator: "or" });
          } else if (isValidOperator(token)) {
            const nextExam = tokens[i + 1];
            if (nextExam) {
              conditions.push({ examType: nextExam, operator: token });
              i++;
            }
          }
        }
  
        return {
          ruleName: key,
          conditions,
        };
      });
  
    setRules(parsedRules);
  }, [tempRules1]);

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
                onClick={() => 
                  handleTabChange(tabKey)
                }
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
                <p className={`text-[16px] text-[#1E1E1E] font-medium ${errorObj.isScholarship ? "text-[#F04438]" : "text-[#1E1E1E]"}`}>Scholarship*</p>
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
                  handleError={handleIsScholarshipError}
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

            <div className="w-full flex flex-col gap-y-[5px] h-[300px] relative">
              <p className={`text-[16px] text-[#1E1E1E] font-medium ${errorObj.courseDescription ? "text-[#F04438]" : "text-[#1E1E1E]"}`}>Course Description*</p>
              <RichTextEditor 
                placeholder="Write few things about the course..." 
                value={courseDescription} 
                onFocus={() => setErrorObj((prev) => ({...prev, courseDescription: false}))}
                onChange={setCourseDescription} 
              />
              <p className="text-[#737373] text-[12px] font-normal absolute bottom-[0px]">What students will learn and achieve by completing this course.</p>
            </div>


            <div className="flex mt-[0px]">
              <p className="text-[18px] font-semibold text-[#1E1E1E] w-[300px] ">
                Scholarship Requirements
              </p>
              {/* <div className="w-[100%] border-b-[2px] border-[#E0E0E0]"></div> */}
            </div>

            <div className="w-full flex flex-col gap-y-[5px] h-[300px] relative">
              <p className={`text-[16px] text-[#1E1E1E] font-medium text-[#1E1E1E]`}>Scholarship Description*</p>
              <RichTextEditor 
                value={scholarshipDescription} 
                onChange={setScholarshipDescription} 
                onFocus={() => {}}
                placeholder="Write few things about the course..."
              />
              <p className="text-[12px] text-[#737373] font-normal absolute bottom-[0px]">Details about scholarship</p>
            </div>

            <div className="flex mt-[0px]">
              <p className="text-[18px] font-semibold text-[#1E1E1E] w-[210px] ">
                Loan Requirements
              </p>
              {/* <div className="w-[100%] border-b-[2px] border-[#E0E0E0]"></div> */}
            </div>

            <div className="w-full flex flex-col gap-y-[5px] h-[300px]  relative">
              <p className={`text-[16px] text-[#1E1E1E] font-medium text-[#1E1E1E]`}>Loan Description*</p>
              <RichTextEditor 
                placeholder="Write few things about the course..." 
                value={loanDescription} 
                onChange={setLoanDescription}
                onFocus={() => {}}
              />
              <p className="text-[12px] text-[#737373] font-normal absolute bottom-[0px]">Details about loan eligibility, terms, and application process for this course.</p>
            </div>
            
            <div className="flex gap-x-[20px] mt-[20px]">
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
              schoolData={responseObj}
            />

            <AdmissionRules 
              requirementList={requirementList}
              setRules={setRules}
              rules={rules}
              // schoolData={responseObj}
              // tempRules={extractAdminRules()}
            />

            <div className="mt-5">
              <button onClick={handleUpdateLogic} className="rounded-lg w-full h-[40px] bg-[#004085] text-[14px] text-[white] semi-bold cursor-pointer">
                {isLoadingTwo ? <BeatLoader /> : currentCourseID ? "Update Admission Logic" : "Create Admission Logic"}
              </button>
            </div>
          </div>


        }
      </div>
    </div>
    
  )
}