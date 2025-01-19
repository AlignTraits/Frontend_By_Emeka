import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../contexts/useAuth";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
// import { getSchools } from "../../services/schools";

interface ModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  schoolName: string
  schoolId: string
}
export default function CreateSchoolModal({ setShowModal, schoolName, schoolId }: ModalProps) {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isDelete, setIsDelete ] = useState('')
    const navigate = useNavigate()


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(isDelete == schoolName ){
        toast.error('Incorrect School Name')
        return
    }

    try {
      setIsLoading(true);
      console.log(isDelete);
      const response = await api.delete(`/school/delete/${schoolId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
    //   const res = await getSchools(token as string)
      await localStorage.removeItem('schools')
      setShowModal(false);
      toast.success("School Deleted Successfully");
      navigate('/admin/schools')
      console.log(response.data);
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.errors) {
        console.log(err);
        const errors = err.response.data.errors;
        console.log(errors);

        errors.forEach((error: { message: string }) => {
          if (error.message) {
            toast.error(error.message);
          }
        });
      }
      if (err.response && err.response.data) {
        toast.error(err.response.data.error);
      }

      if (
        err.response &&
        err.response.data.message &&
        !err.response.data.errors
      ) {
        toast.error(err.response.data.message);
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
          <h2 className=" text-[20px] font-semibold">Delete</h2>
          <p>
            Please confirm your decision to delete this course by entering the
            course title:
          </p>
        </div>
        <div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center gap-4">
              <label
                htmlFor="delete"
                className="text-center mx-auto text-[16px] font-bold"
              >
                {schoolName}
              </label>
              <input
                type="text"
                placeholder="delete"
                name="delete"
                onChange={(e) => setIsDelete(e.target.value)}
                className="border-[1.25px] border-[#757575] rounded-md p-2 focus:outline-none w-full text-[16px] font-[400] text-[#8F8F8F]"
              />
            </div>

            <div className="flex w-full justify-between">
              <div className="border-[#000000] border-[1px] px-5 py-2 rounded-md" onClick={()=>setShowModal(false)}>
                Cancel
              </div>
              <button className="text-[#FFFFFF] bg-[#BC0000] px-5 py-2 rounded-md" type="submit">
              {isLoading ? <BeatLoader /> : 'Delete'} 
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
