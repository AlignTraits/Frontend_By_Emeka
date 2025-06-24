import { useEffect, useState } from "react";
// import courseIcon from "../../assets/Imageholder.svg"
import { FaArrowLeftLong } from "react-icons/fa6";
// import EligibilityCard from "../dashboard/EligibilityCard";
import SchoolInfo from "../dashboard/TabInfos/SchoolInfo";
import CourseInfo from "../dashboard/TabInfos/CourseInfo";
import ScholarshipInfo from "../dashboard/TabInfos/ScholarshipInfo";
import LoanInfo from "../dashboard/TabInfos/LoadInfo"
import { getSchool } from "../../services/schools";
import { School } from "../../services/schools";
import { Course } from "../../types/course.types";
import { FaPlus } from "react-icons/fa";
import locationIcon from "../../assets/locationIcon.svg"


interface CoursesProps {
  courseItem: Course|null;
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SchoolWithCourses extends School {
  courses: Course[];
}


const TAB_NAV = ["School Information", "Course Information"]

// const TAB_NAV = ["School Information", "Course Information", "Scholarship Information", "Loan Information"]

const Details = ({courseItem, setShowDetails}: CoursesProps) => {
  // console.log("courseItem: ", courseItem)
  const [activeTab, setActiveTab] = useState("School Information");
  const [school, setSchool] = useState<SchoolWithCourses>();

  const [tempNav, setTempNav] = useState<string[]>(TAB_NAV);

  async function fetchSchool() {
    const response = await getSchool(courseItem?.schoolId as string);
    setSchool(response);
  }
  
  useEffect(() => {
    fetchSchool()
    
    let newTempNav = [...TAB_NAV];

    if (courseItem?.scholarship && courseItem.scholarship.length > 0) {
      newTempNav.push("Scholarship Information");
    } 
    if (courseItem?.loanInformation && courseItem.loanInformation.length > 0) {
      newTempNav.push("Loan Information");
    }

    setTempNav(newTempNav);
    
  }, [])
  
  return (
    <div className="p-10">
      <button onClick={() => setShowDetails(false)} className="flex gap-x-[10px] items-center">
        <FaArrowLeftLong className="text-[#004085]" />
        <p className="text-[#004085]">Back to Explore</p>
      </button>

      <div className="mt-10 border-[1px] border-[#EAECF0] shadow-md rounded-xl p-5 w-[100%] h-[400px]">
        <div className="flex flex-col gap-y-[20px]">
          <img alt="course Icon two" src={courseItem?.image} className="h-[250px] w-[400px] rounded-lg" />
          <div className="flex gap-x-[10px] p-[5px]">
            <img alt="course Icon two" src={school?.logo} className="h-[35px] w-[35px] mt-[5px] rounded-[50%]" />

            <div>
              <p className="text-[#000000] font-semibold text-[16px]">{courseItem?.title}</p>
              <p className="text-[#999999] font-medium text-[12px]">{courseItem?.university?.name}</p>

              <div className="flex gap-x-[5px]">
                <img src={locationIcon} alt="Location Icon" className="" />
                <p className="text-[#007BFF] text-[12px] font-normal">
                  {courseItem?.university?.region}/{courseItem?.university?.country}
                </p>
              </div>
            </div>
          </div>

       
        </div>
      </div>

      <div className="mt-10 flex gap-[20px]">
        <div className="border-[1px] border-[#EAECF0] shadow-md rounded-xl p-5 w-[75%] h-[350px]">
          <div className="flex border-b border-b-[#EAECF0] mt-[20px] size-max gap-x-[10px]">
            {tempNav.map((tab, index) => {
              const tabKey = `tab${index + 1}`;
              return (
                <button
                  key={tabKey}
                  className={`py-2 text-[16px] font-semibold border-b-2 font-semibold transition 
                    ${
                      activeTab === tab
                        ? "border-[#003064] text-[#004085] text-[16px] font-semibold"
                        : "border-transparent hover:text-blue-500 text-[#999999]"
                    }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          { activeTab === "School Information" && <SchoolInfo schoolItem={school ?? null} /> }

          { activeTab === "Course Information" && <CourseInfo courseItem={courseItem}  /> }

          { activeTab === "Scholarship Information" && <ScholarshipInfo courseItem={courseItem}  /> }

          { activeTab === "Loan Information" && <LoanInfo courseItem={courseItem}  /> }
        </div>

        <div className="w-[25%] h-[200px] border-[1px] border-[#EAECF0] shadow-md rounded-xl flex flex-col justify-center items-center gap-y-[20px]">
          <button className="bg-[#EEECEC] w-[200px] h-[50px] flex justify-center items-center rounded-xl">Save for later</button>

          <button className="w-[200px] h-[50px] text-[#007BFF] font-semibold text-[16px] bg-[#EEF4FB] flex justify-center gap-[10px] items-center rounded-xl">
            <FaPlus />
            Add to Schools
          </button>
        </div>
      </div>
    </div>
  )
}

export default Details