import React, {useState} from "react";
import { useParams } from "react-router-dom";
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
export default function BulkCourseModal({setShowModal, getSchools}: ModalProps) {
  const { schoolId } = useParams<{ schoolId: string}>();
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

    // Define the CSV header and rows
    const headers: string[] = [
      "title", "profile", "schoolId", "scholarship", "duration", "durationPeriod", "price", "currency",
      "acceptanceFee", "acceptanceFeeCurrency", "description", "requirements", "ratings", "courseInformation",
      "programLevel", "careerOpportunities", "loanInformation", "estimatedLivingCost", "courseWebsiteUrl"
    ];
  
    const rows: (string | number)[][] = [
      [
        "Computer Tech 22",
        "https://drive.google.com/uc?export=view&id=1QoRkwCwSh__TlbnlyVO6mIj9ZgzTlObw",
        `${schoolId}`,
        "Full Scholarship",
        4,
        "YEAR",
        20000,
        "DOLLAR",
        500,
        "DOLLAR",
        "Comprehensive program on CS",
        '["Math", "Physics"]',
        0,
        "Info about the CS course",
        "Undergraduate",
        '["Software Engineer", "Data Scientist"]',
        "Info about loans",
        12000,
        "https://example.com/cs"
      ],
      [
        "Business Newst",
        "https://drive.google.com/uc?export=view&id=1QoRkwCwSh__TlbnlyVO6mIj9ZgzTlObw",
        `${schoolId}`,
        "Partial Scholarship",
        3,
        "YEAR",
        15000,
        "DOLLAR",
        800,
        "DOLLAR",
        "In-depth business management program",
        '["Economics", "Finance"]',
        0,
        "Info about the Business course",
        "Undergraduate",
        '["Manager", "Consultant"]',
        "Info about loans",
        10000,
        "https://example.com/ba"
      ],
      [
        "Engineering Data",
        "https://drive.google.com/uc?export=view&id=1JGUzzPmNmbiQsYDAeZtm_V0pVmryJ4TB",
        `${schoolId}`,
        "Partial Scholarship",
        2,
        "YEAR",
        5000,
        "DOLLAR",
        600,
        "DOLLAR",
        "wqjhadjsh",
        '["Economics", "Finance", "others"]',
        1,
        "infomatic and more",
        "Postgraduate",
        '["Manager", "Consultant", "more"]',
        "Info about loans",
        2000,
        "example.com"
      ]
    ];
  
    // Function to escape CSV values if needed (wrap in quotes and escape quotes)
    const escapeCSV = (value: string | number): string => {
      const stringValue = String(value);
      if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    };
  
    // Build the CSV content string: header + rows
    const generateCSVContent = (): string => {
      let csvContent = headers.map(escapeCSV).join(",") + "\n";
      rows.forEach(row => {
        csvContent += row.map(escapeCSV).join(",") + "\n";
      });
      return csvContent;
    };
  
    // Function that triggers CSV download
    const downloadCSV = () => {
      const csvContent = generateCSVContent();
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  
      // Use the original filename to generate a new filename
      const originalFilename = "bulk course creation - Sheet1.csv";
      const newFilename = originalFilename.replace(".csv", "_new.csv");
  
      const link = document.createElement("a");
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", newFilename);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
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

      const response = await api.post("/bulk/csv/bulk-add-courses", formData, {
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
                  onClick={downloadCSV}
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
                        "Upload Courses"
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
