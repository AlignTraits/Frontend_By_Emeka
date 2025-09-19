import React, { useEffect, useState, useRef } from "react"
// import { SlGraph } from "react-icons/sl";
import { useAuth } from '../../../contexts/useAuth';
import { getAcademicRecords } from "../../../services/utils";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { SubjectGrade, RequirementListNew } from "../../../types/course.types";
import AddCourse from "../../../pages/AddCourse";

interface RecommendationProps {
  setViewState: React.Dispatch<React.SetStateAction<number>>;
}

export default function RecommendationResults({setViewState}: RecommendationProps) {
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [recordList, setRecordList] = useState<RequirementListNew[]>([])
  const navigate = useNavigate()
  const [showFirstTimeUser, setShowFirstTimeUser] = useState(false)

  const [showAddCourse, setShowAddCourse] = useState(false);

  // console.log("user: ", user);  
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      getRecords();
      hasFetched.current = true;
    }
  }, [])

  const handleBtnClick = () => {
    if (!user?.careerResults) {
      return setShowFirstTimeUser(true)
    }
    if (checkExamType()) {
      setShowModal(true);
    } else {
      setViewState(1)
    }
  }

  const checkExamType = () => {
    if (recordList.length < 2) {
      return true
    }
    let firstExamType = recordList[0].examType
    let NoDiffExamType = true
    recordList.map((elem: any) => {
      if (elem.examType !== firstExamType) {
        NoDiffExamType = false;
      }
    })
    return NoDiffExamType;
  }

  const populateList = (dataParam: any) => {
    const parsedRequirements: RequirementListNew[] = [];
    
    // Process up to 10 exam types from school data
    for (let i = 1; i <= 10; i++) {
      const countryKey = `ExamCountry${i}`;
      const typeKey = `ExamType${i}`;
      const subjectsKey = `ExamType${i}Subjects`;
      const gradesKey = `ExamType${i}SubGrades`;
      
      if (dataParam[countryKey] && dataParam[typeKey] && 
          dataParam[subjectsKey] && dataParam[gradesKey]) {
        
        const subjects: SubjectGrade[] = [];
        
        // Create subject-grade pairs
        for (let j = 0; j < dataParam[subjectsKey].length; j++) {
          subjects.push({
            id: JSON.stringify(Date.now() + j),
            subject: dataParam[subjectsKey][j],
            grade: dataParam[gradesKey][j]
          });
        }
        
        // Add to requirements list
        parsedRequirements.push({
          id: JSON.stringify(Date.now() + i),
          country: dataParam[countryKey],
          examType: dataParam[typeKey],
          examYear: "1970",
          subjects: subjects
        });
      }
    }

    setRecordList(parsedRequirements)
  }

  const getRecords = async () => {
    try {
      setIsLoading(true)
      const response = await getAcademicRecords({showToast: true});
        if (response?.ok) {
          populateList(response.data[0])
        }
    } catch (err: any) {
      console.log("error: ", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-[50px] bg-white border-[1px] border-[#ccc] shadow-md rounded-xl p-6">
      {
        showAddCourse ?
        <AddCourse getRecords={getRecords} setShowAddCourse={setShowAddCourse} /> :
        <>
          <h2 className="text-lg font-semibold text-[#101828] mb-6 flex items-center">
            {/* <SlGraph className="mr-[10px] font-bold h-8 w-8" /> */}
            {user?.careerResults ? "View Results" : "Welcome to Your Career Journey 🌟"}
          </h2>

          {
            !user?.careerResults &&
            <>
              <p className="mb-4 text-[#475467] text-sm">
                This is where it begins! Take a quick step to discover the best career pathways 
                tailored to your strengths, interests, and goals.
              </p>

              <p className="mb-4 text-[#475467] text-sm">
                👉 Start your personalized career recommendation now and see where your future can take you.
              </p>
            </>
          }


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
            <button disabled={isLoading} onClick={handleBtnClick} className="bg-[#004085] disabled:opacity-50 hover:bg-blue-800 text-white font-medium py-4 px-5 rounded-2xl transition">
              {user?.careerResults ? "Get Course Recommendation": "Get Your Career Recommendation"}
            </button>
          </div>
        </>

      }
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
                setShowAddCourse(true)
              }}
              className="w-full h-12 bg-[#004085] text-white rounded-lg hover:bg-blue-700"
            >
              Add Exam Record
            </button>
          </div>
        </div>
      )}

      {showFirstTimeUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={() => setShowFirstTimeUser(false)}>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-[90%]">
            <h2 className="text-xl font-bold mb-4">Welcome to AlignTraits 🎉</h2>
            <p className="mb-4">Find the career path that’s truly right for you.
              Take our quick assessment to get your personalized career recommendation.</p>
            <button
              onClick={() => {
                setShowFirstTimeUser(false);
                navigate("/career-recommedation");
              }}
              className="w-full h-12 bg-[#004085] text-white rounded-lg hover:bg-blue-700"
            >
              Start My Career Recommendation
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
