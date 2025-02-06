import {useState} from 'react'
import Header from "../../../components/Settings/Header";
import MultiFileUpload from '../../../components/Settings/MultiFileUpload';
import CustomSelect from '../../../components/dashboard/CustomSelect';

export default function Schoolnformation() {
  const [id, setId] = useState('222jj2j22j')
  const [isLoading, setIsLoading] = useState(false)

  //  const handleChange = (
  //    e:
  //      | React.ChangeEvent<HTMLInputElement>
  //      | React.ChangeEvent<HTMLSelectElement>
  //      | React.ChangeEvent<HTMLTextAreaElement>
  //  ) => {
  //    const { name, value } = e.target;
  //    setId((prevSetting) => ({
  //      ...prevSetting,
  //      [name]: value,
  //    }));
  //  };

const handleFilesSelected = (files: File[]) => {
  // Process the selected files
  console.log("Files selected in parent:", files);
  // Example: upload to server or display additional info
  files.forEach((file) => {
    console.log(`File Name: ${file.name}, File Size: ${file.size} bytes`);
  });
};

  const handleClick = ()=> {
    console.log('click')
    setIsLoading(false)
  }
  return (
    <div>
      <Header
        heading="School Information"
        text="Update your school informations here."
        buttonText="Save Changes"
        handleClick={handleClick}
        isLoading={isLoading}
      />
      <div className="grid grid-cols-[40%_60%] items-center py-5 border-b-[1px] border-[#E0E0E0]">
        <label
          htmlFor="skills"
          className="text-[#000000] font-[600] text-[18px] my-auto"
        >
          What grade did you last graduate from?:
        </label>
        <div className=" w-[400px]">
          <CustomSelect
            options={[
              {
                value: "University / College (Private)",
                label: "University / College (Private)",
              },
              {
                value: "University / College (Public)",
                label: "University / College (Public)",
              },
              { value: "Polytechnic", label: "Polytechnic" },
              { value: "Secondary School", label: "Secondary School" },
              { value: "Primary School", label: "Primary School" },
            ]}
            placeholder="Select an option"
            onChange={(selectedOption) => console.log(selectedOption)}
            className="font-[500]"
          />
        </div>
      </div>
      <div className="grid grid-cols-[40%_60%] items-center py-5 border-b-[1px] border-[#E0E0E0]">
        <label
          htmlFor="skills"
          className="text-[#000000] font-semibold text-[18px] my-auto grid"
        >
          Select the school you graduated from?:
          <span className="text-[#757575] text-[14px] mt-3">
            {" "}
            Check if your school has being integrated.
          </span>
        </label>
        <div className=" w-[400px] text-[#212121] font-medium">
          <CustomSelect
            options={[
              { value: "Landmark University", label: "Landmark University" },
              { value: "Havard", label: "Havard" },
              { value: "Oxford", label: "Oxford" },
              { value: "MIT", label: "MIT" },
              { value: "Stanford", label: "Stanford" },
            ]}
            placeholder="Select an option"
            onChange={(selectedOption) => console.log(selectedOption)}
            className="font-[500]"
          />
        </div>
      </div>
      <div className="grid grid-cols-[40%_60%] py-5 w-full border-b-[1px] border-[#E0E0E0]">
        <label
          htmlFor="id"
          className="text-[#000000] font-semibold text-[18px] my-auto"
        >
          What was your ID/Reg. number?
        </label>
        <input
          type="text"
          id="id"
          name="id"
          className="w-[400px] border-[1px] border-[#757575] rounded-md py-2 px-3 text-[14px]"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div className="  space-y-8 items-center py-10 border-b-[1px] border-[#E0E0E0]">
        <h3 className="text-[#000000] font-[600] text-[18px]">
          Kindly upload your Senior Secondary School Result
        </h3>
        <div className='ml-20'>
          <MultiFileUpload onFilesSelected={handleFilesSelected} />
        </div>
      </div>
    </div>
  );
}
