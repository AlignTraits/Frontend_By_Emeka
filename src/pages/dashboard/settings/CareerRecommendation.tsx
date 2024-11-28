// import React from 'react'
import Header from '../../../components/Settings/Header'
import Calendar from '../../../assets/dashboard/icons/calendar.svg'
import { FiChevronRight } from 'react-icons/fi'
export default function CareerRecommendation() {
  
  const recommendaton = [
    {
      id: 1,
      title: "01 Career Recommendation",
      date: '8--6-2024'
    },
    {
      id: 2,
      title: '02 Career Recommendation',
      date: '11--9-2024'
    }
  ];

  const handleClick = ()=> {
    console.log('clicked')
  }

  return (
    <div className="space-y-8">
      <Header
        heading="Career Recommendation"
        text="View your career recommendations and your recommendation history here."
        buttonText="Retake Recommendation"
        className="w-[300px]"
        handleClick={handleClick}
      />
      {recommendaton.map((rec, index) => (
        <div
          className="flex justify-between pb-10 border-b-[1px] border-[#E0E0E0]"
          key={rec.id + index}
        >
          <div className="flex gap-5 items-start">
            <img src={Calendar} alt='AlignTraits Calendar Icon' className=' mt-1' />
            <div>
              <h3 className="text-[#212121] text-[18px] font-[600]">
                {rec.title}
              </h3>
              <span className="text-[#757575]">{rec.date}</span>
            </div>
          </div>
          <FiChevronRight className="my-auto text-[35px] text-[#004085]" />
        </div>
      ))}
    </div>
  );
}
