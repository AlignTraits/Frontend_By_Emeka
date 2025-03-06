import DashboardCard from "../../components/Admin/DashboardCard";
import { RiSchoolLine } from "react-icons/ri";
import { MdOutlineReceiptLong } from "react-icons/md";
import { IoMdStats } from "react-icons/io";
import CustomSelect from "../../components/dashboard/CustomSelect";
import { MdFilterList } from "react-icons/md";

export default function Index() {

  const states = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
  ];

  const schools = [
    "ABC",
    "Kangal",
    "Lenon",
    "Machine",
    "Letro",
  ];

  const countries = [
    "Brazil",
    "England",
    "France",
    "Italy",
    "Germany",
  ];
  
 
  
  return (
    <div className="flex h-screen flex-col gap-y-[20px]">
      
      <div className="h-[170px] size-max flex gap-2 border-b border-[#EAECF0] py-[20px]">
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

      <div className="flex gap-x-[150px] items-center">
        <div className="flex gap-x-[30px] my-[20px]">
          <div className="size-max">
            <CustomSelect
              placeholder="All Regions"
              options={states.map((state) => ({
                value: state,
                label: state,
              }))}
              onChange={(value) => console.log("testing: ", value)}
            />
          </div>

          <div className="size-max">
            <CustomSelect
              placeholder="All Schools"
              options={schools.map((school) => ({
                value: school,
                label: school,
              }))}
              onChange={(value) => console.log("testing: ", value)}
            />
          </div>

          <div className="size-max">
            <CustomSelect
              placeholder="All Countries"
              options={countries.map((country) => ({
                value: country,
                label: country,
              }))}
              onChange={(value) => console.log("testing: ", value)}
            />
          </div>
        </div>

        <button 
          type="button" 
          className="w-[150px] text-white py-2 h-[40px] bg-[#004085] p-2 rounded-md 
             outline-0 focus:outline-none flex justify-center items-center gap-x-[10px]"
          >
          <MdFilterList className="w-6 h-6"  />
          <p>Apply Filters</p>
        </button>
      </div>

      <div className="flex gap-x-[20px]">
        <div className="flex flex-col gap-y-[10px]">
          <p className="text-[#000000] text-[16px] font-bold">Top Loan Application Schools</p>
          <div className="w-[400px] rounded-lg border-[0.8px] 
            border-gray-300 h-[300px] flex justify-center items-center">
            <p className="text-[#737373] text-[14px] font-semibold">There was no data found for this data range</p>
          </div>
        </div>

        <div className="flex flex-col gap-y-[10px]">
          <p className="text-[#000000] text-[16px] font-bold">Loan Application by Region</p>
          <div className="w-[400px] rounded-lg border-[0.8px] 
            border-gray-300 h-[300px] flex justify-center items-center">
            <p className="text-[#737373] text-[14px] font-semibold">There was no data found for this data range</p>
          </div>
        </div>

      </div>

    </div>
  );
}
