import React from "react"
import { SlGraph } from "react-icons/sl";
import { useAuth } from '../../../contexts/useAuth';

// const recommendations = new Array(8).fill({
//   title: "Business Intelligence Specialist",
//   description: "Explore path",
// });

interface RecommendationProps {
  setViewState: React.Dispatch<React.SetStateAction<number>>;
}

export default function RecommendationResults({setViewState}: RecommendationProps) {
  const { user } = useAuth();

  console.log("user: ", user);

  return (
    <div className="w-full max-w-2xl mx-auto mt-[50px] bg-white border-[1px] border-[#ccc] shadow-md rounded-xl p-6">
      <h2 className="text-lg font-semibold text-[#101828] mb-6 flex items-center">
        <SlGraph className="mr-[10px] font-bold h-8 w-8" />
        Recommendation Survey Results
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {user?.careerResults?.recommendedCareers && user.careerResults.recommendedCareers.map((rec: string, index:number) => (
          <div
            key={index}
            className="bg-white cursor-pointer border border-gray-100 shadow-sm rounded-lg p-4 hover:shadow-md transition"
          >
            <h3 className="text-[12px] font-bold text-[#212529] mb-1">
              {rec}
            </h3>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button onClick={() => setViewState(1)} className="bg-[#004085] hover:bg-blue-800 text-white font-medium py-4 px-5 rounded-2xl transition">
          Get course recommendation
        </button>
      </div>
    </div>
  );
}
