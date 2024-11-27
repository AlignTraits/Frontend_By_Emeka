import  { useState, useMemo } from "react";

export default function LoanCalculator() {
  const [program, setProgram] = useState<string>("");
  const [school, setSchool] = useState<string>("");
  const [work, setWork] = useState<string>("");
  const [currency, setCurrency] = useState<string>("");
  const [annualIncome, setAnnualIncome] = useState<string>("");
  const [range, setRange] = useState<number>(5000);

  const isFormValid = useMemo(() => {
    return (
      program !== "" &&
      school !== "" &&
      work !== "" &&
      currency !== "" &&
      annualIncome !== "" &&
      range >= 5000
    );
  }, [program, school, work, currency, annualIncome, range]);

  return (
    <div className="sticky top-4 h-fit border-[0.8px] border-[#007BFF] p-4 space-y-6 rounded-lg basis-[40%] bg-white">
      <h1 className="text-xl font-[500] text-[#F6C648]">Loan Calculator</h1>
      <form action="" className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="program" className="text-[#212121] font-[600] text-[14px]">
            What program do you seek financing in?
          </label>
          <div className="w-full p-2 rounded-md border border-[#000000]">
            <select
              name="program"
              id="program"
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              className="w-full h-full border-none outline-none text-[14px]"
            >
              <option value="">Please Select Program</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="school" className="text-[#212121] font-[600] text-[14px]">
            What School will you like to study in?
          </label>
          <div className="w-full p-2 rounded-md border border-[#000000]">
            <select
              name="school"
              id="school"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="w-full h-full border-none outline-none text-[14px]"
            >
              <option value="">Please Select School</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="work" className="text-[#212121] font-[600] text-[14px]">
            Do you have a work?
          </label>
          <div className="w-full p-2 rounded-md border border-[#000000]">
            <select
              name="work"
              id="work"
              value={work}
              onChange={(e) => setWork(e.target.value)}
              className="w-full h-full border-none outline-none text-[14px]"
            >
              <option value="">Kindly Work</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="currency" className="text-[#212121] font-[600] text-[14px]">
            What currency works for you?
          </label>
          <div className="w-full p-2 rounded-md border border-[#000000]">
            <select
              name="currency"
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full h-full border-none outline-none text-[14px]"
            >
              <option value="">Please Select Currency</option>
              <option value="dollar">Dollar</option>
              <option value="euro">Euro</option>
              <option value="pound">Pound</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="annualIncome" className="text-[#212121] font-[600] text-[14px]">
            How much do you earn annually?
          </label>
          <div className="w-full p-2 rounded-md border border-[#000000]">
            <select
              name="annualIncome"
              id="annualIncome"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(e.target.value)}
              className="w-full h-full border-none outline-none text-[14px]"
            >
              <option value="">Please Select Annual Income</option>
            </select>
          </div>
        </div>

        <div className="relative mb-6">
          <label
            htmlFor="labels-range-input"
            className="text-[#212121] font-[600] text-[14px]"
          >
            How much are you intrested in?
          </label>
          <input
            id="labels-range-input"
            type="range"
            value={range}
            min="5000"
            max="15000"
            className=""
            onChange={(e) =>
              setRange(
                Math.round(
                  Number(e.target.value) + (3.6 / 100) * Number(e.target.value)
                )
              )
            }
          />
          <span
            className="text-sm text-[#212121] font-[600] absolute start-0 -bottom-6 cursor-pointer"
            onClick={() => setRange(5000 * 1.036)}
          >
            C$5000
          </span>
          <span
            className="text-sm text-[#212121] font-[600] absolute start-[30%] -translate-x-1/2 rtl:translate-x-1/2 -bottom-6 cursor-pointer"
            onClick={() => setRange(8000 * 1.036)}
          >
            C$8000
          </span>
          <span
            className="text-sm text-[#212121] font-[600] absolute end-0 -bottom-6 cursor-pointer"
            onClick={() => setRange(15000 * 1.036)}
          >
            C$15,000
          </span>
        </div>
        <div className="flex flex-row justify-between border-y-[0.8px] border-[#007BFF] py-4">
          <p className="text-[#212121] font-[600]">
            3.6% Interest rate (Fixed):
          </p>
          <p className="text-[#212121] font-[600]">{range}</p>
        </div>
        <button
          className={`w-[50%] mx-auto p-2 rounded-md ${
            isFormValid
              ? "bg-[#004085] text-white hover:bg-[#003366] transition-colors"
              : "bg-[#00408533] text-[#FFFFFF] cursor-not-allowed"
          } text-[14px] font-[500]`}
          disabled={!isFormValid}
        >
          Apply
        </button>
      </form>
    </div>
  );
}
