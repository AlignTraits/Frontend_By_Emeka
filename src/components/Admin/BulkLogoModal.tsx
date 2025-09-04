import React, { useState } from "react";
import fileIcon from "../../assets/fileIcon.svg";
import { FiX } from "react-icons/fi";
import { RiUploadCloud2Line } from "react-icons/ri";
import api from "../../api/axios";
import { useAuth } from "../../contexts/useAuth";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";

interface ModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  getSchools: Function;
  setBulkUploadType: React.Dispatch<React.SetStateAction<string>>;
  selectedList: string[];
  payloadType: string;
  apiUrl: string
}

export default function BulkLogoModal({
  setShowModal,
  getSchools,
  setBulkUploadType,
  selectedList,
  payloadType,
  apiUrl
}: ModalProps) {
  const { token } = useAuth();

  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    setBulkUploadType("");
  };

  // Handle multiple file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      setFiles(selectedFiles);
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Please select files first!");
      return;
    }

    if (files.length !== selectedList.length) {
      toast.error(
        `You must upload ${selectedList.length} file(s) for the selected items.`
      );
      return;
    }

    setUploading(true);
    const formData = new FormData();

    // append school IDs
    formData.append(payloadType, JSON.stringify(selectedList));

    // append all selected files with renamed filenames
    files.forEach((file, index) => {
      const schoolId = selectedList[index];

      // extract original extension (default to .png if missing)
      const ext = file.name.includes(".")
        ? file.name.split(".").pop()
        : "png";

      const renamedFile = new File([file], `${schoolId}.${ext}`, {
        type: file.type,
      });

      formData.append("images", renamedFile);
    });

    try {
      const response = await api.post(
        apiUrl,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Schools Uploaded Successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Error uploading files");
    } finally {
      setUploading(false);
      setShowModal(false);
      setBulkUploadType("");
      getSchools();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[200]">
      <div className="bg-white rounded-lg md:w-1/2 w-[50%] relative size-max">
        <img
          src={fileIcon}
          alt="Upload file"
          className="absolute left-[-20px] top-[5px]"
        />
        <FiX
          className="cursor-pointer absolute right-6 top-[30px] -translate-y-1/2 text-[#595959] w-5 h-5"
          onClick={handleClose}
        />

        <div className="mt-[60px] p-[20px] border-b-[0.8px] border-[#EAECF0] ">
          <p className="text-[#1E1E1E] text-[20px] font-semibold">
            Upload Logos
          </p>
          <p className="text-[#737373] text-[16px] font-normal">
            Upload logos for the following schools:
          </p>
          <div className="flex gap-1 flex-wrap">
            {selectedList.map((elem) => (
              <p
                key={elem}
                className="text-[black] text-[12px] font-normal"
              >
                {elem},
              </p>
            ))}
          </div>
        </div>

        <div className="p-4 bg-[#F9FAFB] m-[15px] mx-[20px] 
          h-[224px] border-[1px] border-[#DDDDDD] rounded-lg flex flex-col justify-center items-center gap-y-[15px]">
          <div className="border-[1px] border-[#DDDDDD] rounded-md h-[40px] w-[40px] flex justify-center items-center">
            <RiUploadCloud2Line className="w-5 h-5 text-[#737373]" />
          </div>
          <p className="text-[#98A2B3] text-[14px] semi-bold">
            Click to upload{" "}
            <span className="text-[#737373] text-[14px] font-normal">
              &nbsp;or drag and drop
            </span>
          </p>

          <div className="flex flex-col items-center gap-y-2">
            <div className="relative w-[220px] h-[40px]">
              <input
                type="file"
                accept=".png"
                multiple
                onChange={handleFileChange}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
              <button
                className="w-full h-full text-white rounded-lg text-[14px] bg-[#004085] font-semibold flex items-center justify-center cursor-pointer"
              >
                {files.length > 0
                  ? `${files.length} file(s) selected`
                  : "Browse Files"}
              </button>
            </div>

            {files.length > 0 && (
              <button
                onClick={handleUpload}
                className="w-[220px] h-[40px] text-white rounded-lg text-[14px] bg-[#004085] font-semibold flex items-center justify-center cursor-pointer"
              >
                {uploading ? (
                  <BeatLoader color="#ffffff" size={8} />
                ) : (
                  "Upload Logo"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
