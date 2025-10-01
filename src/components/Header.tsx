import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate()
  return (
    <div className="sticky top-0 z-[1000] pb-[10px]">
      <div className="md:bg-[#FCFCFD] md:mx-0 flex justify-between p-3 border-b border-b-[#DDDDDD] bg-white shadow-md mx-2 sm:rounded-md">
        <div className="cursor-pointer" onClick={() => navigate("/search")}>
          <h1 className="text-[12px] font-semibold text-[#101828] md:text-[20px]">Welcome to Aligntraits</h1>
          <p className="text-[8px] font-normal text-[#999999] md:text-[12px]">Find your career path today!</p>
        </div>
      </div>
    </div>
  )
}

export default Header;