
import { useEffect, useState } from 'react';
// import Construction from '../../assets/dashboard/images/construction.png'
import { useAuth } from '../../contexts/useAuth';
import RecommendationResults from '../../components/dashboard/Pathway/RecommendationResults';
import CourseList from '../../components/CareerPathway/CourseList';


export default function CareerPath() {
  const {setPageDesc} = useAuth()

  const [showCourse, setShowCourse] = useState(false);

  useEffect(() => {
    setPageDesc({
      desc: "Here’s a list of career pathway for you.",
      title: "Career Pathway"
    })
  }, [])

  return (
    <div>
      <div className="flex items-center justify-center w-full h-full p-5">
        {
          showCourse ? <CourseList /> : <RecommendationResults setShowCourse={setShowCourse} />
        }

      </div>

      <div className='h-[70px] w-[30px]'></div>
    </div>
  );
}
