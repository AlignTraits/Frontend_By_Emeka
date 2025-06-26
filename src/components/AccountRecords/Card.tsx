type Subject = {
  title: string;
  score: string;
};

type ExamResult = {
  title: string;
  subjects: Subject[];
};

type ResultProps = {
  result: ExamResult;
};

const Card: React.FC<ResultProps> = ({ result })=> {
  return (
    <div className="border-[1px] border-[#EAECF0] flex flex-col justify-between gap-y-[30px] shadow-md rounded-xl p-5 w-[100%] h-[165px]">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex gap-x-[10px] items-center">
            <p className="text-[#101828] text-[16px] font-semibold">{result.title}</p>
            <p className="text-[#000000] text-[10px] bg-[#E3E3E3] size-max px-[5px] py-[2px] rounded-xl">2020</p>
          </div>
          <p className="text-[#757575] text-[14px] font-medium">4 subjects recorded</p>
        </div>

        <div className="flex gap-x-[10px]">
          <button className="bg-[#F4F4F4] border-[1px] border-[#EAECF0] shadow-md rounded-md h-[50px] w-[80px] text-[#000000] text-[14px] font-semibold">
            Edit
          </button>
          <button className="bg-[#F4F4F4] border-[1px] border-[#EAECF0] shadow-md rounded-md h-[50px] w-[100px] text-[#D92D20] text-[14px] font-semibold">
            Delete
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center">
        {
          result.subjects.map((elem, i) => (
          <div key={i} className="flex gap-x-[10px] items-center">
            <p className="text-[#101828] text-[16px] font-semibold">{elem.title}</p>
            <p className="text-[#000000] text-[10px] bg-[#E3E3E3] size-max px-[5px] py-[2px] rounded-xl">{elem.score}</p>
          </div>
          ))
        }
      </div>
    </div>
  )
}

export default Card;