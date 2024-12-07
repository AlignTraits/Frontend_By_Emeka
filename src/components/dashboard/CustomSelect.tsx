import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
}

const CustomSelect: React.FC<SelectProps> = ({ options, placeholder = "Select an option", onChange, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);

  const handleOptionClick = (option: Option) => {
    setSelected(option);
    setIsOpen(false);
    onChange(option.value);
  };

  return (
    <div className={`relative  ${className}`}>
      {/* Selected item */}
      <button
        type="button"
        className="w-full px-4 py-2 text-left bg-white p-2 rounded-md border-[0.8px] border-[#000000] focus:outline-none focus:ring-2 focus:ring-blue-200"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selected ? selected.label : placeholder}
        <FiChevronDown className="float-right mt-[1%]" />
       
      </button>

      {/* Options dropdown */}
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option.value}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
