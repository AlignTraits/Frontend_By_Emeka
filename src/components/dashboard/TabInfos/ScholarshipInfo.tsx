import { Course } from '../../../types/course.types';


interface Props {
  courseItem: Course | null;
}

const ScholarshipInfo = ({courseItem}: Props) => {
  return (
    <div className="max-w-2xl pt-5 bg-white">
      <p className="text-gray-600 mb-4">
        {courseItem?.scholarshipInformation}
      </p>
      
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Passport</h2>
        <p className="text-gray-600">
          Ensure you have your passport and documents if this school is outside your home country.
        </p>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">English Proficiency</h2>
        <ul className="space-y-2 text-gray-600">
          <li>TOEFL: 88 (online) minimum 22 in each skill band</li>
          <li>Duolingo: 120 min overall score</li>
          <li>PTE: 60, overall minimum, 55 in each skill band</li>
        </ul>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">School Documents</h2>
        <ul className="space-y-2 text-gray-600">
          <li>SSCE or WASSCE results</li>
          <li>Joint Admissions and Matriculation Examination (UTME)</li>
        </ul>
      </div>
    </div>
  )
}

export default ScholarshipInfo