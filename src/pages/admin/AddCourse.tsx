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

export default function AddCourse () {
  const { schoolId } = useParams<{ schoolId: string}>();
  const { token, currentCourseID } = useAuth();
  const navigate = useNavigate()
  const [errorObj, setErrorObj] = useState({
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
    durationPeriod: false
  })
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

  const [responseObj, setResponseObj] = useState({} as any)

  const programLevelList = ["100", "200", "300", "400"]

  const programDurationList = ["1", "2", "3", "4"]

  const periodList = ["YEAR", "MONTH"]

  const scholarshipList = ["Available", "Not Available"]

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
    if (previewUrl && title.length > 0 && courseDescription && loanDescription.length > 0 && 
      scholarshipDescription.length > 0 && website.length > 0 && website.length > 0 && acceptanceFee.length > 0 &&
      coursePrice.length > 0 && courseDuration.length > 0 && programLevel.length > 0
    ) {
      return true
    } else {
      return false
    }
  }

  const handleCancel = () => {
    
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
        formData.append("profile", imageFile)
      } else {
        formData.append("profile", responseObj?.profile)
      }
    } else {
      formData.append("profile", imageFile!) 
    }

    formData.append("title", title)
    formData.append("schoolId", schoolId!)
    formData.append("scholarship", isScholarship)
    formData.append("duration", courseDuration)
    formData.append("durationPeriod", durationPeriod)
    formData.append("price", coursePrice)
    formData.append("currency", "NAIRA")
    formData.append("acceptanceFee", acceptanceFee)
    formData.append("acceptanceFeeCurrency", "NAIRA")
    formData.append("description", courseDescription)  
    formData.append("requirements", JSON.stringify(["High school","diploma","equivalent"]))
    formData.append("courseInformation", "course Information here")
    formData.append("programLevel", programLevel)
    // formData.append("careerOpportunities", JSON.stringify('["first opportunity","second opportunity","third opportunity"]'))
    formData.append("estimatedLivingCost", "50000")
    formData.append("loanInformation", "five years apart or more")
    formData.append("courseWebsiteUrl", website)

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

      setPreviewUrl(tempCourse.profile)
      setTitle(tempCourse.title)
      setWebsite(tempCourse.courseWebsiteUrl)
      setProgramLevel(tempCourse.programLevel)
      setCourseDuration(tempCourse.duration)
      setDurationPeriod(tempCourse.durationPeriod)
      setIsScholarship(tempCourse.scholarship)
      setAcceptanceFee(tempCourse.acceptanceFee)
      setCoursePrice(tempCourse.price)
      setLoanDescription(tempCourse.loanInformation)
      setCourseDescription(tempCourse.description)
    }
  }


  return (
    <div className="relative">
      <div className="flex flex-col w-full gap-5 p-5 xl:p-6">

        <div onClick={() => navigate(-1)} className="flex gap-x-[5px] items-center">
          <IoIosArrowBack className="h-4 w-4" />
          <p className="text-[#004085] text-[14px] font-medium cursor-pointer">Go back</p>
        </div> 

        <form className="w-full h-[2050px] bg-[#FAFAFA] border-[2px] border-[#E0E0E0] rounded-lg flex flex-col gap-5 p-5">
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
              <input
                type="number"
                placeholder="0.00"
                name="AcceptanceFee"
                onFocus={() => setErrorObj((prev) => ({...prev, acceptanceFee: false}))}
                value={acceptanceFee}
                onChange={(e) => setAcceptanceFee(e.target.value)}
                className="border-[1px] px-[10px] rounded-md border-[#E9E9E9] py-2 focus:outline-none w-full text-[16px] font-[400] text-[black]"
              />
            </div>

            <div className="w-full flex flex-col gap-y-[5px]">
              <p className={`text-[16px] text-[#1E1E1E] font-medium ${errorObj.coursePrice ? "text-[#F04438]" : "text-[#1E1E1E]"}`}>Course Price*</p>
              <input
                type="number"
                placeholder="0.00"
                name="CoursePrice"
                onFocus={() => setErrorObj((prev) => ({...prev, coursePrice: false}))}
                value={coursePrice}
                onChange={(e) => setCoursePrice(e.target.value)}
                className="border-[1px] px-[10px] rounded-md border-[#E9E9E9] py-2 focus:outline-none w-full text-[16px] font-[400] text-[black]"
              />
            </div>

          </div>

          <div className="w-full flex flex-col gap-y-[5px] h-max">
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
          </div>
          
          <div className="flex gap-x-[20px] mt-[50px]">
            <button type="button" onClick={handleCancel} className="rounded-lg w-full h-[40px] bg-[#D9E2ED] text-[14px] text-[#004085] semi-bold cursor-pointer">Cancel</button>

            <button type="button" onClick={handleSubmit} className="rounded-lg w-full h-[40px] bg-[#004085] text-[14px] text-[white] semi-bold cursor-pointer">
              {isLoading ? <BeatLoader /> : currentCourseID ? "Update Course" : "Add Course"}
            </button>

          </div>

        </form>

      </div>
    </div>
    
  )
}