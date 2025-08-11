
import { IoMdArrowForward, IoIosArrowForward } from "react-icons/io";
import { IoMdBookmarks } from "react-icons/io";
import { useEffect, useState } from "react";
import { getCoursesWithoutToken } from "../../services/schools";
import { ClipLoader } from "react-spinners";
import Details from "./Details";
import { Course } from "../../types/course.types";

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

  // const [courseDetails, setCourseDetails] = useState<Course|null>(null);

    useEffect(() => {
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
  
      fetchCourses();
  
      // handleGetCoursesCategories();
    }, []);

    console.log("courses: ", courses)

    const handleViewDetails = (course: Course) => {
      setShowDetails(true);
      setCourseFilter(course.title);
    }

  return (
    <>
      {
        showDetails ? <Details courseItem={courses[0]} setShowDetails={setShowDetails}  /> :
            <div className="mt-5">
      <p className="text-[#212121] text-[16px] font-medium">What course are you picking?</p>

      {
        isLoading ? <div className="flex justify-center items-center h-[200px] border-[#757575] border-[1px] rounded-md">
          <ClipLoader />
        </div>: 
        courses.length === 0 ? 
        <div className="flex justify-center items-center h-[200px] text-[#212121] border-[#757575] border-[1px] rounded-md">No courses available</div> :
              <div className="w-full h-[370px] lg:h-max mt-2 p-5 border-[#757575] border-[1px] rounded-md flex flex-col space-y-[10px] lg:flex-row lg:items-center px-5 gap-x-[40px]">
                <img src={courses[0]?.image} className="h-[150px]" />

                <div className="h-[150px] flex flex-col justify-between">
                  <div>
                    <p className="text-[18px] lg:text-[24px] font-semibold">{courses[0].title}</p>
                    <p className="text-[#212121] text-[16px]">{courses[0].university?.name}</p>
                    <p className="text-[#007BFF] text-[14px] md:text-[16px] font-normal ">
                      {courses[0].university?.region} / {courses[0].university?.country}
                    </p>
                  </div>
                  <div className="flex gap-x-[20px]">
                    <button onClick={() => handleViewDetails(courses[0])} className="flex bg-[#F6C648] text-[#1C1C1C] text-[12px] lg:text-[14px] text-[14px] p-2 flex items-center rounded-xl">View Details</button>
                    <button onClick={() => handlePageChange(courses[0].title)} className="flex bg-[#004085] p-2 flex items-center gap-x-[20px] rounded-xl">
                      <p className="text-[white] text-[12px] lg:text-[14px]">Other Schools With Similar Courses</p>
                      <IoMdArrowForward className="text-[white]" />
                    </button>
                  </div>
                </div>
            </div>
      }


      <div className="mt-5">
        <p className="text-[#212121] text-[16px] font-medium">Other courses from recomended career path:</p>

        <div className="flex flex-col gap-y-[20px] mt-2">
          <Items text="Sales" color="#4535C1" handleClick={handlePageChange} />
          <Items text="Graphic Design" color="#77E4C8" handleClick={handlePageChange} />
          <Items text="User Experience (UX) Design" color="#17B26A" handleClick={handlePageChange} />
        </div>
      </div>
    </div>
      }
    </>

  )
}

export default Other;