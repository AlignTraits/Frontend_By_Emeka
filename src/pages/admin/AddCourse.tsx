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

  const [defaultCourseDuration, setDefaulCourseDuration] = useState("")
  const [defaultYear, setDefaultYear] = useState("")
  const [defaultLevel, setDefaultLevel] = useState("")
  const [defaultScholarship, setDefaultScholarship] = useState("")
  const [responseObj, setResponseObj] = useState({} as any)

  const programLevelList = ["100", "200", "300", "400"]

  const programDurationList = ["1", "2", "3", "4"]

  const periodList = ["YEAR", "MONTH"]

  const scholarshipList = ["Available", "Not Available"]

  const handleCancel = () => {
    
  }

  const handleSubmit = async () => {
    const formData = new FormData();

    if (Object.keys(responseObj).length > 0) {
      if (imageFile) {
        formData.append("profile", imageFile)
      } else {
        formData.append("profile", responseObj?.profile)
      }
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

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    console.log("responseObj: ", responseObj)

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
      setDefaultLevel(tempCourse.programLevel)
      setProgramLevel(tempCourse.programLevel)
      setDefaulCourseDuration(tempCourse.duration)
      setCourseDuration(tempCourse.duration)
      setDurationPeriod(tempCourse.durationPeriod)
      setDefaultYear(tempCourse.durationPeriod)
      setIsScholarship(tempCourse.scholarship)
      setDefaultScholarship(tempCourse.scholarship)
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
              <p className="text-[16px] text-[#1E1E1E] font-medium">Course Title*</p>
              <input
                type="text"
                placeholder="What is your title?"
                name="courseTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-[1px] px-[10px] rounded-md border-[#E9E9E9] py-2 focus:outline-none w-full text-[16px] font-[400] text-[black]"
              />
            </div>

            <div className="w-full flex flex-col gap-y-[5px]">
              <p className="text-[16px] text-[#1E1E1E] font-medium">Course Website Url*</p>
              <input
                type="text"
                placeholder="https://"
                name="courseWebsite"
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
              <p className="text-[16px] text-[#1E1E1E] font-medium">Program Level*</p>
              <CustomSelect
                placeholder="Select Level"
                options={programLevelList.map((level) => ({
                  value: level,
                  label: level,
                }))}
                onChange={(value) => setProgramLevel(value)}
                selectedProps={{
                  value: defaultLevel,
                  label: defaultLevel
                }}

              />
            </div>

            <div className="w-full flex flex-col gap-y-[5px]">
              <p className="text-[16px] text-[#1E1E1E] font-medium">Program Duration*</p>
              <CustomSelect
                placeholder="0"
                options={programDurationList.map((duration) => ({
                  value: duration,
                  label: duration,
                }))}
                onChange={(value) => setCourseDuration(value)}
                selectedProps={{
                  value: defaultCourseDuration,
                  label: defaultCourseDuration
                }}
              />
            </div>

            <div className="w-full flex flex-col gap-y-[5px]">
              <p className="text-[16px] text-[#1E1E1E] font-medium">Year*</p>
              <CustomSelect
                placeholder="Year"
                options={periodList.map((paramPeriod) => ({
                  value: paramPeriod,
                  label: paramPeriod,
                }))}
                onChange={(value) => setDurationPeriod(value)}
                selectedProps={{
                  value: defaultYear,
                  label: defaultYear
                }}
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
                  value: defaultScholarship,
                  label: defaultScholarship
                }}
              />
            </div>

            <div className="w-full flex flex-col gap-y-[5px]">
              <p className="text-[16px] text-[#1E1E1E] font-medium">Acceptance Fee*</p>
              <input
                type="number"
                placeholder="0.00"
                name="AcceptanceFee"
                value={acceptanceFee}
                onChange={(e) => setAcceptanceFee(e.target.value)}
                className="border-[1px] px-[10px] rounded-md border-[#E9E9E9] py-2 focus:outline-none w-full text-[16px] font-[400] text-[black]"
              />
            </div>

            <div className="w-full flex flex-col gap-y-[5px]">
              <p className="text-[16px] text-[#1E1E1E] font-medium">Course Price*</p>
              <input
                type="number"
                placeholder="0.00"
                name="CoursePrice"
                value={coursePrice}
                onChange={(e) => setCoursePrice(e.target.value)}
                className="border-[1px] px-[10px] rounded-md border-[#E9E9E9] py-2 focus:outline-none w-full text-[16px] font-[400] text-[black]"
              />
            </div>

          </div>

          <div className="w-full flex flex-col gap-y-[5px] h-max">
            <p className="text-[16px] text-[#1E1E1E] font-medium">Course Description*</p>
            <RichTextEditor placeholder="Write few things about the course..." value={courseDescription} onChange={setCourseDescription} />
          </div>

          <div className="flex mt-[50px]">
            <p className="text-[18px] font-semibold text-[#1E1E1E] w-[210px] ">
              Loan Requirements
            </p>
            <div className="w-[100%] border-b-[2px] border-[#E0E0E0]"></div>
          </div>

          <div className="w-full flex flex-col gap-y-[5px] h-max">
            <p className="text-[16px] text-[#1E1E1E] font-medium">Loan Description*</p>
            <RichTextEditor placeholder="Write few things about the course..." value={loanDescription} onChange={setLoanDescription} />
          </div>

          <div className="flex mt-[50px]">
            <p className="text-[18px] font-semibold text-[#1E1E1E] w-[300px] ">
              Scholarship Requirements
            </p>
            <div className="w-[100%] border-b-[2px] border-[#E0E0E0]"></div>
          </div>

          <div className="w-full flex flex-col gap-y-[5px] h-max">
            <p className="text-[16px] text-[#1E1E1E] font-medium">Scholarship Description*</p>
            <RichTextEditor 
              value={scholarshipDescription} 
              onChange={setScholarshipDescription} 
              placeholder="Write few things about the course..."
            />
          </div>
          
          <div className="flex gap-x-[20px] mt-[50px]">
            <button type="button" onClick={handleCancel} className="rounded-lg w-full h-[40px] bg-[#D9E2ED] text-[14px] text-[#004085] semi-bold">Cancel</button>

            <button type="button" onClick={handleSubmit} className="rounded-lg w-full h-[40px] bg-[#004085] text-[14px] text-[white] semi-bold">
              {isLoading ? <BeatLoader /> : currentCourseID ? "Update Course" : "Add Course"}
            </button>

          </div>

        </form>

      </div>
    </div>
    
  )
}