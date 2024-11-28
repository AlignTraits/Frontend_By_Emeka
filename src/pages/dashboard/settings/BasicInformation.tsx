import React, { useState } from "react";
import Header from "../../../components/Settings/Header";
import ImageUploadWithPreview from "../../../components/Settings/ImageUpload";
import DummyImage from "../../../assets/dashboard/images/dummy-image.png";
// import { useAuth } from '../../../hooks/useAuth';

export default function BasicInformation() {
  // Dummy user data for demonstration
  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com",
    gender: "Male",
    image: DummyImage,
    dateOfBirth: "01/01/2000",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ut libero.",
    region: "Nigeria",
    currentSkill: "Software Developer",
    courseOfInterest: "Software Engineering",
  });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null | ArrayBuffer>(user.image);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleClick = () => {
    console.log(imageFile)
    console.log("User data:", user);
    // Add save logic here
  };

  return (
    <div className="space-y-8">
      <Header
        heading="Personal details"
        text="Update your photo and personal details here."
        buttonText="Save Changes"
        handleClick={handleClick}
      />
      <div className="m-0">
        {/* First Name and Last Name */}
        <div className="flex gap-5 pb-10 border-b-[1px] border-[#E0E0E0]">
          <div className="flex gap-2 m-0 p-0">
            <label
              htmlFor="firstName"
              className="text-[#000000] font-[600] text-[16px] my-auto"
            >
              First name:
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="border-[1px] border-[#757575] rounded-md py-2 px-3"
              value={user.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 ">
            <label
              htmlFor="lastName"
              className="text-[#000000] font-[600] text-[16px] my-auto"
            >
              Last name:
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="border-[1px] border-[#757575] rounded-md py-2 px-3"
              value={user.lastName}
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
            value={user.email}
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
            setImageFile={setImageFile}
            imageFile={imageFile}
            setPreviewUrl={setPreviewUrl}
            previousImg={user.image}
          />
        </div>

        <div className="flex gap-20 py-10 border-b-[1px] border-[#E0E0E0]">
          <div className="flex gap-5">
            <label
              htmlFor="gender"
              className="text-[#000000] font-[600] text-[16px] my-auto"
            >
              Gender:
            </label>
            <div className="border-[1px] border-[#757575] px-3 py-2 rounded-lg w-[200px]">
              <select
                name="gender"
                id=""
                className="w-full outline-none focus-none"
                value={user.gender}
                onChange={(e) => handleChange(e)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div className="flex gap-5">
            <label
              htmlFor="date-of-birth"
              className="text-[#000000] font-[600] text-[16px] my-auto"
            >
              Date of Birth:
            </label>
            <input
              type="date"
              name="date-of-birth"
              id="date"
              className="border-[1px] border-[#757575] px-3 py-2 rounded-lg w-[200px]"
            />
          </div>
        </div>
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
              user.bio.length === 400
                ? "border-red-900"
                : "border-[1px] border-[#757575]"
            } " rounded-md p-5 h-[300px] "`}
            value={user.bio}
            onChange={(e) => handleChange(e)}
            onKeyDown={(e) => {
              if (user.bio.length === 400 && e.key !== "Backspace") {
                e.preventDefault();
              }
            }}
          />
          <span
            className={`${
              user.bio.length === 400 ? "text-red-600" : ""
            } "text-[#757575]   text-[16px] font-semibold"`}
          >
            {400 - user.bio.length} characters left.
          </span>
        </div>
        <div className="flex   gap-5 items-center py-10 border-b-[1px] border-[#E0E0E0]">
          <label
            htmlFor="region"
            className="text-[#000000] font-[600] text-[16px] my-auto"
          >
            Region:
          </label>
          <div className="border-[1px] border-[#757575] px-3 py-2 rounded-lg w-[200px]">
            <select name="" id="" className="w-full">
              <option value="">Lagos, Nigeria</option>
            </select>
          </div>
        </div>
        <div className="flex   gap-5 items-center py-10 border-b-[1px] border-[#E0E0E0]">
          <label
            htmlFor="skills"
            className="text-[#000000] font-[600] text-[16px] my-auto"
          >
            Whats your current skills?:
          </label>
          <div className="border-[1px] border-[#757575] px-3 py-2 rounded-lg w-[300px]">
            <select name="skills" id="" className="w-full">
              <option value="">Graphic Design</option>
            </select>
          </div>
        </div>
        <div className="flex   gap-5 items-center py-10 border-b-[1px] border-[#E0E0E0]">
          <label
            htmlFor="course"
            className="text-[#000000] font-[600] text-[16px] my-auto"
          >
            What course sparks your interest:
          </label>
          <div className="border-[1px] border-[#757575] px-3 py-2 rounded-lg w-[300px]">
            <select name="" id="" className="w-full">
              <option value="">Computer Science</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
