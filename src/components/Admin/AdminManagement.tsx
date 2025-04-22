import { useState , useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import AdminTable from "./AdminTable";
import CreateAdminModal from "./CreateAdminModal";
import { getAllAdmins } from "../../services/schools";
import { useAuth } from "../../contexts/useAuth";
import { AdminUser } from "../../types/school.types";
import { toast } from "react-toastify";

const AdminManagement = () => {
  // Filter courses based on search term
  const [adminList, setAdminList] = useState<AdminUser[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const {token} = useAuth()

  const handleGetAllAdmins = async () => {
    setIsLoading(true);
    try {
      const response: AdminUser[] = await getAllAdmins(token as string);
      console.log("response: ", response)
      setAdminList(response)
    } catch (e: any) {
      toast.error(e.response.data)
    }
    finally {
      setIsLoading(false);
    }
  }

  const itemsPerPage = 10;

  // Compute pagination
  const totalPages = Math.ceil(adminList.length / itemsPerPage);

  useEffect(() => {
    handleGetAllAdmins();
  }, [])

  return (
    <div className="w-full size-max bg-[#FAFAFA] border-[1px] border-[#E0E0E0] rounded-lg flex flex-col gap-6 p-5">
      <div className="w-full flex justify-between items-center">
        <div>
          <p className="text-[#101828] text-[20px] font-semibold">Admin Management</p>
          <p className="text-[#737373] text-[14px] font-normal">Create, edit, and delete admin profiles on the platform.</p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="w-[150px] text-white text-[14px] font-medium py-2 h-[40px] bg-[#004085] p-2 rounded-md 
              outline-0 focus:outline-none flex justify-center items-center gap-x-[10px]"
        >
          <FiPlus className="w-5 h-5 text-[white]" />
          <p>Create Admin</p>
        </button>
      </div>

      <div className="overflow-x-auto border border-[#E0E0E0] rounded-md py-2">
        <AdminTable admins={adminList} isLoading={isLoading} />

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
      </div>

      {
        showModal && <CreateAdminModal setModal={setShowModal} />
      }
    </div>  
  )
}

export default AdminManagement