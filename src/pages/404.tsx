import { useState, useEffect } from 'react';
import icon404 from "../assets/404.png"
import white404 from "../assets/white404.png"

const Page404 = () => {
  const [isDarkVersion, setIsDarkVersion] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsDarkVersion(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className={`relative min-h-screen w-full transition-all duration-1000 ease-in-out ${
        isDarkVersion 
          ? 'bg-[#004085]' 
          : 'bg-gradient-to-br from-[#CCE0F5] via-[#e9eff7] to-white'
      }`}
    >
      <div className='flex flex-col items-center space-y-5 px-4'>
        <img 
          src={isDarkVersion ? white404 : icon404} 
          alt="404"
          className="w-[220px] h-[120px] sm:w-[350px] sm:h-[200px] mx-auto mt-10 transition-opacity duration-500" 
        />
        
        <div className='flex flex-col items-center space-y-1'>
          <p 
            className={`text-[18px] sm:text-[20px] font-semibold transition-colors duration-1000 ${
              isDarkVersion ? 'text-white' : 'text-[#004085]'
            }`}
          >
            OOPS!
          </p>
          <p 
            className={`text-base sm:text-lg transition-colors duration-1000 ${
              isDarkVersion ? 'text-white' : 'text-black'
            }`}
          >
            PAGE NOT FOUND
          </p>
        </div>
        
        <button 
          className={`px-4 py-2 font-semibold rounded-sm transition-all duration-1000 text-sm sm:text-base ${
            isDarkVersion 
              ? 'border-white border-[1px] text-white hover:bg-white hover:text-[#004085]' 
              : 'border-[#004085] border-[1px] text-[#004085] hover:bg-[#004085] hover:text-white'
          }`}
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Page404;