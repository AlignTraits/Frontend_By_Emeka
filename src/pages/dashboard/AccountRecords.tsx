import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/useAuth';
import Card from '../../components/AccountRecords/Card';
import ManageRecord from '../../components/AccountRecords/ManageRecord';

export default function AcountRecords() {
  const {setPageDesc} = useAuth()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    setPageDesc({
      desc: "Check your records",
      title: "Records"
    })
  }, [])

  const result = [
    {
      title: "WAEC",
      subjects: [
        {
          title: "Physics",
          score: "A1"
        },
        {
          title: "Chemistry",
          score: "C1"
        },
                {
          title: "Mathematcis",
          score: "C6"
        },
                {
          title: "English Language",
          score: "B3"
        }
      ]
    },
    {
      title: "JAMB",
      subjects: [
        {
          title: "Physics",
          score: "88"
        },
        {
          title: "Chemistry",
          score: "55"
        },
                {
          title: "Mathematcis",
          score: "90"
        },
                {
          title: "English Language",
          score: "60"
        }
      ]
    }
  ]

  return (
    <div className="p-5 relative">
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

        <Card setShowModal={setShowModal} result={result[0]} />

        <Card setShowModal={setShowModal} result={result[1]} />

      </div>
      {
        showModal && <ManageRecord setShowModal={setShowModal} />
      }
    </div>
  );
}
