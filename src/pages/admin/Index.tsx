import { useState, useEffect } from "react";
import DashboardCard from "../../components/Admin/DashboardCard";
import { RiSchoolLine } from "react-icons/ri";
import { MdOutlineReceiptLong } from "react-icons/md";
import { IoMdStats } from "react-icons/io";
// import CustomSelect from "../../components/dashboard/CustomSelect";
import { MdFilterList } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
// import { School } from "../../services/schools";

import countriesData from "../../data/countries_states.json"

import { getSchoolsByLocation, getSchools, getCourses } from "../../services/schools";
import { useAuth } from "../../contexts/useAuth";


// Define TypeScript types
type Country = {
  name: string;
  states: string[];
};

export default function Index() {
  // State to store selected country and states
  const {token} = useAuth()
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [states, setStates] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string>("")
  const [schoolList, setSchoolList] = useState<string[]>([])
  const [selectedSchool, setSelectedSchool] = useState<string>("")
  const [schoolLength, setSchoolLength] = useState<number>(0)
  const [courseLength, setCourseLength] = useState<number>(0)

  // Load countries from JSON on mount
  useEffect(() => {
    setCountries(countriesData);
    getAllSchools()
    getAllCourses()
  }, []);

  // Handle country change
  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const countryName = event.target.value;
    setSelectedCountry(countryName);

    // Find the selected country's states
    const country = countries.find((c) => c.name === countryName);
    setStates(country ? country.states : []);
    setSelectedState(""); // Reset state selection
    setSchoolList([])
  };

  console.log("selectedSchool: ", selectedSchool)

  const handleGetSchools = async () => {
    const schoolsInLocationList = await getSchoolsByLocation(selectedState)
    
    if (schoolsInLocationList.length > 0) {
      let tempList:string[] = []
      schoolsInLocationList.map((elem:any) => {
        tempList.push(elem.name)
      })
      setSchoolList([...tempList])
    }
  }

  useEffect(() => {
    if (selectedState.length > 0) {
      handleGetSchools()
    }
  }, [selectedState])


  const getAllSchools = async () => {
    try {
      let reponse = await getSchools(token || "")
      setSchoolLength(reponse.length)

    } catch (error) { 
      setSchoolLength(0)
      console.error("Error fetching schools:", error);
    }
  }

  const getAllCourses = async () => {
    try {
      let response = await getCourses(token || "")
      setCourseLength(response.length)
    } catch (error) { 
      console.error("Error fetching courses:", error);
    } 
  }


  
  
  return (
    <div className="flex h-screen flex-col gap-y-[20px] p-5">
      
      <div className="h-[170px] w-full flex justify-between border-b border-[#EAECF0] py-[20px]">
        <DashboardCard 
          percentType={true} 
          bgColor="#E8FBF5" 
          percentValue={0} 
          title="Total Schools" 
          Icon={RiSchoolLine} 
          value={schoolLength}
        />

        <DashboardCard 
          percentType={true} 
          bgColor="#FFFADF" 
          percentValue={0} 
          title="Total Courses" 
          value={courseLength}
          Icon={MdOutlineReceiptLong} 
        />
        <DashboardCard 
          percentType={false} 
          bgColor="#FFEBEB" 
          percentValue={0} 
          title="Total Students" 
          Icon={IoMdStats} 
          value={0}
        />
        <DashboardCard 
          percentType={false} 
          bgColor="#EFECFF" 
          percentValue={0} 
          title="Total Loans" 
          Icon={MdOutlineReceiptLong} 
          value={0}
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-x-[10px] my-[20px]">
          <div className="w-[200px] relative">
            <select
              className="h-[40px] border-[0.8px] border-gray-300 p-2 w-full rounded-md focus:outline-none text-[#999999] text-[14px] font-medium appearance-none"
              value={selectedCountry}
              onChange={handleCountryChange}
            >
              <option value="">All Countries</option>
              {countries.map((country) => (
                <option key={country.name} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <FiChevronDown />
            </div>
          </div>

          <div className="w-[200px] relative">
            <select
              className="h-[40px] border-[0.8px] border-gray-300 p-2 w-full rounded-md focus:outline-none text-[#999999] text-[14px] font-medium appearance-none"
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value)
                setSchoolList([])
              }}
              disabled={selectedCountry ? false : true}
            >
              <option value="">All Regions</option>
              {states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <FiChevronDown />
            </div>
          </div>

          <div className="w-[200px] relative">
            <select
              className="h-[40px] border-[0.8px] border-gray-300 p-2 w-full rounded-md focus:outline-none text-[#999999] text-[14px] font-medium appearance-none"
              value={selectedState}
              onChange={(e) => {
                setSelectedSchool(e.target.value)
              }}
              disabled={selectedCountry ? false : true}
            >
              <option value="">All Schools</option>
              {schoolList.map((school, index) => (
                <option key={index} value={school}>
                  {school}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <FiChevronDown />
            </div>
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
        <div className="flex flex-col gap-y-[10px] w-[50%]">
          <p className="text-[#000000] text-[16px] font-bold">Top Loan Application Schools</p>
          <div className="w-[100%] rounded-lg border-[0.8px] 
            border-gray-300 h-[300px] flex justify-center items-center">
            <p className="text-[#737373] text-[14px] font-semibold">There was no data found for this data range</p>
          </div>
        </div>

        <div className="flex flex-col gap-y-[10px] w-[50%]">
          <p className="text-[#000000] text-[16px] font-bold">Loan Application by Region</p>
          <div className="w-[100%] rounded-lg border-[0.8px] 
            border-gray-300 h-[300px] flex justify-center items-center">
            <p className="text-[#737373] text-[14px] font-semibold">There was no data found for this data range</p>
          </div>
        </div>

      </div>

    </div>
  );
}
