import { Course } from '../../../types/course.types';


interface Props {
  courseItem: Course | null;
}


const CourseInfo = ({courseItem}: Props) => {
  console.log("courseItem: ", courseItem)

  return (
    <div className="max-w-2xl pt-5 bg-white">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Name</h2>
        <p className="text-gray-600">
          {courseItem?.title || "N/A"}
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Program Level</h2>
        <p className="text-gray-600">
          {courseItem?.programLevel}
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Price</h2>
        <p className="text-gray-600">
          {courseItem?.currency || "N/A"} {courseItem?.price}
        </p>
      </div>
      
    </div>
  )
}

export default CourseInfo