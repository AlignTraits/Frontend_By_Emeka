import { useState, useEffect } from "react";
import CustomSelect from "../../components/dashboard/CustomSelect";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { FiEdit2 } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import CustomSelectWithProps from "../dashboard/CustomSelectWithProps";
import { ErrorObjType, SubjectGrade, RequirementList } from "../../types/course.types";


const COUNTRIES = ["Nigeria"]

const EXAMTYPE = [
  "JAMB",
  "UTME",
  "NECO",
  "GCE",
  "WAEC",
  "NABTEB",
  "A_LEVEL"
]

const GRADES = [
  "A1",
  "B2",
  "B3",
  "C4",
  "C5",
  "C6",
  "D7",
  "E8",
  "F9"
]

const JAMB_SCORE_lLIST = Array.from({ length: 101 }, (_, i) => i.toString());

const SUBJECTS = [
  "English",
  "Mathematics",
  "Civic Education",
  "Physics",
  "Chemistry",
  "Biology",
  "Geography",
  "Economics",
  "Accounting",
  "Christian Religious Studies",
  "Islamic Religious Studies",
  "Marketing",
  "Government",
  "History",
  "Agricultural Science",
  "Computer Studies",
  "Information and communication Technology",
  "Fine Art",
  "Visual Arts",
  "Literature in English",
  "Business Studies",
  "Physical and Health Education",
  "Commerce",
  "Home Economics",
  "Further Mathematics",
  "Technical Drawing",
  "French",
  "Yourba",
  "Igbo",
  "Hausa",
  "Food and Nutrition",
  "Music",
  "Statistics",
  "Insurance",
  "Trade Subject",
  "Entrepreneurial Subject"
]

interface RequirementProps {
  setErrorObj: React.Dispatch<React.SetStateAction<ErrorObjType>>;
  errorObj: ErrorObjType,
  requirementList: RequirementList[];
  setRequirementList: React.Dispatch<React.SetStateAction<RequirementList[]>>
  schoolData?: any;
  adminExamType?: string[];
  btnTitle?: string;
  listTitle?: string
} 

