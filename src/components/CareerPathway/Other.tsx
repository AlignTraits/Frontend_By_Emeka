
import { IoMdArrowForward, IoIosArrowForward } from "react-icons/io";
import { IoMdBookmarks } from "react-icons/io";
import { useEffect, useState } from "react";
import { getCoursesWithoutToken } from "../../services/schools";
import { ClipLoader } from "react-spinners";
import Details from "./Details";
import { Course } from "../../types/course.types";
import { getAcademicRecords, getCourseRecommendation } from "../../services/utils";

interface ItemProps {
  color: string;
  text: string;
  handleClick: (param: string) => void
}

const Items = ({ color, text, handleClick }: ItemProps) => {
  return (
    <div
      className="border-[2px] cursor-pointer shadow-md h-[70px] w-full rounded-xl flex justify-between px-[20px] items-center"
      style={{ borderColor: color }}
      onClick={() => handleClick(text)}
    >
      <div className="flex gap-x-[20px] items-center">
        <div
          className="h-[50px] w-[50px] rounded-full flex items-center justify-center"
          style={{ backgroundColor: color }}
        >
          <IoMdBookmarks size={30} className="text-[white]" />
        </div>
        <p>{text}</p>
      </div>

      <IoIosArrowForward />
    </div>
  );
};
interface OtherProps {
  setViewState: React.Dispatch<React.SetStateAction<number>>;
  setCourseFilter: React.Dispatch<React.SetStateAction<string>>;
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
  showDetails: boolean;
}
const Other = ({setViewState, setCourseFilter, setShowDetails, showDetails}: OtherProps) => {

  const handlePageChange = (filter: string) => {
    setCourseFilter(filter);
    setViewState(2);
  }

  const [isLoading, setIsLoading] = useState(false);

  const [courses, setCourses] = useState<Course[]>([]);
  const [filterItem, setFilterItem] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<Course|null>(null);

  // const [courseDetails, setCourseDetails] = useState<Course|null>(null);

  const colors = ["#F6C648", "#4CAF50", "#2196F3", "#FF5722", "#9C27B0", "#E91E63"];

    const getRecords = async () => {
      try {
        const response = await getAcademicRecords({showToast: true});
        const academicRecord:any = {};

        let examCounter = 1;

        response?.data.forEach((record: any) => {
          if (record.ExamType1) {
            academicRecord[`ExamType${examCounter}`] = record.ExamType1;
            academicRecord[`ExamType${examCounter}Subjects`] = record.ExamType1Subjects;
            academicRecord[`ExamType${examCounter}SubGrades`] = record.ExamType1SubGrades;
            examCounter++;
          }
        });


        const tempPayload = {
          "academicRecord": academicRecord
        }

        const courseResponse = await getCourseRecommendation(tempPayload);
        console.log("courseResponse: ", courseResponse)
        setFilterItem(courseResponse.data[0]?.title || "")

      } catch (err: any) {
        console.log("error: ", err)
      }
    }
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await getCoursesWithoutToken()

        setCourses(response);
      } catch (err) {
        // setError(err instanceof Error ? err.message : 'An error occurred');
        console.log("error: ", err)
      } finally {
        setIsLoading(false);
      }
    };
    useEffect(() => {
      fetchCourses();
      getRecords();
  
      // handleGetCoursesCategories();
    }, []);

    useEffect(() => {
      setSelectedCourse(courses.find((course) => course.title === filterItem) || null);
    }, [filterItem])


    const handleViewDetails = (course: Course) => {
      setShowDetails(true);
      setCourseFilter(course.title);
    }

  return (
    <>
      {
        showDetails && selectedCourse ? <Details courseItem={selectedCourse} setShowDetails={setShowDetails}  /> :
            <div className="mt-5">
      <p className="text-[#212121] text-[16px] font-medium">What course are you picking?</p>

      {
        isLoading ? <div className="flex justify-center items-center h-[200px] border-[#757575] border-[1px] rounded-md">
          <ClipLoader />
        </div>: 
        courses.length === 0 || !selectedCourse ? 
        <div className="flex justify-center items-center h-[200px] text-[#212121] border-[#757575] border-[1px] rounded-md">No Recommended course available</div> :
        <div className="w-full h-[370px] lg:h-max mt-2 p-5 border-[#757575] border-[1px] rounded-md flex flex-col space-y-[10px] lg:flex-row lg:items-center px-5 gap-x-[40px]">
          <img src={selectedCourse?.image} className="h-[150px]" />

          <div className="h-[150px] flex flex-col justify-between">
            <div>
              <p className="text-[18px] lg:text-[24px] font-semibold">{selectedCourse.title}</p>
              <p className="text-[#212121] text-[16px]">{selectedCourse.university?.name}</p>
              <p className="text-[#007BFF] text-[14px] md:text-[16px] font-normal ">
                {selectedCourse.university?.region} / {selectedCourse.university?.country}
              </p>
            </div>
            <div className="flex gap-x-[20px]">
              <button onClick={() => handleViewDetails(selectedCourse)} className="flex bg-[#F6C648] text-[#1C1C1C] text-[12px] lg:text-[14px] text-[14px] p-2 flex items-center rounded-xl">View Details</button>
              <button onClick={() => handlePageChange(selectedCourse.title)} className="flex bg-[#004085] p-2 flex items-center gap-x-[20px] rounded-xl">
                <p className="text-[white] text-[12px] lg:text-[14px]">Other Schools With Similar Courses</p>
                <IoMdArrowForward className="text-[white]" />
              </button>
            </div>
          </div>
        </div>
      }

      {
        courses.length > 1 ?
        <div className="mt-5">
          <p className="text-[#212121] text-[16px] font-medium">Other courses from recomended career path:</p>

          <div className="flex flex-col gap-y-[20px] mt-2">
            {
              courses.map((courseElem, index) => {
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                if (courseElem.title !== filterItem) {
                  return <Items key={index} text={courseElem.title} color={randomColor} handleClick={handlePageChange} />
                }
              })
            }
          </div>
        </div> : 
        <div className="mt-5 flex justify-center items-center h-[200px] text-[#212121] border-[#757575] border-[1px] rounded-md">No other courses available</div>
        
      }

    </div>
      }
    </>

  )
}

export default Other;