import {useState} from 'react'
import Header from "../../../components/Settings/Header";
import MultiFileUpload from '../../../components/Settings/MultiFileUpload';

export default function Schoolnformation() {
  const [id, setId] = useState('222jj2j22j')

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
  }
  return (
    <div>
      <Header
        heading="School Information"
        text="Update your school informations here."
        buttonText="Save Changes"
        handleClick={handleClick}
      />
      <div className="flex   gap-10 items-center py-10 border-b-[1px] border-[#E0E0E0]">
        <label
          htmlFor="skills"
          className="text-[#000000] font-[600] text-[16px] my-auto"
        >
          What grade did you last graduate from?:
        </label>
        <div className="border-[1px] border-[#757575] px-3 py-2 rounded-lg w-[400px]">
          <select
            name="skills"
            id=""
            className="w-full text-[#212121] font-bold"
          >
            <option value="">University / College (Private)</option>
          </select>
        </div>
      </div>
      <div className="flex   gap-10 items-center py-10 border-b-[1px] border-[#E0E0E0]">
        <label
          htmlFor="skills"
          className="text-[#000000] font-[600] text-[16px] my-auto grid"
        >
          Select the school you graduated from?:
          <span className="text-[#757575] text-[14px]">
            {" "}
            Check if your school has being integrated.
          </span>
        </label>
        <div className="border-[1px] border-[#757575] px-3 py-2 rounded-lg w-[400px] text-[#212121] font-bold">
          <select name="skills" id="" className="w-full">
            <option value="">Landmark University</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-[37%_45%] py-10 w-full border-b-[1px] border-[#E0E0E0]">
        <label
          htmlFor="id"
          className="text-[#000000] font-[600] text-[16px] my-auto"
        >
          What was your ID/Reg. number?
        </label>
        <input
          type="text"
          id="id"
          name="id"
          className="border-[1px] border-[#757575] rounded-md py-2 px-3 "
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div className="  space-y-4 items-center py-10 border-b-[1px] border-[#E0E0E0]">
        <h3 className="text-[#000000] font-[600] text-[16px]">
          Kindly upload your Senior Secondary School Result
        </h3>
        <MultiFileUpload onFilesSelected={handleFilesSelected} />
      </div>
    </div>
  );
}
