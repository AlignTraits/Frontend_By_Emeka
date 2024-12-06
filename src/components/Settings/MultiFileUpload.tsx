import React, { useState } from "react";
import ImageUpload from "../../assets/dashboard/icons/image-upload.svg";
import Pdf from '../../assets/dashboard/icons/pdf.svg'
import { FiTrash2 } from "react-icons/fi";

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
}

interface FileWithProgress {
  file: File;
  progress: number;
}

const MultiFileUpload: React.FC<FileUploadProps> = ({ onFilesSelected }) => {
  const [selectedFiles, setSelectedFiles] = useState<FileWithProgress[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const filesArray = Array.from(event.target.files).filter(
      (file) => file.type === "application/pdf"
    );

    const filesWithProgress = filesArray.map((file) => ({ file, progress: 0 }));

    setSelectedFiles((prevFiles) => [...prevFiles, ...filesWithProgress]);
    onFilesSelected(filesArray);

    // Simulate upload progress
    filesWithProgress.forEach((_,index) => {
      const interval = setInterval(() => {
        setSelectedFiles((prevFiles) => {
          const newFiles = [...prevFiles];
          if (newFiles[index].progress < 100) {
            newFiles[index].progress += 10;
          } else {
            clearInterval(interval);
          }
          return newFiles;
        });
      }, 500);
    });
  };

  const removeFile = (fileIndex: number) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== fileIndex)
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center">
        <label className="cursor-pointer flex flex-col gap-2 items-center text-blue-500 hover:text-blue-700 border-[3px] border-dashed border-[#007BFF] py-10 px-20">
          <div>
            <img src={ImageUpload} alt="Upload Icon" />
          </div>
          <p className="text-[#212121] text-[16px] font-[600] text-center">
            Drag and drop your profile picture to upload
          </p>
          <p className="block text-sm font-medium text-gray-700 mx-auto">
            Your school result should be in PDF format
          </p>
          <button
            onClick={() => document.getElementById("file-upload")?.click()}
            className="px-4 bg-[#004085] text-white rounded hover:bg-indigo-600 mx-auto"
          >
            Select files
          </button>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            multiple
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </label>
        {selectedFiles.length > 0 && (
          <div className="mt-4 w-full">
            <ul className="space-y-2">
              {selectedFiles.map(({ file, progress }, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-2 hover:border border-gray-200 rounded-lg shadow-sm"
                >
                  <div className="flex items-center space-x-4 w-full">
                    <img
                      src={Pdf} // Replace with actual path to PDF icon
                      alt="PDF Icon"
                      className="w-6 h-6"
                    />
                    <div>
                      <span className="text-gray-700 truncate block">
                        {file.name}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {progress}% uploaded
                      </span>
                    </div>
                  </div>
                    <FiTrash2 onClick={() => removeFile(index)} className="cursor-pointer"/>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiFileUpload;
