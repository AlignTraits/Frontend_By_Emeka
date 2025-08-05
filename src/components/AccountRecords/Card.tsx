import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import React, { useState } from "react";
import { deleteAcademicRecords } from "../../services/utils";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";

type ResultProps = {
  result: any;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setEditRecord: React.Dispatch<React.SetStateAction<any>>;
  getRecords: () => void;

};

const Card: React.FC<ResultProps> = ({ result, setShowModal, setEditRecord, getRecords })=> {

  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = () => {
    setEditRecord(result);
    setShowModal(true);
  }

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const response = await deleteAcademicRecords(result.id);
      console.log("response: ", response)
      toast.success("Record deleted successfully");
    } catch (error) {
      console.error("Error deleting record:", error);
      toast.error("Failed to delete record");
    } finally {
      setIsLoading(false);
      getRecords();
    }
  }
  
  return (
    <div className="border-[1px] border-[#EAECF0] flex flex-col justify-between gap-y-[30px] shadow-md rounded-xl p-5 w-[100%] size-max lg:h-[165px] hover:shadow-lg hover:border-[#D0D5DD] transition-all duration-300">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex gap-x-[10px] items-center">
            <p className="text-[#101828] text-[16px] font-semibold">{result?.ExamType1}</p>
            {/* <p className="text-[#000000] text-[10px] bg-[#E3E3E3] size-max px-[5px] py-[2px] rounded-xl">2020</p> */}
          </div>
          <p className="text-[#757575] text-[14px] font-medium">{result?.ExamType1Subjects.length} subjects recorded</p>
        </div>

        <div className="flex gap-x-[10px]">

          <>
            <FaEdit onClick={handleEdit}  className="lg:hidden h-6 w-6"  />
            <button onClick={handleEdit} className=" hidden lg:block bg-[#F4F4F4] border-[1px] border-[#EAECF0] shadow-md rounded-md h-[50px] w-[80px] text-[#000000] text-[14px] font-semibold">
              Edit
            </button>
          </>

          <>
            <RiDeleteBin6Line onClick={handleDelete} className="lg:hidden h-6 w-6 text-[#F93838]" />
            <button disabled={isLoading} onClick={handleDelete} className="hidden lg:block bg-[#F4F4F4] border-[1px] border-[#EAECF0] shadow-md rounded-md h-[50px] w-[100px] text-[#D92D20] text-[14px] font-semibold">
              {isLoading ? <BeatLoader /> : "Delete" }
            </button>
          </>
        </div>
      </div>

      <div className="flex items-center flex-wrap gap-x-[10px]">
        {
          result.ExamType1Subjects.map((elem:string, i:number) => (
          <div key={i} className="flex gap-x-[10px] items-center">
            <p className="text-[#101828] text-[16px] font-semibold">{elem}</p>
            <p className="text-[#000000] text-[10px] bg-[#E3E3E3] size-max px-[5px] py-[2px] rounded-xl">{result?.ExamType1SubGrades[i]}</p>
          </div>
          ))
        }
      </div>
    </div>
  )
}

export default Card;