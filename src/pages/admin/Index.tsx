
// import AccountIcon from "../../assets/admin/icons/adminImage.png";
// import {  FiUser } from "react-icons/fi";
// import { useAuth } from "../../contexts/useAuth";
import DashboardCard from "../../components/Admin/DashboardCard";
import { RiSchoolLine } from "react-icons/ri";
import { MdOutlineReceiptLong } from "react-icons/md";
import { IoMdStats } from "react-icons/io";


export default function Index() {
  // const {admin} = useAuth()

  
  return (
    <div className="flex h-screen">
      
      <div className="h-[170px] flex gap-2 border-b border-[#EAECF0] py-[20px]">
        <DashboardCard 
          percentType={true} 
          bgColor="#E8FBF5" 
          percentValue={8} 
          title="Total Schools" 
          Icon={RiSchoolLine} 
        />

        <DashboardCard 
          percentType={true} 
          bgColor="#FFFADF" 
          percentValue={10} 
          title="Total Courses" 
          Icon={MdOutlineReceiptLong} 
        />
        <DashboardCard 
          percentType={false} 
          bgColor="#FFEBEB" 
          percentValue={15} 
          title="Total Students" 
          Icon={IoMdStats} 
        />
        <DashboardCard 
          percentType={false} 
          bgColor="#EFECFF" 
          percentValue={15} 
          title="Total Loans" 
          Icon={MdOutlineReceiptLong} 
        />
      </div>
    </div>
  );
}
