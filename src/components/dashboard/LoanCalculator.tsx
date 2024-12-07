import { useState, useMemo } from "react";
import CustomSelect from "./CustomSelect";


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
    <div className="sticky top-4 h-fit border-[0.8px] border-[#007BFF] p-4 space-y-8 rounded-[20px] basis-[38%] bg-white">
      <h1 className="text-[14px] font-[700] text-[#F6C648]">Loan Calculator:</h1>
      <form action="" className="flex flex-col space-y-8">
        <div className="flex flex-col gap-5">
          <label
            htmlFor="program"
            className="text-[#212121] font-[600] text-[14px]"
          >
            What program do you seek financing in?
          </label>
          <div className="w-full">
            <CustomSelect
              options={[
                { value: "compsci", label: "Computer Science" },
                { value: "physics", label: "Physics" },
              ]}
              placeholder="Please Select Program"
              className="text-[14px]"
              onChange={setProgram}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <label
            htmlFor="school"
            className="text-[#212121] font-[600] text-[14px]"
          >
            What School will you like to study in?
          </label>
          <div className="w-full">
            <CustomSelect
              options={[
                { value: "lmu", label: "Landmark Uni" },
                { value: "hav", label: "Havard" },
              ]}
              placeholder="Please Select School"
              className="text-[14px]"
              onChange={setSchool}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <label
            htmlFor="work"
            className="text-[#212121] font-[600] text-[14px]"
          >
            Do you have a work?
          </label>
          <div className="w-full">
            <CustomSelect
              options={[
                { value: "compsci", label: "Computer Science" },
                { value: "physics", label: "Physics" },
              ]}
              placeholder="Kindly Select"
              className="text-[14px]"
              onChange={setWork}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <label
            htmlFor="currency"
            className="text-[#212121] font-[600] text-[14px]"
          >
            What currency works for you?
          </label>
          <div className="w-full">
            <CustomSelect
              options={[
                { value: "dollar", label: "Dollar" },
                { value: "euro", label: "Euro" },
                { value: "pound", label: "Pound" },
              ]}
              placeholder="Please Select Currency"
              className="text-[14px]"
              onChange={setCurrency}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <label
            htmlFor="annualIncome"
            className="text-[#212121] font-[600] text-[14px]"
          >
            How much do you earn annually?
          </label>
          <div className="w-full">
            <CustomSelect
              options={[
                { value: "compsci", label: "Computer Science" },
                { value: "physics", label: "Physics" },
              ]}
              placeholder="Please Select Program"
              className="text-[14px]"
              onChange={setAnnualIncome}
            />
          </div>
        </div>

        <div className="relative space-y-8">
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
            className="text-sm text-[#212121] font-[600] absolute start-0 -bottom-6 cursor-pointer "
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
