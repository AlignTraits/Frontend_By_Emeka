import { MdKeyboardBackspace } from "react-icons/md";
import { getUserListDetails } from "../../services/schools";
import { useAuth } from "../../contexts/useAuth";
import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { ClipLoader } from "react-spinners";
import SearchSelect from '../../components/dashboard/SearchSelect';
import CustomSelect from '../../components/dashboard/CustomSelect';
import "react-datepicker/dist/react-datepicker.css";
// import { MdOutlineCalendarToday } from "react-icons/md";
import EnhancedDatePicker from '../../components/dashboard/EnhancedDatePicker';
import countriesData from "../../data/countries_states.json"

const countryStateData: Record<string, string[]> = {
};

countriesData.map((elem:any) => {
  countryStateData[elem.name] = elem.states
})


interface User {
  id: string;
  firstname:string;
  lastname: string;
  email: string;
  region: string;
  gender: string;
  image: string;
  dob: string
}


interface ModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
}

const UserDetails = ({setShowModal, userId}:ModalProps) => {
  const { token } = useAuth();
  const [user, setUser] = useState<User | null>(null)

  const [errorObj, setErrorObj] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    gender: false,
    country: false,
    state: false,
    dob: false
  })


  async function fetchUsers() {
    setIsLoading(true);
    try {
      const response = await getUserListDetails(token || "");
      console.log("response: ", response)
      if (response.status === 200) {
        let tempData = response.data.find((elem: User) => elem.id === userId);
        console.log("tempData: ", tempData)
        tempData ? setUser(tempData) : setUser(null);
      }
    } catch (e) {
      console.log("error: ", e)
    } finally {
      setIsLoading(false)
    }
  }


  useEffect(() => {
    fetchUsers()
  }, [])

    const [lastName, setLastName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [email, setEmail] = useState("")
    const [gender, setGender] = useState('');
    const [selectedCountry, setSelectedCountry] = useState<string>("");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const handleStartDateChange = (date: Date | null) => {
      setStartDate(date);
    };
    const [isLoading, setIsLoading] = useState(false)
  
  
    const handleGenderError = () => {
      setErrorObj((prev) => ({...prev, gender: false}))
    }
  
    const handleDobError = () => {
      setErrorObj((prev) => ({...prev, dob: false}))
    }
  
    const handleCountryError = () => {
      setErrorObj((prev) => ({...prev, country: false}))
    }
  

  
    useEffect(() => {
      if (user) {
        user.firstname && setFirstName(user.firstname);
        user.lastname && setLastName(user.lastname);
        user.email && setEmail(user.email);
        user.region && setSelectedCountry(user.region);
        user.gender && setGender(user.gender);
        user.dob && setStartDate(new Date(user.dob));
      }
     }, [user])

     console.log("gender: ", gender)


  return (
    <div className="absolute inset-0 bg-white p-10 z-10">
      <div className="relative">
        <div className="flex gap-x-[10px] items-center">
          <button  onClick={()=> setShowModal(false)} className="w-[120px] flex gap-x-[5px] justify-center items-center py-2 rounded-lg border-[1px] border-[#DDDDDD]">
            <MdKeyboardBackspace /> <p className="font-semibold text-[14px] text-[#1E1E1E]">Go Back</p>
          </button>
        </div>

        {isLoading ? (
          <div className="mx-auto rounded-xl w-full flex justify-center items-center h-[500px] border-[1px] border-[#EAECF0] mt-10">
            <ClipLoader />
          </div>
        ) : user ?
        <div className="mt-10 border-[1px] border-[#EAECF0] flex flex-col gap-y-[15px] lg:gap-y-[30px] shadow-md rounded-xl p-5 w-[100%] size-max">
          <div>
            <p className="text-[#212529] text-[18px] font-bold">Profile Information</p>
            <p className='text-[12px] text-[#757575] mt-2'>Update your personal information and preferences.</p>
          </div>

          <div className='flex flex-col lg:flex-row gap-x-[20px] space-y-1'>
            <div className="flex flex-col gap-y-[5px] w-[100%] lg:w-[50%]">
              <p className={`text-[12px] ${errorObj.firstName ? 'text-[#F04438]' : 'text-[#1E1E1E]'} font-medium`}>First Name*</p>
              <input
                type="text"
                placeholder="Enter First Name"
                onFocus={() => setErrorObj((prev) => ({...prev, firstName: false}))}
                name="firstName"
                value={firstName}
                disabled
                onChange={(e) => setFirstName(e.target.value)}
                className="border-[1px] px-[10px] rounded-md border-[#E9E9E9] py-2 focus:outline-none w-full text-[16px] font-[400] text-[black]"
              />
            </div>

            <div className="flex flex-col gap-y-[5px] w-[100%] lg:w-[50%]">
              <p className={`text-[12px] ${errorObj.lastName ? 'text-[#F04438]' : 'text-[#1E1E1E]'} font-medium`}>Lasts Name*</p>
              <input
                type="text"
                placeholder="Enter Last Name"
                onFocus={() => setErrorObj((prev) => ({...prev, lastName: false}))}
                name="lastName"
                value={lastName}
                disabled
                onChange={(e) => setLastName(e.target.value)}
                className="border-[1px] px-[10px] rounded-md border-[#E9E9E9] py-2 focus:outline-none w-full text-[16px] font-[400] text-[black]"
              />
            </div>
          </div>

          <div className='flex flex-col lg:flex-row gap-x-[20px] space-y-1'>
            <div className="flex flex-col gap-y-[5px] w-[100%] lg:w-[50%]">
              <p className={`text-[12px] ${errorObj.email ? 'text-[#F04438]' : 'text-[#1E1E1E]'} font-medium`}>Email Address*</p>
              <input
                type="email"
                placeholder="johndoe@gmail.com"
                onFocus={() => setErrorObj((prev) => ({...prev, email: false}))}
                name="email"
                disabled
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-[1px] px-[10px] rounded-md border-[#E9E9E9] py-2 focus:outline-none w-full text-[16px] font-[400] text-[black]"
              />
            </div>

            <div className="flex flex-col gap-y-[5px] w-[100%] lg:w-[50%]">
              <p className={`text-[12px] ${errorObj.country ? 'text-[#F04438]' : 'text-[#1E1E1E]'} font-medium`}>Country*</p>
              <SearchSelect
                placeholder="Select Country"
                options={Object.keys(countryStateData).map((country) => ({
                  value: country,
                  label: country,
                }))}
                onChange={(value) => setSelectedCountry(value)}
                handleError={handleCountryError}
                selectedProps={{
                  value: selectedCountry,
                  label: selectedCountry
                }}
                disabledState={true}
                
              />
            </div>
          </div>

          <div className='flex flex-col lg:flex-row gap-x-[20px] space-y-1'>
            <div className="flex flex-col gap-y-[5px] w-[100%] lg:w-[50%]">
              <p className={`text-[12px] ${errorObj.dob ? 'text-[#F04438]' : 'text-[#1E1E1E]'} font-medium`}>Date of Birth*</p>
              <div className="h-[40px] w-full relative flex items-center justify-between border rounded-md bg-white">
                
                <EnhancedDatePicker
                  selected={startDate}
                  onChange={handleStartDateChange}
                  placeholder="dd/mm/yyyy"
                  onFocus={handleDobError}
                  disabled={true}
                  className={errorObj.dob ? 'border-red-500 outline-none w-full text-[14px] text-[#595959] font-semibold' : 'border-gray-300 outline-none w-full text-[14px] text-[#595959] font-semibold'}
                />
              </div>
            </div>

            <div className="flex flex-col gap-y-[5px] w-[100%] lg:w-[50%]">
              <p className={`text-[12px] ${errorObj.gender ? 'text-[#F04438]' : 'text-[#1E1E1E]'} font-medium`}>Gender*</p>
              <CustomSelect
                placeholder="Select your gender"
                options={["MALE", "FEMALE"].map((schtype) => ({
                  value: schtype,
                  label: schtype,
                }))}
                onChange={(value: string) => setGender(value)}
                handleError={handleGenderError}
                selectedProps={{
                  value: gender,
                  label: gender
                }}
                disabledState={true}
              />
            </div>
          </div>
        </div> :
        <div className="mt-10 border-[1px] border-[#EAECF0] flex flex-col gap-y-[15px] lg:gap-y-[30px] shadow-md rounded-xl p-5 w-[100%] size-max">
          <h1>No Data</h1>
        </div>
      }



      </div>

    </div>
  )
}

export default UserDetails