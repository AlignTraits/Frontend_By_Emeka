import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowDown } from "react-icons/fi";
// import CreateSchoolDropDown from "./CreateSchoolDropDown";
import { School, getDays } from "../../services/schools";
import { ClipLoader } from "react-spinners";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import DeleteModal from "./DeleteSchoolModal";
import EditSchoolModal from "./EditSchoolModal";
// import { getSchool } from "../../services/schools";
// import { Course } from "../../types/course.types";

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  // setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  schools: School[];
  isLoading: boolean;
  getSchools: Function;
}


export default function SchoolsTable({
  // setShowModal,
  schools,
  isLoading, getSchools,
}: Props) {
  const navigate = useNavigate()
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false)
    const [itemForDelete, setItemForDelete] = useState({
      name: "",
      id: ""
    })

    const [itemForEdit, setItemForEdit] = useState({
      id: "",
      name: "",
      schoolType: "",
      logo: "",
      location: ""

    })


  const handleTrashClick = (event: React.MouseEvent, schoolParam: any) => {
    event.stopPropagation(); // Prevents event from bubbling to parent
    setItemForDelete(schoolParam)
    setModal(true)
  };

  const handleManageClick = (event: React.MouseEvent,) => {
    event.stopPropagation(); // Prevents event from bubbling to parent
    // setItemForDelete(schoolParam)
    // setModal(true)
  };

 
  const handleEditClick = (event: React.MouseEvent, schoolParam: any) => {
    event.stopPropagation();
    setItemForEdit(schoolParam)
    setEditModal(true)
  };

  const renderType = (schoolType:string) => {
    if (schoolType === "PUBLIC_UNIVERSITY") {
      return (
        <p className="text-[#175CD3] text-[12px] font-medium 
        border border-[#B2DDFF] rounded-lg bg-[#EFF8FF] size-max px-[8px] py-[2px]">Public</p>
      )
    } else {
      return (
        <p className="text-[#B54708] text-[12px] font-medium 
        border border-[#FEDF89] rounded-lg bg-[#FFFAEb] size-max px-[5px]">Private</p>
      )
    }
  }
  
  return (
    <>
      {isLoading && (
        <div className="mx-auto">
          <ClipLoader />
        </div>
      )}

      {!isLoading && (
        <div className="w-full min-h-[500px] border border-[#EAECF0] rounded-lg">
          <table className="w-full table-auto space-y-4">
            <thead className="border-b-[0.8px] border-[#EAECF0] p-[20px]">
              <tr className="[&>th]:text-[#000000] [&>th]:text-[14px] [&>th]:font-medium [&>th]:pb-2">
                <th className="w-[20%] p-[20px]">
                  <div className="flex items-center">
                    Name <FiArrowDown className="ml-2" />
                  </div>
                </th>
                <th className="w-[13.3%] p-[20px]">
                  <div className="flex items-center">
                    Courses <FiArrowDown className="ml-2" />
                  </div>
                </th>
                <th className="w-[13.3%] p-[20px]">
                  <div className="flex items-center">
                    Location <FiArrowDown className="ml-2" />
                  </div>
                </th>
                <th className="w-[13.3%] p-[20px]">
                  <div className="flex items-center">
                    Last Modified <FiArrowDown className="ml-2" />
                  </div>
                </th>
                <th className="w-[16%] p-[20px]">
                  <div className="flex items-center">
                    Type <FiArrowDown className="ml-2" />
                  </div>
                </th>

                <th className="w-[13.3%] p-[20px]">
                  <div className="flex items-center">
                    Action <FiArrowDown className="ml-2" />
                  </div>
                </th>
              </tr>
            </thead>

            {schools.length > 0 && (
              <tbody>
                {schools.map((school, index) => (
                  <tr
                    className="[&>td]:py-5 hover:bg-[#007BFF33] border-b border-gray-300 last:border-b-0"
                    key={index + school.id}
                    onClick={() => navigate(`edit-school?id=${school.id}`)}
                  >
                    <td className="text-[#000000] text-[16px] font-[400] p-[20px] flex gap-10">

                      {
                        school.logo ? <img
                        src={school.logo}
                        alt="School Logo"
                        className="w-[50px] h-[50px] rounded-full"
                      /> : <div className="w-[40px] h-[40px] rounded-[50%] bg-[grey]"></div>
                      }
                      <span className="text-[#000000] text-[400] text-[16px] capitalize">
                        {school.name}
                      </span>
                    </td>
                    <td className="text-[#757575] text-[14px] font-[500] p-[20px]">
                      {/* {school._count?.courses} courses */}
                      <button onClick={handleManageClick} className="text-[white] bg-[#007BFF] h-[35px] px-[10px] rounded-lg">Manage Course</button>
                    </td>
                    <td className="text-[#757575] text-[14px] font-[500] p-[20px]">{school.location}</td>
                    <td className="text-[#757575] text-[14px] font-[500] p-[20px]">
                      {getDays(school.updatedAt)}
                    </td>
                    <td className="text-[#757575] text-[14px] font-[500] p-[20px]">{renderType(school.schoolType)}</td>
                    <td className="p-[20px] flex gap-x-[20px] items-center">
                      <FaRegTrashCan onClick={(e) => handleTrashClick(e, school)} className="text-[#D92D20] h-5 w-5 cursor-pointer" />
                      
                      <MdOutlineEdit onClick={(e) => handleEditClick(e, school)} className="text-[#757575] h-6 w-6 font-[500] cursor-pointer" />
                      
                    </td>
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

      {modal && (
        <DeleteModal
          itemName={itemForDelete.name as string}
          setShowModal={setModal}
          itemId={itemForDelete.id as string}
          itemType={"school"}
          getSchools={getSchools}
        />
      )}

      {
        editModal && (
          <EditSchoolModal 
            defaultName={itemForEdit?.name as string}
            schoolId={itemForEdit?.id as string}
            setShowModal={setEditModal}
            schooTypeDefault={itemForEdit?.schoolType as string}
            defaultImgUrl={itemForEdit?.logo as string}
            selectedProps={
              {
                value: itemForEdit?.location as string,
                label: itemForEdit?.location as string
              }
            }
            fetchSchool={getSchools}
          />
        )
      }
    </>
  );
}
