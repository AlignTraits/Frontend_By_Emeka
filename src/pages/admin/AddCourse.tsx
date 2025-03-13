import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io";
import ImageUploadWithPreview from "../../components/Admin/ImageUpload";
import CustomSelect from "../../components/dashboard/CustomSelect";
import RichTextEditor from "../../components/Admin/RichTextEditor";

export default function AddCourse () {

  const navigate = useNavigate()
  const [courseDescription, setCourseDescription] = useState("");
  const [loanDescription, setLoanDescription] = useState("");

  const [scholarshipDescription, setScholarshipDescription] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null | ArrayBuffer>(
    null
  );

  const programLevel = ["100", "200", "300", "400"]

  const programDuration = ["1", "2", "3", "4"]

  const period = ["YEAR", "MONTH"]

  const scholarship = ["Available", "Not Available"]

  const handleCancel = () => {
    
  }

  const handleSubmit = () => {
   
    
  }

  return (
    <div className="relative">
      <div className="flex flex-col w-full gap-5 p-5 xl:p-6">

        <div onClick={() => navigate(-1)} className="flex gap-x-[5px] items-center">
          <IoIosArrowBack className="h-4 w-4" />
          <p className="text-[#004085] text-[14px] font-medium cursor-pointer">Go back</p>
        </div> 

        <form className="w-full h-[2050px] bg-[#FAFAFA] border-[2px] border-[#E0E0E0] rounded-lg flex flex-col gap-5 p-5">
          <div className="flex">
            <p className="text-[18px] font-semibold text-[#1E1E1E] w-[190px] ">
              Basic Information
            </p>
            <div className="w-[100%] border-b-[2px] border-[#E0E0E0]"></div>
          </div>

          <div className="flex gap-x-[20px]">
            <div className="w-full flex flex-col gap-y-[5px]">
              <p className="text-[16px] text-[#1E1E1E] font-medium">Course Title*</p>
              <input
                type="text"
                placeholder="What is your title?"
                name="courseTitle"
                // onChange={(e) => setData({ ...data, name: e.target.value })}
                className="border-[1px] px-[10px] rounded-md border-[#E9E9E9] py-2 focus:outline-none w-full text-[16px] font-[400] text-[black]"
              />
            </div>

            <div className="w-full flex flex-col gap-y-[5px]">
              <p className="text-[16px] text-[#1E1E1E] font-medium">Course Website Url*</p>
              <input
                type="text"
                placeholder="https://"
                name="courseWebsite"
                // onChange={(e) => setData({ ...data, name: e.target.value })}
                className="border-[1px] px-[10px] rounded-md border-[#E9E9E9] py-2 focus:outline-none w-full text-[16px] font-[400] text-[black]"
              />
            </div>
          </div>

          <div className="w-[300px] flex flex-col gap-y-[5px]">
            <p className="text-[16px] text-[#1E1E1E] font-medium">Course Image*</p>
            <ImageUploadWithPreview
              setImageFile={setImageFile}
              imageFile={imageFile}
              previewUrl={previewUrl}
              setPreviewUrl={setPreviewUrl}
            />
          </div>

          <div className="flex">
            <p className="text-[18px] font-semibold text-[#1E1E1E] w-[210px] ">
              Course Information
            </p>
            <div className="w-[100%] border-b-[2px] border-[#E0E0E0]"></div>
          </div>

          <div className="flex gap-x-[20px]">
            <div className="w-full flex flex-col gap-y-[5px]">
              <p className="text-[16px] text-[#1E1E1E] font-medium">Program Level*</p>
              <CustomSelect
                placeholder="Select Level"
                options={programLevel.map((level) => ({
                  value: level,
                  label: level,
                }))}
                // onChange={(value) => setSelectedCountry(value)}
                onChange={() =>  true}
              />
            </div>

            <div className="w-full flex flex-col gap-y-[5px]">
              <p className="text-[16px] text-[#1E1E1E] font-medium">Program Duration*</p>
              <CustomSelect
                placeholder="0"
                options={programDuration.map((duration) => ({
                  value: duration,
                  label: duration,
                }))}
                // onChange={(value) => setSelectedState(value)}
                onChange={() =>  true}
                // selectedProps={selectedDefaultState}
              />
            </div>

            <div className="w-full flex flex-col gap-y-[5px]">
              <p className="text-[16px] text-[#1E1E1E] font-medium">Year*</p>
              <CustomSelect
                placeholder="Year"
                options={period.map((paramPeriod) => ({
                  value: paramPeriod,
                  label: paramPeriod,
                }))}
                // onChange={(value) => setSelectedState(value)}
                onChange={() =>  true}
                // selectedProps={selectedDefaultState}
              />
            </div>

          </div>

          <div className="flex gap-x-[20px]">
            <div className="w-full flex flex-col gap-y-[5px]">
              <p className="text-[16px] text-[#1E1E1E] font-medium">Scholarship*</p>
              <CustomSelect
                placeholder="Select Level"
                options={scholarship.map((level) => ({
                  value: level,
                  label: level,
                }))}
                // onChange={(value) => setSelectedCountry(value)}
                onChange={() =>  true}
              />
            </div>

            <div className="w-full flex flex-col gap-y-[5px]">
              <p className="text-[16px] text-[#1E1E1E] font-medium">Acceptance Fee*</p>
              <input
                type="number"
                placeholder="0.00"
                name="AcceptanceFee"
                // onChange={(e) => setData({ ...data, name: e.target.value })}
                className="border-[1px] px-[10px] rounded-md border-[#E9E9E9] py-2 focus:outline-none w-full text-[16px] font-[400] text-[black]"
              />
            </div>

            <div className="w-full flex flex-col gap-y-[5px]">
              <p className="text-[16px] text-[#1E1E1E] font-medium">Course Price*</p>
              <input
                type="number"
                placeholder="0.00"
                name="coursePrice"
                // onChange={(e) => setData({ ...data, name: e.target.value })}
                className="border-[1px] px-[10px] rounded-md border-[#E9E9E9] py-2 focus:outline-none w-full text-[16px] font-[400] text-[black]"
              />
            </div>

          </div>

          <div className="w-full flex flex-col gap-y-[5px] h-max">
            <p className="text-[16px] text-[#1E1E1E] font-medium">Course Description*</p>
            <RichTextEditor placeholder="Write few things about the course..." value={courseDescription} onChange={setCourseDescription} />
          </div>

          <div className="flex mt-[50px]">
            <p className="text-[18px] font-semibold text-[#1E1E1E] w-[210px] ">
              Loan Requirements
            </p>
            <div className="w-[100%] border-b-[2px] border-[#E0E0E0]"></div>
          </div>

          <div className="w-full flex flex-col gap-y-[5px] h-max">
            <p className="text-[16px] text-[#1E1E1E] font-medium">Loan Description*</p>
            <RichTextEditor placeholder="Write few things about the course..." value={loanDescription} onChange={setLoanDescription} />
          </div>

          <div className="flex mt-[50px]">
            <p className="text-[18px] font-semibold text-[#1E1E1E] w-[300px] ">
              Scholarship Requirements
            </p>
            <div className="w-[100%] border-b-[2px] border-[#E0E0E0]"></div>
          </div>

          <div className="w-full flex flex-col gap-y-[5px] h-max">
            <p className="text-[16px] text-[#1E1E1E] font-medium">Scholarship Description*</p>
            <RichTextEditor 
              value={scholarshipDescription} 
              onChange={setScholarshipDescription} 
              placeholder="Write few things about the course..."
            />
          </div>
          
          <div className="flex gap-x-[20px] mt-[50px]">
            <button type="button" onClick={handleCancel} className="rounded-lg w-full h-[40px] bg-[#D9E2ED] text-[14px] text-[#004085] semi-bold">Cancel</button>

            <button type="button" onClick={handleSubmit} className="rounded-lg w-full h-[40px] bg-[#004085] text-[14px] text-[white] semi-bold">Add Course</button>

          </div>

        </form>

      </div>
    </div>
    
  )
}