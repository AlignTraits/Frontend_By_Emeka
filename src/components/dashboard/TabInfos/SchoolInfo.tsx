
import { School } from '../../../services/schools';


interface Props {
  schoolItem: School | null;
}

const SchoolInfo = ({schoolItem}: Props) => {
  return (
    <div className="max-w-2xl pt-5 bg-white">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Name</h2>
        <p className="text-gray-600">
          {schoolItem?.name || "N/A"}
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Location</h2>
        <p className="text-gray-600">
          {schoolItem?.country} / {schoolItem?.region}
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">School Type</h2>
        <p className="text-gray-600">
          {schoolItem?.schoolType || "N/A"}
        </p>
      </div>
      
    </div>
  )
}

export default SchoolInfo