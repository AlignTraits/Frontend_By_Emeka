import React, { useState, useEffect } from "react";
import Header from "../../../components/Settings/Header";
import ImageUploadWithPreview from "../../../components/Settings/ImageUpload";
import DummyImage from "../../../assets/dashboard/images/dummy-image.png";
import CustomSelect from "../../../components/dashboard/CustomSelect";
import { useAuth } from "../../../contexts/useAuth";
import { User } from "../../../types/auth.types";
import { ClipLoader } from "react-spinners";
import { upDateUserProfile } from "../../../services/auth.service";
import { toast } from "react-toastify";



export default function BasicInformation() {
  const { user, token } = useAuth();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form, setForm] = useState<User | null>(null);
  const [changedFields, setChangedFields] = useState<Partial<User>>({});
  const [isLoading, setIsLoading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer|null>(
    DummyImage
  );


  useEffect(() => {
    if (user) {
      setForm({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        gender: user.gender || "",
        image: DummyImage,
        dob: user.dob || "",
        bio: user.bio || "",
        region: user.region || "",
        currentSkill: user.currentSkill || "",
        courseOfInterest: user.courseOfInterest || "",
      });
      setPreviewUrl(user.image as string || DummyImage);
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (form) {
      setForm((prevUser) => ({
        ...prevUser!,
        [name]: value,
      }));

      setChangedFields((prev) => ({
        ...prev,
        [name]: value || '' // Ensures it’s always a string
      }));
    }
  };
  const handleSelectChange = (name: keyof User, value: string) => {
    if (form) {
      setForm((prevUser) => ({
        ...prevUser!,
        [name]: value,
      }));
      setChangedFields((prev) => ({ ...prev, [name]: value ?? '',  }));
    }
  };

  const handleImageChange = (file: File | null) => {
    setImageFile(file);
    if (file) {
      setChangedFields((prev) => ({ ...prev, image: file }));
    }
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true)

    const updateData = { ...changedFields };
    if (imageFile) {
      updateData.image = imageFile;
    }

    try {
      const response = await upDateUserProfile(
        updateData,
        token as string,
        imageFile
      );
      setForm((prev) => ({ ...prev!, ...response[0].data }));
      setIsLoading(false);
      if(response[0].ok) toast.success("Profile updated successfully");

    } catch (error) {
      setIsLoading(false);
      console.error("Error updating user profile", error);
    }
  };

  if (!form)
    return (
      <div className="flex w-full justify-center items-center py-10">
        <ClipLoader />
      </div>
    );

  return (
    <div className="space-y-8">
      <Header
        heading="Personal details"
        text="Update your photo and personal details here."
        buttonText="Save Changes"
        handleClick={handleClick}
        isLoading={isLoading}
      />
      <div className="m-0">
        {/* First Name and Last Name */}
        <div className="flex gap-5 pb-10 border-b-[1px] border-[#E0E0E0]">
          <div className="flex gap-2 m-0 p-0">
            <label
              htmlFor="firstname"
              className="text-[#000000] font-[600] text-[16px] my-auto"
            >
              First name:
            </label>
            <input
              type="text"
              id="firstName"
              name="firstname"
              className="border-[1px] border-[#757575] rounded-md py-2 px-3"
              value={form.firstname}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 ">
            <label
              htmlFor="lastname"
              className="text-[#000000] font-[600] text-[16px] my-auto"
            >
              Last name:
            </label>
            <input
              type="text"
              id="lastName"
              name="lastname"
              className="border-[1px] border-[#757575] rounded-md py-2 px-3"
              value={form.lastname}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex gap-2 py-10 border-b-[1px] border-[#E0E0E0]">
          <label
            htmlFor="email"
            className="text-[#000000] font-[600] text-[16px] my-auto"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border-[1px] border-[#757575] rounded-md py-2 px-3"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        {/* Image Upload */}
        <div className="flex  justify-center gap-10 items-center py-10 border-b-[1px] border-[#E0E0E0]">
          {previewUrl && (
            <div className="my-auto w-[200px] h-[150px] border-4 border-[#757575] rounded-[100px] overflow-hidden">
              <img
                src={typeof previewUrl === "string" ? previewUrl : ""}
                alt="Uploaded Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <ImageUploadWithPreview
            setImageFile={handleImageChange}
            imageFile={imageFile}
            setPreviewUrl={setPreviewUrl}
            previousImg={form.image as string}
          />
        </div>

        {/* Gender Select */}
        <div className="flex gap-20 py-10 border-b-[1px] border-[#E0E0E0]">
          <div className="flex gap-5">
            <label
              htmlFor="gender"
              className="text-[#000000] font-[600] text-[16px] my-auto"
            >
              Gender:
            </label>
            <div className="w-[200px]">
              <CustomSelect
                options={[
                  { value: "MALE", label: "Male" },
                  { value: "FEMALE", label: "Female" },
                ]}
                placeholder={form.gender?.toLowerCase() || "Select Gender"}
                onChange={(value) => handleSelectChange("gender", value)}
              />
            </div>
          </div>
          {/* Date of Birth */}
          <div className="flex gap-5">
            <label
              htmlFor="date-of-birth"
              className="text-[#000000] font-[600] text-[16px] my-auto"
            >
              Date of Birth:
            </label>
            <input
              type="date"
              name="dob"
              id="date"
              className="border-[1px] border-[#757575] px-3 py-2 rounded-lg w-[200px]"
              value={form.dob as string}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-4 py-10 border-b-[1px] border-[#E0E0E0]">
          <label
            htmlFor="bio"
            className="text-[#000000] font-[600] text-[18px] my-auto"
          >
            Bio:
          </label>
          <textarea
            id="bio"
            name="bio"
            className={`${
              form.bio?.length === 400
                ? "border-red-900"
                : "border-[1px] border-[#757575]"
            } rounded-md p-5 h-[300px]`}
            value={form.bio as string}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (form?.bio?.length === 400 && e.key !== "Backspace") {
                e.preventDefault();
              }
            }}
          />
          <span
            className={`${
              form.bio?.length === 400 ? "text-red-600" : ""
            } text-[#757575] text-[16px] font-semibold`}
          >
            {400 - (form.bio?.length ?? 0)} characters left.
          </span>
        </div>

        {/* Region Select */}
        <div className="grid grid-cols-[30%_70%] items-center py-10 border-b-[1px] border-[#E0E0E0]">
          <label
            htmlFor="region"
            className="text-[#000000] font-[600] text-[16px] my-auto"
          >
            Region:
          </label>
          <div className="w-[300px]">
            <CustomSelect
              options={[
                { value: "lagos", label: "Lagos, Nigeria" },
                { value: "abuja", label: "Abuja, Nigeria" },
              ]}
              placeholder={form.region || "Select Region"}
              onChange={(value) => handleSelectChange("region", value)}
            />
          </div>
        </div>

        {/* Current Skills Select */}
        <div className="grid grid-cols-[30%_70%] items-center py-10 border-b-[1px] border-[#E0E0E0]">
          <label
            htmlFor="skills"
            className="text-[#000000] font-[600] text-[16px] my-auto"
          >
            What's your current skill?:
          </label>
          <div className="w-[300px]">
            <CustomSelect
              options={[
                { value: "graphic-design", label: "Graphic Design" },
                { value: "web-design", label: "Web Design" },
              ]}
              placeholder={form.currentSkill || "Select Skill"}
              onChange={(value) => handleSelectChange("currentSkill", value)}
            />
          </div>
        </div>

        {/* Course of Interest Select */}
        <div className="grid grid-cols-[30%_70%] items-center py-10 border-b-[1px] border-[#E0E0E0]">
          <label
            htmlFor="course"
            className="text-[#000000] font-[600] text-[16px] my-auto"
          >
            What course sparks your interest?:
          </label>
          <div className="w-[300px]">
            <CustomSelect
              options={[
                { value: "computer-science", label: "Computer Science" },
                { value: "physics", label: "Physics" },
              ]}
              placeholder={form.courseOfInterest || "Select Interest"}
              onChange={(value) =>
                handleSelectChange("courseOfInterest", value)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
