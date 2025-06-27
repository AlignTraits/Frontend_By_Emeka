import { FiX } from "react-icons/fi";
import CustomSelectWithProps from "../dashboard/CustomSelectWithProps";
import { useState } from "react";
import { YEARS, JAMB_SCORE_lLIST, SUBJECTS, EXAMTYPE, GRADES } from "../../data/generateYears";
import { SubjectGrade, RequirementListNew } from "../../types/course.types";
import CustomSelect from "../../components/dashboard/CustomSelect";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { FiEdit2 } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";

interface ManageRecordProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}



const ManageRecord = ({setShowModal}: ManageRecordProps) => {

  const [errorObj, setErrorObj] = useState({
    examType: false,
    year: false
  });

  const [examType, setExamType] = useState("");
  const [year, setYear] = useState("");

  const [subjectList, setSubjectList] = useState<SubjectGrade[]>([]);
  const [reqId, setReqId] = useState<number | null>(null);
  const [requirementList, setRequirementList] = useState<RequirementListNew[]>([]);

  const handleExamTypeError = () => {
    setErrorObj((prev) => ({ ...prev, examType: false }));
  };

  const handleYearTypeError = () => {
    setErrorObj((prev) => ({ ...prev, year: false }));
  };

  const handleClose = () => {
    setShowModal(false)
  }

  const addSubject = () => {
    setSubjectList([...subjectList, { id: Date.now(), subject: "", grade: "" }]);
  };

    // Update subject or grade value
  const updateSubject = (id: number, field: keyof SubjectGrade, value: string) => {
    setSubjectList(
      subjectList.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

    // Remove subject row
  const removeSubject = (id: number) => {
    setSubjectList(subjectList.filter((item) => item.id !== id));
  };


  const resetForm = () => {
    setExamType("");
    setSubjectList([]);
    setReqId(null);
    setErrorObj((prev) => ({ ...prev, examType: false, year: false }));
  };

    const checkAllFields = () => {
    if (examType.length === 0) {
      setErrorObj((prev) => ({ ...prev, examType: true }));
    }

    if (year.length === 0) {
      setErrorObj((prev) => ({ ...prev, programLocation: true }));
    }
  };

  const isFormValid = () => {
    if (examType.length > 0 && year.length > 0 && subjectList.length > 0) {
      const allFieldsFilled = subjectList.every(
        (item) => item.subject.trim() !== "" && item.grade.trim() !== ""
      );
      return allFieldsFilled;
    }
    return false;
  };


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
        year: year,
        examType: examType
      }]);
    } else {
      setRequirementList((prev) => [...prev, {
        id: Date.now(),
        subjects: subjectList,
        year: year,
        examType: examType
      }]);
    }

    // Reset form
    setExamType("");
    setYear("")
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
      setYear(tempRequirement.year)
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




  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center h-screen">

      <div className="bg-white rounded-lg w-[80%] relative size-max p-[20px] flex flex-col gap-y-[20px]">
        <FiX onClick={handleClose} className="cursor-pointer absolute right-6 top-[30px] -translate-y-1/2 text-[#595959] w-5 h-5"  />

        <div>
          <p className="text-[#212529] text-[18px] font-bold">Add Academic Records</p>
        </div>

        {reqId && (
          <div className="bg-blue-50 text-blue-700 p-3 rounded-md flex justify-between items-center">
            <span>Editing subjects</span>
            <button 
              onClick={resetForm}
              className="text-red-700 underline"
            >
              Cancel Editing
            </button>
          </div>
        )}

        <div className="mt-3 flex gap-x-[20px]">
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

          <div className="w-[50%] flex flex-col gap-y-[5px]">
            <p className={`text-[16px] font-medium ${errorObj.year ? "text-[#F04438]" : "text-[#1E1E1E]"}`}>
              Exam Year*
            </p>
            <CustomSelectWithProps
              placeholder="YYYY"
              options={YEARS.map((typeValue) => ({
                value: typeValue,
                label: typeValue,
              }))}
              onChange={(value) => setYear(value)}
              selectedProps={{
                value: year,
                label: year,
              }}
              handleError={handleYearTypeError}
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
            className="w-[211px] h-[50px] border-[#DDDDDD] border-[1px] text-[#ffffff] text-[14px] font-semibold rounded-md bg-[#004085] hover:bg-[#003366]"
          >
            {reqId ? `Update Record` : `Add Record`}
          </button>
        </div>

        <div className="flex flex-col gap-y-[20px] mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-[16px] font-semibold text-[#1E1E1E]">Subjects</h3>
            <span className="text-gray-500 text-sm">{requirementList.length} {requirementList.length === 1 ? 'subjects' : 'subjectss'}</span>
          </div>
  
          {requirementList.length === 0 ? (
            <div className="border-[#E9E9E9] border-[1px] w-full p-8 rounded-md flex flex-col items-center justify-center text-gray-500">
              <p>No subjects added yet.</p>
              <p className="text-sm mt-2">Add subjects using the form above.</p>
            </div>
          ) : (
            requirementList.map((item) => (
              <div
                key={item.id}
                className="border-[#E9E9E9] border-[1px] w-full p-5 rounded-md flex justify-between items-center hover:bg-gray-50"
              >
                <div className="flex flex-col gap-y-[5px]">
                  <div className="flex gap-x-[10px] items-center">
                    <p className="font-semibold text-[16px]">{item.examType}</p>
                    <p className="w-max px-[10px] h-[30px] flex justify-center items-center text-center text-[12px] font-medium border-[#E9E9E9] border-[1px] rounded-2xl">
                      {item.year}
                    </p>
                  </div>
                  <p className="text-[16px] font-medium">Required Subjects:</p>
                  <div className="flex flex-wrap gap-2">
                    {item.subjects.map((innerItem) => (
                      <p
                        key={innerItem.id}
                        className="w-max px-[10px] h-[30px] flex justify-center items-center text-center text-[10px] font-normal border-[#E9E9E9] border-[1px] rounded-2xl"
                      >
                        {innerItem.subject}: {innerItem.grade}
                      </p>
                    ))}
                  </div>
                </div>
  
                <div className="flex gap-x-[20px]">
                  <button
                    onClick={() => editRequirement(item.id)}
                    className="flex items-center gap-1 text-[#595959] hover:text-[#353535] p-2 rounded hover:bg-gray-100"
                  >
                    <FiEdit2 className="text-[#595959]" />
                    <span className="text-sm">Edit</span>
                  </button>
  
                  <button
                    onClick={() => removeRequirement(item.id)}
                    className="flex items-center gap-1 text-[#F04438] hover:text-[#D92D20] p-2 rounded hover:bg-red-50"
                  >
                    <FaRegTrashAlt className="text-[#F04438]" />
                    <span className="text-sm">Delete</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>


      </div>      
    </div>
  )
}

export default ManageRecord;