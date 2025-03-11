import React, {useState} from "react";
import fileIcon from "../../assets/fileIcon.svg"
import { FiX } from "react-icons/fi";
import { RiUploadCloud2Line } from "react-icons/ri";
import api from "../../api/axios";
import { useAuth } from "../../contexts/useAuth";
import {toast} from 'react-toastify'
import { BeatLoader } from "react-spinners";


interface ModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  getSchools: Function
}
export default function BulkUploadModal({setShowModal, getSchools}: ModalProps) {
 const { token } = useAuth();

  const [activeTab, setActiveTab] = useState("tab1");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleClose = () => {
    setShowModal(false)
  }

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const generateCSV = () => {
    const csvData = [
      ["name", "schoolType", "location", "websiteUrl", "logo"],
      ["Unilag", "PRIVATE_UNIVERSITY",	"Nigeria/Abia",	"example.com",	"https://drive.google.com/uc?export=view&id=1QoRkwCwSh__TlbnlyVO6mIj9ZgzTlObw"],
      ["Uniben", "PUBLIC_UNIVERSITY",	"Nigeria/Lagos",	"example.com", 	"https://drive.google.com/uc?export=view&id=1QoRkwCwSh__TlbnlyVO6mIj9ZgzTlObw"],
      // ["Futo", "PUBLIC_UNIVERSITY",	"Nigeria/Imo", "example.com",	"https://drive.google.com/uc?export=view&id=1QoRkwCwSh__TlbnlyVO6mIj9ZgzTlObw"],
      // ["Lasu",	"PUBLIC_UNIVERSITY","Nigeria/Lagos","example.com", 	"https://drive.google.com/uc?export=view&id=1QoRkwCwSh__TlbnlyVO6mIj9ZgzTlObw"]
    ];
  
    // Convert to CSV format
    const csvContent = csvData.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
  
    // Create download link
    const a = document.createElement("a");
    a.href = url;
    a.download = "schools.csv";
    document.body.appendChild(a);
    a.click();
  
    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
 
  
  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first!");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("csvFile", file);

    try {

      const response = await api.post("/bulk/bulk-add-schools", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        toast.success('Schools Uploaded Successfully')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file")
    } finally {
      setUploading(false);
      setShowModal(false);
      getSchools()
    }
  };

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
          {["New Upload", "All Upload",].map((tab, index) => {
            const tabKey = `tab${index + 1}`;
            return (
              <button
                key={tabKey}
                className={`py-2 px-4 text-[16px] font-semibold border-b-2 font-medium transition 
                  ${
                    activeTab === tabKey
                      ? "border-[#003064] text-[#003064] text-[16px] font-semibold"
                      : "border-transparent hover:text-blue-500 text-[#999999]"
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
                  onClick={generateCSV}
                >
                  Download sample CSV
                </button>

                <div className="relative w-[180px] h-[40px]">
                  <input 
                    type="file" 
                    accept=".csv" 
                    onChange={handleFileChange} 
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <button className="w-full h-full text-white rounded-lg text-[14px] bg-[#004085] font-semibold flex items-center justify-center cursor-pointer"
                  >
                    {file ? file.name : "Browse Files"}
                  </button>
                </div>

                {file && 
                  <button onClick={handleUpload} className="w-[180px] h-[40px] text-white rounded-lg text-[14px] bg-[#004085] font-semibold flex items-center justify-center cursor-pointer"
                  >
     
                    {uploading ? (
                        <BeatLoader color="#ffffff" size={8} />
                    ) : (
                        "Upload Schools"
                    )}
                  </button>
                }
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
