import { Course } from "../../types/course.types"
import { useNavigate } from "react-router-dom";

interface Props {
  courseItem: Course|null;
}

const EligibilityCard = ({courseItem}: Props) => {

  const navigate = useNavigate()
  
  return (
  <div className="flex flex-col w-full md:w-[390px] border border-gray-300 rounded-lg p-4 shadow-sm bg-white">
    <div className="space-y-4">
      <div>
        <p className="text-gray-500 text-xs md:text-sm">Program Level</p>
        <p className="font-medium text-gray-900 text-sm md:text-base">{courseItem?.programLevel}</p>
      </div>
      
      <div>
        <p className="text-gray-500 text-xs md:text-sm">Program Duration</p>
        <p className="font-medium text-gray-900 text-sm md:text-base">{courseItem?.duration} {courseItem?.durationPeriod}</p>
      </div>
      
      <div>
        <p className="text-gray-500 text-xs md:text-sm">Application Fee</p>
        <p className="font-medium text-gray-900 text-sm md:text-base">{courseItem?.acceptanceFeeCurrency} {courseItem?.acceptanceFee}</p>
      </div>
      
      <div>
        <p className="text-gray-500 text-xs md:text-sm">Estimated Tuition Costs</p>
        <p className="font-medium text-gray-900 text-sm md:text-base">{courseItem?.currency} {courseItem?.price}</p>
      </div>
      
      <div>
        <p className="text-gray-500 text-xs md:text-sm">Course Website</p>
        <a 
          href={courseItem?.courseWebsiteUrl} 
          className="text-blue-600 hover:underline text-sm md:text-base break-all"
        >
          {courseItem?.courseWebsiteUrl}
        </a>
      </div>
      
      <button onClick={() => navigate(`/check-eligibility/${courseItem?.id}`)} className="w-full bg-[#004085] text-white py-2 rounded font-medium hover:bg-blue-900 transition-colors text-sm md:text-base">
        Check Eligibility
      </button>
    </div>
  </div>
)
}

export default EligibilityCard