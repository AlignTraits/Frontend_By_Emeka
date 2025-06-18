import { SlGraph } from "react-icons/sl";

const recommendations = new Array(8).fill({
  title: "Business Intelligence Specialist",
  description: "Explore path",
});

export default function RecommendationResults() {
  return (
    <div className="w-full max-w-2xl mx-auto mt-[50px] bg-white border-[1px] border-[#ccc] shadow-md rounded-xl p-6">
      <h2 className="text-lg font-semibold text-[#101828] mb-6 flex items-center">
        <SlGraph className="mr-[10px] font-bold h-8 w-8" />
        Recommendation Survey Results
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="bg-white cursor-pointer border border-gray-100 shadow-sm rounded-lg p-4 hover:shadow-md transition"
          >
            <h3 className="text-[16px] font-bold text-[#212529] mb-1">
              {rec.title}
            </h3>
            <p className="text-[14px] text-[#757575] font-semibold cursor-pointer hover:underline">
              {rec.description}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button className="bg-[#004085] hover:bg-blue-800 text-white font-medium py-4 px-5 rounded-2xl transition">
          Get course recommendation
        </button>
      </div>
    </div>
  );
}
