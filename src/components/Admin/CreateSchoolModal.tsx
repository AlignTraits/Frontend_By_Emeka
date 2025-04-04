import React, { useState, useEffect } from "react";
import CustomSelect from "../dashboard/CustomSelect";
import ImageUpload from "./ImageUpload";
import api from "../../api/axios";
import { useAuth } from "../../contexts/useAuth";
import { BeatLoader } from "react-spinners";
import {toast} from 'react-toastify'
import { getSchools, School } from "../../services/schools";
import countriesData from "../../data/countries_states.json"

interface Data {
  logo: File | null;
  name:  string;
  schoolType: string;
}

interface ModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSchools: React.Dispatch<React.SetStateAction<School[]>>;
}



const countryStateData: Record<string, string[]> = {
};

countriesData.map((elem:any) => {
  countryStateData[elem.name] = elem.states
})


export default function CreateSchoolModal({setShowModal, setSchools}: ModalProps) {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [errorObj, setErrorObj] = useState({
    previewUrl: false,
    name: false,
    schoolType: false,
    country: false,
    state: false

  })

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
    name: "",
    schoolType: "",
  });

  const handleFileError = () => {
    setErrorObj((prev) => ({...prev, previewUrl: false}))
  }

  const handleStateError = () => {
    setErrorObj((prev) => ({...prev, state: false}))
  }

  const handleCountryError = () => {
    setErrorObj((prev) => ({...prev, country: false}))
  }

  const handleTypeError = () => {
    setErrorObj((prev) => ({...prev, schoolType: false}))
  }



  const checkAllFields = () => {
    if (selectedCountry.length === 0) {
      setErrorObj((prev) => ({...prev, country: true}))
    }
    if (selectedState.length === 0) {
      setErrorObj((prev) => ({...prev, state: true}))
    }
    if (data.name.length === 0) {
      setErrorObj((prev) => ({...prev, name: true}))
    }
    if (data.schoolType.length === 0) {
      setErrorObj((prev) => ({...prev, schoolType: true}))
    }

    if (!previewUrl) {
      setErrorObj((prev) => ({...prev, previewUrl: true}))
    }
  }


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

  const isFormValid = () => {
    if (previewUrl && data.name.length > 0 && data.logo && selectedCountry.length > 0 && 
      selectedState.length > 0) {
      return true
    } else {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    checkAllFields();

    if (!isFormValid()) {
      toast.error("Please fill all input fields!");
      return 
    }

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
    <div className="absolute inset-0 bg-white p-10">
      <div className="relative">
        <h2 className="text-[18px] font-semibold">
          Create New School
        </h2>
        <p className="text-[12px] text-[#737373] font-normal">Add a new school to the platform with all required details.</p>
      </div>
      <div>
        <form className="space-y-6 mt-[20px]" onSubmit={handleSubmit}>
          <div className="w-[300px]">
            <p className={`text-[12px] ${errorObj.previewUrl ? 'text-[#F04438]' : 'text-[#1E1E1E]'} font-medium`}>School Logo*</p>
            <ImageUpload
              setImageFile={setImageFile}
              imageFile={imageFile}
              previewUrl={previewUrl}
              errorState={errorObj.previewUrl}
              handleFileError={handleFileError}
              setPreviewUrl={setPreviewUrl}
            />
          </div>

          <div className="flex flex-col gap-y-[5px]">
            <p className={`text-[12px] ${errorObj.name ? 'text-[#F04438]' : 'text-[#1E1E1E]'} font-medium`}>School Name*</p>
            <input
              type="text"
              placeholder="School Name"
              onFocus={() => setErrorObj((prev) => ({...prev, name: false}))}
              name="schoolName"
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="border-[1px] px-[10px] rounded-md border-[#E9E9E9] py-2 focus:outline-none w-full text-[16px] font-[400] text-[black]"
            />
            <p className="text-[#737373] font-normal text-[12px]">The official name of the school or university.</p>
          </div>

          <div className="flex flex-col gap-y-[5px]">
            <p className={`text-[12px] ${errorObj.schoolType ? 'text-[#F04438]' : 'text-[#1E1E1E]'} font-medium`}>School Type*</p>
            <CustomSelect
              placeholder="Select School Type"
              options={SCHOOLTYPE.map((schtype) => ({
                value: schtype,
                label: schtype,
              }))}
              onChange={(value) => setData({ ...data, schoolType: value })}
              handleError={handleTypeError}
            />
            <p className="text-[#737373] font-normal text-[12px]">The type or category of the educational institution</p>
          </div>

          <div className="flex gap-x-[20px]">
            <div className="w-full">
              <p className={`text-[12px] ${errorObj.country ? 'text-[#F04438]' : 'text-[#1E1E1E]'} font-medium`}>School Country*</p>
              <CustomSelect
                placeholder="Select Country"
                options={Object.keys(countryStateData).map((country) => ({
                  value: country,
                  label: country,
                }))}
                onChange={(value) => setSelectedCountry(value)}
                handleError={handleCountryError}
              />
            </div>

            <div className="w-full">
              <p className={`text-[12px] ${errorObj.state ? 'text-[#F04438]' : 'text-[#1E1E1E]'} font-medium`}>School State*</p>
              <CustomSelect
                placeholder="Select State"
                options={states.map((state) => ({
                  value: state,
                  label: state,
                }))}
                onChange={(value) => setSelectedState(value)}
                disabledState={selectedCountry ? false : true}
                selectedProps={selectedDefaultState}
                handleError={handleStateError}
              />
            </div>
          </div>

          <div className="flex justify-end gap-x-[10px]">
            <button  onClick={()=> setShowModal(false)} className="w-[120px] font-semibold text-[14px] text-[#1E1E1E] py-2 rounded-lg border-[1px] border-[#DDDDDD]">
              Cancel
            </button>
            <button className="w-[120px] bg-[#004085] font-semibold text-[14px] text-[white] py-2 rounded-lg">
                {isLoading ? (
                    <BeatLoader color="#ffffff" size={8} />
                ) : (
                    "Create School"
                )}
            </button>
          </div>
        </form>
      </div>

      <div className="h-[20px] w-[20px]"></div>
    </div>
  );
}
