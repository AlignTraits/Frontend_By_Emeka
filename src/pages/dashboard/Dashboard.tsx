import { useState, useEffect } from "react";
import Courses from "../../components/dashboard/Courses";
import LoanCalculator from "../../components/dashboard/LoanCalculator";
import { Course } from "../../types/course.types";
import { dummyCourses } from "../../data/dummyCourses";

export default function Dashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
      
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // const response = await fetch('/api/courses');
        // const data = await response.json();
        
        setCourses(dummyCourses);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7FAFF]  px-10 py-10 xl:px-[4rem]">
      <div className="container mx-auto">
        <div className="flex flex-row justify-between relative">
          <Courses courses={courses} isLoading={isLoading} error={error} />
          <LoanCalculator />
        </div>
      </div>
    </div>
  );
}
