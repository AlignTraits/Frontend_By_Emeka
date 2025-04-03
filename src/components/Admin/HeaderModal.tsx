import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdOutlineCalendarToday } from "react-icons/md";

interface ModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  endDate: Date | null
}
const HeaderModal = ({setShowModal, setEndDate, endDate}: ModalProps) => { 
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [error, setError] = useState<string>("");

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

  const handleApply = () => {
    setShowModal(false)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"> 
      <div className="bg-white rounded-lg w-[500px] h-[300px] relative size-max p-5 flex flex-col gap-y-[30px]">
        <h1 className="text-center font-medium" onClick={() => setShowModal(false)}>Select Date</h1>

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
            <p className="text-[14px] font-semibold text-[#1E1E1E]">Cancel</p>
          </button>

          <button onClick={handleApply} className="bg-[#004085] w-[50%] h-[40px] rounded-md flex justify-center gap-x-[10px] items-center">
            <p className="text-[14px] font-semibold text-[#FFFFFF]">Apply</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeaderModal