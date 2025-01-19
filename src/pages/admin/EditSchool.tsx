import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getSchool } from "../../services/schools";
import { School } from "../../services/schools";
// import { Form } from "./CreateCourse";
import CreateSchoolDropDown from "../../components/Admin/CreateSchoolDropDown";
import { FiEdit } from "react-icons/fi";
import { EditCourseCard } from "../../components/Admin/EditCourseCard";
import Skeleton from "react-loading-skeleton";
import { ClipLoader } from "react-spinners";
import DeleteSchoolModal from '../../components/Admin/DeleteSchoolModal'
import { Course } from "../../types/course.types";

interface school extends School {
  courses: Course[];
}

export default function EditSchool() {
  const id = new URLSearchParams(useLocation().search).get("id");
  const [school, setSchool] = useState<school>();
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState(false)

  console.log(id);
  useEffect(() => {
   
      async function get() {
        const response = await getSchool(id as string);
        console.log(response);
        setSchool(response);
        setIsLoading(false);
     
    } 
    get();
  }, [id]);
  return (
    <>
      {isLoading ? (
        <div className="flex w-full justify-center items-center">
          <ClipLoader />
        </div>
        
      ) : (
        <div>
          <div className="flex gap-10">
            <div className="rounded-full w-60 h-60">
              {isLoading ? (
                <Skeleton
                  circle={true}
                  height={240}
                  width={240}
                  className="bg-[#FAFAFA]"
                />
              ) : (
                <img
                  src={school?.logo}
                  alt={`AlignTrait School ${school?.name} Logo`}
                  className="w-full h-full rounded-full"
                />
              )}
            </div>
            <div className="[&>p]:text-[#787878] [&>p]:text-[16px] space-y-2 my-auto">
              <h2 className="text-[#000000] font-bold text-[24px] capitalize">
                {isLoading ? <Skeleton width={200} /> : school?.name}
              </h2>
              <p className="capitalize">
                {isLoading ? (
                  <Skeleton width={150} />
                ) : (
                  school?.schoolType.split("_").join(" ").toLocaleLowerCase()
                )}
              </p>
              <p>{isLoading ? <Skeleton width={100} /> : school?.location}</p>
              <p>
                {isLoading ? (
                  <Skeleton width={50} />
                ) : (
                  `${school?.courses.length} courses`
                )}
              </p>
              <p>
                {isLoading ? (
                  <Skeleton width={150} />
                ) : (
                  "17,000 accounts applied"
                )}
              </p>
              <div className="w-[80%]">
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <CreateSchoolDropDown
                    label="Edit School"
                    Icon={FiEdit}
                    values={[
                      {
                        onchange: () => console.log("edit"),
                        value: "Edit School",
                      },
                      {
                        onchange: () => setModal(true),
                        value: "Delete School",
                      },
                    ]}
                  />
                )}
              </div>
            </div>
          </div>
          <div>
            <div>
              {/* <ul>
            <li>All Courses</li>
            <li>Scholarship</li>

          </ul> */}
            </div>
            {isLoading ? (
              <Skeleton count={3} height={100} />
            ) : (
              <div className="grid grid-cols-3 gap-5">
                {school?.courses.map((course, index) => (
                  <EditCourseCard
                    course={course}
                    key={index}
                    onEdit={(course) => console.log("Edit course:", course)}
                    onDelete={(course) => console.log("Delete course:", course)}
                    schoolLogo={school.logo}
                    schoolName={school.name}
                  />
                ))}
              </div>
            )}
          </div>
          {modal && <DeleteSchoolModal schoolName={school?.name as string} setShowModal={setModal} schoolId={id as string}/>}
        </div>
      )}
      
    </>
  );
}
