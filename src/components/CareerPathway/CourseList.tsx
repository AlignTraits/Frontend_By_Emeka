import { useState, useEffect } from "react";
import { Course } from "../../types/course.types";
import { ClipLoader } from "react-spinners";
import CourseCard from "../dashboard/CourseCard";
import fileIcon from "../../assets/IconWrap.svg"
import { getCoursesWithoutToken } from "../../services/schools";
import Details from "./Details";


export default function CourseList() {
  const [isLoading, setIsLoading] = useState(false)

  const [courses, setCourses] = useState<Course[]>([]);

  const [showDetails, setShowDetails] = useState(false)
  const [courseDetails, setCourseDetails] = useState<Course|null>(null)

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
    fetchCourses()
  }, [])

  // const totalPages = Math.ceil(courses.length / itemsPerPage);

  console.log("courseDetails: ", courseDetails, " showDetails: ", showDetails)

  return (

    <div className="w-full min-h-screen">

      {
        showDetails ? <Details courseItem={courseDetails} setShowDetails={setShowDetails}  /> :

        <>
          <div className="p-5 flex justify-center">
            {isLoading && (
              <div className="mx-auto w-full flex justify-center items-center h-[500px]">
                <ClipLoader />
              </div>
            )}
          </div>

          {
            !isLoading && (
              <div className="p-5 flex flex-wrap justify-start gap-[40px] w-[100%] border-[1px] border-[#EAECF0] shadow-md rounded-xl">
                {
                  courses.length > 0 && courses.map((elem, i) => (
                    <CourseCard setShowDetails={setShowDetails} courseItem={elem} key={i} setCourseDetails={setCourseDetails} />
                  ))
                }
              </div>
            )
          }

          {!isLoading && courses.length === 0 && (
            <div className="flex flex-col justify-center items-center gap-y-[10px] w-full h-[400px]">
              <img src={fileIcon} alt="Not found" />
              <p className="text-[#101828] text-[16px] font-semibold">No courses Found</p>
            </div>
          )}
        </>

      }

      
    </div>
  );
} 
