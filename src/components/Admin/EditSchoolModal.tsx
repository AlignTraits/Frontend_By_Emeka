import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import CustomSelect from "../dashboard/CustomSelect";
import ImageUpload from "./ImageUpload";
import api from "../../api/axios";
import { useAuth } from "../../contexts/useAuth";
import { BeatLoader } from "react-spinners";
import {toast} from 'react-toastify'
// import { getSchools, School } from "../../services/schools";

interface Data {
  logo: File | null;
  name: null | string;
  location: null | string;
  schoolType: string | null;
}  

interface ModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  // setSchool: React.Dispatch<React.SetStateAction<School[]>>;
  schooTypeDefault: string;
  defaultImgUrl: string;
  defaultName: string;
  selectedProps: {
    value: string;
    label: string
  };
  schoolId: string;
  fetchSchool: Function
}

const countryStateData: Record<string, string[]> = {
  USA: ["California", "Texas", "New York", "Florida"],
  Canada: ["Ontario", "Quebec", "British Columbia"],
  Nigeria: ["Lagos", "Abuja", "Rivers", "Kaduna", "Imo", "Abia", "Osun"].sort(),
};


export default function EditSchoolModal({
  setShowModal, schooTypeDefault, 
  defaultImgUrl, defaultName, selectedProps, schoolId, fetchSchool}: ModalProps) {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  //   {
  //     id: 1,
  //     name: "Federal University",
  //     value: "FEDERAL_UNIVERSITY",
  //     checked: false,
  //   },
  //   {
  //     id: 2,
  //     name: "Private University",
  //     value: "PRIVATE_UNIVERSITY",
  //     checked: false,
  //   },
  //   {
  //     id: 3,
  //     name: "Public University",
  //     value: "PUBLIC_UNIVERSITY",
  //     checked: false,
  //   },
  // ]);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null | ArrayBuffer>(
    null
  );
  const [nameText, setNameText] = useState("")

  const [data, setData] = useState<Data>({
    logo: imageFile,
    name: "",
    schoolType: null,
    location: null,
  });

  const [selectedCountry, setSelectedCountry] = useState<string>(selectedProps.label.split("/")[0]);
  const [selectedState, setSelectedState] = useState<string>(selectedProps.label.split("/")[1]);
  const [selectedDefaultState, setSelectedDefaultState] = useState({
    value: selectedProps.label.split("/")[1],
    label: selectedProps.label.split("/")[1]
  })


  const [selectedDefaultCountry, setSelectedDefaultCountry] = useState({
    value: selectedProps.label.split("/")[0],
    label: selectedProps.label.split("/")[0]
  })


  useEffect(() => {
    setData((prevData) => ({ ...prevData, logo: imageFile }));
  }, [imageFile]);


  useEffect(() => {
  setPreviewUrl(defaultImgUrl)
  setNameText(defaultName);

  setData((prevData) => ({ 
    ...prevData, 
    location: selectedProps.label
  }));

  }, [])


  useEffect(() => {
    if (selectedCountry.length > 0) {
      setSelectedState(countryStateData[selectedCountry][0])
    }
  }, [selectedCountry]) 


  const states = selectedCountry ? countryStateData[selectedCountry] || [] : [];

  const SCHOOLTYPE = [
   "PRIVATE_UNIVERSITY", "PUBLIC_UNIVERSITY"
  ]

  const handleNameChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setNameText(e.currentTarget.value);
    setData({ ...data, name: e.currentTarget.value })
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData()
    if (imageFile) formData.append("logo", data.logo!); 
    formData.append("name", nameText || "");
    formData.append("schoolType", data.schoolType || "");
    // formData.append("location", `${selectedCountry}/${selectedState}` || "");
    formData.append("region", selectedState)
    formData.append("country", selectedCountry)
    // formData.append("websiteUrl", "www.schoolxyz.com")

    try {
        setIsLoading(true);
      const response = await api.patch(`/school/update/${schoolId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setShowModal(false)

      if (response.data.ok) {
        toast.success('School Updated Successfully')
        fetchSchool()
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
      <div className="bg-white rounded-lg p-5 md:w-1/2 w-full xl:w-1/3 z-50">
        <div className="relative">
          <h2 className="text-[18px] font-semibold">
            Update School
          </h2>
          {/* <p className="text-[12px] text-[#737373] font-normal">Create a new school so students can see now</p> */}
          <FiX className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 text-[#595959] w-5 h-5" onClick={()=> setShowModal(false)} />
        </div>
        <div>
          <form className="space-y-6  mt-[20px]" onSubmit={handleSubmit}>
          <div>
            <p className="text-[12px] text-[#1E1E1E] font-medium">School Name*</p>
            <input
              type="text"
              placeholder="School Name"
              name="schoolName"
              value={nameText}
              onChange={handleNameChange}
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
                selectedProps={{value: schooTypeDefault, label: schooTypeDefault}}
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
                  onChange={(value) => {
                    setSelectedDefaultState({
                      value: countryStateData[value][0],
                      label: countryStateData[value][0]
                    })
                    setSelectedDefaultCountry({
                      value: value,
                      label: value
                    })
                    setSelectedCountry(value)
                  }}
                  selectedProps={selectedDefaultCountry}
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
                    "Edit School"
                )}
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}
