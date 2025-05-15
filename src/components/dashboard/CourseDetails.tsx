import { useState } from "react";
import { Course } from "../../types/course.types"
// import courseIcon from "../../assets/Imageholder.svg"
import { FaArrowLeftLong } from "react-icons/fa6";
import EligibilityCard from "./EligibilityCard";
import SchoolInfo from "./TabInfos/SchoolInfo";
import CourseInfo from "./TabInfos/CourseInfo";
import ScholarshipInfo from "./TabInfos/ScholarshipInfo";
import LoanInfo from "./TabInfos/LoadInfo";


interface CoursesProps {
  courseItem: Course|null;
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

const TAB_NAV = ["School Information", "Course Information", "Scholarship Information", "Loan Information"]

const CourseDetails = ({courseItem, setShowDetails}: CoursesProps) => {
  const [activeTab, setActiveTab] = useState("tab1");
  
  return (
    <div className="p-10">
      <button onClick={() => setShowDetails(false)} className="flex gap-x-[10px] items-center">
        <FaArrowLeftLong className="text-[#004085]" />
        <p className="text-[#004085]">Back to Explore</p>
      </button>

      <div className="flex justify-between mt-5">
        <div className="flex flex-col gap-y-[20px]">
          <p>{courseItem?.title}({courseItem?.programLevel})</p>

          <img alt="course Icon two" src={courseItem?.image} className="h-[250px] w-[400px] rounded-lg" />
       
        </div>

        <EligibilityCard courseItem={courseItem} />
      </div>

      <div>
        <div className="flex gap-x-[10px] items-center">
          <img src={courseItem?.university?.logo} className="h-[40px] w-[40px] rounded-[50%]" />

          <p className="text-[#000000] text-[16px] font-medium">{courseItem?.university?.name}</p>
        </div>

        <div className="flex border-b border-b-[#EAECF0] mt-[20px] size-max gap-x-[10px]">
          {TAB_NAV.map((tab, index) => {
            const tabKey = `tab${index + 1}`;
            return (
              <button
                key={tabKey}
                className={`py-2 text-[16px] font-semibold border-b-2 font-semibold transition 
                  ${
                    activeTab === tabKey
                      ? "border-[#003064] text-[#004085] text-[16px] font-semibold"
                      : "border-transparent hover:text-blue-500 text-[#999999]"
                  }`}
                onClick={() => setActiveTab(tabKey)}
              >
                {tab}
              </button>
            );
          })}
        </div>

        { activeTab === "tab1" && <SchoolInfo /> }

        { activeTab === "tab2" && <CourseInfo /> }

        { activeTab === "tab3" && <ScholarshipInfo /> }

        { activeTab === "tab4" && <LoanInfo /> }
      </div>
    </div>
  )
}

export default CourseDetails