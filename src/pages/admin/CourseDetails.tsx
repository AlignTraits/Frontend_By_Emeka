
import { useNavigate } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { IoTrash } from "react-icons/io5";

export default function CourseDetails () {
  // const { schoolId } = useParams<{ schoolId: string}>();
  const navigate = useNavigate()

  return (
    <div className="relative">
      <div className="flex flex-col w-full gap-5 p-5 xl:p-6">

        <div onClick={() => navigate(-1)} className="flex gap-x-[5px] items-center">
          <IoIosArrowBack className="h-4 w-4" />
          <p className="text-[#004085] text-[14px] font-medium cursor-pointer">Go back</p>
        </div> 

        <div className="w-[762px] flex justify-between items-center">
          <p className="text-[#101828] text-[24px] font-semibold">
            Bachelor of Science in Computer Science
          </p>

          <div className="flex gap-x-[20px]">
            <button className="border-[1px] border-[#DDDDDD] w-[76px] items-center h-[44px] rounded-md flex gap-x-[5px] justify-center">
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
                <p className="text-[#1E1E1E] text-[16px] font-normal">Bachelor Degree</p>
              </div>

              <div>
                <p className="text-[#737373] font-normal text[12px]">Program Duration</p>
                <p className="text-[#1E1E1E] text-[16px] font-normal">4 Years</p>
              </div>
            </div>

            <div>
              <p className="text-[#737373] font-normal text[12px]">Course Website</p>
              <p className="text-[#005CBF] text-[16px] font-normal">www.covanantunviersity.com</p>
            </div>

            <div>
              <p className="text-[#737373] font-normal text[12px]">Course Objectives</p>
              <p className="text-[#1E1E1E] text-[16px] font-normal">
                This program aims to provide students with a strong foundation in computer science 
                principles, programming skills, and problem-solving abilities. Students will learn 
                software development, algorithms, data structures, and computer systems.
              </p>
            </div>

            <div>
              <p className="text-[#737373] font-normal text[12px]">Loan Requirements</p>
              <p className="text-[#1E1E1E] text-[16px] font-normal">
                Students can apply for federal student loans, private loans, or scholarships. 
                The financial aid office provides assistance with the application process.
              </p>
            </div>

            <div>
              <p className="text-[#737373] font-normal text[12px]">Admission Requirements</p>
              <p className="text-[#1E1E1E] text-[16px] font-normal">
                High school diploma or equivalent with a minimum GPA of 3.0. 
                Strong background in mathematics and basic computer skills. 
                SAT score of at least 1200 or ACT score of at least 25.
              </p>
            </div>

            
          </div>

          <div className="basis-[34%] flex flex-col gap-y-[10px]">
            <div className="h-[150px] width-[100%] bg-[pink] rounded-md">

            </div>

            <div 
              className="h-[280px] width-[100%] bg-[white] rounded-md p-3 flex flex-col justify-between
              border-[1px] border-[#DDDDDD]"
            >
              <p className="text-[16px] text-[#1E1E1E] font-semibold">Financial Information</p>

              <div>
                <p className="text-[#737373] font-normal text[12px]">Program Level</p>
                <p className="text-[#1E1E1E] text-[16px] font-normal">N10K</p>
              </div>

              <div>
                <p className="text-[#737373] font-normal text[12px]">Acceptance Fee</p>
                <p className="text-[#1E1E1E] text-[16px] font-normal">N5,000,000</p>
              </div>

              <div>
                <p className="text-[#737373] font-normal text[12px]"> Scholarship</p>
                <p className="text-[#1E1E1E] text-[16px] font-normal">Full scholarship</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    
  )
}