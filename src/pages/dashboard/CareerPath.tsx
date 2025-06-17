
import { useEffect } from 'react';
import Construction from '../../assets/dashboard/images/construction.png'
import { useAuth } from '../../contexts/useAuth';


export default function CareerPath() {
  const {setPageDesc} = useAuth()

  useEffect(() => {
    setPageDesc({
      desc: "Here’s a list of career pathway for you.",
      title: "Career Pathway"
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
