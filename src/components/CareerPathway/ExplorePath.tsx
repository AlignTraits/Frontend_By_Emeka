import { CircleCheck, Sparkles, CircleAlert, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ExplorePathProps {
  careerPath: any;
  explorePath: string;
  setViewState: React.Dispatch<React.SetStateAction<number>>;
}

const traitColors: Record<string, string> = {
  agreeableness: "bg-blue-400",
  conscientiousness: "bg-amber-400",
  extraversion: "bg-emerald-400",
  openness: "bg-sky-400",
  neuroticism: "bg-rose-400",
};

const ExplorePath = ({
  careerPath,
  explorePath,
  setViewState,
}: ExplorePathProps) => {
  const navigate = useNavigate();

  const testObj = careerPath.richRecommendations.find(
    (course: any) => course.career === explorePath,
  );

  const {
    agreeableness = 0,
    conscientiousness = 0,
    extraversion = 0,
    openness = 0,
    neuroticism = 0,
    career = "Career",
    // matchScore = 0,
    personalityNarrative = "",
    positiveTraits = [],
    negativeTraits = [],
  } = testObj || {};

  const personality = [
    { key: "Agreeableness", value: agreeableness, id: "agreeableness" },
    {
      key: "Conscientiousness",
      value: conscientiousness,
      id: "conscientiousness",
    },
    { key: "Extraversion", value: extraversion, id: "extraversion" },
    { key: "Openness", value: openness, id: "openness" },
    { key: "Neuroticism", value: neuroticism, id: "neuroticism" },
  ];

  const handleClick = () => {
    setViewState(1);
  };

  return (
    <div className="w-full mx-auto p-6 space-y-6">
      <div className="bg-[#EEF2FF] border border-[#BFDBFE] shadow-sm rounded-2xl p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-indigo-50 p-3">
                <Sparkles className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  Your Career Path
                </h3>
                <p className="text-[15px] font-medium text-[#1E3A8A]">
                  {career}
                </p>
              </div>
            </div>

            <div className="mt-4 text-slate-700 text-sm leading-relaxed">
              <p>{personalityNarrative}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#F3F4F6] rounded-2xl p-6">
        <div className="">
          <h4 className="text-[20px] font-bold text-[#111827]">
            Personality Breakdown
          </h4>

          <div className="mt-4 grid grid-cols-1 gap-4">
            {personality.map((t) => (
              <div
                key={t.id}
                className="flex items-center gap-4 border-b last:border-b-0 pb-4"
              >
                <div className="w-36 text-[16px] font-semibold text-[#111827]">
                  {t.key}
                </div>
                <div className="flex-1">
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-3 rounded-full ${
                        traitColors[t.id] || "bg-slate-400"
                      }`}
                      style={{
                        width: `${Math.max(0, Math.min(100, t.value))}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="w-12 text-right text-[14px] font-semi-bold text-[#4A90E2]">
                  {t.value}%
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="text-sm font-semibold text-[#15803D] flex items-center gap-2">
                <CircleCheck className="w-4 h-4 text-[#15803D]" />
                Strengths
              </h5>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {positiveTraits.length ? (
                  positiveTraits.map((p: any, i: number) => (
                    <li
                      key={i}
                      className="flex items-center border border-[#BBF7D0] rounded-md gap-2 bg-[#F0FDF4] h-[60px] px-4"
                    >
                      <span className="text-[#14532D] text-[12px] font-medium">
                        {p}
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="text-slate-400">No positives listed</li>
                )}
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-semibold text-[#C2410C] flex items-center gap-2">
                <CircleAlert className="w-4 h-4 text-[#EA580C]" />
                Areas for growth
              </h5>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {negativeTraits.length ? (
                  negativeTraits.map((n: any, i: number) => (
                    <li
                      key={i}
                      className="flex items-center border border-[#FED7AA] rounded-md gap-2 bg-[#FFF7ED] h-[60px] px-4"
                    >
                      <span className="text-[#7C2D12] text-[12px] font-medium">
                        {n}
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="text-slate-400">No concerns listed</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4 gap-x-[20px]">
        <button
          onClick={handleClick}
          className="h-[40px] bg-[#004085] items-center text-center disabled:opacity-50 hover:bg-blue-800 text-white font-medium py-1 px-5 rounded-lg transition"
        >
          Get Course Recommendation
        </button>

        <button
          onClick={() => navigate("/career-recommedation")}
          className="h-[40px] border border-[#D1D5DB] flex gap-x-[5px] items-center justify-center bg-[white] disabled:opacity-50 text-[#374151] font-medium py-1 px-5 rounded-lg transition"
        >
          <RotateCcw /> <span className="text-[#374151]">Retake</span>
        </button>
      </div>
    </div>
  );
};

export default ExplorePath;
