import React, { useState } from "react";
import { toast } from "react-toastify";
import { FiX } from "react-icons/fi";
import { FiUploadCloud } from "react-icons/fi";

interface ImageUploadWithPreviewProps {
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
  setPreviewUrl: React.Dispatch<string | null | ArrayBuffer>;
  previewUrl: string | null | ArrayBuffer;
  errorState?: boolean
  handleFileError?: () => void
}

const ImageUploadWithPreview = ({
  imageFile,
  setImageFile,
  setPreviewUrl,
  previewUrl,
  errorState=false,
  handleFileError=()=> {}
}: ImageUploadWithPreviewProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileError()
    const files = e.target.files;
    if (!files || files.length === 0) {
      alert("No file selected.");
      return;
    }

    const file = files[0];
    if (file.size > 100000) {
      toast.error("image should not be more than 100kb");
      return;
    }

    if (file && file.type.startsWith("image/")) {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
  
      if(img.height >400 || img.width > 400) {
        toast.error('Image size should be 400 X 400')
        return
      }
      img.onload = () => {
        setImageFile(file);
        

        const reader = new FileReader();
        reader.onload = () => {
          setPreviewUrl(reader.result);
          console.log("imageFile: ", imageFile)
        URL.revokeObjectURL(objectUrl);
        };
        reader.readAsDataURL(file);

      };

      img.onerror = () => {
        alert("Invalid image file.");
        URL.revokeObjectURL(objectUrl);
      };

      img.src = objectUrl;
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
  };

  // Handle drag events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 1) {
      toast.error("Image must not be more than 1");
    } else {
      handleImageChange({
        target: { files: files } as HTMLInputElement,
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div>
      {previewUrl ? (
        <div className="relative w-full h-[200px]">
          <img
            src={typeof previewUrl === "string" ? previewUrl : ""}
            alt=""
            className="w-[200px] h-[200px] rounded-full mx-auto"
          />
          <div className="absolute top-0 flex h-full w-full   ">
            <button
              onClick={handleRemoveImage}
              className="flex flex-col items-center justify-center mx-auto space-x-2   h-full w-[200px] h-full bg-[#00000080] rounded-full transition duration-500 opacity-0 hover:opacity-100 cursor-pointer text-[#ffffff] text-[30px]"
            >
              <FiX />
              <span>Remove</span>
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`flex flex-col justify-center items-center space-y-4 border-[3px] ${errorState ? "border-[#F04438]" : "border-[#B9B9B9]"} p-5 px-10 border-dotted rounded-md w-full ${
            isDragOver ? "bg-[#e0f7fa]" : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="h-[40px] w-[40px] rounded-md border-[#E9E9E9] border-[1px] flex justify-center items-center">
            <FiUploadCloud className="text-[#004085]" />
          </div>
          <p className="text-[#001D3C] text-[16px] font-[600] text-center">
            Upload
          </p>
          <div className="flex flex-col justify-center space-y-4">
            <label className="block text-sm text-center font-medium text-gray-700 mx-auto">
              PNG or JPG format (max. 800 X 400px)
            </label>

            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              name="image"
            />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("image-upload")?.click();
                }}
                className="px-4 py-2 bg-[#004085] text-white rounded hover:bg-indigo-600 mx-auto"
              >
                Select File
              </button>
           
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadWithPreview;
