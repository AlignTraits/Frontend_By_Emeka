import { FiArrowDown } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import { Course } from "../../types/course.types";
import fileIcon from "../../assets/IconWrap.svg"
import { getDays } from "../../services/schools";
import { useAuth } from "../../contexts/useAuth";
import DeleteModal from "./DeleteSchoolModal";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  courses: Course[];
  isLoading: boolean;
  getSchool: Function
}


export default function CoursesTable({
  courses,
  isLoading,
  getSchool
}: Props) {

  const navigate = useNavigate()
  const { schoolId } = useParams<{ schoolId: string}>();
  const {setCurrentCourseID} = useAuth()

const [modal, setModal] = useState(false);
const [itemForDelete, setItemForDelete] = useState({
  title: "",
  id: ""
})
  
  const handleEdit = (id: string) => {
    setCurrentCourseID(id)
    navigate(`/admin/schools/${schoolId}/add-course`);
  }


  const handleTrashClick = (event: React.MouseEvent, schoolParam: any) => {
    event.stopPropagation(); // Prevents event from bubbling to parent
    setItemForDelete(schoolParam)
    setModal(true)
  };

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
                <th className="w-[16.6%] p-[20px]">
                  <div className="flex items-center">
                    Title <FiArrowDown className="ml-2 mb-1" />
                  </div>
                </th>
                <th className="w-[16.6%] p-[20px]">
                  <div className="flex items-center">
                    Program Level <FiArrowDown className="ml-2 mb-1" />
                  </div>
                </th>
                <th className="w-[16.6%] p-[20px]">
                  <div className="flex items-center">
                    Duration <FiArrowDown className="ml-2 mb-1" />
                  </div>
                </th>
                <th className="w-[16.6%] p-[20px]">
                  <div className="flex items-center">
                    Tuition Fee <FiArrowDown className="ml-2 mb-1" />
                  </div>
                </th>
                <th className="w-[16.6%] p-[20px]">
                  <div className="flex items-center">
                    Last Modified <FiArrowDown className="ml-2 mb-1" />
                  </div>
                </th>

                <th className="w-[16.6%] p-[20px]">
                  <div className="flex items-center">
                    Action <FiArrowDown className="ml-2 mb-1" />
                  </div>
                </th>
              </tr>
            </thead>

            {courses.length > 0 && (
              <tbody>
                {courses.map((course, index) => (
                  <tr
                    className="[&>td]:py-5 hover:bg-[#007BFF33] border-b border-gray-300 last:border-b-0"
                    key={index + course.id}
                  >
                    <td className="text-[#000000] text-[16px] font-[400] p-[20px] flex gap-10">
                      {course.title}
                    </td>
                    <td className="text-[#757575] text-[14px] font-[500] p-[20px]">
                      {course.programLevel}
                    </td>
                    <td className="text-[#757575] text-[14px] font-[500] p-[20px]">
                      {course.duration}
                    </td>
                    <td className="text-[#757575] text-[14px] font-[500] p-[20px]">
                      {course.price}
                    </td>
                    <td className="text-[#757575] text-[14px] font-[500] p-[20px]">
                      {getDays(course.updatedAt)}
                    </td>
                    <td className="p-[20px] flex gap-x-[20px] items-center">
                      <FaRegTrashCan onClick={(e) => handleTrashClick(e, course)} className="text-[#D92D20] h-5 w-5 cursor-pointer" />
                      
                      <MdOutlineEdit onClick={() => handleEdit(course.id)} className="text-[#757575] h-6 w-6 font-[500] cursor-pointer" />
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {!isLoading && courses.length === 0 && (
            <div className="flex flex-col justify-center items-center gap-y-[10px] w-full h-[400px]">
              <img src={fileIcon} alt="Not found" />
              <p className="text-[#101828] text-[16px] font-semibold">No Course Created</p>
              <p className="text-center text-[#475467] text-[14px] font-normal">
                You have not created a course yet. Click the “Create<br/> course” Button to create one now!
              </p>
            </div>
          )}
        </div>
      )}

      {modal && (
        <DeleteModal
          itemName={itemForDelete.title as string}
          setShowModal={setModal}
          itemId={itemForDelete.id as string}
          itemType={"course"}
          getSchools={getSchool}
        />
      )}


    </>
  );
}
