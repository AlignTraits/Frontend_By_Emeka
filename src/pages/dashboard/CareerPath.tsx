import { useEffect, useRef, useState } from "react";
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

  // Tracks whether we've already pushed a history entry for "inside the
  // flow" (viewState !== 0), so we only ever push one extra entry no
  // matter how many times the user moves between the non-zero views.
  const pushedHistoryEntry = useRef(false);

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

  // Whenever we step into the flow (viewState leaves 0), add one history
  // entry (same URL, no visible navigation) so the browser/OS back button
  // has something local to consume instead of jumping straight past the
  // whole feature. Stepping back to 0 resets the flag so the next entry
  // works the same way.
  useEffect(() => {
    if (viewState !== 0 && !pushedHistoryEntry.current) {
      window.history.pushState(
        { careerPathwayStep: viewState },
        "",
        window.location.pathname,
      );
      pushedHistoryEntry.current = true;
    }

    if (viewState === 0) {
      pushedHistoryEntry.current = false;
    }
  }, [viewState]);

  // Catches the physical/OS back button (and back gestures). If we're
  // inside the flow, treat it exactly like clicking "Back to Explore" —
  // return to the results view. If we're already at the results view,
  // do nothing here and let the browser continue its normal back
  // navigation out of this page.
  useEffect(() => {
    const onPopState = () => {
      if (viewState !== 0) {
        setViewState(0);
        setShowDetails(false);
        pushedHistoryEntry.current = false;
      }
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [viewState]);

  // Both the in-app button and the physical back button now go through
  // real browser history, so there's a single source of truth and no
  // stale/orphaned history entries left behind.
  const handleNav = () => {
    navigate(-1);
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
