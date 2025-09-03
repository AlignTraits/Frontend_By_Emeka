import React, { useEffect, useState, useRef } from "react"
import { SlGraph } from "react-icons/sl";
import { useAuth } from '../../../contexts/useAuth';
import { getAcademicRecords } from "../../../services/utils";
// import { BeatLoader } from "react-spinners";
// import ManageRecord from "../../AccountRecords/ManageRecord";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const recommendations = new Array(8).fill({
//   title: "Business Intelligence Specialist",
//   description: "Explore path",
// });

interface RecommendationProps {
  setViewState: React.Dispatch<React.SetStateAction<number>>;
}

export default function RecommendationResults({setViewState}: RecommendationProps) {
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [dataLenth, setDataLength] = useState(0)
  const navigate = useNavigate()

  // console.log("user: ", user);  
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      getRecords();
      hasFetched.current = true;
    }
  }, [])

  const handleBtnClick = () => {
    if (dataLenth < 2) {
      setShowModal(true);
    } else {
      setViewState(1)
    }
  }

  const getRecords = async () => {
    try {
      setIsLoading(true)
      const response = await getAcademicRecords();
      setDataLength(response.data.length)
      // if (response.data.length < 2) {
      //   setShowModal(true)
      // }

    } catch (err: any) {
      console.log("error: ", err)
      if (err?.status === 404) {  
        setShowModal(true)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-[50px] bg-white border-[1px] border-[#ccc] shadow-md rounded-xl p-6">
      <h2 className="text-lg font-semibold text-[#101828] mb-6 flex items-center">
        <SlGraph className="mr-[10px] font-bold h-8 w-8" />
        Recommendation Survey Results
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {user?.careerResults?.recommendedCareers && user.careerResults.recommendedCareers.map((rec: string, index:number) => (
          <div
            key={index}
            className="bg-white cursor-pointer border border-gray-100 shadow-sm rounded-lg p-4 hover:shadow-md transition"
          >
            <h3 className="text-[12px] font-bold text-[#212529] mb-1">
              {rec}
            </h3>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button disabled={isLoading} onClick={handleBtnClick} className="bg-[#004085] hover:bg-blue-800 text-white font-medium py-4 px-5 rounded-2xl transition">
          {"Get course recommendation"}
        </button>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setShowModal(false)} // click on background closes modal
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
          >
            <h2 className="text-xl font-bold mb-4">Add academic record</h2>
            <p className="mb-4">
              To provide you with accurate course recommendations, we require at least
              two exam records.
            </p>
            <button
              onClick={() => {
                setShowModal(false);
                navigate("/dashboard/settings/records");
              }}
              className="w-full h-12 bg-[#004085] text-white rounded-lg hover:bg-blue-700"
            >
              Add Exam Record
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
