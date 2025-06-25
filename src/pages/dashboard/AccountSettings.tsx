import { useEffect } from 'react';
import { useAuth } from '../../contexts/useAuth';
import AccountCards from '../../components/Settings/AccountCards';
import RecentActivity from '../../components/Settings/RecentActivity';
import QuickActions from '../../components/Settings/QuickActions';

export default function AccountSettings() {
  const {setPageDesc} = useAuth()

  useEffect(() => {
    setPageDesc({
      desc: "Manage your profile, academic records, and security settings.",
      title: "Account settings"
    })
  }, [])

  return (
    <div className='py-10 px-5'>
      <div className='flex justify-between gap-[10px]'>
        <AccountCards textTwo="Update Profile" title='Profile Completion' desc='Complete your profile for better recommendations'>
          <p className='text-[#212529] text-[18px] font-bold'>85%</p>
        </AccountCards>

        <AccountCards textTwo="Manage Records" title='Academic Records' desc='Records uploaded'>
          <p className='text-[#212529] text-[18px] font-bold'>3</p>
        </AccountCards>

        <AccountCards textTwo="Security Settings" title='Account Security' desc='Last password change: 30 days ago'>
          <p className='text-[#17B26A] text-[18px] font-bold'>Secure</p>
        </AccountCards>
      </div>

      <div className='flex justfy-between gap-[20px] mt-10'>
        <RecentActivity />

        <QuickActions />
      </div>
    </div>
  );
}
