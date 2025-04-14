import { FiArrowDown } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import { FaRegTrashCan } from "react-icons/fa6";
import fileIcon from "../../assets/IconWrap.svg";


interface Props {
  isLoading: boolean;
}

export default function BulkCenterTable({
  isLoading
}: Props) {
  
  return (
    <>
      {isLoading && (
        <div className="mx-auto w-full flex justify-center items-center h-[500px]">
          <ClipLoader />
        </div>
      )}

      {!isLoading && (
        <div className="w-full min-h-[500px] border-b border-gray-300">
          <table className="w-full table-auto space-y-4">
            <thead className="border-b-[0.8px] border-[#EAECF0] p-[20px]">
              <tr className="[&>th]:text-[#000000] [&>th]:text-[14px] [&>th]:font-medium [&>th]:pb-2">
                <th className="w-[14.2%] p-[20px]">
                  <div className="flex items-center">
                    File Name <FiArrowDown className="ml-2 mb-1" />
                  </div>
                </th>
                <th className="w-[15.2%] p-[20px]">
                  <div className="flex items-center">
                    Update Date <FiArrowDown className="ml-2 mb-1" />
                  </div>
                </th>
                {/* <th className="w-[14.2%] p-[20px]">
                  <div className="flex items-center">
                    Action <FiArrowDown className="ml-2 mb-1" />
                  </div>
                </th> */}
                <th className="w-[14.2%] p-[20px]">
                  <div className="flex items-center">
                    Entity <FiArrowDown className="ml-2 mb-1" />
                  </div>
                </th>
                <th className="w-[14.2%] p-[20px]">
                  <div className="flex items-center">
                    Status <FiArrowDown className="ml-2 mb-1" />
                  </div>
                </th>

                <th className="w-[14.2%] p-[20px]">
                  <div className="flex items-center">
                    Records <FiArrowDown className="ml-2 mb-1" />
                  </div>
                </th>

                <th className="w-[15.2%] p-[20px]">
                  <div className="flex items-center">
                    Uploaded By <FiArrowDown className="ml-2 mb-1" />
                  </div>
                </th>

                <th className="w-[14.2%] p-[20px]">
                  <div className="flex items-center">
                    Actions <FiArrowDown className="ml-2 mb-1" />
                  </div>
                </th>
              </tr>
            </thead>

            {[].length > 0 && (
              <tbody>
                {[].map((_, index) => (
                  <tr
                    className="[&>td]:py-5 hover:bg-[#007BFF33] border-b border-gray-300 last:border-b-0"
                    key={index}
                  >
                    <td className="text-[#000000] text-[16px] font-[400] p-[20px] flex gap-2 items-center">

                      <p>course.titl</p>
                    </td>
                    <td className="text-[#757575] text-[14px] font-[500] p-[20px]">
                      course.programLevel
                    </td>
                    <td className="text-[#757575] text-[14px] font-[500] p-[20px]">
                      formatDuration(course.durationPeriod, course.duration)
                    </td>
                    <td className="text-[#757575] text-[14px] font-[500] p-[20px]">
                      course.currency course.price
                    </td>
                    <td className="text-[#757575] text-[14px] font-[500] p-[20px]">
                      formatDate(course.updatedAt)
                    </td>
                    <td className="p-[20px] flex gap-x-[20px] items-center">
                      <FaRegTrashCan className="text-[#D92D20] h-5 w-5 cursor-pointer" />
                  
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {!isLoading && [].length === 0 && (
            <div className="flex flex-col justify-center items-center gap-y-[10px] w-full h-[400px]">
              <img src={fileIcon} alt="Not found" />
              <p className="text-[#101828] text-[16px] font-semibold">No Bulk Center Created</p>
            </div>
          )}
        </div>
      )}


    </>
  );
}
