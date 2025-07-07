import { useEffect, useState } from "react";
// import courseIcon from "../../assets/Imageholder.svg"
import { FaArrowLeftLong } from "react-icons/fa6";
import EligibilityCard from "./EligibilityCard";
import SchoolInfo from "./TabInfos/SchoolInfo";
import CourseInfo from "./TabInfos/CourseInfo";
import ScholarshipInfo from "./TabInfos/ScholarshipInfo";
import LoanInfo from "./TabInfos/LoadInfo";
import { getSchool } from "../../services/schools";
import { School } from "../../services/schools";
import { Course } from "../../types/course.types";


interface CoursesProps {
  courseItem: Course|null;
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SchoolWithCourses extends School {
  courses: Course[];
}


const TAB_NAV = ["School Information", "Course Information"]

// const TAB_NAV = ["School Information", "Course Information", "Scholarship Information", "Loan Information"]

const CourseDetails = ({courseItem, setShowDetails}: CoursesProps) => {
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
    <div className="p-5">
      <button onClick={() => setShowDetails(false)} className="flex gap-x-[10px] items-center">
        <FaArrowLeftLong className="text-[#004085]" />
        <p className="text-[#004085]">Back to Explore</p>
      </button>

      <div className="flex flex-col gap-[20px] md:flex-row md:justify-between mt-5">
        <div className="flex flex-col gap-y-[20px]">
          <p>{courseItem?.title}({courseItem?.programLevel})</p>

          <img alt="course Icon two" src={courseItem?.image} className="h-[250px] w-full md:w-[400px] rounded-lg" />
       
        </div>

        <EligibilityCard courseItem={courseItem} />
      </div>

      <div className="mt-[20px]">
        <div className="flex gap-x-[10px] items-center justify-center">
          <img src={courseItem?.university?.logo} className="h-[40px] w-[40px] rounded-[50%]" />

          <p className="text-[#000000] text-[16px] font-medium">{courseItem?.university?.name}</p>
        </div>

        <div className="w-[100%] flex border-b border-b-[#EAECF0] mt-[20px] size-max gap-x-[10px] overflow-x-auto scrollbar-hide">
          {tempNav.map((tab, index) => {
            const tabKey = `tab${index + 1}`;
            return (
              <button
                key={tabKey}
                className={`py-2 whitespace-nowrap text-[16px] font-semibold border-b-2 font-semibold transition 
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
    </div>
  )
}

export default CourseDetails