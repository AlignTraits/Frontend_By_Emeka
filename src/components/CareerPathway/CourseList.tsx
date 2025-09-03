import { useState, useEffect, useRef, useMemo } from "react";
import { Course } from "../../types/course.types";
import { ClipLoader } from "react-spinners";
import CourseCard from "../dashboard/CourseCard";
import fileIcon from "../../assets/IconWrap.svg"
import { getCoursesWithoutToken } from "../../services/schools";
import Details from "./Details";
import { CiSearch } from "react-icons/ci";

import Papa from 'papaparse';
import CustomSelectWithProps from "../../components/dashboard/CustomSelectWithProps";
import { IoIosRefresh } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import countriesData from "../../data/countries_states.json"
// import { courseCategoryList } from "../../data/courseCategories";


const scholarshipList = ["No Scholarship", "Partial Scholarship", "Full Scholarship"]

// Define TypeScript types
type Country = {
  name: string;
  states: string[];
};



interface Props {
  courseFilter: string;
  showDetails: boolean;
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CourseList({courseFilter, showDetails, setShowDetails}: Props) {
  const [isLoading, setIsLoading] = useState(false)
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

  const [courses, setCourses] = useState<Course[]>([]);
  const [programList, setProgramList] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // const [showDetails, setShowDetails] = useState(false)
  const [courseDetails, setCourseDetails] = useState<Course|null>(null);
  const [fieldDropdownOpen, setFieldDropdownOpen] = useState(false);
  // const [categories, setCategories] = useState<CategoryType[]>([]);

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

  const fieldDropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        fieldDropdownRef.current &&
        !fieldDropdownRef.current.contains(event.target as Node)
      ) {
        setFieldDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


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
    setSearchAllTerm("")
    setFieldStudy("")
    setScholarshipOptions("")
    setActiveTab(0)
  }

  const [activeTab, setActiveTab] = useState(0);


  useEffect(() => {
    Papa.parse("/csvFile.csv", {
      download: true,
      header: true,
      complete: (result) => {
        const data = result.data;

        // Find the key with course/subject names
        const key = Object.keys(data[0] as object).find(k =>
          k.toLowerCase().includes('course') || k.toLowerCase().includes('subject')
        );

        let uniqueCourses: string[] = [];
        if (key) {
          uniqueCourses = Array.from(new Set(
            data.map(row => (row as any)[key]?.toString().trim()).filter(Boolean)
          ));
        }

        setProgramList(uniqueCourses);
      },
    });
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await getCoursesWithoutToken()

        setCourses(response);
      } catch (err) {
        // setError(err instanceof Error ? err.message : 'An error occurred');
        console.log("error: ", err)
      } finally {
        setIsLoading(false);
        setFieldStudy(courseFilter);
      }
    };

    fetchCourses();

