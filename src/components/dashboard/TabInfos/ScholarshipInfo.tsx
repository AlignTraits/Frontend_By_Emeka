import { Course } from '../../../types/course.types';
import ScholarshipDirectory from './ScholarshipDirectory';
import { getScholarshipsForCourse } from '../../../data/scholarships';


interface Props {
  courseItem: Course | null;
}

const ScholarshipInfo = ({courseItem}: Props) => {
  const schoolInfo = (courseItem?.scholarshipInformation || "").trim();
  const hasSchoolInfo = schoolInfo.length > 0 && schoolInfo.toUpperCase() !== "N/A";
  const hasDirectory = getScholarshipsForCourse(courseItem).length > 0;

  return (
    <div className="max-w-2xl pt-5 bg-white">
      {(hasSchoolInfo || !hasDirectory) && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Scholarship Info</h2>
          <p className="text-gray-600">
            {hasSchoolInfo ? schoolInfo : "N/A"}
          </p>
        </div>
      )}

      <ScholarshipDirectory courseItem={courseItem} />
    </div>
  )
}

export default ScholarshipInfo
