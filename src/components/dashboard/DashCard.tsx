
import React from 'react';

interface DashCardProps {
  percentage?: number;
  title?: string;
  className?: string;
  svgImage?: React.ReactNode; // Optional SVG prop
}

const DashCard: React.FC<DashCardProps> = ({
  percentage = 0,
  title = "Completed career quiz",
  className = "",
  svgImage=null
}) => {
  return (
    <div className={` bg-white cursor-pointer flex flex-col justify-between rounded-lg shadow-lg shadow-gray-200/50 border border-gray-200 p-6 w-[100%] lg:w-60 ${className} hover:shadow-md transition`}>
      {/* Percentage Display */}

      {
        svgImage ? 
        <div className="mb-4">
          {svgImage}
        </div> :
        <div>
          <div className="mb-4">
            <span className="text-2xl font-semibold text-[#004085]">
              {percentage}%
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-[#004085] h-2 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>
      }
      
      {/* Title */}
      <p className="text-[14px] font-semibold text-[#757575]">
        {title}
      </p>
    </div>
  );
};

export default DashCard