    // handleGetCoursesCategories();
  }, []);

  const filteredCourses = useMemo(() => {
    const term = searchAllTerm.toLowerCase().trim();
  
    return courses.filter((s) => {
      // default to empty string if missing
      const name = s.title.toLowerCase();
      return name.includes(term)
      && (scholarshipOptions === "" || scholarshipOptions.toLowerCase() === s.scholarship?.toLowerCase())
      && (fieldStudy === "" || fieldStudy === s.title)
      && (activeTab === 0 || activeTab === s.categoryId)
      && (selectedCountry === "" || selectedCountry.toLowerCase() === s.university?.country.toLowerCase())
      && (selectedState === "" || selectedState.toLowerCase() === s.university?.region.toLowerCase());
    });
  }, [courses, searchAllTerm, scholarshipOptions, selectedCountry, selectedState, fieldStudy, activeTab]);


  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  const paginatedCourses = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCourses.sort((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }).slice(start, start + itemsPerPage);
  }, [filteredCourses, currentPage]);

  return (

    <div className="w-full min-h-screen">

      {
        showDetails ? <Details courseItem={courseDetails} setShowDetails={setShowDetails}  /> :

          <div className="w-full min-h-screen">
            <div className="w-full border-b border-b-[#DDDDDD]">
              <div className="flex flex-wrap gap-[10px] px-3 py-3">
                
                <div className="relative flex-1" ref={fieldDropdownRef}>
                  <CiSearch className="absolute top-[25%] left-[10px] text-[#999999]" />
                  <input
                    type="text"
                    className="h-[35px] pl-8 border-[0.8px] border-gray-300 p-2 w-full rounded-md focus:outline-none text-[#999999] text-[14px] font-medium"
                    placeholder="Search"
                    value={fieldStudy}
                    onFocus={() => setFieldDropdownOpen(true)}
                    onChange={e => {
                      setFieldStudy(e.target.value);
                      setFieldDropdownOpen(true);
                    }}
                  />
                  {fieldDropdownOpen && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 max-h-[250px] overflow-y-auto z-10">
                      {programList
                        .filter(typeValue =>
                          typeValue.toLowerCase().includes(fieldStudy.toLowerCase())
                        )
                        .map((typeValue, idx) => (
                          <div
                            key={idx}
                            className={`p-2 cursor-pointer hover:bg-gray-100 ${
                              fieldStudy === typeValue ? "bg-gray-200" : ""
                            }`}
                            onClick={() => {
                              setFieldStudy(typeValue);
                              setFieldDropdownOpen(false);
                            }}
                          >
                            {typeValue}
                          </div>
                        ))}
                      {programList.filter(typeValue =>
                        typeValue.toLowerCase().includes(fieldStudy.toLowerCase())
                      ).length === 0 && (
                        <div className="p-2 text-gray-500">No fields found</div>
                      )}
                    </div>
                  )}
                </div>


                <div className="relative w-[150px]" ref={dropdownRef}>
                  <IoIosArrowDown className="absolute top-[25%] right-[10px] text-[#999999]" />
                  <input
                    type="text"
                    className="h-[35px] w-[150px] border-[0.8px] border-gray-300 p-2 rounded-md focus:outline-none text-[#999999] text-[14px] font-medium"
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

                <div className="relative" ref={stateDropdownRef}>
                  <IoIosArrowDown className="absolute top-[25%] right-[10px] text-[#999999]" />
                  <input
                    type="text"
                    className="h-[35px] w-[100px] bg-[white] border-[0.8px] border-gray-300 p-2  rounded-md focus:outline-none text-[#999999] text-[14px] font-medium"
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

                <div className="md:w-[150px]">
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
                  className="bg-[white] text-[#999999] text-[14px] font-medium py-2 h-[35px] p-2 border border-gray-300 rounded-md
                      outline-0 focus:outline-none flex justify-between items-center gap-x-[10px]"
                  >
                  <p className="whitespace-nowrap">Clear Filters</p>
                  <IoIosRefresh className="w-4 h-4"  />
                </button>
              </div>
            </div>
            
            <div className="p-5 flex justify-center">
              {isLoading && (
                <div className="mx-auto w-full flex justify-center items-center h-[500px]">
                  <ClipLoader />
                </div>
              )}
            </div>

            {
              !isLoading && (
                <div className="flex flex-col md:flex-row flex-wrap justify-between gap-[10px] md:justify-start md:gap-[30px] w-[100%]">
                  {
                    paginatedCourses.length > 0 && paginatedCourses.map((elem, i) => (
                      <CourseCard setShowDetails={setShowDetails} courseItem={elem} key={i} setCourseDetails={setCourseDetails} />
                    ))
                  }
                </div>
              )
            }

            {!isLoading && paginatedCourses.length === 0 && (
              <div className="flex flex-col justify-center items-center gap-y-[10px] w-full h-[400px]">
                <img src={fileIcon} alt="Not found" />
                <p className="text-[#101828] text-[16px] font-semibold">No courses Found</p>
              </div>
            )}
            
            <div className="flex justify-between items-center mt-5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-1 border-[1px] border-[#D0D5DD] rounded-lg disabled:opacity-50"
              >
                Previous
              </button>

              <span className="text-sm">
                Showing Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-1 border-[1px] border-[#D0D5DD] rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

      }

      
    </div>
  );
} 
