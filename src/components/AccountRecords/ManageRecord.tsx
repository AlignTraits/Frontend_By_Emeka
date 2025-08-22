import { FiX } from "react-icons/fi";
import CustomSelectWithProps from "../dashboard/CustomSelectWithProps";
import SearchSelect from '../../components/dashboard/SearchSelect';
import { useEffect, useState } from "react";
import { JAMB_SCORE_lLIST, SUBJECTS, EXAMTYPE, GRADES } from "../../data/generateYears";
import { SubjectGrade, RequirementListNew } from "../../types/course.types";
import CustomSelect from "../../components/dashboard/CustomSelect";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import countriesData from "../../data/countries_states.json"
// import { FiEdit2 } from "react-icons/fi";
// import { FaRegTrashAlt } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import { createAcademicRecords, updateAcademicRecords } from "../../services/utils";

const countryStateData: Record<string, string[]> = {
};

countriesData.map((elem:any) => {
  countryStateData[elem.name] = elem.states
})
interface ManageRecordProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  editRecord: any;
  getRecords: () => void;
}



const ManageRecord = ({setShowModal, editRecord, getRecords}: ManageRecordProps) => {

  const [errorObj, setErrorObj] = useState({
    examType: false,
    country: false,
    year: false
  });

  const [examType, setExamType] = useState("");
  const [examYear, setExamYear] = useState("");

  const [subjectList, setSubjectList] = useState<SubjectGrade[]>([]);
  const [reqId, setReqId] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [requirementList, setRequirementList] = useState<RequirementListNew[]>([]);
  const [isLoading, setIsLoading] = useState(false)

  // console.log("editRecord: ", editRecord)

  useEffect(() => {
    if (editRecord) {
      setSelectedCountry(editRecord.ExamCountry1);
      setExamType(editRecord.ExamType1);
      setSubjectList(
        editRecord.ExamType1Subjects.map((subject: string, index: number) => ({
          id: Date.now() + index, // Unique ID for each subject
          subject: subject,
          grade: editRecord.ExamType1SubGrades[index] || ""
        }))
      );

      setReqId(editRecord.id)
      
      // Scroll to form
      window.scrollTo({
        top: document.getElementById('requirements-form')?.offsetTop || 0,
        behavior: 'smooth'
      });
    } else {
      resetForm();
    }
  }, [])

  const handleExamTypeError = () => {
    setErrorObj((prev) => ({ ...prev, examType: false }));
  };

  const handleCountryError = () => {
    setErrorObj((prev) => ({...prev, country: false}))
  }

    const handleYearError = () => {
    setErrorObj((prev) => ({...prev, year: false}))
  }

  const handleClose = () => {
    setShowModal(false)
  }

  const addSubject = () => {
    setSubjectList([...subjectList, { id: JSON.stringify(Date.now()), subject: "", grade: "" }]);
  };

    // Update subject or grade value
  const updateSubject = (id: string, field: keyof SubjectGrade, value: string) => {
    setSubjectList(
      subjectList.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

    // Remove subject row
  const removeSubject = (id: string) => {
    setSubjectList(subjectList.filter((item) => item.id !== id));
  };


  const resetForm = () => {
    setExamType("");
    setSubjectList([]);
    setReqId(null);
    setSelectedCountry("")
    setErrorObj((prev) => ({ ...prev, examType: false, country: false }));
  };

    const checkAllFields = () => {
    if (examType.length === 0) {
      setErrorObj((prev) => ({ ...prev, examType: true }));
    }

    if (selectedCountry.length === 0) {
      setErrorObj((prev) => ({ ...prev, country: true }));
    }

  };

  const isFormValid = () => {
    if (examType.length > 0 && selectedCountry.length > 0 && subjectList.length > 0) {
      const allFieldsFilled = subjectList.every(
        (item) => item.subject.trim() !== "" && item.grade.trim() !== ""
      );
      return allFieldsFilled;
    }
    return false;
  };

  // const removeRequirement = (id: number) => {
  //   setRequirementList(requirementList.filter((item) => item.id !== id));
  //   toast.success("Requirement removed successfully!");
  // };

  // const editRequirement = (id: number) => {
  //   let tempRequirement = requirementList.find((item) => item.id === id);

  //   if (tempRequirement) {
  //     setSelectedCountry(tempRequirement.country);
  //     setExamType(tempRequirement.examType);
  //     setSubjectList(tempRequirement.subjects);
  //     setReqId(tempRequirement.id);
      
  //     // Scroll to form
  //     window.scrollTo({
  //       top: document.getElementById('requirements-form')?.offsetTop || 0,
  //       behavior: 'smooth'
  //     });
  //   }
  // };


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
        country: selectedCountry,
        examType: examType
      }]);
    } else {
      setRequirementList((prev) => [...prev, {
        id: JSON.stringify(Date.now()),
        subjects: subjectList,
        country: selectedCountry,
        examType: examType
      }]);
    }

    // Reset form
    setExamType("");
    setSelectedCountry("")
    setSubjectList([]);
  };

  useEffect(() => {
    if (requirementList.length > 0) {
      handleSubmit()
    }
  }, [requirementList])

  const handleSubmit = async () => {
    if (requirementList.length === 0) {
      toast.error("Please add at least one record to proceed");
      return
    }

    let temPayload:any = {}

    for (let i = 0; i < requirementList.length; i++) {
      if (i < requirementList.length) {
        const elem = requirementList[i];
        temPayload[`ExamCountry${i + 1}`] = elem.country;
        temPayload[`ExamType${i + 1}`] = elem.examType;
        temPayload[`ExamType${i + 1}Subjects`] = elem.subjects.map(sub => sub.subject);
        temPayload[`ExamType${i + 1}SubGrades`] = elem.subjects.map(sub => sub.grade);
      }
    }

    try {
      setIsLoading(true);
      const response = reqId ? await updateAcademicRecords(temPayload, reqId) : await createAcademicRecords(temPayload);
      console.log("response: ", response)
      toast.success(reqId ? "Record updated successfully!" : "Record added successfully!");
    } catch (err:any) {
      toast.error("An error occurred when creating record");
    } finally {
      setIsLoading(false)
      resetForm()
      setShowModal(false);
      getRecords();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

  {/* Backdrop */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          

      <div className="bg-white rounded-lg w-[80%] lg:w-[50%] relative h-[500px] overflow-y-auto scrollbar-hide p-[20px] flex flex-col gap-y-[20px]">
        <FiX onClick={handleClose} className="cursor-pointer absolute right-6 top-[30px] -translate-y-1/2 text-[#595959] w-5 h-5"  />

        <div>
          <p className="text-[#212529] text-[18px] font-bold">Add Academic Records</p>
        </div>

        {reqId && (
          <div className="bg-blue-50 text-blue-700 p-3 rounded-md flex justify-between items-center">
            <span>Editing Record </span>
            <button 
              onClick={resetForm}
              className="text-red-700 underline"
            >
              Cancel Editing
            </button>
          </div>
        )}

        <div className="w-[100%] flex flex-col gap-y-[5px]">
          <p className={`text-[16px] font-medium ${errorObj.country ? "text-[#F04438]" : "text-[#1E1E1E]"}`}>Country</p>
          <SearchSelect
            placeholder="Select Country"
            options={Object.keys(countryStateData).map((country) => ({
              value: country,
              label: country,
            }))}
            onChange={(value) => setSelectedCountry(value)}
            handleError={handleCountryError}
            selectedProps={{
              value: selectedCountry,
              label: selectedCountry
            }}
            
          />
        </div>

        <div className="mt-3 flex gap-x-[20px]">
          <div className="w-[50%] flex flex-col gap-y-[5px]">
            <p className={`text-[16px] font-medium ${errorObj.year ? "text-[#F04438]" : "text-[#1E1E1E]"}`}>Year</p>
            <SearchSelect
              placeholder="Select Year"
              // generate years dynamically from 1970 to current year
              options={Array.from({ length: new Date().getFullYear() - 1970 + 1 }, (_, i) => ({
                value: (1970 + i).toString(),
                label: (1970 + i).toString(),
              }))}  
              onChange={(value) => setExamYear(value)}
              handleError={handleYearError}
              selectedProps={{
                value: examYear,
                label: examYear
              }}
              
            />
          </div>
          <div className="w-[50%] flex flex-col gap-y-[5px]">
            <p className={`text-[16px] font-medium ${errorObj.examType ? "text-[#F04438]" : "text-[#1E1E1E]"}`}>
              Exam Type*
            </p>
            <CustomSelectWithProps
              placeholder="e.g Neco, Wassce etc"
              options={EXAMTYPE.map((typeValue) => ({
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
        </div>

        <div className="flex justify-end">
          <button
            onClick={addSubject}
            className="text-[#1E1E1E] text-[14px] font-semibold border-[#DDDDDD] border-[1px] h-[44px] w-[127px] rounded-md hover:bg-gray-50"
          >
            Add Subjects
          </button>
        </div>

        {subjectList.length === 0 && (
          <div className="text-center py-4 text-gray-500 rounded-md">
            No subjects added. Click "Add Subjects" to add required subjects.
          </div>
        )}

        <div className="flex flex-col gap-y-[10px]">
          {subjectList.map((item: SubjectGrade) => (
            <div key={item.id} className="flex gap-x-[20px] items-end">
              <div className="w-[50%]">
                <p className="text-[16px] font-medium text-[#1E1E1E]">Subject*</p>
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

              <div className="w-[50%]">
                <p className="text-[16px] font-medium text-[#1E1E1E]">Grade*</p>
                {examType === "JAMB" ? (
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
                ) : (
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
                )}
              </div>

              <div
                onClick={() => removeSubject(item.id)}
                className="cursor-pointer border-[#E9E9E9] border-[1px] rounded-md w-[40px] h-[40px] flex justify-center items-center hover:bg-red-50"
              >
                <RxCross1 className="text-[#D92D20]" />
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex justify-end gap-x-[20px] mt-4">
          <button 
            onClick={resetForm}
            className="w-[211px] h-[50px] border-[#DDDDDD] border-[1px] text-[#1E1E1E] text-[14px] font-semibold rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={addRequirements}
            disabled={isLoading}
            className="w-[211px] h-[50px] border-[#DDDDDD] border-[1px] text-[#ffffff] text-[14px] font-semibold rounded-md bg-[#004085] hover:bg-[#003366]"
          >
            {isLoading ? <BeatLoader /> : reqId ? `Update Record` : `Add Record`}
          </button>
        </div>

        {/* <div className="flex flex-col gap-y-[20px] mt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#1E1E1E]">Record</h3>
            <span className="text-gray-500 text-xs sm:text-sm">{requirementList.length} {requirementList.length === 1 ? 'record' : 'records'}</span>
          </div>
  
          {requirementList.length === 0 ? (
            <div className="border-[#E9E9E9] border w-full p-6 sm:p-8 rounded-md flex flex-col items-center justify-center text-gray-500 text-sm">
              <p>No records added yet.</p>
              <p className="text-xs sm:text-sm mt-2">Add record using the form above.</p>
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
                      {item.country}
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
        </div>     */}

        {/* <div className="w-full flex justify-center gap-x-[20px] mt-4">
          <button
            disabled={isLoading}
            onClick={handleSubmit}
            className="w-[211px] h-[50px] border-[#DDDDDD] border-[1px] text-[#ffffff] text-[14px] font-semibold rounded-md bg-[#004085] hover:bg-[#003366]"
          >
            {isLoading ? <BeatLoader /> : "Submit"}
          </button>
        </div> */}
      </div>  

    </div>
  )
}

export default ManageRecord;