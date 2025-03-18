import React, { useState, useEffect, useRef } from "react";
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
  selectedProps?: {
    value: string,
    label: string
  };
  disabledState?: boolean
}

const CustomSelect: React.FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  onChange,
  className = "",
  selectedProps,
  disabledState=false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);
  const [dropUp, setDropUp] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: Option) => {
    setSelected(option);
    setIsOpen(false);
    onChange(option.value);
  };

  console.log("selected: ", selected)

  useEffect(() => {
    const checkDropdownPosition = () => {
      if (selectRef.current) {
        const rect = selectRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        setDropUp(rect.bottom + 200 > windowHeight);
      }
    };

    if (isOpen) {
      checkDropdownPosition();
      window.addEventListener("resize", checkDropdownPosition);
    } else {
      window.removeEventListener("resize", checkDropdownPosition);
    }

    return () => window.removeEventListener("resize", checkDropdownPosition);
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  // This is applied when a default value is provided
  useEffect(() => {
    if (selectedProps?.label) {
      setSelected(selectedProps)
    }
  }, [selectedProps])

  const splitString = (text: any) => {
    if (typeof text === 'string') {
      return text.replace(/_/g, ' ');
    } 
    return text
  }

  

  return (
    <div ref={selectRef} className={`relative ${className}`}>
    
      <button
        type="button"
        disabled={disabledState}
        className="w-full px-4 py-2  bg-white p-2 rounded-md border-[0.8px] border-gray-300 focus:outline-none capitalize flex justify-between items-center gap-x-[10px]"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selected?.value  ? <p className="text-[#1E1E1E] text-[14px]">{selected.label}</p> : 
        <p className="text-[#999999] text-[14px]">{placeholder}</p>}
        <FiChevronDown className="" />
      </button>

      
      {isOpen && (
        <ul
          className={`absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto ${
            dropUp ? "bottom-full mb-1" : "top-full mt-1"
          }`}
        >
          {options.map((option, index) => (
            <li
              key={option.value +index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleOptionClick(option)}
            >
              {splitString(option.label)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
