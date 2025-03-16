import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
// import SchoolsTable from "../../components/Admin/SchoolsTable";

import { FiPlus } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { RiUploadCloud2Line } from "react-icons/ri";
import { useParams, useNavigate } from "react-router-dom";
import { getSchool } from "../../services/schools";
import { School } from "../../services/schools";
import { Course } from "../../types/course.types";
import CoursesTable from "../../components/Admin/CourseTable";
import { useAuth } from "../../contexts/useAuth";



interface SchoolWithCourses extends School {
  courses: Course[];
}


export default function SchoolCourses() {
  const navigate = useNavigate()
  const {setCurrentCourseID} = useAuth()

  const { schoolId } = useParams<{ schoolId: string }>();
  const [school, setSchool] = useState<SchoolWithCourses>();
  const [isLoading, setIsLoading] = useState(true);  
  const [courses, setCourses] = useState([])

  async function fetchSchool() {
    setIsLoading(true)
    const response = await getSchool(schoolId as string);
    setSchool(response);
    setCourses(response.courses)
    setIsLoading(false);

  }

  useEffect(() => {
    fetchSchool();
  }, [schoolId]);

  const handleAddCourse = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevents event from bubbling to parent
    navigate(`/admin/schools/${schoolId}/add-course`);
    setCurrentCourseID(null)
  }
  

  return (
 
  <div className="relative">
    <div className="flex flex-col w-full gap-10 p-5 xl:p-6">
      <div className="flex justify-between items-center border-b border-[#EAECF0] py-[20px]">
        <div>
          <div onClick={() => navigate(-1)} className="flex gap-x-[5px] items-center">
            <IoIosArrowBack className="h-4 w-4" />
            <p className="text-[#004085] text-[14px] font-medium cursor-pointer">Go back</p>
          </div>
          <p className="text-[#1E1E1E] text-[20px] font-semibold">{school?.name || "Searching..." }</p>

          <p className="text-[#999999] text-[14px] font-medium">Manage all courses for covenant university</p>
        </div>

        <div className="flex gap-x-[20px]">
          <div className="relative w-[250px]">
            <input
              type="text"
              placeholder="Search schools..."
              className="w-full py-2 px-10 rounded-md font-semibold border-[1px] border-[#DDDDDD] focus:outline-none focus:border-[#757575] text-[14px] font-[400] text-[#8F8F8F]"
            />
            <FiSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-[#999999] w-5 h-5" />
          </div>

          <button 
            type="button"
            className="w-[150px] text-[#1E1E1E] text-[14px] font-medium py-2 h-[40px] bg-[#F6C648] p-2 rounded-md 
                outline-0 focus:outline-none flex justify-center items-center gap-x-[10px]"
            >
            <RiUploadCloud2Line className="w-5 h-5 text-[#1E1E1E]"  />
            <p>Upload CSV</p>
          </button>

          <button 
            onClick={handleAddCourse}
            type="button"
            className="w-[150px] text-white text-[14px] font-medium py-2 h-[40px] bg-[#004085] p-2 rounded-md 
                outline-0 focus:outline-none flex justify-center items-center gap-x-[10px]"
            >
            <p>Add Course</p>
            <FiPlus className="w-5 h-5 text-[white]"  />
          </button>

        </div>
      </div>

      <CoursesTable courses={courses} isLoading={isLoading} />
    </div>
  </div>
  );
}
