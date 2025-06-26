import { useEffect } from 'react';
import { useAuth } from '../../contexts/useAuth';
import Card from '../../components/AccountRecords/Card';

export default function AcountRecords() {
  const {setPageDesc} = useAuth()

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
    <div className="p-5">
      <div className="mt-10 border-[1px] border-[#EAECF0] flex flex-col gap-y-[30px] shadow-md rounded-xl p-5 w-[100%] size-max">
        <div>
          <p className="text-[#212529] text-[18px] font-bold">Academic Records</p>
          <p className='text-[12px] text-[#757575] mt-2'>Manage your examination records and academic achievements.</p>
        </div>

        <div className='w-full flex justify-between items-center'>
          <p className='text-[#101828] text-[16px] font-semibold'>Your Academic Records</p>
          <button className='h-[45px] bg-[#004085] rounded-xl text-[white] font-medium text-[14px] w-[200px]'>
            {"Add New Record"}
          </button>
        </div>

        <Card result={result[0]} />

        <Card result={result[1]} />

      </div>
    </div>
  );
}
