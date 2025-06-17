import { useState, useEffect, lazy, Suspense } from "react";
const Courses = lazy(() => import("../../components/dashboard/Courses"));
const LoanCalculator = lazy(
  () => import("../../components/dashboard/LoanCalculator")
);
import { LoadingSkeleton } from "../../components/dashboard/Courses"; 
import { Course } from "../../types/course.types";

import { getCourses } from "../../services/schools";
import { useAuth } from "../../contexts/useAuth";
import { ClipLoader } from "react-spinners";


export default function Dashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {token, setPageDesc} = useAuth()
  
  useEffect(() => {
    setPageDesc({
      desc: "Here’s a summary  of your personalized career data!",
      title: "Dashboard"
    })
  })

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await getCourses(token as string)
        // await new Promise(resolve => setTimeout(resolve, 1500));
        
        // const response = await fetch('/api/courses');
        // const data = await response.json();
        
        setCourses(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [token]);

  if(isLoading) return <div className="flex w-full h-[90dvh] justify-center items-center"><ClipLoader /></div>

  return (

    <div className="min-h-screen bg-[#F7FAFF]  px-10 py-10 xl:px-[4rem] xl:pr-[2rem]">
      <div className="container mx-auto">
        <div className="flex flex-row justify-between relative">
          <Suspense fallback={<LoadingSkeleton />}>
            <Courses courses={courses} isLoading={isLoading} error={error} />
          </Suspense>

          <LoanCalculator />
        </div>
      </div>
    </div>
  );
}
