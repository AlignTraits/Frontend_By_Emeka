import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import CustomSelectWithProps from "../components/dashboard/CustomSelectWithProps";
import { IoIosRefresh } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import CourseCard from "../components/dashboard/CourseCard";
import countriesData from "../data/countries_states.json"

const TAB_NAV = ["Programs", "Scholarship Opportunities", "STEM", "Business & Management", "IT & Computer Science",
  "Health & Medicine", "Law & Legal Studies", "Engineering",
]

const scholarshipList = ["No Scholarship", "Partial Scholarship", "Full Scholarship"]

// Define TypeScript types
type Country = {
  name: string;
  states: string[];
};


export default function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchAllTerm, setSearchAllTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [stateSearchTerm, setStateSearchTerm] = useState<string>("");
  const [stateDropdownOpen, setStateDropdownOpen] = useState<boolean>(false);
  const stateDropdownRef = useRef<HTMLDivElement>(null);
  const [fieldStudy, setFieldStudy] = useState("")
  const [scholarshipOptions, setScholarshipOptions] = useState("")

    // State to store selected country and states
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [states, setStates] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string>("")

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setDropdownOpen(true); // Open the dropdown when typing
  };


  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCountrySelect = (countryName: string) => {
    setSelectedCountry(countryName);
    setSearchTerm(countryName); // Set the search term to the selected country
    const countryData = countries.find((c) => c.name === countryName);
    setStates(countryData ? countryData.states : []);
    setSelectedState(""); // Reset state selection
    setStateSearchTerm("")
    setDropdownOpen(false); // Close the dropdown
  };

  const filteredStates = states.filter((state) =>
    state.toLowerCase().includes(stateSearchTerm.toLowerCase())
  );

  const handleStateSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStateSearchTerm(event.target.value);
    setStateDropdownOpen(true); // Open the dropdown when typing
  };
  
  const handleStateSelect = (stateName: string) => {
    setSelectedState(stateName);
    setStateSearchTerm(stateName); // Set the search term to the selected state
    setStateDropdownOpen(false); // Close the dropdown
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        stateDropdownRef.current &&
        !stateDropdownRef.current.contains(event.target as Node)
      ) {
        setStateDropdownOpen(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // console.log("endDate: ", endDate, " startDate: ", startDate)

  // Load countries from JSON on mount
  useEffect(() => {
    setCountries(countriesData);
  }, []);



  const resetFilter = () => {
    setStates([])
    setSelectedState("")
    setStateSearchTerm("")
    setSelectedCountry("")
    setSearchTerm("")
    setFieldStudy("")
    setScholarshipOptions("")
  }

  const [activeTab, setActiveTab] = useState("tab1");


  const goLogin = () => {
    navigate("/admin/login")
  }
  return (
    <div className="relative h-screen w-full bg-[#FCFCFD]">
      <div className="flex justify-between p-5 border-b border-b-[#DDDDDD]">
        <div>
          <h1 className="text-[20px] font-semibold text-[#101828]">Welcome to Aligntraits</h1>
          <p className="text-[12px] font-normal text-[#999999]">Find your career path today!</p>
        </div>

        <div className="flex gap-x-[20px]">
          <div className="relative w-[550px] h-[40px]">
            <input
              type="text"
              placeholder="Search"
              value={searchAllTerm}
              onChange={(e) => setSearchAllTerm(e.target.value)}
              className="w-full py-2 px-10 rounded-md font-semibold border-[1px] border-[#DDDDDD] focus:outline-none focus:border-[#757575] text-[14px] font-[400] text-[#8F8F8F]"
            />
            <FiSearch className="absolute left-2 top-[20px] -translate-y-1/2 text-[#999999] w-5 h-5" />
          </div>

          <button className="bg-[#004085] h-[40px] w-[180px] font-semibold text-[12px] text-[white] rounded-md">
            Career Recommendation
          </button>

          <button onClick={goLogin} className="bg-[#F6C648] h-[40px] w-[70px] font-semibold text-[12px] text-[#1E1E1E] rounded-md">
            Login
          </button>
        </div>
      </div>

      <div className="flex border-b border-b-[#EAECF0] px-[20px] mt-[20px]">
        {TAB_NAV.map((tab, index) => {
          const tabKey = `tab${index + 1}`;
          return (
            <button
              key={tabKey}
              className={`py-2 px-4 text-[12px] font-semibold border-b-2 font-medium transition 
                ${
                  activeTab === tabKey
                    ? "border-[#003064] text-[#004085] text-[12px] font-semibold"
                    : "border-transparent hover:text-blue-500 text-[#999999]"
                }`}
              onClick={() => setActiveTab(tabKey)}
            >
              {tab}
            </button>
          );
        })}
      </div>


      <div className="flex justify-between items-center px-[20px] border-b border-b-[#DDDDDD] pb-[10px]">
        <div className="flex gap-x-[10px] my-[20px]">

          <div className="w-200px">
            <CustomSelectWithProps
              placeholder="Field Of Study"
              classNameStyle="h-[35px]"
              options={["Test"].map((typeValue) => ({
                value: typeValue,
                label: typeValue,
              }))}
              onChange={(val) => setFieldStudy(val)}
              selectedProps={{
                value: fieldStudy,
                label: fieldStudy,
              }}
              handleError={() => {}}
            />
          </div>

          <div className="w-[200px] relative" ref={dropdownRef}>
            <IoIosArrowDown className="absolute top-[25%] right-[10px] text-[#999999]" />
            <input
              type="text"
              className="h-[35px] border-[0.8px] border-gray-300 p-2 w-full rounded-md focus:outline-none text-[#999999] text-[14px] font-medium"
              placeholder="Country"
              value={searchTerm}
              onFocus={() => setDropdownOpen(true)} // Open dropdown on focus
              onChange={handleSearchChange}
            />
              {dropdownOpen && (
                <div className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 max-h-[150px] overflow-y-auto z-10">
                  {filteredCountries.map((country) => (
                    <div
                      key={country.name}
                      className={`p-2 cursor-pointer hover:bg-gray-100 ${
                        selectedCountry === country.name ? "bg-gray-200" : ""
                      }`}
                      onClick={() => handleCountrySelect(country.name)}
                    >
                      {country.name}
                    </div>
                  ))}
                  {filteredCountries.length === 0 && (
                    <div className="p-2 text-gray-500">No countries found</div>
                  )}
                </div>
              )}
          </div>

          <div className="w-[200px] relative" ref={stateDropdownRef}>
            <IoIosArrowDown className="absolute top-[25%] right-[10px] text-[#999999]" />
            <input
              type="text"
              className="h-[35px] bg-[white] border-[0.8px] border-gray-300 p-2 w-full rounded-md focus:outline-none text-[#999999] text-[14px] font-medium"
              placeholder="Region"
              value={stateSearchTerm}
              onFocus={() => setStateDropdownOpen(true)} // Open dropdown on focus
              onChange={handleStateSearchChange}
              disabled={!selectedCountry} // Disable if no country is selected
            />
            {stateDropdownOpen && (
              <div className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 max-h-[150px] overflow-y-auto z-10">
                {filteredStates.map((state, index) => (
                  <div
                    key={index}
                    className={`p-2 cursor-pointer hover:bg-gray-100 ${
                      selectedState === state ? "bg-gray-200" : ""
                    }`}
                    onClick={() => handleStateSelect(state)}
                  >
                    {state}
                  </div>
                ))}
                {filteredStates.length === 0 && (
                  <div className="p-2 text-gray-500">No states found</div>
                )}
              </div>
            )}
          </div>

          <div className="w-200px">
            <CustomSelectWithProps
              placeholder="Scholarship Options"
              classNameStyle="h-[35px]"
              options={scholarshipList.map((typeValue) => ({
                value: typeValue,
                label: typeValue,
              }))}
              onChange={(val) => setScholarshipOptions(val)}
              selectedProps={{
                value: scholarshipOptions,
                label: scholarshipOptions,
              }}
              handleError={() => {}}
            />
          </div>

          <button 
            onClick={resetFilter}
            type="button" 
            className="w-[150px] bg-[white] text-[#999999] text-[14px] font-medium py-2 h-[35px] p-2 border border-gray-300 rounded-md
                outline-0 focus:outline-none flex justify-center items-center gap-x-[10px]"
            >
            <p>Clear Filters</p>
            <IoIosRefresh className="w-4 h-4"  />
          </button>

        </div>

      </div>
      

      <div className="p-5">
        <CourseCard />
      </div>
      
    </div>
  );
} 
