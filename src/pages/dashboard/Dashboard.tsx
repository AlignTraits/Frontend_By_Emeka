import { useEffect } from "react";

import { useAuth } from "../../contexts/useAuth";
import { useNavigate } from "react-router-dom";
import DashCard from "../../components/dashboard/DashCard";
import roadSign from "../../assets/roadSign.svg"
import historyIcon from "../../assets/dashHistoryIcon.svg"

export default function Dashboard() {
  const { setPageDesc} = useAuth()
  const navigate = useNavigate()
  
  useEffect(() => {
    setPageDesc({
      desc: "Here’s a summary  of your personalized career data!",
      title: "Dashboard"
    })
  }, [])

  // if(isLoading) return <div className="flex w-full h-[90dvh] justify-center items-center"><ClipLoader /></div>

  return (

    <div className="bg-[white] px-10 py-10 xl:px-[4rem] xl:pr-[2rem]">
      <div className="container mx-auto flex justify-between w-[90%]">
        <DashCard percentage={0} />
        <DashCard percentage={0} title="Recommended pathway" svgImage={<img src={roadSign} alt="Pathway" />} />
        <DashCard percentage={10} title="Activity History" svgImage={<img src={historyIcon} alt="Pathway" />}  />
      </div>

      <div className="mt-[70px] mx-auto flex flex-col items-center gap-y-[10px]">
        <p className="text-[16px] font-semibold text-[#757575]">
          Take Quiz
        </p>
        <button onClick={() => navigate("/career-recommedation")} className="bg-[#004085] h-[40px] w-[180px] font-semibold text-[12px] text-[white] rounded-md">
          Career Recommendation
        </button>
      </div>
    </div>
  );
}
