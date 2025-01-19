import {useState} from 'react'

import {  FiChevronDown,  } from 'react-icons/fi'
import { IconType } from 'react-icons';

interface Values {
  value: string;
  onchange: ()=>  void;
}

interface Props {
  // setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  label: string
  Icon: IconType
  values: Values[]
}

export default function CreateSchoolDropDown({
  // setShowModal,
  label,
  Icon, 
  values
}:Props) {
  const [isOpen, SetIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <div
        onClick={() => SetIsOpen(!isOpen)}
        className="flex items-center justify-center gap-2 cursor-pointer bg-[#004085] text-[#ffffff] py-2 rounded-lg"
      >
        <Icon />
        <span>{label}</span>
        <FiChevronDown />
      </div>
      {isOpen && (
        <div className="absolute mt-2 bg-[#000000] w-full border border-gray-200 rounded-xl shadow-md">
          <ul className="[&>li]:text-[#FFFFFF] [&>li]:text-left [&>li]:font-medium [&>li]:cursor-pointer p-5 space-y-2">
            {values.map((value, index)=> (
              <li onClick={()=> value.onchange()} className='w-full' key={index}>{value.value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
