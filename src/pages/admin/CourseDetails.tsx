
import { useNavigate, useParams } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { IoTrash } from "react-icons/io5";
import { getCourseDetails } from "../../services/schools";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/useAuth";
import DeleteModal from "../../components/Admin/DeleteSchoolModal";

export default function CourseDetails () {
  const {setCurrentCourseID} = useAuth()
  const {schoolId, courseId } = useParams<{schoolId: string, courseId: string}>();
  const navigate = useNavigate()
  const [modal, setModal] = useState(false);

  const [courseObj, setCourseObj] = useState({
    programLevel: "NULL",
    duration: "NULL",
    durationPeriod: "NULL",
    courseWebsiteUrl : "NULL",
    image: "NULL",
    acceptanceFee: "NULL",
    acceptanceFeeCurrency: "NULL",
    scholarship: "NULL",
    objectives: "NULL",
    title: "NULL",
    loanInformation: "NULL",
    requirements: [],
    id: "NULL"
  })

  const getCourse = async () => {
    try {
      const tempCourse = await getCourseDetails(courseId!)
      setCourseObj(tempCourse)
    } catch (e) {
      console.log(e)
    }
  }

  const handleEdit = () => {
    setCurrentCourseID(courseId!)
    navigate(`/admin/schools/${schoolId}/add-course`);
  }

  useEffect(() => {
    getCourse()
  }, [])

  const handleNavigate = () => {
    navigate(`/admin/schools/${schoolId}/courses`);
  }

  return (
    <div className="relative">
      <div className="flex flex-col w-full gap-5 p-5 xl:p-6">

        <div onClick={() => navigate(-1)} className="flex gap-x-[5px] items-center">
          <IoIosArrowBack className="h-4 w-4" />
          <p className="text-[#004085] text-[14px] font-medium cursor-pointer">Go back</p>
        </div> 

        <div className="w-[762px] flex justify-between items-center">
          <p className="text-[#101828] text-[24px] font-semibold">
            {courseObj.title}
          </p>

          <div className="flex gap-x-[20px]">
            <button onClick={handleEdit} className="border-[1px] border-[#DDDDDD] w-[76px] items-center h-[44px] rounded-md flex gap-x-[5px] justify-center">
              <FaRegEdit className="text-[#1E1E1E] h-6 w-6" /> 
              <p className="text-[14px] font-medium text-[#1E1E1E]">Edit</p>
            </button>
            <button className="bg-[#B42318] border-[1px] border-[#DDDDDD] w-[94px] items-center h-[44px] rounded-md flex gap-x-[5px] justify-center">
              <IoTrash className="text-[white] h-6 w-6" /> 
              <p className="text-[14px] font-medium text-[white]">Delete</p>
            </button>
          </div>
        </div>

        <div className="w-[762px] h-[600px] bg-[#FAFAFA] rounded-md flex gap-x-[10px] p-5">
          <div className="basis-[66%] flex flex-col justify-between">
            <p className="font-medium text-[16px] text-[#1E1E1E]">Course Information</p>

            <div className="flex gap-x-[100px]">
              <div>
                <p className="text-[#737373] font-normal text[12px]">Program Level</p>
                <p className="text-[#1E1E1E] text-[16px] font-normal">{courseObj.programLevel}</p>
              </div>

              <div>
                <p className="text-[#737373] font-normal text[12px]">Program Duration</p>
                <p className="text-[#1E1E1E] text-[16px] font-normal">{courseObj.duration} {courseObj.durationPeriod}</p>
              </div>
            </div>

            <div>
              <p className="text-[#737373] font-normal text[12px]">Course Website</p>
              <p className="text-[#005CBF] text-[16px] font-normal">{courseObj.courseWebsiteUrl}</p>
            </div>

            <div>
              <p className="text-[#737373] font-normal text[12px]">Course Objectives</p>
              <p className="text-[#1E1E1E] text-[16px] font-normal">
                {courseObj.objectives}
              </p>
            </div>

            <div>
              <p className="text-[#737373] font-normal text[12px]">Loan Requirements</p>
              <p className="text-[#1E1E1E] text-[16px] font-normal">
                {courseObj.loanInformation}
              </p>
            </div>

            <div>
              <p className="text-[#737373] font-normal text[12px]">Admission Requirements</p>
              <p className="text-[#1E1E1E] text-[16px] font-normal">
                {courseObj.requirements.join(" ")}
              </p>
            </div>

            
          </div>

          <div className="basis-[34%] flex flex-col gap-y-[10px]">
            <div className="h-[150px] width-[100%] bg-[grey] rounded-md">
              <img
                src={courseObj.image}
                alt=""
                className="h-[150px] width-[100%] rouded-md"
              />
            </div>

            <div 
              className="h-[280px] width-[100%] bg-[white] rounded-md p-3 flex flex-col justify-between
              border-[1px] border-[#DDDDDD]"
            >
              <p className="text-[16px] text-[#1E1E1E] font-semibold">Financial Information</p>

              <div>
                <p className="text-[#737373] font-normal text[12px]">Program Level</p>
                <p className="text-[#1E1E1E] text-[16px] font-normal">{courseObj.programLevel}</p>
              </div>

              <div>
                <p className="text-[#737373] font-normal text[12px]">Acceptance Fee</p>
                <p className="text-[#1E1E1E] text-[16px] font-normal">{courseObj.acceptanceFeeCurrency} {courseObj.acceptanceFee}</p>
              </div>

              <div>
                <p className="text-[#737373] font-normal text[12px]"> Scholarship</p>
                <p className="text-[#1E1E1E] text-[16px] font-normal">{courseObj.scholarship}</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {modal && (
        <DeleteModal
          itemName={courseObj.title as string}
          setShowModal={setModal}
          itemId={courseId as string}
          itemType={"course"}
          getSchools={handleNavigate}
        />
      )}
    </div>
    
  )
}