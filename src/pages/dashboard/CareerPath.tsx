import { useEffect, useState } from "react";
// import Construction from '../../assets/dashboard/images/construction.png'
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useAuth } from "../../contexts/useAuth";
import RecommendationResults from "../../components/dashboard/Pathway/RecommendationResults";
import CourseList from "../../components/CareerPathway/CourseList";
import Other from "../../components/CareerPathway/Other";
import ExplorePath from "../../components/CareerPathway/ExplorePath";
import { upDateUserProfile } from "../../services/auth.service";
import { getCareerPath } from "../../services/utils";

export default function CareerPath() {
  const { setPageDesc, token, user } = useAuth();
  const [courseFilter, setCourseFilter] = useState("");
  const [viewState, setViewState] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [explorePath, setExplorePath] = useState("");
  const [careerPath, setCareerPath] = useState<any>(null);

  const navigate = useNavigate();

  const handlegGetCareerPath = async () => {
    try {
      const response = await getCareerPath();
      console.log("handlegGetCareerPath: ", response);
      if (response.ok) {
        setCareerPath(response.data);
      }
    } catch (err: any) {
      console.log("error: ", err);
    }
  };

  useEffect(() => {
    setPageDesc({
      desc: "Here’s a list of career pathway for you.",
      title: "Career Pathway",
    });

    if (!user?.isCareerPathChecked) {
      updateUser();
    }

    handlegGetCareerPath();
  }, []);

  const handleNav = () => {
    if (viewState === 0) {
      navigate(-1);
    } else {
      setViewState(0);
    }
  };

  const updateUser = async () => {
    const updateData = {
      isCareerPathChecked: true,
    };
    try {
      const response = await upDateUserProfile(updateData, token as string);
      return response;
    } catch (error) {
      console.error("Error updating user profile", error);
    }
  };

  const renderState = () => {
    switch (viewState) {
      case 0:
        return (
          <RecommendationResults
            setExplorePath={setExplorePath}
            setViewState={setViewState}
          />
        );
      case 1:
        return (
          <Other
            setViewState={setViewState}
            setCourseFilter={setCourseFilter}
            showDetails={showDetails}
            setShowDetails={setShowDetails}
          />
        );
      case 2:
        return (
          <CourseList
            courseFilter={courseFilter}
            setShowDetails={setShowDetails}
            showDetails={showDetails}
          />
        );
      case 3:
        return (
          <ExplorePath
            setViewState={setViewState}
            careerPath={careerPath}
            explorePath={explorePath}
          />
        );
      default:
        return (
          <RecommendationResults
            setExplorePath={setExplorePath}
            setViewState={setViewState}
          />
        );
    }
  };

  return (
    <div>
      <div className="w-full h-full p-5">
        {!showDetails && (
          <button
            onClick={handleNav}
            className="flex gap-x-[10px] items-center"
          >
            <FaArrowLeftLong className="text-[#004085]" />
            <p className="text-[#004085]">Back to Explore</p>
          </button>
        )}
        {renderState()}
      </div>

      <div className="h-[70px] w-[30px]"></div>
    </div>
  );
}
