import { Course } from '../../../types/course.types';


interface Props {
  courseItem: Course | null;
}


const LoanInfo = ({courseItem}: Props) => {
  return (
    <div className="max-w-2xl pt-5 bg-white">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Loan Information</h2>
        <p className="text-gray-600">
          {courseItem?.loanInformation || "N/A"}
        </p>
      </div>

    </div>
  )
}

export default LoanInfo