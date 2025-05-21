import { useState } from 'react';
import Header from '../../components/Header';
import companyLogo from "../../assets/AlignTraitsFlaire.svg"
import ImageUploadWithPreview from '../../components/Admin/ImageUpload';


const OnboardingPage = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null | ArrayBuffer>(
    null
  );

  const [firstName, setFirstName] = useState("")

  const [lastName, setLastName] = useState("")

  const [errorObj, setErrorObj] = useState({
    firstName: false,
    lastName: false
    // schoolType: false,
    // country: false,
    // state: false

  })

  return (
    <div className="relative h-screen w-full bg-[#ffffff]">
      <Header />

      <div className="p-5 w-full">
        <img src={companyLogo} alt='Logo Text' className='h-[30px]' />

        <form className='w-[650px] h-[700px] border-[2px] border-[#ccc] rounded-lg mx-auto mt-20 p-5 flex flex-col gap-y-[20px]'>
          <div>
            <p className='text-[#101828] text-[25px] font-semibold'>Personal Details</p>
            <p className='text-[#757575] text-[14px]'>Provide the following information to help us recommend the <br /> best suitable course of study and experience.</p>
          </div>

          <div className='w-[200px]'>
            <ImageUploadWithPreview
              setImageFile={setImageFile}
              imageFile={imageFile}
              previewUrl={previewUrl}
              // errorState={errorObj.previewUrl}
              setPreviewUrl={setPreviewUrl}
            />
            <p className='italic text-[#757575] text-[14px]'>Optional</p>
          </div>

          <div className='flex gap-x-[20px]'>
            <div className="flex flex-col gap-y-[5px] w-[50%]">
              <p className={`text-[12px] ${errorObj.firstName ? 'text-[#F04438]' : 'text-[#1E1E1E]'} font-medium`}>First Name*</p>
              <input
                type="text"
                placeholder="Enter First Name"
                onFocus={() => setErrorObj((prev) => ({...prev, firstName: false}))}
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border-[1px] px-[10px] rounded-md border-[#E9E9E9] py-2 focus:outline-none w-full text-[16px] font-[400] text-[black]"
              />
            </div>

            <div className="flex flex-col gap-y-[5px] w-[50%]">
              <p className={`text-[12px] ${errorObj.lastName ? 'text-[#F04438]' : 'text-[#1E1E1E]'} font-medium`}>Lasts Name*</p>
              <input
                type="text"
                placeholder="Enter Last Name"
                onFocus={() => setErrorObj((prev) => ({...prev, lastName: false}))}
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border-[1px] px-[10px] rounded-md border-[#E9E9E9] py-2 focus:outline-none w-full text-[16px] font-[400] text-[black]"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default OnboardingPage