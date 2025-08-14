
import { useEffect, useState } from 'react';
// import Construction from '../../assets/dashboard/images/construction.png'
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useAuth } from '../../contexts/useAuth';
import RecommendationResults from '../../components/dashboard/Pathway/RecommendationResults';
import CourseList from '../../components/CareerPathway/CourseList';
import Other from '../../components/CareerPathway/Other';
import { upDateUserProfile } from '../../services/auth.service';


export default function CareerPath() {
  const {setPageDesc, token} = useAuth()
  const [courseFilter, setCourseFilter] = useState("")
  const [viewState, setViewState] = useState(0);
  const [showDetails, setShowDetails] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    setPageDesc({
      desc: "Here’s a list of career pathway for you.",
      title: "Career Pathway"
    })
    updateUser();
  }, [])


  const handleNav = () => {
    if (viewState === 0) {
      navigate(-1)
    } else {
      setViewState((prev) => prev - 1);
    }
  }

  const updateUser = async () => {
    const updateData = {
      isCareerPathChecked: true
    }
    try {
      const response = await upDateUserProfile(
        updateData,
        token as string,
      );
      console.log("response: ", response)

    } catch (error) {
      
      console.error("Error updating user profile", error);
    } 
  }

  const renderState = () => {
    switch (viewState) { 
      case 0:
        return <RecommendationResults setViewState={setViewState} />;
      case 1:
        return <Other setViewState={setViewState} setCourseFilter={setCourseFilter} showDetails={showDetails} setShowDetails={setShowDetails} />;  
      case 2:
        return <CourseList courseFilter={courseFilter} setShowDetails={setShowDetails} showDetails={showDetails} />;  
      default:
        return <RecommendationResults setViewState={setViewState} />;  
    }
  }

  return (
    <div>
      <div className="w-full h-full p-5">
        {
          !showDetails &&         
          <button onClick={handleNav} className="flex gap-x-[10px] items-center">
            <FaArrowLeftLong className="text-[#004085]" />
            <p className="text-[#004085]">Back to Explore</p>
          </button>
        }
        {
          renderState()
        }
      </div>

      <div className='h-[70px] w-[30px]'></div>
    </div>
  );
}