const AdmissionRequirements = ({
  setErrorObj,
  errorObj,
  requirementList,
  setRequirementList,
  schoolData,
  adminExamType = [],
  btnTitle = "Requirement",
  listTitle = "Requirements List"
}: RequirementProps) => {
  const [subjectList, setSubjectList] = useState<SubjectGrade[]>([]);
  const [programLocation, setProgramLocation] = useState("");
  const [examType, setExamType] = useState("");
  const [reqId, setReqId] = useState<number | null>(null);

  // Parse and load requirements from school data on component mount
  useEffect(() => {
    if (schoolData) {
      const parsedRequirements: RequirementList[] = [];
      
      // Process up to 10 exam types from school data
      for (let i = 1; i <= 10; i++) {
        const countryKey = `ExamCountry${i}`;
        const typeKey = `ExamType${i}`;
        const subjectsKey = `ExamType${i}Subjects`;
        const gradesKey = `ExamType${i}SubGrades`;
        
        if (schoolData[countryKey] && schoolData[typeKey] && 
            schoolData[subjectsKey] && schoolData[gradesKey]) {
          
          const subjects: SubjectGrade[] = [];
          
          // Create subject-grade pairs
          for (let j = 0; j < schoolData[subjectsKey].length; j++) {
            subjects.push({
              id: JSON.stringify(Date.now() + j),
              subject: schoolData[subjectsKey][j],
              grade: schoolData[gradesKey][j]
            });
          }
          
          // Add to requirements list
          parsedRequirements.push({
            id: Date.now() + i,
            location: schoolData[countryKey],
            examType: schoolData[typeKey],
            subjects: subjects
          });
        }
      }
      
      // Only update if we found requirements and the current list is empty
      if (parsedRequirements.length > 0 && requirementList.length === 0) {
        setRequirementList(parsedRequirements);
      }
    }
  }, [schoolData]);

  const addRequirements = () => {
    checkAllFields();

    if (!isFormValid()) {
      toast.error("Please fill all input fields!");
      return;
    }

    if (reqId) {
      let tempList = requirementList.filter((item) => item.id !== reqId);
      setRequirementList([...tempList, {
        id: reqId,
        subjects: subjectList,
        location: programLocation,
        examType: examType
      }]);
    } else {
      setRequirementList((prev) => [...prev, {
        id: Date.now(),
        subjects: subjectList,
        location: programLocation,
        examType: examType
      }]);
    }

    // Reset form
    setProgramLocation("");
    setExamType("");
    setSubjectList([]);
    setReqId(null);
    
    toast.success(reqId ? "Requirement updated successfully!" : "Requirement added successfully!");
  };

  const removeRequirement = (id: number) => {
    setRequirementList(requirementList.filter((item) => item.id !== id));
    toast.success("Requirement removed successfully!");
  };

  const editRequirement = (id: number) => {
    let tempRequirement = requirementList.find((item) => item.id === id);

    if (tempRequirement) {
      setProgramLocation(tempRequirement.location);
      setExamType(tempRequirement.examType);
      setSubjectList(tempRequirement.subjects);
      setReqId(tempRequirement.id);
      
      // Scroll to form
      window.scrollTo({
        top: document.getElementById('requirements-form')?.offsetTop || 0,
        behavior: 'smooth'
      });
    }
  };

  const checkAllFields = () => {
    if (examType.length === 0) {
      setErrorObj((prev) => ({ ...prev, examType: true }));
    }

    if (programLocation.length === 0) {
      setErrorObj((prev) => ({ ...prev, programLocation: true }));
    }
  };

  const isFormValid = () => {
    if (examType.length > 0 && programLocation.length > 0 && subjectList.length > 0) {
      const allFieldsFilled = subjectList.every(
        (item) => item.subject.trim() !== "" && item.grade.trim() !== ""
      );
      return allFieldsFilled;
    }
    return false;
  };

  const handleExamTypeError = () => {
    setErrorObj((prev) => ({ ...prev, examType: false }));
  };

  // Add new subject row
  const addSubject = () => {
    setSubjectList([...subjectList, { id: JSON.stringify(Date.now()), subject: "", grade: "" }]);
  };

  // Remove subject row
  const removeSubject = (id: string) => {
    setSubjectList(subjectList.filter((item) => item.id !== id));
  };

  // Update subject or grade value
  const updateSubject = (id: string, field: keyof SubjectGrade, value: string) => {
    setSubjectList(
      subjectList.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // Reset form
  const resetForm = () => {
    setProgramLocation("");
    setExamType("");
    setSubjectList([]);
    setReqId(null);
    setErrorObj((prev) => ({ ...prev, examType: false, programLocation: false }));
  };

  let filteredExamTypes = adminExamType.length > 0 ? adminExamType : EXAMTYPE;

return (
    <div className="w-full bg-[#FAFAFA] border border-[#E0E0E0] rounded-lg flex flex-col gap-6 p-3 sm:p-5">
      <p className="text-[16px] sm:text-[18px] font-semibold text-[#000000]">
        TERTIARY / SECONDARY / OTHERS SCHOOL EXAMINATION DETAILS
      </p>

      <div id="requirements-form" className="w-full flex flex-col gap-y-6">
        {reqId && (
          <div className="bg-blue-50 text-blue-700 p-3 rounded-md flex flex-col sm:flex-row justify-between items-center gap-2">
            <span>Editing requirement</span>
            <button 
              onClick={resetForm}
              className="text-red-700 underline"
            >
              Cancel Editing
            </button>
          </div>
        )}
        
        <div className="w-full flex flex-col gap-y-[5px]">
          <p className={`text-[15px] sm:text-[16px] font-medium ${errorObj.programLocation ? "text-[#F04438]" : "text-[#1E1E1E]"}`}>
            Program Location*
          </p>
          <CustomSelectWithProps
            placeholder="Select Country"
            options={COUNTRIES.map((typeValue) => ({
              value: typeValue,
              label: typeValue,
            }))}
            onChange={(val) => setProgramLocation(val)}
            selectedProps={{
              value: programLocation,
              label: programLocation,
            }}
            handleError={() => setErrorObj((prev) => ({ ...prev, programLocation: false }))}
          />
        </div>

        <div className="w-full flex flex-col gap-y-[5px]">
          <p className={`text-[15px] sm:text-[16px] font-medium ${errorObj.examType ? "text-[#F04438]" : "text-[#1E1E1E]"}`}>
            Exam Type*
          </p>
          <CustomSelectWithProps
            placeholder="e.g Neco, Wassce etc"
            options={filteredExamTypes.map((typeValue) => ({
              value: typeValue,
              label: typeValue,
            }))}
            onChange={(value) => setExamType(value)}
            selectedProps={{
              value: examType,
              label: examType,
            }}
            handleError={handleExamTypeError}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-[15px] sm:text-[16px] font-medium text-[#1E1E1E]">Required Subjects*</p>
          <button
            onClick={addSubject}
            className="text-[#1E1E1E] text-[13px] sm:text-[14px] font-semibold border-[#DDDDDD] border h-[40px] sm:h-[44px] w-full sm:w-[127px] rounded-md hover:bg-gray-50"
          >
            Add Subjects
          </button>
        </div>

        {subjectList.length === 0 && (
          <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-md text-sm">
            No subjects added. Click "Add Subjects" to add required subjects.
          </div>
        )}

        <div className="flex flex-col gap-y-[10px]">
          {subjectList.map((item: SubjectGrade) => (
            <div key={item.id} className="flex flex-col sm:flex-row gap-y-2 gap-x-[20px] items-end">
              <div className="w-full sm:w-1/2">
                <p className="text-[15px] sm:text-[16px] font-medium text-[#1E1E1E]">Subject*</p>
                <CustomSelect
                  placeholder="Select Subject"
                  options={SUBJECTS.map((typeValue) => ({
                    value: typeValue,
                    label: typeValue,
                  }))}
                  onChange={(val) => updateSubject(item.id, "subject", val)}
                  selectedProps={{
                    value: item.subject,
                    label: item.subject,
                  }}
                />
              </div>

              <div className="w-full sm:w-1/2">
                <p className="text-[15px] sm:text-[16px] font-medium text-[#1E1E1E]">Grade*</p>
                {examType === "JAMB" ? (
                  <div className="flex gap-x-2 items-center w-[100%]">
                    <div className="w-full">
                      <CustomSelect
                        placeholder="Select Grade"
                        options={JAMB_SCORE_lLIST.map((typeValue) => ({
                          value: typeValue,
                          label: typeValue,
                        }))}
                        onChange={(val) => updateSubject(item.id, "grade", val)}
                        selectedProps={{
                          value: item.grade,
                          label: item.grade,
                        }}
                      />
                    </div>
                    <div
                      onClick={() => removeSubject(item.id)}
                      className="cursor-pointer border-[#E9E9E9] border rounded-md w-[36px] h-[36px] flex justify-center items-center hover:bg-red-50 sm:mt-0"
                    >
                      <RxCross1 className="text-[#D92D20]" />
                    </div>
                  </div>
                ) : (
                  <div className="flex w-full">
                    <div className="w-full">
                      <CustomSelect
                        placeholder="Select Grade"
                        options={GRADES.map((typeValue) => ({
                          value: typeValue,
                          label: typeValue,
                        }))}
                        onChange={(val) => updateSubject(item.id, "grade", val)}
                        selectedProps={{
                          value: item.grade,
                          label: item.grade,
                        }}
                      />
                    </div>
                  <div
                    onClick={() => removeSubject(item.id)}
                    className="cursor-pointer border-[#E9E9E9] border rounded-md w-[36px] h-[36px] flex justify-center items-center hover:bg-red-50 sm:mt-0"
                  >
                    <RxCross1 className="text-[#D92D20]" />
                  </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex flex-col sm:flex-row justify-end gap-2 sm:gap-x-[20px] mt-4">
          <button 
            onClick={resetForm}
            className="w-full sm:w-[211px] h-[44px] sm:h-[50px] border-[#DDDDDD] border text-[#1E1E1E] text-[13px] sm:text-[14px] font-semibold rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={addRequirements}
            className="w-full sm:w-[211px] h-[44px] sm:h-[50px] border-[#DDDDDD] border text-white text-[13px] sm:text-[14px] font-semibold rounded-md bg-[#004085] hover:bg-[#003366]"
          >
            {reqId ? `Update ${btnTitle}` : `Add ${btnTitle}`}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-y-[20px] mt-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#1E1E1E]">{listTitle}</h3>
          <span className="text-gray-500 text-xs sm:text-sm">{requirementList.length} {requirementList.length === 1 ? 'requirement' : 'requirements'}</span>
        </div>

        {requirementList.length === 0 ? (
          <div className="border-[#E9E9E9] border w-full p-6 sm:p-8 rounded-md flex flex-col items-center justify-center text-gray-500 text-sm">
            <p>No requirements added yet.</p>
            <p className="text-xs sm:text-sm mt-2">Add requirements using the form above.</p>
          </div>
        ) : (
          requirementList.map((item) => (
            <div
              key={item.id}
              className="border-[#E9E9E9] border w-full p-3 sm:p-5 rounded-md flex flex-col sm:flex-row justify-between items-center gap-2 hover:bg-gray-50"
            >
              <div className="flex flex-col gap-y-[5px] w-full">
                <div className="flex flex-col sm:flex-row gap-2 items-center">
                  <p className="font-semibold text-[15px] sm:text-[16px]">{item.examType}</p>
                  <p className="w-max px-[10px] h-[28px] sm:h-[30px] flex justify-center items-center text-center text-[11px] sm:text-[12px] font-medium border-[#E9E9E9] border rounded-2xl">
                    {item.location}
                  </p>
                </div>
                <p className="text-[15px] sm:text-[16px] font-medium">Required Subjects:</p>
                <div className="flex flex-wrap gap-2">
                  {item.subjects.map((innerItem) => (
                    <p
                      key={innerItem.id}
                      className="w-max px-[10px] h-[26px] sm:h-[30px] flex justify-center items-center text-center text-[10px] sm:text-[12px] font-normal border-[#E9E9E9] border rounded-2xl"
                    >
                      {innerItem.subject}: {innerItem.grade}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex gap-x-[10px] sm:gap-x-[20px] mt-2 sm:mt-0">
                <button
                  onClick={() => editRequirement(item.id)}
                  className="flex items-center gap-1 text-[#595959] hover:text-[#353535] p-2 rounded hover:bg-gray-100 text-xs sm:text-sm"
                >
                  <FiEdit2 className="text-[#595959]" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => removeRequirement(item.id)}
                  className="flex items-center gap-1 text-[#F04438] hover:text-[#D92D20] p-2 rounded hover:bg-red-50 text-xs sm:text-sm"
                >
                  <FaRegTrashAlt className="text-[#F04438]" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdmissionRequirements;