import { Course } from '../../../types/course.types';


interface Props {
  courseItem: Course | null;
}

const ScholarshipInfo = ({courseItem}: Props) => {
  return (
    <div className="max-w-2xl pt-5 bg-white">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Schoolarship Type</h2>
        <p className="text-gray-600">
          {courseItem?.scholarship || "N/A"}
        </p>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Schoolarship Info</h2>
        <p className="text-gray-600">
          {courseItem?.scholarshipInformation || "N/A"}
        </p>
      </div>
    </div>
  )
}

export default ScholarshipInfo