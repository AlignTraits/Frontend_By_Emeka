import React from "react";
import { FiX } from "react-icons/fi";
import { ApiResponseItem } from "../../types/school.types";
interface ModalProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  previewDetails: ApiResponseItem
}

export default function BulkCenterModal({setModal, previewDetails }: ModalProps) {

  console.log("previewDetails: ", previewDetails)

  const handleClose = () => {
    setModal(false)
  }

  const generateCSV = () => {
    let tempList:any = []

    previewDetails.metadata?.failedMessages.map((elem) => tempList.push([elem]))

    const csvData = [
      ["errors"],
      ...tempList
    ];
  
    // Convert to CSV format
    const csvContent = csvData.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
  
    // Create download link
    const a = document.createElement("a");
    a.href = url;
    a.download = "errorReport.csv";
    document.body.appendChild(a);
    a.click();
  
    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
 

  function formatDateTime(dateString: string): string {
    const date = new Date(dateString);
  
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
  
    const datePart = date.toLocaleDateString("en-US", options);
    const timePart = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  
    return `${datePart} ${timePart}`;
  }

  const renderStatus = (status: string) => {
    if (status !== "Completed") {
      return <p className="h-[25px] w-[80px] bg-[#FEF3F2] flex justify-center items-center text-[#B42318] text-[12px] border-[1px] border-[#FECDCA] rounded-[20px]">Failed</p>
    } else {
      return <p className="h-[25px] w-[80px] bg-[#F0F9FF] flex justify-center items-center text-[#026AA2] text-[12px] border-[1px] border-[#B9E6FE] rounded-[20px]">Completed</p>
    }
  }

  const renderSuccessRecords = (successCount:number) => {
    if (successCount === 0) {
      return <></>
    }
    return (
      <p className="text-[14px] text-[#067647]">{successCount} Success</p>
    )
  }
  const renderFailedRecords = (failedCount:number) => {
    if (failedCount === 0) {
      return <></>
    }
    return (
      <p className="text-[14px] text-[#B42318]">{failedCount} Failed</p>
    )
  }

  return (
    <div 
      className="absolute inset-0 bg-black bg-opacity-50 flex justify-center"
    >
      <div className="mt-20 bg-white rounded-lg w-[533px] relative size-max p-[20px] flex flex-col gap-y-[20px]">
        <div className="flex flex-col gap-y-[5px]">
          <p className="text-[18px] text-[#1E1E1E] font-semibold">Upload Details</p>

          <p className="text-[12px] text-[#737373] font-normal">Detailed information about this upload.</p>
        </div>

        <FiX className="cursor-pointer absolute right-6 top-[30px] -translate-y-1/2 text-[#595959] w-5 h-5" onClick={handleClose} />

        <div className="flex">
          <div className="w-[200px]">
            <p className="text-[#737373] text-[14px]">File Name</p>

            <p>{previewDetails.metadata?.fileName}</p>
          </div>

          <div>
            <p className="text-[#737373] text-[14px]">Status</p>
            {previewDetails.metadata?.failedMessages.length > 0 ? renderStatus("Failed") : renderStatus("Completed")}
          </div>
        </div>


        <div className="flex">
          <div className="w-[200px]">
            <p className="text-[#737373] text-[14px]">Updated Date</p>

            <p>{formatDateTime(previewDetails.timestamp)}</p>
          </div>

          <div>
            <p className="text-[#737373] text-[14px]">Entity Type</p>
            <p>{previewDetails.entity}</p>
          </div>
        </div>

        <div className="flex">
          <div className="w-[200px]">
            <p className="text-[#737373] text-[14px]">Updated By</p>

            <p>{previewDetails.user.username}</p>
          </div>

          <div>
            <p className="text-[#737373] text-[14px]">Records Processed</p>
            {previewDetails.entityIds.length}
          </div>
        </div>

        <div className="flex">
          <div className="w-[200px]">
            <p className="text-[#737373] text-[14px]">Processing Results</p>

            <div className="flex gap-x-[5px]">
              {renderSuccessRecords(previewDetails.metadata?.successCount)}
              {renderFailedRecords(previewDetails.metadata?.failedCount)}
            </div>
          </div>
        </div>

      {
        previewDetails.metadata?.failedMessages.length > 0 &&
        <>
          <div>
            <p className="text-[#1E1E1E] text-[14px] font-medium">Error</p>

            <div className="mt-1 border-[1px] border-dashed border-[#F04438] min-h-[100px] bg-[#FBEAE9] rounded-lg p-2 flex flex-col gap-y-[2px]">
              {
                previewDetails.metadata?.failedMessages.map((elem, i) => 
                  <div key={i} className="flex gap-x-[10px] items-center">
                    <div className="h-[6px] w-[6px] bg-[#B42318] rounded-[50%]"></div>
                    <p className="text-[#B42318] text-[14px] font-medium">{elem}</p>
                  </div>
                )
              }
            </div>
          </div>

          <button onClick={generateCSV} className="w-full h-[40px] rounded-lg bg-[#004085] text-[#ffffff]">
            Download Error Report
          </button>
        </>
      }


      </div>

    </div>
  );
}
