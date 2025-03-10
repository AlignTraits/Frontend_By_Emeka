import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { FiX } from "react-icons/fi";
import { useAuth } from "../../contexts/useAuth";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import { FaRegTrashCan } from "react-icons/fa6";

interface ModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  itemName: string;
  itemId: string;
  itemType: string;
  getSchools?: Function 
}

export default function DeleteModal({
  setShowModal,
  itemName,
  itemId,
  itemType,
  getSchools
}: ModalProps) {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async () => {

    try {
      setIsLoading(true);

      const endpoint =
        itemType === "school"
          ? `/school/delete/${itemId}`
          : `school/course/delete/${itemId}`;
      const response = await api.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setShowModal(false);
      toast.success(
        `${
          itemType.charAt(0).toUpperCase() + itemType.slice(1)
        } Deleted Successfully`
      );
      localStorage.removeItem('schools')
      navigate(`/admin/schools`);
      if (getSchools) {
        getSchools()
      }
      console.log(response.data);
    } catch (err: any) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.error || "An error occurred");
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[200]">
      <div className="bg-white rounded-lg p-5 md:w-1/2 w-full xl:w-1/3 flex flex-col gap-y-[20px]">
        <div className="flex justify-between items-center">
          <div className="bg-[#FEE4E2] h-[50px] w-[50px] rounded-full flex justify-center items-center">
            <FaRegTrashCan className="text-[#D92D20] h-5 w-5" />
          </div>

          <FiX className="cursor-pointer text-[#595959] w-5 h-5" onClick={()=> setShowModal(false)} />
        </div>

        <div className="relative flex flex-col gap-y-[10px]">
          <h2 className=" text-[18px] font-semibold">Delete {itemType}</h2>
          <p className="text-[16px] text-[#737373]">
            You are about to delete "{itemName}"! This action cannot be undone. 
            All data associated with this school will be permanently removed.
          </p>
        </div>

        <div className="flex w-full justify-between gap-x-[20px]">
          <div
            className="border-[#000000] border-[1px] px-5 py-2 rounded-md w-full text-center cursor-pointer"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </div>
          <button
            className="text-[#FFFFFF] bg-[#D92D20] px-5 py-2 rounded-md w-full text-center cursor-pointer"
            // type="submit"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? <BeatLoader /> : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
