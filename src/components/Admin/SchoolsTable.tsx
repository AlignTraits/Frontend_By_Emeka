import React from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronDown, FiArrowDown, FiPlus } from "react-icons/fi";
import CreateSchoolDropDown from "./CreateSchoolDropDown";
import { School, getDays } from "../../services/schools";
import { ClipLoader } from "react-spinners";

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  schools: School[];
  isLoading: boolean;
}

export default function SchoolsTable({
  setShowModal,
  schools,
  isLoading,
}: Props) {
  const navigate = useNavigate()
  return (
    <>
      {isLoading && (
        <div className="mx-auto">
          <ClipLoader />
        </div>
      )}

      {!isLoading && (
        <div className="w-full">
          <table className="w-full table-auto border-collapse space-y-4">
            <thead className="border-b-[0.8px] border-[#007AFF]">
              <tr className="[&>th]:text-[#000000] [&>th]:text-[14px] [&>th]:font-medium [&>th]:pb-2">
                <th className="w-[35%] text-left">Name</th>
                <th className="w-[20%]">
                  <div className="flex items-center justify-center">
                    Last modified <FiArrowDown className="ml-2" />
                  </div>
                </th>
                <th className="w-[10%] text-center">Courses</th>
                <th className="w-[20%]">
                  <div className="flex items-center justify-center">
                    <span>
                      <span className="text-[#C8C8C8]">Sort: </span>
                      Last modified
                    </span>
                    <FiChevronDown className="ml-2" />
                  </div>
                </th>
                <th className="w-[15%] text-center">
                  <CreateSchoolDropDown
                    label="Create School"
                    Icon={FiPlus}
                    values={[
                      { onchange: () => setShowModal(true), value: "School" },
                      {
                        onchange: () => navigate("create-course"),
                        value: "Course",
                      },
                    ]}
                  />
                </th>
              </tr>
            </thead>

            {schools.length > 0 && (
              <tbody>
                {schools.map((school, index) => (
                  <tr
                    className="[&>td]:py-5 cursor-pointer hover:bg-[#007BFF33]"
                    key={index + school.id}
                    onClick={() => navigate(`edit-school?id=${school.id}`)}
                  >
                    <td className="text-[#000000] text-[16px] font-[400] pb-2 flex gap-10">
                      <img
                        src={school.logo}
                        alt="School Logo"
                        className="w-[100px] h-[100px] rounded-full"
                      />
                      <span className="text-[#000000] text-[400] text-[16px] my-auto capitalize">
                        {school.name}
                      </span>
                    </td>
                    <td className="text-[#757575] text-[14px] font-[500] pb-2 text-center">
                      {getDays(school.updatedAt)}
                    </td>
                    <td className="text-[#757575] text-[14px] font-[500] text-center pb-2">
                      {school._count?.courses} courses
                    </td>
                    <td className="text-[#757575] text-[14px] font-[500] pb-2"></td>
                    <td className="text-[#757575] text-[14px] font-[500] pb-2"></td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {!isLoading && schools.length === 0 && (
            <div className="text-center mx-auto py-10 text-[#757575] text-[20px] font-bold w-full">
              No schools found
            </div>
          )}
        </div>
      )}
    </>
  );
}
