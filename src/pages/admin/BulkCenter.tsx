import {useEffect, useState, useMemo} from "react";
import { FiSearch } from "react-icons/fi";
import { CiFilter } from "react-icons/ci";
import { AiOutlineDownload } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomSelect from "../../components/dashboard/CustomSelect";
import { 
  FiCalendar,
} from 'react-icons/fi';
import BulkCenterTable from "../../components/Admin/BulCenterTable";
import { getBulkHistory } from "../../services/schools";
import { useAuth } from "../../contexts/useAuth";
import { ApiResponseItem  } from "../../types/school.types";

const STATUS = ["All", "Pending", "Processing", "Completed", "Failed"];
const ACTIONS = ["All Actions", "Bulk Create", "Update", "Download", "Delete"];
const ENTITIES = ["All Entities", "Courses", "Schools"];

export default function BulkCenter () {
  const {token} = useAuth()

   const [searchTerm, setSearchTerm] = useState("");
   const [status, setStatus] = useState("");
   const [actions, setActions] = useState("");
   const [entities, setEntities] = useState("");
   const [startDate, setStartDate] = useState<Date>(new Date());
   const [bulkHistory, setBulkHistory] = useState<ApiResponseItem[]>([]); 

   const [isLoading, setIsLoading] = useState(true);

   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 10;

  const handleStartDateChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
    }
  };

  const filterBulkCenter = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    // if (!term) return bulkHistory;
  
    return bulkHistory.filter((s) => {
      // default to empty string if missing
      let date1 = new Date(s.timestamp);
      let date2 =  new Date(startDate);
      const name = (s.metadata.fileName ?? "").toLowerCase();
      return name.includes(term) 
      && (s.action === actions || actions === "All Actions" || actions === "")
      && (entities === "" || entities === "All Entities" || entities.includes(s.entity))
      && date2 && date2 > date1;
    });
  }, [bulkHistory, searchTerm, actions, entities, startDate]);
  
  // Compute pagination
  const totalPages = Math.ceil(filterBulkCenter.length / itemsPerPage);

  const paginatedBulkHistory = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filterBulkCenter.slice(start, start + itemsPerPage);
  }, [filterBulkCenter, currentPage]);

  const handleGetBulkHistory = async () => {
    setIsLoading(true);
    try {
      const response: ApiResponseItem[] = await getBulkHistory(token as string);
      setBulkHistory(response)
    } catch (e) {
      console.log("e: ", e)
    }
    finally {
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    handleGetBulkHistory()
  }, [])

  const resetFilter = () => {
    setStartDate(new Date())
    setSearchTerm("")
    setStatus("")
    setEntities("")
  }

  return (
    <div className="relative">
      <div className="flex flex-col w-full gap-10 p-5 xl:p-6">
        <div className="flex flex-col gap-y-[5px]">
          <p className="text-[#101828] text-[24px] font-semibold">Bulk Center</p>
          <p className="text-[#737373] text-[16px] font-normal">Monitor and manage all your bulk uploads and operations.</p>
        </div>

        <div className="flex justify-between">
          <div className="relative w-[450px]">
            <input
              type="text"
              placeholder="Search by file name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 px-10 rounded-md font-semibold border-[1px] border-[#DDDDDD] focus:outline-none focus:border-[#757575] text-[14px] font-[400] text-[#8F8F8F]"
            />
            <FiSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-[#999999] w-5 h-5" />
          </div>

          <div className="flex gap-x-[20px]">
            <button 
              onClick={resetFilter}
              type="button" 
              className="w-[130px] text-[#737373] text-[14px] font-medium py-2 h-[40px] p-2 rounded-md 
                  rounded-md font-semibold border-[1px] border-[#DDDDDD] flex justify-between items-center gap-x-[10px]"
            >
              <CiFilter className="text-[#1E1E1E] w-5 h-5" />
              <p>Reset Filter</p>
            </button>


            <button 
              type="button" 
              className="w-[130px] text-[#737373] text-[14px] font-medium py-2 h-[40px] p-2 rounded-md font-semibold border-[1px] border-[#DDDDDD] flex justify-between items-center gap-x-[10px]"
            >
              <AiOutlineDownload className="text-[#1E1E1E] w-5 h-5" />
              <p>Export Logs</p>
            </button>
          </div>
        </div>

        <div className="flex gap-x-[20px]">
          <div className="w-[150px]">
            <CustomSelect 
              placeholder="All Statuses"
              options={STATUS.map((level) => ({
                value: level,
                label: level,
              }))}
              onChange={(value) => setStatus(value)}
              selectedProps={{
                value: status,
                label: status
              }}
            />
          </div>

          <div className="w-[150px]">
            <CustomSelect 
              placeholder="All Actions"
              options={ACTIONS.map((level) => ({
                value: level,
                label: level,
              }))}
              onChange={(value) => setActions(value)}
              selectedProps={{
                value: actions,
                label: actions
              }}
            />
          </div>

          <div className="w-[150px]">
            <CustomSelect 
              placeholder="All Entities"
              options={ENTITIES.map((level) => ({
                value: level,
                label: level,
              }))}
              onChange={(value) => setEntities(value)}
              selectedProps={{
                value: entities,
                label: entities
              }}
            />
          </div>

          <div className="relative w-[150px] h-[40px] flex gap-x-[10px] items-center border rounded-md px-3 py-2 bg-white cursor-pointer">
            <FiCalendar className="w-6 h-6 text-[#595959]"  />
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              selectsStart
              startDate={startDate}
              // endDate={endDate}
              placeholderText="Date Range"
              className="outline-none w-full text-[14px] text-[#999999] cursor-pointer"
            />
          </div>
        </div>

        <div className="overflow-x-auto border border-[#E0E0E0] rounded-md py-2">
          <BulkCenterTable isLoading={isLoading} bulkHistory={paginatedBulkHistory} />

          {/* 4️⃣ Pagination controls */}
          <div className="flex justify-between items-center px-5 mt-5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-1 border-[1px] border-[#D0D5DD] rounded-lg disabled:opacity-50"
            >
              Previous
            </button>

            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-1 border-[1px] border-[#D0D5DD] rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
