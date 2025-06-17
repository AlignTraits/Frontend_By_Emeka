import { useEffect } from 'react';
import Construction from '../../assets/dashboard/images/construction.png'
import { useAuth } from '../../contexts/useAuth';



export default function SkillRoadMap() {
    const {setPageDesc} = useAuth()
  
    useEffect(() => {
      setPageDesc({
        desc: "Welcome",
        title: "Skills Road Map"
      })
    })

  return (
    <div className="h-[90dvh]">
      <div className="flex items-center justify-center w-full h-full">
        <div>
          <img src={Construction} alt="" />
        </div>
      </div>
    </div>
  );
}
