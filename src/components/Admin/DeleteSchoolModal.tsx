import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../contexts/useAuth";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

interface ModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  itemName: string;
  itemId: string;
  itemType: string; 
}

export default function DeleteModal({
  setShowModal,
  itemName,
  itemId,
  itemType,
}: ModalProps) {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationName, setConfirmationName] = useState("");
  const navigate = useNavigate();

  console.log("itemName: ", itemName)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (itemName !== confirmationName) {
      toast.error("Incorrect name entered");
      return;
    }

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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-5 md:w-1/2 w-full xl:w-1/3">
        <div className="relative">
          <h2 className=" text-[20px] font-semibold">Delete {itemType}</h2>
          <p>
            Please confirm your decision to delete this {itemType} by entering
            its name:
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center gap-4">
            <label
              htmlFor="delete"
              className="text-center mx-auto text-[16px] font-bold"
            >
              {itemName}
            </label>
            <input
              type="text"
              placeholder={`Enter ${itemType} name`}
              onChange={(e) => setConfirmationName(e.target.value)}
              className="border-[1.25px] border-[#757575] rounded-md p-2 focus:outline-none w-full text-[16px] font-[400] text-[#8F8F8F]"
            />
          </div>
          <div className="flex w-full justify-between">
            <div
              className="border-[#000000] border-[1px] px-5 py-2 rounded-md"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </div>
            <button
              className="text-[#FFFFFF] bg-[#BC0000] px-5 py-2 rounded-md"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <BeatLoader /> : "Delete"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
