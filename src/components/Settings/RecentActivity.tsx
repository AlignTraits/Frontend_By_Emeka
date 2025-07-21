

const RecentActivity = () => {
  return (
    <div className='border-[1px] border-[#EAECF0] shadow-md rounded-xl h-[250px] w-[100%] lg:w-[100%] p-4'>
      <div>
        <p className="text-[#212529] text-[18px] font-bold">Recent Activity</p>
        <p className='text-[12px] text-[#757575] mt-2'>Your latest account activities</p>
      </div>

      <div className="mt-5 flex flex-col gap-y-[15px]">
        <div className="flex justify-between items-center h-[35px]">
          <p className="text-[#212529] text-[14px] font-bold">Profile Update</p>
          <p className='text-[12px] text-[#757575] font-semibold'>2 days ago</p>
        </div>

        <div className="flex justify-between items-center h-[35px]">
          <p className="text-[#212529] text-[14px] font-bold">WAEC record added</p>
          <p className='text-[12px] text-[#757575] font-semibold'>1 week ago</p>
        </div>

        <div className="flex justify-between items-center h-[35px]">
          <p className="text-[#212529] text-[14px] font-bold">Password changed</p>
          <p className='text-[12px] text-[#757575] font-semibold'>30 days ago</p>
        </div>
      </div>
    </div>
  )
}

export default RecentActivity