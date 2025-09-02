import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';
import AccountCards from '../../components/Settings/AccountCards';
import RecentActivity from '../../components/Settings/RecentActivity';
import QuickActions from '../../components/Settings/QuickActions';
import { getAcademicRecords } from "../../services/utils";

export default function AccountSettings() {
  const {setPageDesc, user} = useAuth()
const [dataLenth, setDataLength] = useState(0)
  const navigate = useNavigate()
  const [userObjectFilled, setUserObjectFilled] = useState({
    firstname: false,
    lastname: false,
    region: false,
    email: false,
    gender: false,
    dob: false
  })
  const [profileFiil, setProfileFill] = useState(0)

    const hasFetched = useRef(false);


  useEffect(() => {
    setPageDesc({
      desc: "Manage your profile, academic records, and security settings.",
      title: "Account settings"
    });

    if (!hasFetched.current) {
      getRecords();
      hasFetched.current = true;
    }
    setUserObjectFilled({
      firstname: user?.firstname ? true : false,
      lastname: user?.lastname ? true : false,
      region: user?.region ? true : false,
      email: user?.email ? true : false,
      gender: user?.gender ? true : false,
      dob: user?.dob ? true : false
    })
  }, [])

  useEffect(() => {
    const totalFields = Object.keys(userObjectFilled).length; // 6
    const filledCount = Object.values(userObjectFilled).reduce(
      (acc, val) => acc + (val ? 1 : 0),
      0
    );

    const percentage = (filledCount / totalFields) * 100;
    setProfileFill(percentage)

  }, [userObjectFilled]);


  const getRecords = async () => {
    try {
      const response = await getAcademicRecords();
      setDataLength(response.data.length)

    } catch (err: any) {
      console.log("error: ", err)
    } 
  }

  console.log("user: ", user)

  return (
    <div className='py-10 px-5'>
      <div className='flex flex-col lg:flex-row justify-between gap-[10px]'>
        <AccountCards handleNavigate={() => navigate("/dashboard/settings/profile")} textTwo="Update Profile" title='Profile Completion' desc='Complete your profile for better recommendations'>
          <p className='text-[#212529] text-[18px] font-bold'>${profileFiil}%</p>
        </AccountCards>

        <AccountCards handleNavigate={() => navigate("/dashboard/settings/records")} textTwo="Manage Records" title='Academic Records' desc='Records uploaded'>
          <p className='text-[#212529] text-[18px] font-bold'>{dataLenth}</p>
        </AccountCards>

        <AccountCards handleNavigate={() => navigate("/dashboard/settings/security")} textTwo="Security Settings" title='Account Security' desc='Last password change: 30 days ago'>
          <p className='text-[#17B26A] text-[18px] font-bold'>Secure</p>
        </AccountCards>
      </div>

      <div className='flex flex-col lg:flex-row justfy-between gap-[20px] mt-10'>
        <RecentActivity />

        <QuickActions />
      </div>
    </div>
  );
}
