import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import CustomSelect from "../dashboard/CustomSelect";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdOutlineCalendarToday } from "react-icons/md";
import { useAuth } from "../../contexts/useAuth";
import { HiOutlineDownload } from "react-icons/hi";
import { BeatLoader } from "react-spinners";
import api from "../../api/axios";
import {toast} from 'react-toastify'
import axios from "axios";
interface ModalProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  categoryType: string
}

const FILEOPTIONS = ["CSV", "EXCEL"];

export default function DataManagementModal({setModal, categoryType }: ModalProps) {
  const {token} = useAuth()
  const [fileOption, setFileOption] = useState("CSV")  
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false)

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    if (endDate && date && date > endDate) {
      setError("Start date cannot be after end date.");
    } else {
      setError("");
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
    if (startDate && date && date < startDate) {
      setError("End date cannot be before start date.");
    } else {
      setError("");
    }
  }

  const handleClose = () => {
    setModal(false)
  }


  const handleDownload = async () => {

    if (error.length > 0 || startDate === endDate) {
      toast.error("Please enter proper date range!")
      return
    }

    let newStartDate = new Date(startDate!);

    let newEndDate = new Date(endDate!);

    setIsLoading(true)

    try {
      const response = await api.get(`bulk/download?format=csv&entity=${categoryType.toLowerCase()}&startDate=${newStartDate.toISOString().split("T")[0]}&endDate=${newEndDate.toISOString().split("T")[0]}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 200) {
        const responseTwo = await axios.get(`https://backend-oo07.onrender.com${response.data.fileUrl}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            responseType: "blob",  // Expect blob from the API
          },
        })

        const blob = new Blob([responseTwo.data], { type: "text/csv;charset=utf-8;" });
        const url = window.URL.createObjectURL(blob);
  
        // Create a temporary link element
        const a = document.createElement("a");
        a.href = url;
        a.download = `${categoryType}Data.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
  
        window.URL.revokeObjectURL(url);
      } else {
        throw "Error in downloading file"
      }
      setIsLoading(false)
      setModal(false)
    } catch (e: any) {
      setIsLoading(false)
      setModal(false)
      toast.error(e.response.data.message)
      // toast.error("Error downloading file!")

      // console.error("Error downloading file:", e);
    }
  }

  return (
    <div 
      className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="bg-white rounded-lg w-[533px] relative h-[389px] p-[20px] flex flex-col justify-between">
        <div className="flex flex-col gap-y-[5px]">
          <p className="text-[18px] text-[#1E1E1E] font-semibold">Download {categoryType} Data</p>

          <p className="text-[12px] text-[#737373] font-normal">Configure your download options and filters.</p>
        </div>

        <FiX className="cursor-pointer absolute right-6 top-[30px] -translate-y-1/2 text-[#595959] w-5 h-5" onClick={handleClose} />

        <div className="flex flex-col gap-y-[5px]">
          <p className="text-[#1E1E1E] text-[12px] font-medium">File Format</p>

          <CustomSelect
            placeholder="Select Format"
            options={FILEOPTIONS.map((option) => ({
              value: option,
              label: option,
            }))}
            onChange={(value) => setFileOption(value)}
            selectedProps={{
              value: fileOption,
              label: fileOption
            }}
          />
          <p className="text-[#737373] font-normal text-[12px]">Choose the file format for your data export.</p>
        </div>

        <div className="flex flex-col gap-y-[5px]">
          <p className="text-[#1E1E1E] text-[12px] font-medium">Date Range</p>

          <div className="flex gap-2 relative">
            <div className="relative flex items-center border rounded-md px-3 py-2 shadow-sm bg-white">
              <MdOutlineCalendarToday className="h-5 w-5 text-gray-400 mr-2" />
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Start Date"
                className="outline-none w-full text-[14px] text-[#595959] font-semibold"
              />
            </div>

            <div className="relative flex items-center border rounded-md px-3 py-2 shadow-sm bg-white">
              <MdOutlineCalendarToday className="h-5 w-5 text-gray-400 mr-2" />
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                placeholderText="End Date"
                className="outline-none w-full text-[14px] text-[#595959] font-semibold"
              />
            </div>

            {error && <p className="absolute top-[-25px] left-[80px] text-red-400 text-sm">{error}</p>}
          </div>

          <p className="text-[#737373] font-normal text-[12px]">Filter data by date range. Leave empty to include all dates.</p>
        </div>

        <div className="flex gap-x-[20px]">
          <button onClick={handleClose} className="bg-[white] border-[#DDDDDD] border-[1px] w-[50%] h-[40px] rounded-md flex justify-center gap-x-[10px] items-center">
            <HiOutlineDownload className="text-[#FFFFFF]" />
            <p className="text-[14px] font-semibold text-[#1E1E1E]">Cancel</p>
          </button>

          <button onClick={handleDownload} className="bg-[#004085] w-[50%] h-[40px] rounded-md flex justify-center gap-x-[10px] items-center">
            <HiOutlineDownload className="text-[#FFFFFF]" />
            {isLoading ? (
                <BeatLoader color="#ffffff" size={8} />
            ) : (
              <p className="text-[14px] font-semibold text-[#FFFFFF]">Start Download</p>
            )}
            
          </button>
        </div>
      </div>

    </div>
  );
}
