import { useState } from "react";
import { MdOutlinePerson } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { RiAdminLine } from "react-icons/ri";
import AdminPassword from "../../components/Admin/AdminPassword";
import AdminManagement from "../../components/Admin/AdminManagement";
import PersonalDetails from "../../components/Admin/PersonalDetails";
import { AdminUser } from "../../types/school.types";


const ADMIN_TAB = ["Personal Details", "Password"]

const SUPER_ADMIN_TAB = ["Personal Details", "Password", "Admin Management"]

export default function ProfileManagement () {
  const [activeTab, setActiveTab] = useState("tab1");

  const admin = localStorage.getItem("admin")
  const adminData:AdminUser = admin ? JSON.parse(admin) : null;

  const TAB = adminData.role === "SUPER_ADMIN" ? SUPER_ADMIN_TAB : ADMIN_TAB


  const handleTabChange = (tab:string) => {
    if (tab === "tab1") {
      setActiveTab("tab1")
    } else if (tab === "tab2") {
      setActiveTab("tab2")
    } else if (tab === "tab3") {
      setActiveTab("tab3")
    }
  }

  const tabImage = {
    tab1: <MdOutlinePerson />,
    tab2: <RiLockPasswordLine />,
    tab3: <RiAdminLine />,
  }

  

  return (
    <div className="relative">
      <div className="flex flex-col w-full gap-10 p-5 xl:p-6">
      <div className="flex flex-col gap-y-[5px]">
        <p className="text-[#101828] text-[24px] font-semibold">Profile Management</p>
        <p className="font-normal text-[16px] text-[#737373]">Manage your personal details, security, and admin users.</p>
      </div>

      <div className="flex border-b border-gray-300 w-max">
        {TAB.map((tab, index) => {
          const tabKey = `tab${index + 1}` as keyof typeof tabImage;
          return (
            <button
              key={tabKey}
              className={`py-2 px-4 text-[16px] font-semibold border-b-2 font-medium transition flex items-center gap-x-2 
                ${
                  activeTab === tabKey
                    ? "border-[#003064] text-[#003064] text-[16px] font-semibold"
                    : "border-transparent hover:text-blue-500 text-[#999999]"
                }`}
              onClick={() => 
                handleTabChange(tabKey)
              }
            >
              {tabImage[tabKey]}
              {tab}
            </button>
          );
        })}
      </div>

      {
        activeTab === "tab1" && <PersonalDetails />}
        {activeTab === "tab2" && <AdminPassword />}
        {activeTab === "tab3" && <AdminManagement />  
      }

      </div>
    </div>
  );
}
