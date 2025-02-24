import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ImageUploadWithPreview from "../../components/Admin/ImageUpload";
import CustomSelect from "../../components/dashboard/CustomSelect";
import { FiX } from "react-icons/fi";
import { createCourse, getCourseDetails } from "../../services/schools"; // Assume getCourseDetails is a function to fetch course details
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/useAuth";
import { BeatLoader, ClipLoader } from "react-spinners";
import { School } from "../../services/schools";

export interface Form {
  title: string;
  profile: File | null;
  schoolId: string;
  scholarship: string;
  duration: number;
  durationPeriod: string;
  price: number;
  currency: string;
  acceptanceFee: number;
  acceptanceFeeCurrency: string;
  description: string;
  requirements: string[];
  rating?: number;
}

interface SelectWithCancelProps {
  requirements: string[];
  setForm: React.Dispatch<React.SetStateAction<Form>>;
  form: Form;
  placeholder: string;
}

const SelectWithCancel: React.FC<SelectWithCancelProps> = ({
  requirements,
  setForm,
  form,
  placeholder,
}) => {
  const removeRequirement = (requirement: string) => () => {
    setForm({
      ...form,
      requirements: form.requirements.filter((req) => req !== requirement),
    });
  };

  return (
    <div className="flex gap-2 w-full justify-between">
      <CustomSelect
        placeholder={placeholder}
        options={requirements.map((requirement) => ({
          value: requirement,
          label: requirement,
        }))}
        onChange={(value) =>
          setForm({ ...form, requirements: [...form.requirements, value] })
        }
        className="w-full"
      />
      <FiX
        className="my-auto w-5 h-5 cursor-pointer"
        onClick={removeRequirement(placeholder)}
      />
    </div>
  );
};



export default function CreateSchool() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
   const [fetchingDetails, setFetchingDetails] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null | ArrayBuffer>(
    null
  );
  const [form, setForm] = useState<Form>({
    title: "",
    profile: imageFile,
    schoolId: "",
    scholarship: "",
    duration: 0,
    durationPeriod: "",
    price: 0,
    currency: "",
    acceptanceFee: 0,
    acceptanceFeeCurrency: "",
    description: "",
    requirements: [],
  });

  // Parse the 'id' from the query string
  const id = new URLSearchParams(location.search).get("id");

  useEffect(() => {
    if (id) {
      // Fetch course details and populate the form
      setFetchingDetails(true);
      const fetchCourseDetails = async () => {
        try {
          const courseDetails = await getCourseDetails(id);
         
          delete courseDetails.id
         delete courseDetails.createdAt
         delete courseDetails.updatedAt
         delete courseDetails.university
         delete courseDetails.ratings
          setForm({
            ...courseDetails,
            profile:imageFile ? imageFile : courseDetails.profile
          });
          setPreviewUrl(courseDetails.profile);
          setFetchingDetails(false); 
        } catch (error) {
          console.error("Failed to fetch course details", error);
          toast.error("Failed to load course details");
          setFetchingDetails(false);
        }
      };

      fetchCourseDetails();
    }
  }, [id, imageFile]);


  useEffect(() => {
    setForm({...form, profile: imageFile})
  }, [imageFile])

  const requirements = [
    "WAEC",
    "NECO",
    "JAMB",
    "POST-UTME",
    "BSC",
    "MSc",
    "PHD",
  ];

  const selectedRequirement = (value: string) => {
    if (form.requirements.includes(value)) return;
    setForm({ ...form, requirements: [...form.requirements, value] });
  };

  const schools = localStorage.getItem("schools");
  let schoolOptions = [];

  try {
    schoolOptions = schools
      ? JSON.parse(schools).map((school: { name: string }) => ({
          value: school.name,
          label: school.name,
        }))
      : [];
  } catch (error) {
    console.error("Error parsing schools from localStorage", error);
    schoolOptions = [];
  }

  const handleSubmit = async () => {
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else if (imageFile && key === "profile") {
        formData.append(key, imageFile!);
      } else {
        formData.append(key, value as string);
      }
    });

    formData.append("courseInformation", "course Information here")
    formData.append("programLevel", "100")
    formData.append("careerOpportunities", JSON.stringify(["Test"]))
    formData.append("estimatedLivingCost", "5000")
    formData.append("loanInformation", "five years apart")
    formData.append("courseWebsiteUrl", "example.com")
    setIsLoading(true);

    try {
      const response =   await createCourse(formData, token as string, id ? id : undefined)
      console.log(response)
      toast.success("Course Created Successfully");
      localStorage.removeItem("schools");
      navigate(-1);
    } catch (error) {
      console.error("Failed to create course", error);
      // toast.error("Failed to create course");
    } finally {
      setIsLoading(false);
    }
  };

