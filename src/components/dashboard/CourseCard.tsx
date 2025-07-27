// import courseIcon from "../../assets/Imageholder.svg"
import { useState, useEffect } from 'react';
import { Course } from '../../types/course.types';
// import courseIconTwo from "../../assets/imageHolderTwo.svg"
import locationIcon from "../../assets/locationIcon.svg"
import { getSchool } from "../../services/schools";
import { School } from "../../services/schools";

interface SchoolWithCourses extends School {
  courses: Course[];
}


interface CoursesProps {
  courseItem: Course;
  setCourseDetails: React.Dispatch<React.SetStateAction<Course|null>>;
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

const CourseCard = ({courseItem, setCourseDetails, setShowDetails}: CoursesProps) => {
  const [school, setSchool] = useState<SchoolWithCourses>();

  async function fetchSchool() {
    const response = await getSchool(courseItem?.schoolId as string);
    setSchool(response);
  }
  
  useEffect(() => {
    fetchSchool()
  }, [])
  // console.log("courseItem: ", courseItem)
  return (
    <div className="w-[100%] lg:w-[300px] h-[350px] md:h-[400px] rounded-xl border-[2px] border-[#EAECF0] p-[8px] flex flex-col gap-y-[5px] justify-between bg-white">
      <div className="w-[100%] h-[100px] md:h-[150px] rounded-md">
        <img alt="course Icon" src={courseItem.image} className="h-[100%] w-[100%] rounded-md" />
      </div>

      <div className="flex gap-x-[5px] md:gap-x-[10px]">
        <img alt="course Icon two" src={school?.logo} className="h-[30px] w-[30px] md:h-[35px] md:w-[35px] mt-[5px] rounded-[50%]" />

        <div>
          <p className="text-[#000000] font-semibold text-[12px] md:text-[16px]">{courseItem.title}</p>
          <p className="text-[#999999] font-medium text-[10px] md:text-[12px]">{courseItem.university?.name}</p>

          <div className="flex gap-x-[5px]">
            <img src={locationIcon} alt="Location Icon" className="" />
            <p className="text-[#007BFF] text-[8px] md:text-[12px] font-normal ">
              {courseItem.university?.region}/{courseItem.university?.country}
            </p>
          </div>
        </div>
      </div>

      <p className="text-[#667085] text-[12px]">
        The program offers {school?.courses?.length ?? 0} {(school?.courses?.length ?? 0) > 1 ? "Courses" : "Course"} .
      </p>

      <div className="flex justify-between">
        <div className="bg-[#E6F2FF] px-2 rounded-lg h-[30px] size-max md:w-[120px] flex justify-center items-center">
          <p className="text-[#007BFF] text-[8px] md:text-[14px] font-medium">{courseItem.acceptanceFeeCurrency} {courseItem.acceptanceFee}</p>
        </div>

        <div className="bg-[#E6F2FF] px-2 rounded-lg h-[30px] size-max md:w-[150px] flex justify-center items-center">
          <p className="text-[#007BFF] text-[8px] md:text-[14px] font-medium">{courseItem.scholarship}</p>
        </div>
      </div>

      <button onClick={() => {
        setShowDetails(true);
        setCourseDetails(courseItem);
      }} className="bg-[#004085] h-[40px] w-[100%] font-semibold text-[12px] text-[white] rounded-md">
        View Details
      </button>
    </div>
  )
}

export default CourseCard