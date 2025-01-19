import React, { useState,  } from "react";
import Header from "../../../components/Settings/Header";
import ImageUploadWithPreview from "../../../components/Settings/ImageUpload";
import DummyImage from "../../../assets/dashboard/images/dummy-image.png";
import CustomSelect from "../../../components/dashboard/CustomSelect";
// import { upDateUserProfile } from "../../../services/auth.service";
// import { useAuth } from '../../../hooks/useAuth';
import { User } from "../../../types/auth.types";
export default function BasicInformation() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [user, setUser] = useState<User>({
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    image: DummyImage,
    dob: "",
    bio: "",
    region: "",
    currentSkill: "",
    courseOfInterest: "",
  });

  const [previewUrl, setPreviewUrl] = useState<string | null | ArrayBuffer>(
    DummyImage as string
  );

  //  useEffect(() => {
  //      setUser((prevData) => ({ ...prevData, image: imageFile }));
  //    }, [imageFile]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name);
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleClick = () => {
    console.log(imageFile);
    console.log("User data:", user);
    const formData = new FormData();
    formData.append("image", imageFile as Blob);
    // const response = upDateUserProfile(user, formData);
    // Add save logic here
  };

  return (
    <div className="space-y-8 ">
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
              value={user.firstname}
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
              value={user.lastname}
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
            previousImg={user.image as string}
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
            <div className=" w-[200px]">
              {/* <select
                name="gender"
                id=""
                className="w-full outline-none focus-none"
                value={user.gender}
                onChange={(e) => handleChange(e)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select> */}
              <CustomSelect
                options={[
                  { value: "MALE", label: "male" },
                  { value: "FEMALE", label: "female" },
                ]}
                placeholder={user.gender as string}
                onChange={() => handleChange}
              />
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
              user.bio?.length === 400
                ? "border-red-900"
                : "border-[1px] border-[#757575]"
            } " rounded-md p-5 h-[300px] "`}
            value={user.bio as string}
            onChange={(e) => handleChange(e)}
            onKeyDown={(e) => {
              if (user?.bio?.length as number === 400 && e.key !== "Backspace") {
                e.preventDefault();
              }
            }}
          />
          <span
            className={`${
              user.bio?.length === 400 ? "text-red-600" : ""
            } "text-[#757575]   text-[16px] font-semibold"`}
          >
            {400 - (user.bio?.length as number)} characters left.
          </span>
        </div>
        <div className="grid grid-cols-[30%_70%] items-center py-10 border-b-[1px] border-[#E0E0E0]">
          <label
            htmlFor="region"
            className="text-[#000000] font-[600] text-[16px] my-auto"
          >
            Region:
          </label>
          <div className="w-[300px]">
            {/* <select name="" id="" className="w-full">
              <option value="">Lagos, Nigeria</option>
            </select> */}
            <CustomSelect
              options={[
                { value: "lagos", label: "Lagos, Nigeria" },
                { value: "abuja", label: "Abuja, Nigeria" },
              ]}
              placeholder={user.region as string}
              onChange={() => handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-[30%_70%] items-center py-10 border-b-[1px] border-[#E0E0E0]">
          <label
            htmlFor="skills"
            className="text-[#000000] font-[600] text-[16px] my-auto"
          >
            Whats your current skills?:
          </label>
          <div className="w-[300px]">
            {/* <select name="skills" id="" className="w-full">
              <option value="">Graphic Design</option>
            </select> */}

            <CustomSelect
              options={[
                { value: "graphic-design", label: "Graphic Design" },
                { value: "web-design", label: "Web Design" },
              ]}
              placeholder={user.currentSkill as string}
              onChange={() => handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-[30%_70%] items-center py-10 border-b-[1px] border-[#E0E0E0]">
          <label
            htmlFor="course"
            className="text-[#000000] font-[600] text-[16px] my-auto"
          >
            What course sparks your interest:
          </label>
          <div className="w-[300px]">
            {/* <select name="" id="" className="w-full">
              <option value="">Computer Science</option>
            </select> */}
            <CustomSelect
              options={[
                { value: "computer-science", label: "Computer Science" },
                { value: "physics", label: "Physics" },
                { value: "physics", label: "Physics" },
              ]}
              placeholder={user.courseOfInterest as string}
              onChange={() => handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
