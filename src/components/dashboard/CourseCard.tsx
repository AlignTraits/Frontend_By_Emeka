// import courseIcon from "../../assets/Imageholder.svg"
import { Course } from '../../types/course.types';
import courseIconTwo from "../../assets/imageHolderTwo.svg"
import locationIcon from "../../assets/locationIcon.svg"

interface CoursesProps {
  courseItem: Course;
  setCourseDetails: React.Dispatch<React.SetStateAction<Course|null>>;
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

const CourseCard = ({courseItem, setCourseDetails, setShowDetails}: CoursesProps) => {
  // console.log("courseItem: ", courseItem)
  return (
    <div className="w-[300px] size-max rounded-md border-[2px] border-[#EAECF0] p-[8px] flex flex-col gap-y-[10px]">
      <div className="w-[100%] h-[180px] rounded-md">
        <img alt="course Icon" src={courseItem.image} className="h-[100%] w-[100%] rounded-md" />
      </div>

      <div className="flex gap-x-[10px] p-[5px]">
        <img alt="course Icon two" src={courseIconTwo} className="h-[35px] w-[35px] mt-[5px]" />

        <div>
          <p className="text-[#000000] font-semibold text-[16px]">{courseItem.title}</p>
          <p className="text-[#999999] font-medium text-[12px]">{courseItem.university?.name}</p>

          <div className="flex gap-x-[5px]">
            <img src={locationIcon} alt="Location Icon" className="" />
            <p className="text-[#007BFF] text-[12px] font-normal">
              {courseItem.university?.region}/{courseItem.university?.country}
            </p>
          </div>
        </div>
      </div>

      <p className="text-[#667085] text-[12px]">
        Covenant University’s Computer Science program offers a dynamic and comprehensive 
        curriculum designed to equip students with cutting-edge ...
      </p>

      <div className="flex justify-between">
        <div className="bg-[#E6F2FF] rounded-lg h-[35px] w-[120px] flex justify-center items-center">
          <p className="text-[#007BFF] text-[14px] font-medium">{courseItem.acceptanceFeeCurrency} {courseItem.acceptanceFee}</p>
        </div>

        <div className="bg-[#E6F2FF] rounded-lg h-[35px] w-[130px] flex justify-center items-center">
          <p className="text-[#007BFF] text-[14px] font-medium">{courseItem.scholarship}</p>
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