if (fetchingDetails) {
  return (
    <div className="flex justify-center items-center min-h-[60dvh]">
      <ClipLoader />
    </div>
  );
}

  return (
    <div className="">
      <div className="w-full flex justify-between pb-5 border-b-[1px] border-[#E0E0E0]">
        <h2 className="my-auto text-[#007BFF] text-[18px] font-[400]">
          Course Creation
        </h2>
        <div>
          <button
            className="px-3 py-2 bg-[#004085] text-[#FFFFFF] text-[16px] rounded-lg mr-5 w-[150px]"
            onClick={() => handleSubmit()}
            disabled={isLoading}
          >
            {isLoading ? <BeatLoader /> : id ? "Edit Course" : "Create Course"}
          </button>
          <button
            className="px-3 py-2 bg-[#850000] text-[#FFFFFF] text-[16px] rounded-lg"
            onClick={() => navigate(-1)}
          >
            Discard All Changes
          </button>
        </div>
      </div>
      <div>
        <form className="w-full flex flex-col gap-5 [&>div]:grid [&>div]:grid-cols-[20%_40%] [&>div>label]:text-[#000000] [&>div>label]:font-[600] [&>div>label]:text-[16px] [&>div]:py-10 [&>div]:border-b-[1px] [&>div]:border-[#E0E0E0] [&>div>input]:border-[0.8px] [&>div>textarea]:border-[0.8px] [&>div>input]:border-[#000000] [&>div>textarea]:border-[#000000] [&>div>input]:rounded-md [&>div>textarea]:rounded-md [&>div>input]:py-2 [&>div>textarea]:py-2 [&>div>input]:px-3 [&>div>textarea]:px-3">
          <div>
            <label htmlFor="course title">Course Title</label>
            <input
              type="text"
              placeholder="Enter title"
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              value={form.title}
            />
          </div>
          <div>
            <label htmlFor="course Profile">Course Profile</label>
            <ImageUploadWithPreview
              setImageFile={setImageFile}
              setPreviewUrl={setPreviewUrl}
              previewUrl={previewUrl}
              imageFile={imageFile}
            />
          </div>
          <div>
            <label htmlFor="university">Select University</label>
            <CustomSelect
              options={schoolOptions}
              placeholder={` Select University`}
              onChange={(value) => {
                if (schools) {
                  const selectedSchool = JSON.parse(schools).find(
                    (school: School) => school.name === value
                  );
                  setForm({
                    ...form,
                    schoolId: selectedSchool ? selectedSchool.id : "",
                  });
                }
              }}
            />
          </div>
          <div>
            <label htmlFor="scholarship">Select Scholarship</label>
            <CustomSelect
              options={[
                { value: "Yes", label: "Yes Scholarship" },
                { value: "No", label: "No Scholarship" },
                { value: "50%", label: "50% Scholarship" },
                { value: "100%", label: "100% Scholarship" },
              ]}
              placeholder="Kindly select scholarship"
              onChange={(value) => setForm({ ...form, scholarship: value })}
            />
          </div>
          <div>
            <label htmlFor="course duration">Course Duration</label>
            <div className="flex w-full gap-5">
              <input
                type="number"
                placeholder="Duration"
                onChange={(e) =>
                  setForm({ ...form, duration: parseInt(e.target.value) })
                }
                value={form.duration}
                className="bg-[#00408533] rounded-md w-[200px] px-3 py-2"
              />
              <CustomSelect
                options={[
                  { value: "MONTH", label: "Months" },
                  { value: "YEAR", label: "Years" },
                ]}
                placeholder="Select Period"
                onChange={(value) =>
                  setForm({ ...form, durationPeriod: value })
                }
                className="w-[200px] [&>button]:bg-[#00408533] [&>button]:rounded-md [&>button]:border-0"
              />
            </div>
          </div>
          <div>
            <label htmlFor="course price">Course Price</label>
            <div className="flex w-full gap-5">
              <input
                type="number"
                placeholder="price"
                onChange={(e) =>
                  setForm({ ...form, price: parseInt(e.target.value) })
                }
                value={form.price}
                className="bg-[#00408533] rounded-md w-[200px] px-3 py-2"
              />
              <CustomSelect
                options={[
                  { value: "NAIRA", label: "Naira" },
                  { value: "DOLLAR", label: "Dollar" },
                ]}
                placeholder="Select currency"
                onChange={(value) => setForm({ ...form, currency: value })}
                className="w-[200px] [&>button]:bg-[#00408533] [&>button]:rounded-md [&>button]:border-0"
              />
            </div>
          </div>
          <div>
            <label htmlFor="Acceptance">Acceptance Fee</label>
            <div className="flex w-full gap-5">
              <input
                type="number"
                placeholder="0.00"
                onChange={(e) =>
                  setForm({ ...form, acceptanceFee: parseInt(e.target.value) })
                }
                value={form.acceptanceFee}
                className="bg-[#00408533] rounded-md w-[200px] px-3 py-2"
              />
              <CustomSelect
                options={[
                  { value: "NAIRA", label: "Naira" },
                  { value: "DOLLAR", label: "Dollar" },
                ]}
                placeholder="Select currency"
                onChange={(value) =>
                  setForm({ ...form, acceptanceFeeCurrency: value })
                }
                className="w-[200px] [&>button]:bg-[#00408533] [&>button]:rounded-md [&>button]:border-0"
              />
            </div>
          </div>
          <div>
            <label htmlFor="description">Course Description</label>
            <textarea
              name="description"
              id="description"
              placeholder="Add Course Description..."
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="h-[200px]"
              value={form.description}
            ></textarea>
          </div>
          <div>
            <label htmlFor="requirements">Course Requirements</label>
            <div className="flex flex-col gap-5">
              <div className="w-[50%]">
                {form.requirements.length > 0 && (
                  <div className="flex flex-wrap gap-5 w-full">
                    {form.requirements.map((requirement, index) => (
                      <SelectWithCancel
                        key={index}
                        requirements={requirements}
                        setForm={setForm}
                        form={form}
                        placeholder={requirement}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="flex w-full gap-2">
                <CustomSelect
                  placeholder=" select requirement"
                  options={requirements.map((requirement) => ({
                    value: requirement,
                    label: requirement,
                  }))}
                  onChange={(value) => selectedRequirement(value)}
                  className="w-full"
                />
                <span className="my-auto">or</span>
                <input
                  type="text"
                  placeholder="Requirement"
                  className="my-auto border-[0.8px] border-[#000000] rounded-md py-2 px-3 w-full"
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    selectedRequirement(e.currentTarget.value)
                  }
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="justify-center flex w-full mt-4">
        <button
          className="px-3 py-2 bg-[#004085] text-[#FFFFFF] text-[16px] rounded-lg mr-5 w-[150px]"
          onClick={() => handleSubmit()}
          disabled={isLoading}
        >
          {isLoading ? <BeatLoader /> : id ? "Edit Course" : "Create Course"}
        </button>
      </div>
    </div>
  );
}
