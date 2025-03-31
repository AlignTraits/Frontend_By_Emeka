import { useState } from "react";
import { toast } from "react-toastify";
import CustomSelectWithProps from "../dashboard/CustomSelectWithProps";


const RULENAME = ["Standard Admission"]

const DESCRIPTION_RULE = ["Testing"]

const EXAMS = [
  "Jamb + Neco Qualify",
  "Jamb + WAEC + NECO Qualify",
  "Jamb + WAEC Qualify"
]

const AdmissionRules = () => {
  const [ruleName, setRuleName] = useState("")
  const [description, setDescription] = useState("")
  const [exams, setExams] = useState("")

  const [errorObj, setErrorObj] = useState({
    ruleName: false,
    descriptionRule: false,
    exams: false
  })

  const handleRuleError = () => {
    setErrorObj((prev) => ({...prev, ruleName: false}))
  }

  const handleDescriptionError = () => {
    setErrorObj((prev) => ({...prev, descriptionRule: false}))
  }

  const handleExamsError = () => {
    setErrorObj((prev) => ({...prev, exams: false}))
  }

  const checkAllFields = () => {
    if (ruleName.length === 0) {
      setErrorObj((prev) => ({...prev, ruleName: true}))
    }

    if (description.length === 0) {
      setErrorObj((prev) => ({...prev, descriptionRule: true}))
    }

    if (exams.length === 0) {
      setErrorObj((prev) => ({...prev, exams: true}))
    }
  }

  const isFormValid = () => {
    if (exams.length > 0 && description.length > 0 && ruleName.length > 0) {
      return true
    } else {
      return false
    }
  }

  const createRules = () => {
    checkAllFields();

    if (!isFormValid()) {
      toast.error("Please fill all input fields!");
      return 
    }
    
  }

  return (
    <div className="w-full h-[480px] bg-[#FAFAFA] border-[1px] border-[#E0E0E0] rounded-lg flex flex-col gap-6 p-5">
      <p className="text-[18px] font-semibold text-[#000000]">
        Create Admission Rule
      </p>

      <div className="w-full flex flex-col gap-y-[5px]">
        <p className={`text-[16px] text-[#1E1E1E] font-medium ${errorObj.ruleName ? "text-[#F04438]" : "text-[#1E1E1E]"}`}>Rule Name*</p>
        <CustomSelectWithProps
          placeholder="e.g Standard Admission"
          options={RULENAME.map((typeValue) => ({
            value: typeValue,
            label: typeValue,
          }))}
          onChange={(value) => setRuleName(value)}
          selectedProps={{
            value: ruleName,
            label: ruleName
          }}
          handleError={handleRuleError}
        />
      </div>

      <div className="w-full flex flex-col gap-y-[5px]">
        <p className={`text-[16px] text-[#1E1E1E] font-medium ${errorObj.descriptionRule ? "text-[#F04438]" : "text-[#1E1E1E]"}`}>Brief Description*</p>
        <CustomSelectWithProps
          placeholder="Brief description of the rules"
          options={DESCRIPTION_RULE.map((typeValue) => ({
            value: typeValue,
            label: typeValue,
          }))}
          onChange={(value) => setDescription(value)}
          selectedProps={{
            value: description,
            label: description
          }}
          handleError={handleDescriptionError}
        />
      </div>

      <p className="text-[12px] text-[#737373] font-normal">All selected exams must be passed</p>

      <div className="w-full flex flex-col gap-y-[5px]">
        <p className={`text-[16px] text-[#1E1E1E] font-medium ${errorObj.exams ? "text-[#F04438]" : "text-[#1E1E1E]"}`}>Required Exams*</p>
        <CustomSelectWithProps
          placeholder="Brief description of the rules"
          options={EXAMS.map((typeValue) => ({
            value: typeValue,
            label: typeValue,
          }))}
          onChange={(value) => setExams(value)}
          selectedProps={{
            value: exams,
            label: exams
          }}
          handleError={handleExamsError}
        />
      </div>

      <div className="w-full flex justify-end gap-x-[20px]">
        <button className="w-[211px] h-[50px] border-[#DDDDDD] border-[1px] text-[#1E1E1E] text-[14px] font-semibold rounded-md">Cancel</button>
        <button onClick={createRules} className="w-[211px] h-[50px] border-[#DDDDDD] border-[1px] text-[#ffffff] text-[14px] font-semibold rounded-md bg-[#004085]">Create rules</button>
      </div>
    </div>
  )
}

export default AdmissionRules