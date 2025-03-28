import  { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import CreateSchoolModal from "../../components/Admin/CreateSchoolModal";
import { getSchools } from "../../services/schools";
import { useAuth } from "../../contexts/useAuth";
import { School } from "../../services/schools";
import SchoolsTable from "../../components/Admin/SchoolsTable";
// import { MdKeyboardArrowDown } from "react-icons/md";
import { RiUploadCloud2Line } from "react-icons/ri";
import BulkUploadModal from "../../components/Admin/BulkUploadModal";

export default function Schools() {
  const [showModal, setShowModal] = useState(false);
  const [schools, setSchools] = useState<School[]>([]);
  const { token } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [showBulkModal, setShowBulkModal] = useState(false)

  useEffect(() => {
    if (token) {
      getSchools(token)
      .then((res) => {
        setSchools(res);
        localStorage.setItem("schools", JSON.stringify(res));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [token, navigate]);

  const getSchoolNow = async () => {
    setIsLoading(true)
    await getSchools(token!)
    .then((res) => {
      setSchools(res);
      localStorage.setItem("schools", JSON.stringify(res));
      setIsLoading(false);
    })
    .catch((err) => {
      setIsLoading(false);
      console.log(err);
    });
  }

  return (
    <div className="relative">
      <div className="flex flex-col w-full gap-10 p-5 xl:p-6">

        <div className="flex justify-between items-center border-b border-[#EAECF0] py-[20px]">
          <p className="text-[#101828] text-[18px] font-semibold">Schools you've created</p>

          <div className="flex gap-x-[20px]">
            <div className="relative w-[250px]">
              <input
                type="text"
                placeholder="Search schools..."
                className="w-full py-2 px-10 rounded-md font-semibold border-[1px] border-[#DDDDDD] focus:outline-none focus:border-[#757575] text-[14px] font-[400] text-[#8F8F8F]"
              />
              <FiSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-[#999999] w-5 h-5" />
            </div>


            <button 
              type="button" 
              onClick={() => setShowBulkModal(true)}
              className="w-[150px] text-[#1E1E1E] text-[14px] font-medium py-2 h-[40px] bg-[#F6C648] p-2 rounded-md 
                  outline-0 focus:outline-none flex justify-center items-center gap-x-[10px]"
              >
              <RiUploadCloud2Line className="w-5 h-5 text-[#1E1E1E]"  />
              <p>Upload CSV</p>
            </button>

            <button 
              type="button" 
              onClick={() => setShowModal(true)}
              className="w-[150px] text-white text-[14px] font-medium py-2 h-[40px] bg-[#004085] p-2 rounded-md 
                  outline-0 focus:outline-none flex justify-center items-center gap-x-[10px]"
              >
              <p>Create School</p>
              {/* <MdKeyboardArrowDown className="w-5 h-5 text-[white]"  /> */}
            </button>

            
          </div>
        </div>
        <SchoolsTable 
          getSchools={getSchoolNow} 
          schools={schools} setShowModal={setShowModal} 
          isLoading={isLoading} 
          // setIsLoading={setIsLoading}
        />
        {showModal && <CreateSchoolModal setShowModal={setShowModal} setSchools={setSchools} />}
      </div>
      {showBulkModal && <BulkUploadModal setShowModal={setShowBulkModal} getSchools={getSchoolNow} />}
    </div>
  );
}
