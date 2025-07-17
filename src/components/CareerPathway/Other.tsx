import pathImage from "../../assets/pathWayImage.svg"
import { IoMdArrowForward, IoIosArrowForward } from "react-icons/io";
import { IoMdBookmarks } from "react-icons/io";

interface ItemProps {
  color: string;
  text: string;
  handleClick: (param: string) => void
}

const Items = ({ color, text, handleClick }: ItemProps) => {
  return (
    <div
      className="border-[2px] cursor-pointer shadow-md h-[70px] w-full rounded-xl flex justify-between px-[20px] items-center"
      style={{ borderColor: color }}
      onClick={() => handleClick(text)}
    >
      <div className="flex gap-x-[20px] items-center">
        <div
          className="h-[50px] w-[50px] rounded-full flex items-center justify-center"
          style={{ backgroundColor: color }}
        >
          <IoMdBookmarks size={30} className="text-[white]" />
        </div>
        <p>{text}</p>
      </div>

      <IoIosArrowForward />
    </div>
  );
};
interface OtherProps {
  setViewState: React.Dispatch<React.SetStateAction<number>>;
  setCourseFilter: React.Dispatch<React.SetStateAction<string>>;
}
const Other = ({setViewState, setCourseFilter}: OtherProps) => {

  const handlePageChange = (filter: string) => {
    setCourseFilter(filter);
    setViewState(2);
  }

  return (
    <div className="mt-5">
      <p className="text-[#212121] text-[16px] font-medium">What course are you picking?</p>

      <div className="w-full h-[200px] mt-2 border-[#757575] border-[1px] rounded-xl flex items-center px-5 gap-x-[40px]">
        <img src={pathImage} className="h-[150px]" />

        <div className="h-[150px] flex flex-col justify-between">
          <div>
            <p className="text-[24px] font-semibold">Business Intelligence Specialist</p>
            <p className="text-[#212121] text-[16px]">Convenant University</p>
            <p className="text-[#007BFF] text-[14px] md:text-[16px] font-normal ">
              Ogun / Nigeria
            </p>
          </div>
          <div className="flex gap-x-[20px]">
            <button className="flex bg-[#F6C648] text-[#1C1C1C] text-[14px] p-2 flex items-center rounded-xl">View Details</button>
            <button className="flex bg-[#004085] p-2 flex items-center gap-x-[20px] rounded-xl">
              <p className="text-[white] text-[14px]">Other Schools With Similar Courses</p>
              <IoMdArrowForward className="text-[white]" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-[#212121] text-[16px] font-medium">Other courses from recomended career path:</p>

        <div className="flex flex-col gap-y-[20px] mt-2">
          <Items text="Sales" color="#4535C1" handleClick={handlePageChange} />
          <Items text="Graphic Design" color="#77E4C8" handleClick={handlePageChange} />
          <Items text="User Experience (UX) Design" color="#17B26A" handleClick={handlePageChange} />
        </div>
      </div>
    </div>
  )
}

export default Other;