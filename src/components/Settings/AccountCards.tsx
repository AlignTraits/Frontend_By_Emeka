
import React from 'react';
import { BsPerson } from "react-icons/bs";

interface AccountCardsProps {
  title: string;
  desc: string;
  textTwo: string;
}

const AccountCards = ({title, desc,textTwo, children}:AccountCardsProps & { children?: React.ReactNode }) => {
  return (
    <div className={`h-[240px] w-[33%] bg-white cursor-pointer flex flex-col justify-between rounded-xl shadow-lg shadow-gray-200/50 border border-gray-200 p-6 w-64  hover:shadow-md transition`}>
      <div className='flex justify-between items-center'>
        <p className='text-[#101828] text-[16px] font-normal'>{title}</p>
        <BsPerson className='text-[#757575] h-5 w-5' />
      </div>

      <div>
        {children}
        <p className='text-[12px] text-[#757575] mt-2'>{desc}</p>
      </div>

      <button className="bg-[#EEECEC] w-[200px] h-[50px] text-[#000000] font-semibold text-[16px] flex justify-center items-center rounded-2xl">
        {textTwo}
      </button>
    </div>
  );
};

export default AccountCards