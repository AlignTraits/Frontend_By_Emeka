import { useState, useEffect, useMemo } from "react";
import { FiSearch } from "react-icons/fi";
// import { FaAngleDown } from "react-icons/fa6";
// import { BeatLoader } from "react-spinners";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { getUserList } from "../../services/schools";

import UserTable from "../../components/Admin/UserTable"
import { useAuth } from "../../contexts/useAuth";

interface User {
  id: string;
  firstname:string;
  lastname: string;
  email: string;
  region: string;
  gender: string
}


export default function UsersList() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [userList, setUserList] = useState<User[]>([])
  const [selectedCourseList, setSelectedCourseList] = useState<string[]>([]);

  // --- Search and Pagination State ---
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch school and courses
  async function fetchUsers() {
    setIsLoading(true);
    try {
      const response = await getUserList(token || "");
      setUserList(response?.data || [])
    } catch (e) {
      console.log("error: ", e)
    } finally {
      setIsLoading(false)
    }
  }

  console.log("userList: ", userList)

  useEffect(() => {
    fetchUsers();
  }, []);


  // Filter courses based on search term
  const filteredUsers = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return userList;

    return userList.filter((user) => {
      const title = (user.firstname ?? "").toLowerCase();
      // const description = (course.description ?? "").toLowerCase();
      return title.includes(term)
    });
  }, [userList, searchTerm]);

  // Reset to page 1 whenever the search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Compute pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage]);


  return (
    <div className="relative">
      <div className="flex flex-col w-full gap-5 p-5 xl:p-6">
        <div className="flex justify-between items-center gap-x-[10px] border-b border-[#EAECF0] py-[10px]">
          <div className="flex gap-x-[10px] items-center">
            <div>
              <div onClick={() => navigate(-1)} className="flex gap-x-[5px] items-center">
                <IoIosArrowBack className="h-4 w-4" />
                <p className="text-[#004085] text-[14px] font-medium cursor-pointer">Go back</p>
              </div>
            </div>
          </div>

          <div className="flex gap-x-[20px]">
            <div className="relative w-[250px]">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 px-10 rounded-md font-semibold border-[1px] border-[#DDDDDD] focus:outline-none focus:border-[#757575] text-[14px] font-[400] text-[#8F8F8F]"
              />
              <FiSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-[#999999] w-5 h-5" />
            </div>

          </div>
        </div>

        <div className="overflow-x-auto border border-[#E0E0E0] rounded-md py-2">
          <UserTable
            users={paginatedUsers}
            isLoading={isLoading}
            getSchool={fetchUsers}
            setSelectedCourseList={setSelectedCourseList}
            selectedCourseList={selectedCourseList}
          >
                      {/* Pagination Controls */}
          <div className="flex justify-between items-center px-5 mt-5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-1 border-[1px] border-[#D0D5DD] rounded-lg disabled:opacity-50"
            >
              Previous
            </button>

            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-1 border-[1px] border-[#D0D5DD] rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
          </UserTable>
        </div>

      </div>
    </div>
  );
}