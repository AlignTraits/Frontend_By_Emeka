import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../contexts/useAuth';
import Card from '../../components/AccountRecords/Card';
import ManageRecord from '../../components/AccountRecords/ManageRecord';
import { getAcademicRecords } from "../../services/utils";
import { ClipLoader } from "react-spinners";
import ActionRequiredAlert from '../../components/AccountRecords/ActionRequiredAlert';
import { SubjectGrade, RequirementListNew } from "../../types/course.types";

export default function AcountRecords() {
  const {setPageDesc} = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [recordList, setRecordList] = useState<RequirementListNew[]>([])
  const [editRecord, setEditRecord] = useState<RequirementListNew | null>(null)
  const [isLoading, setIsLoading] = useState(false);
  const [recordId, setRecordId] = useState<string | null>(null)

  const hasFetched = useRef(false);


    useEffect(() => {
      setPageDesc({
        desc: "Check your records",
        title: "Records"
      });

      if (!hasFetched.current) {
        getRecords();
        hasFetched.current = true;
      }
    }, [])


    const getRecords = async () => {
      try {
        setIsLoading(true)
        const response = await getAcademicRecords({showToast: false});
        // setRecordList(response.data)
        console.log("response: ", response)
        if (response?.ok) {
          populateList(response.data[0])
          setRecordId(response.data[0].id)
        }
      } catch (err: any) {
        console.log("error: ", err)
        setRecordList([]);
      } finally {
        setIsLoading(false)
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

  return (
    <div className="p-5 relative">
      {
        checkExamType() && 
        <ActionRequiredAlert />
      }
      <div className="mt-10 border-[1px] border-[#EAECF0] flex flex-col gap-y-[30px] shadow-md rounded-xl p-2 lg:p-5 w-[100%] size-max">
        <div>
          <p className="text-[#212529] text-[18px] font-bold">Academic Records</p>
          <p className='text-[12px] text-[#757575] lg:mt-2'>Manage your examination records.</p>
        </div>

        <div className='w-full flex justify-between items-center'>
          <p className='text-[#101828] text-[14px] lg:text-[16px] font-semibold whitespace-nowrap'>Academic Records</p>
          <button onClick={() => setShowModal(true)} className="h-[35px] lg:h-[45px] bg-[#004085] whitespace-nowrap rounded-xl text-white font-medium text-[14px] lg:text-[16px] size-max px-2 lg:w-[200px] hover:bg-[#0056b3] transition-colors duration-300">
            {"Add New Record"}
          </button>
        </div>

        {
          isLoading ? 
          <div className='w-full h-[100px] flex justify-center items-center'>
            <ClipLoader /> 
          </div> : recordList?.length > 0 ? recordList.map((record, index) => (
            <Card recordId={recordId} recordList={recordList} getRecords={getRecords} key={index} setShowModal={setShowModal} result={record} setEditRecord={setEditRecord} />
          )) : ( 
            <p className='text-[#757575] text-[14px]'>No records found.</p>
          )
        }

      </div>
      {
        showModal && <ManageRecord recordId={recordId} recordList={recordList} setShowModal={setShowModal} editRecord={editRecord} getRecords={getRecords} setEditRecord={setEditRecord} />
      }
    </div>
  );
}
