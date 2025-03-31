import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
// import SchoolsTable from "../../components/Admin/SchoolsTable";
import { BeatLoader } from "react-spinners";
import { FiPlus } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { RiUploadCloud2Line } from "react-icons/ri";
import { useParams, useNavigate } from "react-router-dom";
import { getSchool } from "../../services/schools";
import { School } from "../../services/schools";
import { Course } from "../../types/course.types";
import CoursesTable from "../../components/Admin/CourseTable";
import { useAuth } from "../../contexts/useAuth";
import BulkCourseModal from "../../components/Admin/BulkCourseModal";
import { deleteCourses } from "../../services/schools";
import { toast } from "react-toastify";


interface SchoolWithCourses extends School {
  courses: Course[];
}


export default function SchoolCourses() {
  const navigate = useNavigate()
  const {setCurrentCourseID, token} = useAuth()

  const [showBulkModal, setShowBulkModal] = useState(false)

  const { schoolId } = useParams<{ schoolId: string }>();
  const [school, setSchool] = useState<SchoolWithCourses>();
  const [isLoading, setIsLoading] = useState(true);  
  const [courses, setCourses] = useState([])

  const [selectedCourseList, setSelectedCourseList] = useState<string[]>([])

  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  async function fetchSchool() {
    setIsLoading(true)
    try {
      const response = await getSchool(schoolId as string);
      setSchool(response);
      setCourses(response.courses)
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }

  }

  useEffect(() => {
    fetchSchool();
  }, [schoolId]);

  const handleAddCourse = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevents event from bubbling to parent
    navigate(`/admin/schools/${schoolId}/add-course`);
    setCurrentCourseID(null)
  }


  const handleDeleteCourses = async () => {
    setIsDeleteLoading(true)
    try {
      await deleteCourses(selectedCourseList, token!)
      setIsDeleteLoading(false)
      setSelectedCourseList([])
      toast.success("Courses deleted successfully!");
      await fetchSchool()
    } catch(e) {
      setIsDeleteLoading(false)
      setSelectedCourseList([])
      toast.error("An error occurred");
      await fetchSchool()
    }
  }
  

  return (
 
  <div className="relative">
    <div className="flex flex-col w-full gap-10 p-5 xl:p-6">
      <div className="flex justify-between items-center gap-x-[10px] border-b border-[#EAECF0] py-[20px]">
        <div className="flex gap-x-[10px] items-center">
          <div>
          {/* <p onClick={handleTestClick}>Test</p> */}
            <div onClick={() => navigate(-1)} className="flex gap-x-[5px] items-center">
              <IoIosArrowBack className="h-4 w-4" />
              <p className="text-[#004085] text-[14px] font-medium cursor-pointer">Go back</p>
            </div>
            <p className="text-[#1E1E1E] text-[20px] font-semibold">{school?.name || "Searching..." }</p>

            <p className="text-[#999999] text-[14px] font-medium">Manage all courses for covenant university</p>
          </div>
          <>
            {
              selectedCourseList.length > 0 &&
              <button
                className="text-[#FFFFFF] bg-[#D92D20] px-5 py-2 rounded-md w-[170px] text-center cursor-pointer"
                // type="submit"
                disabled={isLoading}
                onClick={handleDeleteCourses}
              >
                {isDeleteLoading ? <BeatLoader /> : "Delete Courses"}
              </button>
            }
          </>
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
            onClick={() => setShowBulkModal(true)}
            type="button"
            className="w-[150px] text-[#1E1E1E] text-[14px] font-medium py-2 h-[40px] bg-[#F6C648] p-2 rounded-md 
                outline-0 focus:outline-none flex justify-center items-center gap-x-[10px]"
            >
            <RiUploadCloud2Line className="w-5 h-5 text-[#1E1E1E]"  />
            <p>Bulk Uploads</p>
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

      <CoursesTable 
        courses={courses} 
        isLoading={isLoading} 
        getSchool={fetchSchool} 
        setSelectedCourseList={setSelectedCourseList}
        selectedCourseList={selectedCourseList}
      />
    </div>

    {showBulkModal && <BulkCourseModal setShowModal={setShowBulkModal} getSchools={fetchSchool} />}
  </div>
  );
}
