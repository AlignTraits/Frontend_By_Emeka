import { FiArrowDown } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import fileIcon from "../../assets/IconWrap.svg"
interface User {
  id: string;
  firstname:string;
  lastname: string;
  email: string;
  region: string;
  gender: string
}


interface Props {
  users: User[];
  isLoading: boolean;
  getSchool: Function;
  selectedCourseList: string[];
  setSelectedCourseList: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function UserTable({
  users,
  isLoading,
  // selectedCourseList,
  // setSelectedCourseList,
  children, // Accept children
}: Props & { children?: React.ReactNode }) {


  
  const handleTestClick = () => {
  }

  // const handleSelect = (event: React.MouseEvent, id: string) => {
  //   event.stopPropagation();

  //   if (selectedCourseList.includes(id)) {
  //     setSelectedCourseList(() => selectedCourseList.filter((elem) => id !== elem))
  //   } else {
  //     let tempList = [...selectedCourseList, id]
  //     setSelectedCourseList(tempList)
  //   }
  // }

  return (
    <>
      {isLoading && (
        <div className="mx-auto w-full flex justify-center items-center h-[500px]">
          <ClipLoader />
        </div>
      )}

      {!isLoading && (
        <div className="w-full h-[400px] overflow-y-scroll">
          <table className="w-full table-auto space-y-4">
            <thead className="border-b-[0.8px] border-[#EAECF0] p-[20px] bg-white sticky top-0">
              <tr className="[&>th]:text-[#000000] [&>th]:text-[14px] [&>th]:font-medium [&>th]:pb-2">
                <th className="w-[25%] p-[20px]">
                  <div className="flex items-center">
                    Firstname <FiArrowDown className="ml-2 mb-1" />
                  </div>
                </th>
                <th className="w-[16.6%] p-[20px]">
                  <div className="flex items-center">
                    Lastname <FiArrowDown className="ml-2 mb-1" />
                  </div>
                </th>
                <th className="w-[16.6%] p-[20px]">
                  <div className="flex items-center">
                    Email <FiArrowDown className="ml-2 mb-1" />
                  </div>
                </th>
                <th className="w-[16.6%] p-[20px]">
                  <div className="flex items-center">
                    Gender <FiArrowDown className="ml-2 mb-1" />
                  </div>
                </th>
                <th className="w-[16.6%] p-[20px]">
                  <div className="flex items-center">
                    Region <FiArrowDown className="ml-2 mb-1" />
                  </div>
                </th>
              </tr>
            </thead>

            {users.length > 0 && (
              <tbody className="">
                {users.map((course, index) => (
                  <tr
                    className="[&>td]:py-5 hover:bg-[#007BFF33] border-b border-gray-300"
                    key={index + course.id}
                    onClick={() => handleTestClick()}
                  >
                    <td className="text-[#000000] text-[16px] font-[400] p-[20px] flex gap-2 items-center">
                      {/* <div onClick={(e) => handleSelect(e, course.id)} className="cursor-pointer border-[#D0D5DD] border-[1px] h-[25px] w-[25px] rounded-md flex justify-center items-center">
                        {
                          selectedCourseList.includes(course.id) && 
                          <div className="h-[15px] w-[15px] bg-[#004085] rounded-[50%]"></div>
                        }
                      </div> */}
                      <p>{course.firstname}</p>
                    </td>
                    <td className="text-[#757575] text-[14px] font-[500] p-[20px]">
                      {course.lastname}
                    </td>
                    <td className="text-[#757575] text-[14px] font-[500] p-[20px]">
                      {course.email}
                    </td>
                    <td className="text-[#757575] text-[14px] font-[500] p-[20px]">
                      {course.gender ? course.gender : "-"} 
                    </td>
                    <td className="text-[#757575] text-[14px] font-[500] p-[20px]">
                      {course.region ? course.region : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          
          {!isLoading && users.length === 0 && (
            <div className="flex flex-col justify-center items-center gap-y-[10px] w-full h-[250px]">
              <img src={fileIcon} alt="Not found" />
              <p className="text-[#101828] text-[16px] font-semibold">No User Created</p>
            </div>
          )}
          <div>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
