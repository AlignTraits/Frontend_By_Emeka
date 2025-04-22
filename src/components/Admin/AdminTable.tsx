import { FiArrowDown } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import fileIcon from "../../assets/IconWrap.svg"
import { FiEdit2 } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { AdminUser } from "../../types/school.types";
interface Props {
  admins: AdminUser[];
  isLoading: boolean;
}

export default function AdminTable({
  admins,
  isLoading,
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
                <th className="w-[25%] p-[20px]">
                  <div className="flex items-center">
                    Name <FiArrowDown className="ml-2 mb-1" />
                  </div>
                </th>
                <th className="w-[16.6%] p-[20px]">
                  <div className="flex items-center">
                    Email <FiArrowDown className="ml-2 mb-1" />
                  </div>
                </th>
                <th className="w-[16.6%] p-[20px]">
                  <div className="flex items-center">
                    Phone <FiArrowDown className="ml-2 mb-1" />
                  </div>
                </th>
                <th className="w-[16.6%] p-[20px]">
                  <div className="flex items-center">
                    Role <FiArrowDown className="ml-2 mb-1" />
                  </div>
                </th>
                <th className="w-[16.6%] p-[20px]">
                  <div className="flex items-center">
                    Status <FiArrowDown className="ml-2 mb-1" />
                  </div>
                </th>

                <th className="w-[16.6%] p-[20px]">
                  <div className="flex items-center">
                    Action <FiArrowDown className="ml-2 mb-1" />
                  </div>
                </th>
              </tr>
            </thead>

            {admins.length > 0 && (
              <tbody>
                {admins.map((item, index) => (
                  <tr
                    className="[&>td]:py-5 hover:bg-[#007BFF33] border-b border-gray-300 last:border-b-0"
                    key={index}
                  >
                    <td className="text-[#000000] text-[16px] font-[400] p-[20px]">
                      <p>{item.firstname}</p>
                    </td>
                    <td className="text-[#757575] text-[14px] font-[500] p-[20px]">
                      <p>{item.email}</p>
                    </td>
                    <td className="text-[#757575] text-[14px] font-[500] p-[20px]">
                      <p>{item.contactNumber}</p>
                    </td>
                    <td className="text-[#757575] text-[14px] font-[500] p-[20px]">
                      <p>{item.role}</p>
                    </td>
                    <td className="text-[#757575] text-[14px] font-[500] p-[20px]">
                      <p>_</p>
                    </td>
                    <td className="p-[20px] flex gap-x-[20px] items-center">
                      <FiEdit2 className="mt-3 h-5 w-5 cursor-pointer" />
                      <FaRegTrashAlt className="text-[#F04438] mt-3 h-5 w-5 cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {!isLoading && admins.length === 0 && (
            <div className="flex flex-col justify-center items-center gap-y-[10px] w-full h-[400px]">
              <img src={fileIcon} alt="Not found" />
              <p className="text-[#101828] text-[16px] font-semibold">No Admin Created</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
