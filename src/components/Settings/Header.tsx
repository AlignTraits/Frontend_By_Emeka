

export default function Header({heading, text, buttonText, handleClick}: {heading: string, text: string, buttonText: string, handleClick: () => void}) {
  return (
    <div className="flex w-full justify-between border-b-[1px] border-[#E0E0E0] pb-10">
      <div className="space-y-2 w-full">
        <h2 className="text-[#000000] text-[20px] font-[500]">{heading}</h2>
        <p className="text-[#757575] font-[600] text-[16px]">{text}</p>
      </div>
      <button
        className="flex items-center px-4 py-2 bg-[#004085] text-white rounded-lg hover:bg-blue-700 transition-colors w-[200px]  justify-center h-[80%] my-auto"
        onClick={() => handleClick()}
      >
        {buttonText}
      </button>
    </div>
  );
}
