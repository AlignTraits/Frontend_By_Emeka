import React, { useState, useEffect } from "react";
import { FiX, FiCheck } from "react-icons/fi";
import CustomSelect from "../dashboard/CustomSelect";
import ImageUpload from "./ImageUpload";
import api from "../../api/axios";
import { useAuth } from "../../contexts/useAuth";
import { BeatLoader } from "react-spinners";
import {toast} from 'react-toastify'
import { getSchools, School } from "../../services/schools";

interface Data {
  logo: File | null;
  name: null | string;
  location: null | string;
  schoolType: string;
}

interface ModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSchools: React.Dispatch<React.SetStateAction<School[]>>;
}
export default function CreateSchoolModal({setShowModal, setSchools}: ModalProps) {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [schoolType, setSchoolType] = useState([
    {
      id: 1,
      name: "Federal University",
      value: "FEDERAL_UNIVERSITY",
      checked: false,
    },
    {
      id: 2,
      name: "Private University",
      value: "PRIVATE_UNIVERSITY",
      checked: false,
    },
    {
      id: 3,
      name: "Public University",
      value: "PUBLIC_UNIVERSITY",
      checked: false,
    },
  ]);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null | ArrayBuffer>(
    null
  );
  const [data, setData] = useState<Data>({
    logo: imageFile,
    name: null,
    schoolType: schoolType.filter((type) => !type.checked).map((type)=> type.value)[0],
    location: null,
  });

   useEffect(() => {
     setData((prevData) => ({ ...prevData, logo: imageFile }));
   }, [imageFile]);


  const states = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "FCT - Abuja",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append("logo", data.logo!); 
    formData.append("name", data.name || "");
    formData.append("schoolType", data.schoolType);
    formData.append("location", data.location || "");
    try {
        setIsLoading(true);
        console.log(data)
      const response = await api.post("/school/add-school", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
   
     localStorage.removeItem('schools') 
       setSchools(await getSchools(token as string))
      setShowModal(false)
    
      toast.success('School Created Successfully')
      // window.location.reload()
      console.log(response.data);
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.errors) {
        console.log(err)
        const errors = err.response.data.errors;
        console.log(errors);

        errors.forEach((error: { message: string }) => {
          if (error.message) {
            toast.error(error.message);
          }
        });
      }
      if(err.response && err.response.data) {

        toast.error(err.response.data.error)
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
          <h2 className="text-center text-[20px] font-semibold">
            Create New School
          </h2>
          <FiX className="absolute right-0 top-1/2 -translate-y-1/2 text-[#000000] w-5 h-5" onClick={()=> setShowModal(false)} />
        </div>
        <div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="School Name"
              name="schoolName"
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="border-b-[1.25px] border-[#000000] py-2 focus:outline-none w-full text-[16px] font-[400] text-[black]"
            />
            <div className="space-y-2">
              <h3 className="font-[400] text-[16px]">School Type</h3>
              <div>
                {schoolType.map((type) => (
                  <div
                    key={type.id}
                    className={`${
                      type.checked ? "bg-[#007BFF33]" : ""
                    }  flex gap-2 p-2 rounded-md`}
                    onClick={() => {
                      setData({ ...data, schoolType: type.value });
                      setSchoolType(
                        schoolType.map((item) =>
                          item.id === type.id
                            ? { ...item, checked: !item.checked }
                            : { ...item, checked: false }
                        )
                      );
                    }}
                  >
                    <div
                      className={`${
                        type.checked ? "bg-[#007AFF]" : "bg-[#007AFF1A]"
                      } w-6 h-6  p-1 rounded-full`}
                    >
                      {type.checked && (
                        <FiCheck className="w-full h-full text-[#ffffff] mx-auto my-auto" />
                      )}
                    </div>

                    <label
                      htmlFor={type.name}
                      className="text-[14px] text-[#757575]"
                    >
                      {type.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <CustomSelect
              placeholder="Kindly Select School Location"
              options={states.map((state) => ({
                value: state + "/Nigeria",
                label: state + "/Nigeria",
              }))}
              onChange={(value) => setData({ ...data, location: value })}
            />
            <ImageUpload
              setImageFile={setImageFile}
              imageFile={imageFile}
              previewUrl={previewUrl}
              setPreviewUrl={setPreviewUrl}
            />
            <button className="w-full bg-[#004085] text-[#ffffff] py-2 rounded-lg">
                {isLoading ? (
                    <BeatLoader color="#ffffff" size={8} />
                ) : (
                    "Create School"
                )}
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}
