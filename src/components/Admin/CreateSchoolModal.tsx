import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
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
  schoolType: null | string;
}

interface ModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSchools: React.Dispatch<React.SetStateAction<School[]>>;
}

const countryStateData: Record<string, string[]> = {
  USA: ["California", "Texas", "New York", "Florida"],
  Canada: ["Ontario", "Quebec", "British Columbia"],
  Nigeria: ["Lagos", "Abuja", "Rivers", "Kaduna", "Imo", "Abia"],
};

export default function CreateSchoolModal({setShowModal, setSchools}: ModalProps) {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null | ArrayBuffer>(
    null
  );

  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedDefaultState, setSelectedDefaultState] = useState({
    value: "",
    label: ""
  })

    // Get the states for the selected country
  const states = selectedCountry ? countryStateData[selectedCountry] || [] : [];

  const [data, setData] = useState<Data>({
    logo: imageFile,
    name: null,
    schoolType: null,
  });

  useEffect(() => {
    setData((prevData) => ({ ...prevData, logo: imageFile }));
  }, [imageFile]);

  useEffect(() => {
    if (selectedCountry.length > 0) {
      setSelectedDefaultState({
        value: countryStateData[selectedCountry][0],
        label: countryStateData[selectedCountry][0]
      })
      setSelectedState(countryStateData[selectedCountry][0])
    }
  }, [selectedCountry]) 


  const SCHOOLTYPE = [
    "PRIVATE_UNIVERSITY", "PUBLIC_UNIVERSITY"
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append("logo", data.logo!); 
    formData.append("name", data.name || "");
    formData.append("schoolType", data.schoolType || "");
    formData.append("websiteUrl", "www.schoolxyz.com")
    formData.append('country', selectedCountry)
    formData.append("region", selectedState)

    try {
        setIsLoading(true);
      const response = await api.post("/school/add-school", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setSchools(await getSchools(token as string))
      setShowModal(false)

      if (response.data.ok) {
        toast.success('School Created Successfully')
      } else {
        toast.error(response.data.message)
      }

    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.errors) {
       
        const errors = err.response.data.errors;

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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[200]">
      <div className="bg-white rounded-lg p-5 md:w-1/2 w-full xl:w-1/3">
        <div className="relative">
          <h2 className="text-[18px] font-semibold">
            Create New School
          </h2>
          <p className="text-[12px] text-[#737373] font-normal">Create a new school so students can see now</p>
          <FiX className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 text-[#595959] w-5 h-5" onClick={()=> setShowModal(false)} />
        </div>
        <div>
          <form className="space-y-6 mt-[20px]" onSubmit={handleSubmit}>
            <div>
              <p className="text-[12px] text-[#1E1E1E] font-medium">School Name*</p>
              <input
                type="text"
                placeholder="School Name"
                name="schoolName"
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="border-[1px] px-[10px] rounded-md border-[#E9E9E9] py-2 focus:outline-none w-full text-[16px] font-[400] text-[black]"
              />
            </div>

            <div>
              <p className="text-[12px] text-[#1E1E1E] font-medium">School Type*</p>
              <CustomSelect
                placeholder="Select School Type"
                options={SCHOOLTYPE.map((schtype) => ({
                  value: schtype,
                  label: schtype,
                }))}
                onChange={(value) => setData({ ...data, schoolType: value })}
              />
            </div>

            <div className="flex gap-x-[20px]">
              <div className="w-full">
                <p className="text-[12px] text-[#1E1E1E] font-medium">School Country*</p>
                <CustomSelect
                  placeholder="Select Country"
                  options={Object.keys(countryStateData).map((country) => ({
                    value: country,
                    label: country,
                  }))}
                  onChange={(value) => setSelectedCountry(value)}
                />
              </div>

              <div className="w-full">
                <p className="text-[12px] text-[#1E1E1E] font-medium">School State*</p>
                <CustomSelect
                  placeholder="Select State"
                  options={states.map((state) => ({
                    value: state,
                    label: state,
                  }))}
                  onChange={(value) => setSelectedState(value)}
                  disabledState={selectedCountry ? false : true}
                  selectedProps={selectedDefaultState}
                />
              </div>
            </div>

            <div>
              <p className="text-[12px] text-[#1E1E1E] font-medium">School Logo*</p>
              <ImageUpload
                setImageFile={setImageFile}
                imageFile={imageFile}
                previewUrl={previewUrl}
                setPreviewUrl={setPreviewUrl}
              />
            </div>

            <button className="w-full bg-[#D9E2ED] font-semibold text-[14px] text-[#004085] py-2 rounded-lg">
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
