import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/useAuth';
import { BeatLoader } from 'react-spinners';
import SearchSelect from '../../components/dashboard/SearchSelect';
import countriesData from "../../data/countries_states.json"
import CustomSelect from '../../components/dashboard/CustomSelect';
// import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
// import { MdOutlineCalendarToday } from "react-icons/md";
import { upDateUserProfile } from '../../services/auth.service';
import EnhancedDatePicker from '../../components/dashboard/EnhancedDatePicker';

const countryStateData: Record<string, string[]> = {
};

countriesData.map((elem:any) => {
  countryStateData[elem.name] = elem.states
})
export default function ProgressTracker() {
  const {setPageDesc, user, token, setUser} = useAuth()

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

  const checkAllFields = () => {

    if (!startDate) {
      setErrorObj((prev) => ({...prev, dob: true}))
    } 

    if (firstName.length === 0) {
      setErrorObj((prev) => ({...prev, firstName: true}))
    } 

    if (lastName.length === 0) {
      setErrorObj((prev) => ({...prev, lastName: true}))
    }

    if (email.length === 0) {
      setErrorObj((prev) => ({...prev, email: true}))
    } 

    if (selectedCountry.length === 0) {
      setErrorObj((prev) => ({...prev, country: true}))
    } 

    if (gender.length === 0) {
      setErrorObj((prev) => ({...prev, gender: true}))
    }
  }  

  useEffect(() => {
    setPageDesc({
      desc: "Update profile",
      title: "Profile"
    })
  }, [])

  useEffect(() => {
    if (user) {
      user.firstname && setFirstName(user.firstname);
      user.lastname && setLastName(user.lastname);
      user.email && setEmail(user.email);
      user.region && setSelectedCountry(user.region);
      user.gender && setGender(user.gender);
      user.dob && setStartDate(new Date(user.dob));
    }
   }, [])

  const isFormValid = () => {
    if (firstName.length > 0 && lastName.length > 0  && selectedCountry.length) {
      return true
    } else {
      return false
    }
  }

  function formatDateToYYYYMMDD(date: Date|null) {
    if (!date) {
      return "1970-01-01";
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    checkAllFields()

    if (!isFormValid()) {
      toast.error("Please fill all input fields!");
    }   
    const updateData = {
      firstname: firstName,
      lastname: lastName,
      region: selectedCountry,
      dob: formatDateToYYYYMMDD(startDate),
      gender: gender
    }

    try {
      let response = await upDateUserProfile(updateData, token as string, null);
      console.log("response: ", response)
      if (response[0].status === 200) {
        toast.success("Profile updated successfully!")
        let tempUser = {...user, firstname: firstName, 
          lastname: lastName, dob: startDate?.toDateString(), gender: gender, region: selectedCountry}
        console.log("Testm: ", tempUser)  
       
        localStorage.setItem("user", JSON.stringify(tempUser))
        setUser(tempUser)
      } 
    } catch (err) {
      console.log("error: ", err);
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="p-5">
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
                className={errorObj.dob ? 'border-red-500 outline-none w-full text-[14px] text-[#595959] font-semibold' : 'border-gray-300 outline-none w-full text-[14px] text-[#595959] font-semibold'}
              />
              {/* <MdOutlineCalendarToday className="h-5 w-5 text-gray-400" /> */}
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
            />
          </div>
        </div>

        <div className='w-full flex justify-center lg:justify-end'>
          <button disabled={isLoading} onClick={handleSubmit} className='h-[50px] bg-[#004085] rounded-xl text-[white] font-semibold text-[16px] w-[200px]'>
            {isLoading ? <BeatLoader /> : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
