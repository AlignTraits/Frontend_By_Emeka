import { useEffect, useState } from "react";
import { useAuth } from "../contexts/useAuth";
import BeatLoader from "react-spinners/BeatLoader";
import { ErrorObjType, RequirementList, SubjectGrade } from "../types/course.types";
import AdmissionRequirements from "../components/Admin/AdmissionRequirements";
import { toast } from "react-toastify";
import { createAcademicRecords, getAcademicRecords, updateAcademicRecords } from "../services/utils";

interface AddCourseProps {
  setShowAddCourse: React.Dispatch<React.SetStateAction<boolean>>;
  getRecords: () => void;
}

export default function AddCourse({setShowAddCourse, getRecords}: AddCourseProps) {
  const { token} = useAuth()

  const [requirementList, setRequirementList] = useState<RequirementList[]>([]);
  const [recordList, setRecordList] = useState<RequirementList[]>([])
  const [recordId, setRecordId] = useState<string>("")
  const [errorObj, setErrorObj] = useState<ErrorObjType>({
    title: false,
    courseDescription: false,
    loanDescription: false,
    scholarshipDescription: false,
    isScholarship: false,
    website: false,
    acceptanceFee: false,
    coursePrice: false,
    previewUrl: false,
    courseDuration: false,
    programLevel: false,
    durationPeriod: false,
    programLocation: false,
    examType: false
  });
 
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    if (token && token.length > 0) {
      const response = await getAcademicRecords();

      if (response?.ok) {
        populateList(response.data[0])
        setRecordId(response.data[0].id)
      }
    }
  }

  const populateList = (dataParam: any) => {
    const parsedRequirements: RequirementList[] = [];
    
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
          id: Date.now() + i,
          location: dataParam[countryKey],
          examType: dataParam[typeKey],
          subjects: subjects
        });
      }
    }

    setRecordList(parsedRequirements)
  }

  const handleEligibilityCheck = async () => {
    if (requirementList.length === 0) {
      toast.error("Please select at least one exam type to proceed.");
      return
    }
      
    const newList = [...requirementList, ...recordList]

    const maxEntries = 10;

    let temPayloadTwo:any = {}

    for (let i = 0; i < maxEntries; i++) {
      if (i < newList.length) {
        const elem = newList[i];
        temPayloadTwo[`ExamCountry${i + 1}`] = elem.location;
        temPayloadTwo[`ExamType${i + 1}`] = elem.examType;
        temPayloadTwo[`ExamType${i + 1}Subjects`] = elem.subjects.map(sub => sub.subject);
        temPayloadTwo[`ExamType${i + 1}SubGrades`] = elem.subjects.map(sub => sub.grade);
      } else {
        // Pad with nulls
        temPayloadTwo[`ExamCountry${i + 1}`] = "";
        temPayloadTwo[`ExamType${i + 1}`] = "";
        temPayloadTwo[`ExamType${i + 1}Subjects`] = null;
        temPayloadTwo[`ExamType${i + 1}SubGrades`] = null;
      }
    }

    try {
      setIsLoading(true)

      if (token && token.length > 0) {
        if (recordId.length > 0) {
          await updateAcademicRecords(temPayloadTwo, recordId)
        } else {
          await createAcademicRecords(temPayloadTwo);
        }
      }

      toast.success("Academic records updated successfully.");
      setShowAddCourse(false);
      getRecords();

    } catch (e:any) {
      console.log("error: ", e)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-[20px] space-y-2 w-[100%] md:w-[80%] px-5 sm:px-0 mx-auto">
      <p className="text-base sm:text-lg font-semibold">Eligibility Check*</p>
      <AdmissionRequirements 
        errorObj={errorObj}
        setErrorObj={setErrorObj}
        requirementList={requirementList}
        setRequirementList={setRequirementList}
        schoolData={null}
        btnTitle="Exam"
        listTitle="Exam List"
      />

      <div className="flex justify-center mt-6 gap-x-4">
        <button 
          onClick={() => setShowAddCourse(false)}
          className="w-full max-w-[200px] py-2 px-4 border-[#DDDDDD] border text-[black] hover:bg-red-700 hover:text-white rounded-[30px] disabled:opacity-50 text-sm sm:text-base"
        >
          Cancel
        </button>
        <button
          onClick={handleEligibilityCheck}
          className="w-full max-w-[200px] py-2 px-4 bg-[#757575] hover:bg-blue-700 text-white rounded-[30px] disabled:opacity-50 text-sm sm:text-base"
        >
          {isLoading ? <BeatLoader /> : "Submit"}
        </button>
      </div>
    </div>

  );
} 