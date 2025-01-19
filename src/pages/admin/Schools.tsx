import  { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import CreateSchoolModal from "../../components/Admin/CreateSchoolModal";
import { getSchools } from "../../services/schools";
import { useAuth } from "../../contexts/useAuth";
import { School } from "../../services/schools";
import SchoolsTable from "../../components/Admin/SchoolsTable";

export default function Schools() {
  const [showModal, setShowModal] = useState(false);
  const [schools, setSchools] = useState<School[]>([]);
  const { token } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      getSchools(token)
        .then((res) => {
          setSchools(res);
          console.log(res);
          localStorage.setItem("schools", JSON.stringify(res));
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token, navigate]);

  return (
    <div className="flex flex-col w-full gap-10">
      <div className="relative w-[250px]">
        <input
          type="text"
          placeholder="Search School"
          className="w-full pl-8 pr-4 py-2 font-semibold border-b-[0.8px] border-b-[#757575] focus:outline-none focus:border-[#757575] text-[16px] font-[400] text-[#8F8F8F]"
        />
        <FiSearch className="absolute left-0 top-1/2 -translate-y-1/2 text-[#007BFF] w-5 h-5" />
      </div>
        <SchoolsTable schools={schools} setShowModal={setShowModal} isLoading={isLoading} />
      {showModal && <CreateSchoolModal setShowModal={setShowModal} setSchools={setSchools} />}
    </div>
  );
}
