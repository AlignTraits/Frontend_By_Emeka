import React, {useState} from "react";
import fileIcon from "../../assets/fileIcon.svg"
import { FiX } from "react-icons/fi";
import { RiUploadCloud2Line } from "react-icons/ri";


interface ModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function BulkUploadModal({setShowModal,}: ModalProps) {

  const [activeTab, setActiveTab] = useState("tab1");

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <div 
      // className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[200]"
      className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="bg-white rounded-lg md:w-1/2 w-full xl:w-[80%] relative size-max">
        <img src={fileIcon} alt="Upload file" className="absolute left-[-20px] top-[5px]" />
        <FiX className="cursor-pointer absolute right-6 top-[30px] -translate-y-1/2 text-[#595959] w-5 h-5" onClick={handleClose} />

        <div className="mt-[60px] p-[20px] border-b-[0.8px] border-[#EAECF0] ">
          <p className="text-[#1E1E1E] text-[20px] font-semibold">Upload CSV</p>
          <p className="text-[#737373] text-[16px] font-normal">Upload a CSV to quickly import more courses.</p>
        </div>

        <div className="flex border-b border-gray-300 m-[15px] mx-[20px]">
          {["Tab 1", "Tab 2",].map((tab, index) => {
            const tabKey = `tab${index + 1}`;
            return (
              <button
                key={tabKey}
                className={`py-2 px-4 text-[#999999] text-[16px] font-semibold border-b-2 font-medium transition 
                  ${
                    activeTab === tabKey
                      ? "border-[#003064] text-[#003064] text-[16px] font-semibold"
                      : "border-transparent hover:text-blue-500"
                  }`}
                onClick={() => setActiveTab(tabKey)}
              >
                {tab}
              </button>
            );
          })}
        </div>

          {
            activeTab === "tab1" && 
            <div className="p-4 bg-[#F9FAFB] m-[15px] mx-[20px] 
              h-[224px] border-[1px] border-[#DDDDDD] rounded-lg flex flex-col justify-center items-center gap-y-[15px]">
              <div className="border-[1px] border-[#DDDDDD] rounded-md h-[40px] w-[40px] flex justify-center items-center">
                <RiUploadCloud2Line className="w-5 h-5 text-[#737373]"  />
              </div>
              <p className="text-[#98A2B3] text-[14px] semi-bold">
                Click to upload 
                <span className="text-[#737373] text-[14px] font-normal">&nbsp;or drag and drop</span>
              </p>

              <div className="flex justify-center gap-x-[20px]">
                <button className="bg-[#FFFFFF] h-[40px] w-[200px] border-[#D0D5DD] 
                  border-[2px] rounded-lg text-[14px] text-[#004085] font-semibold"
                >
                  Download sample CSV
                </button>

                <button className="text-[#FFFFFF] h-[40px] w-[180px] rounded-lg text-[14px] bg-[#004085] font-semibold"
                >
                  Browse Files
                </button>
              </div>
            </div>  
          }
          {
            activeTab === "tab2" &&           
            <div className="p-4 bg-[#F9FAFB] m-[15px] mx-[20px] h-[224px] border-[1px] border-[#DDDDDD] rounded-lg">
              <p className="text-gray-700">This is Tab 2 content.</p>
            </div>  
          }
      </div>

    </div>
  );
}
