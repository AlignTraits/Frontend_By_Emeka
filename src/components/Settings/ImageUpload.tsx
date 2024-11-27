import React, { useState } from "react";
import ImageUpload from "../../assets/dashboard/icons/image-upload.svg";
import { toast } from "react-toastify";

interface ImageUploadWithPreviewProps {
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
  setPreviewUrl: (url: string | null | ArrayBuffer) => void;
  previousImg: string | null;
}

const ImageUploadWithPreview = ({
  imageFile,
  setImageFile,
  setPreviewUrl,
  previousImg,
}: ImageUploadWithPreviewProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      alert("No file selected.");
      return;
    }

    const file = files[0];

    if (file && file.type.startsWith("image/")) {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);

      img.onload = () => {
        if (img.width > 800 || img.height > 400) {
          alert("Image dimensions should not exceed 800x400px.");
          return;
        }

        setImageFile(file);

        const reader = new FileReader();
        reader.onload = () => {
          setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);

        URL.revokeObjectURL(objectUrl);
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
    setPreviewUrl(previousImg);
  };

  // Handle drag events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 1) {
        toast.error("Image must not be more than 1")
    } else {
        handleImageChange({
        target: { files: files } as HTMLInputElement,
      } as React.ChangeEvent<HTMLInputElement>);
    }
     
  };

  return (
    <div
      className={`flex flex-col justify-center items-center space-y-4 border-[3px] border-[#007BFF] p-5 px-10 border-dotted rounded-md w-full ${
        isDragOver ? "bg-[#e0f7fa]" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Upload Section */}
      <div>
        <img src={ImageUpload} alt="Upload Icon" />
      </div>
      <p className="text-[#212121] text-[16px] font-[600] text-center">
        Drag and drop your profile picture to upload
      </p>
      <div className="flex flex-col justify-center space-y-4">
        <label className="block text-sm font-medium text-gray-700 mx-auto">
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
        {imageFile ? (
          <button
            onClick={handleRemoveImage}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 mx-auto"
          >
            Remove Image
          </button>
        ) : (
          <button
            onClick={() => document.getElementById("image-upload")?.click()}
            className="px-4 py-2 bg-[#004085] text-white rounded hover:bg-indigo-600 mx-auto"
          >
            Select File
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageUploadWithPreview;
