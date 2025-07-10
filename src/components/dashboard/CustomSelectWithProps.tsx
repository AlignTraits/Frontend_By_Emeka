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
  classNameStyle?: string;
  selectedProps: {
    value: string,
    label: string
  };
  disabledState?: boolean
  handleError?: () => void
}

const CustomSelectWithProps: React.FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  onChange,
  classNameStyle = "",
  selectedProps,
  disabledState=false,
  handleError=()=> {}
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
    if (selectedProps) {
      setSelected(selectedProps)
    }

  }, [selectedProps])

  const splitString = (text: any) => {
    if (typeof text === 'string') {
      return text.replace(/_/g, ' ');
    } 
    return text
  }

  const handleClick = () => {
    handleError()
    setIsOpen((prev) => !prev)
  }
  

  return (
    <div ref={selectRef} className={`relative z-9 ${classNameStyle}`}>
      <button
        type="button"
        disabled={disabledState}
        className={`w-full px-3 sm:px-4 py-2 bg-white rounded-md border-[0.8px] border-gray-300 focus:outline-none capitalize flex justify-between items-center gap-x-2 sm:gap-x-[10px] text-[13px] sm:text-[14px] min-h-[40px] ${classNameStyle}`}
        onClick={handleClick}
      >
        {selected?.value ? (
          <p className="text-[#1E1E1E] truncate">{splitString(selected.label)}</p>
        ) : (
          <p className="text-[#999999] truncate">{placeholder}</p>
        )}
        <FiChevronDown className="text-[#999999] min-w-[18px] min-h-[18px]" />
      </button>

      {isOpen && (
        <ul
          className={`absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto ${
            dropUp ? "bottom-full mb-1" : "top-full mt-1"
          } text-[13px] sm:text-[14px]`}
        >
          {options.map((option, index) => (
            <li
              key={option.value + index}
              className="px-3 sm:px-4 py-2 cursor-pointer hover:bg-gray-100 truncate"
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

export default CustomSelectWithProps;
